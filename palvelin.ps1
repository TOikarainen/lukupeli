# Pieni paikallinen verkkopalvelin testausta varten.
# Käynnistys:  powershell -ExecutionPolicy Bypass -File palvelin.ps1
# Avaa sitten selaimessa http://localhost:8080  (pysäytys: Ctrl+C)

param([int]$Portti = 8080)

$juuri = $PSScriptRoot
$tyypit = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "text/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".png"  = "image/png"
  ".svg"  = "image/svg+xml"
}

$kuuntelija = New-Object System.Net.HttpListener
$kuuntelija.Prefixes.Add("http://localhost:$Portti/")
$kuuntelija.Start()
Write-Host "Palvelin auki osoitteessa http://localhost:$Portti"

try {
  while ($kuuntelija.IsListening) {
    $yhteys = $kuuntelija.GetContext()
    try {
    $polku = [Uri]::UnescapeDataString($yhteys.Request.Url.AbsolutePath.TrimStart('/'))
    if ($polku -eq "") { $polku = "index.html" }
    $tiedosto = [IO.Path]::GetFullPath((Join-Path $juuri $polku))

    if ($tiedosto.StartsWith($juuri) -and (Test-Path $tiedosto -PathType Leaf)) {
      $sisalto = [IO.File]::ReadAllBytes($tiedosto)
      $tyyppi = $tyypit[[IO.Path]::GetExtension($tiedosto)]
      if (-not $tyyppi) { $tyyppi = "application/octet-stream" }
      $yhteys.Response.ContentType = $tyyppi
      $yhteys.Response.Headers.Add("Cache-Control", "no-store")
      $yhteys.Response.ContentLength64 = $sisalto.Length
      $yhteys.Response.OutputStream.Write($sisalto, 0, $sisalto.Length)
    } else {
      $yhteys.Response.StatusCode = 404
    }
    } catch {
      Write-Host "Virhe: $_"
    } finally {
      $yhteys.Response.Close()
    }
  }
} finally {
  $kuuntelija.Stop()
}
