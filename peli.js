// PELIN LOGIIKKA
// Viittaukset V-xx ovat määrittelyn (MAARITTELY.md) vaatimusnumeroita.

// --- Asetukset ---------------------------------------------------------
const SANOJA_KIERROKSELLA = 10;      // V-02
const VAIHTOEHTOJA = 3;              // V-04
const TAUKO_OIKEAN_JALKEEN = 2000;   // millisekuntia ennen seuraavaa sanaa
const AIKA_3_TAHTEA = 5000;          // V-14: alle 5 s = 3 tähteä
const AIKA_2_TAHTEA = 10000;         // V-14: alle 10 s = 2 tähteä
const TALLENNUSAVAIN = "lukupeli.tahdetYhteensa"; // V-16

// --- Pelin tila --------------------------------------------------------
// Nämä muuttujat muistavat, missä kohtaa peliä ollaan.
let kierroksenSanat = [];  // tämän kierroksen 10 sanaa
let nykyinen = 0;          // monesko sana on menossa (0 = ensimmäinen)
let oikeaSana = null;      // nykyisen tehtävän oikea sana (koko rivi sanalistasta)
let lukittu = false;       // true = odotetaan siirtymää, napautuksia ei oteta vastaan
let alkuaika = 0;          // milloin sana tuli näkyviin (V-13)
let vaaraArvaus = false;   // onko tässä tehtävässä jo arvattu väärin
let apuKaytetty = false;   // onko tässä tehtävässä avattu tavuapu
let kierroksenTahdet = 0;  // tällä kierroksella kerätyt tähdet
let kokonaistahdet = lueKokonaistahdet(); // kaikkien aikojen tähdet

// --- Apufunktiot -------------------------------------------------------

// Lyhennysmerkintä: el("sana") = document.getElementById("sana")
function el(id) {
  return document.getElementById(id);
}

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
  el(id).classList.remove("piilossa");
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

// --- Tähdet ja tallennus -----------------------------------------------

// V-14: montako tähteä oikeasta vastauksesta saa.
// Oikeasta vastauksesta saa aina vähintään yhden tähden.
function laskeTahdet(kestoMs, arvattuVaarin, apuaKaytetty) {
  if (arvattuVaarin || apuaKaytetty) return 1;
  if (kestoMs < AIKA_3_TAHTEA) return 3;
  if (kestoMs < AIKA_2_TAHTEA) return 2;
  return 1;
}

// V-16: tähdet tallennetaan selaimen muistiin (localStorage), jossa ne
// säilyvät, vaikka sivu suljetaan. try/catch varmistaa, että peli toimii,
// vaikka selain ei sallisi tallentamista (esim. yksityinen selaus).
function lueKokonaistahdet() {
  try {
    return parseInt(localStorage.getItem(TALLENNUSAVAIN), 10) || 0;
  } catch (virhe) {
    return 0;
  }
}

function tallennaKokonaistahdet() {
  try {
    localStorage.setItem(TALLENNUSAVAIN, String(kokonaistahdet));
  } catch (virhe) {
    // Tallennus ei onnistunut. Peli jatkuu silti normaalisti.
  }
}

// Näyttää ansaitut tähdet ponnahdusanimaationa ruudun keskellä.
function naytaPalkinto(tahdet) {
  const palkinto = el("palkinto");
  palkinto.textContent = "⭐".repeat(tahdet);
  // Animaatio käynnistetään uudelleen poistamalla ja lisäämällä luokka
  palkinto.classList.remove("nayta");
  void palkinto.offsetWidth; // pakottaa selaimen huomaamaan poiston
  palkinto.classList.add("nayta");
}

// --- Pelin kulku -------------------------------------------------------

// Näyttää aloitusnäytön ja kerätyt tähdet (V-01).
function naytaAloitus() {
  el("aloitus-kokonais").textContent = kokonaistahdet;
  naytaNakyma("aloitus");
}

// Aloittaa uuden kierroksen: arpoo 10 sanaa ja näyttää ensimmäisen.
function aloitaKierros() {
  kierroksenSanat = sekoita(SANAT).slice(0, SANOJA_KIERROKSELLA);
  nykyinen = 0;
  kierroksenTahdet = 0;
  el("tahtilaskuri").textContent = "⭐ 0";
  naytaNakyma("tehtava");
  naytaTehtava();
}

// Näyttää nykyisen sanan ja kolme kuvavaihtoehtoa.
function naytaTehtava() {
  lukittu = false;
  vaaraArvaus = false;
  apuKaytetty = false;
  oikeaSana = kierroksenSanat[nykyinen];

  // Sana ruudulle. Sitä EI lausuta, koska lapsi lukee sen itse (V-03, V-06).
  el("sana").textContent = oikeaSana.sana;
  el("sana").classList.remove("piilossa");
  el("tavut").classList.add("piilossa");
  el("apu-nappi").classList.remove("piilossa");
  el("edistyminen").textContent = (nykyinen + 1) + " / " + SANOJA_KIERROKSELLA;

  // Väärät vaihtoehdot ovat muita listan sanoja (V-05),
  // ja oikean kuvan paikka arvotaan (V-04).
  const muut = SANAT.filter(s => s.sana !== oikeaSana.sana);
  const vaarat = sekoita(muut).slice(0, VAIHTOEHTOJA - 1);
  const vaihtoehdot = sekoita([oikeaSana, ...vaarat]);

  // Tyhjennetään edelliset kuvat ja luodaan uudet painikkeet.
  const kuvat = el("kuvat");
  kuvat.innerHTML = "";
  for (const vaihtoehto of vaihtoehdot) {
    const nappi = document.createElement("button");
    nappi.className = "kuva";
    nappi.textContent = vaihtoehto.kuva;
    nappi.addEventListener("click", () => valitse(nappi, vaihtoehto === oikeaSana));
    kuvat.appendChild(nappi);
  }

  // Ajanotto alkaa nyt. Aikaa ei näytetä lapselle (V-13).
  alkuaika = Date.now();
}

// Tavuapu: sana näytetään tavuina, joita napauttamalla kuulee tavun (V-10…V-12).
function naytaTavuapu() {
  if (lukittu) return;
  apuKaytetty = true;

  const tavut = el("tavut");
  tavut.innerHTML = "";
  oikeaSana.tavut.forEach((tavu, i) => {
    // Tavujen väliin viiva: KA – LA
    if (i > 0) {
      const viiva = document.createElement("span");
      viiva.className = "tavu-viiva";
      viiva.textContent = "–";
      tavut.appendChild(viiva);
    }
    const nappi = document.createElement("button");
    nappi.className = "tavu";
    nappi.textContent = tavu;
    nappi.addEventListener("click", () => puhu(tavu)); // V-11
    tavut.appendChild(nappi);
  });

  // Kaiutinpainike lausuu koko sanan (V-12)
  const kuuntele = document.createElement("button");
  kuuntele.className = "kuuntele";
  kuuntele.textContent = "🔊";
  kuuntele.addEventListener("click", () => puhu(oikeaSana.sana));
  tavut.appendChild(kuuntele);

  el("sana").classList.add("piilossa");
  el("tavut").classList.remove("piilossa");
  el("apu-nappi").classList.add("piilossa");
}

// Kutsutaan, kun lapsi napauttaa kuvaa.
function valitse(nappi, onOikein) {
  if (lukittu || nappi.disabled) return;

  if (onOikein) {
    // V-07: korostus, sana ääneen, tähdet, tauko ja seuraava sana
    lukittu = true;
    nappi.classList.add("oikein");
    puhu(oikeaSana.sana);

    const tahdet = laskeTahdet(Date.now() - alkuaika, vaaraArvaus, apuKaytetty);
    kierroksenTahdet += tahdet;
    kokonaistahdet += tahdet;
    tallennaKokonaistahdet(); // tallennetaan heti, ettei mitään katoa
    el("tahtilaskuri").textContent = "⭐ " + kierroksenTahdet;
    naytaPalkinto(tahdet);

    setTimeout(seuraava, TAUKO_OIKEAN_JALKEEN);
  } else {
    // V-08: heilahdus ja himmennys, sitten saa yrittää uudelleen
    vaaraArvaus = true;
    nappi.classList.add("vaarin");
    nappi.disabled = true;
  }
}

// Siirtyy seuraavaan sanaan tai loppunäyttöön.
function seuraava() {
  nykyinen++;
  if (nykyinen >= SANOJA_KIERROKSELLA) {
    naytaLoppu();
  } else {
    naytaTehtava();
  }
}

// Loppunäyttö: kierroksen tähdet ja kannustava viesti (V-15).
function naytaLoppu() {
  const maksimi = SANOJA_KIERROKSELLA * 3;
  let otsikko = "Hyvin luettu!";
  if (kierroksenTahdet >= maksimi * 0.8) otsikko = "Mahtavaa!";
  else if (kierroksenTahdet >= maksimi * 0.5) otsikko = "Hienoa!";

  el("loppu-otsikko").textContent = otsikko;
  el("kierroksen-tahdet").textContent = kierroksenTahdet;
  el("loppu-kokonais").textContent = kokonaistahdet;
  naytaNakyma("loppu");
}

// --- Käynnistys --------------------------------------------------------
// Kytketään painikkeet funktioihin ja näytetään aloitusnäyttö.
el("aloita-nappi").addEventListener("click", aloitaKierros);
el("uudestaan-nappi").addEventListener("click", aloitaKierros);
el("apu-nappi").addEventListener("click", naytaTavuapu);
naytaAloitus();
