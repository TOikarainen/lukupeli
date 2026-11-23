// PELIN LOGIIKKA
// Viittaukset V-xx ovat määrittelyn (MAARITTELY.md) vaatimusnumeroita.

// --- Asetukset ---------------------------------------------------------
const SANOJA_KIERROKSELLA = 10;  // V-02
const VAIHTOEHTOJA = 3;          // V-04
const TAUKO_OIKEAN_JALKEEN = 2000; // millisekuntia ennen seuraavaa sanaa

// --- Pelin tila --------------------------------------------------------
// Nämä muuttujat muistavat, missä kohtaa peliä ollaan.
let kierroksenSanat = [];  // tämän kierroksen 10 sanaa
let nykyinen = 0;          // monesko sana on menossa (0 = ensimmäinen)
let lukittu = false;       // true = odotetaan siirtymää, napautuksia ei oteta vastaan

// --- Apufunktiot -------------------------------------------------------

// Palauttaa listan sekoitettuna satunnaiseen järjestykseen.
// Alkuperäistä listaa ei muuteta.
function sekoita(lista) {
  const kopio = [...lista];
  for (let i = kopio.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopio[i], kopio[j]] = [kopio[j], kopio[i]];
  }
  return kopio;
}

// Näyttää yhden näkymän ja piilottaa muut.
function naytaNakyma(id) {
  document.querySelectorAll(".nakyma").forEach(n => n.classList.add("piilossa"));
  document.getElementById(id).classList.remove("piilossa");
}

// Lausuu tekstin ääneen selaimen puhesynteesillä.
// Jos ääntä ei ole saatavilla, ei tehdä mitään, ja peli toimii silti (V-19).
function puhu(teksti) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel(); // keskeytetään mahdollinen edellinen puhe
  // Pienillä kirjaimilla, ettei puhesynteesi tavaa sanaa kirjain kerrallaan
  const puhe = new SpeechSynthesisUtterance(teksti.toLowerCase());
  puhe.lang = "fi-FI";
  puhe.rate = 0.8; // hieman tavallista hitaammin
  const suomiAani = speechSynthesis.getVoices().find(a => a.lang.startsWith("fi"));
  if (suomiAani) puhe.voice = suomiAani;
  speechSynthesis.speak(puhe);
}

// --- Pelin kulku -------------------------------------------------------

// Aloittaa uuden kierroksen: arpoo 10 sanaa ja näyttää ensimmäisen.
function aloitaKierros() {
  kierroksenSanat = sekoita(SANAT).slice(0, SANOJA_KIERROKSELLA);
  nykyinen = 0;
  naytaNakyma("tehtava");
  naytaTehtava();
}

// Näyttää nykyisen sanan ja kolme kuvavaihtoehtoa.
function naytaTehtava() {
  lukittu = false;
  const oikea = kierroksenSanat[nykyinen];

  // Sana ruudulle. Sitä EI lausuta, koska lapsi lukee sen itse (V-03, V-06).
  document.getElementById("sana").textContent = oikea.sana;
  document.getElementById("edistyminen").textContent =
    (nykyinen + 1) + " / " + SANOJA_KIERROKSELLA;

  // Väärät vaihtoehdot ovat muita listan sanoja (V-05),
  // ja oikean kuvan paikka arvotaan (V-04).
  const muut = SANAT.filter(s => s.sana !== oikea.sana);
  const vaarat = sekoita(muut).slice(0, VAIHTOEHTOJA - 1);
  const vaihtoehdot = sekoita([oikea, ...vaarat]);

  // Tyhjennetään edelliset kuvat ja luodaan uudet painikkeet.
  const kuvat = document.getElementById("kuvat");
  kuvat.innerHTML = "";
  for (const vaihtoehto of vaihtoehdot) {
    const nappi = document.createElement("button");
    nappi.className = "kuva";
    nappi.textContent = vaihtoehto.kuva;
    nappi.addEventListener("click", () => valitse(nappi, vaihtoehto === oikea, oikea));
    kuvat.appendChild(nappi);
  }
}

// Kutsutaan, kun lapsi napauttaa kuvaa.
function valitse(nappi, onOikein, oikea) {
  if (lukittu || nappi.disabled) return;

  if (onOikein) {
    // V-07: korostus, sana ääneen, tauko ja seuraava sana
    lukittu = true;
    nappi.classList.add("oikein");
    puhu(oikea.sana);
    setTimeout(seuraava, TAUKO_OIKEAN_JALKEEN);
  } else {
    // V-08: heilahdus ja himmennys, sitten saa yrittää uudelleen
    nappi.classList.add("vaarin");
    nappi.disabled = true;
  }
}

// Siirtyy seuraavaan sanaan tai loppunäyttöön.
function seuraava() {
  nykyinen++;
  if (nykyinen >= SANOJA_KIERROKSELLA) {
    naytaNakyma("loppu");
  } else {
    naytaTehtava();
  }
}

// --- Käynnistys --------------------------------------------------------
// Kytketään painikkeet funktioihin.
document.getElementById("aloita-nappi").addEventListener("click", aloitaKierros);
document.getElementById("uudestaan-nappi").addEventListener("click", aloitaKierros);
