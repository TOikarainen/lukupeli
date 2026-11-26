// PELIN LOGIIKKA
// Viittaukset V-xx ovat määrittelyn (MAARITTELY.md) vaatimusnumeroita.
// Tallennukseen liittyvät funktiot (pelaajat, tähdet, tulokset) ovat tiedostossa tallennus.js.

// --- Asetukset ---------------------------------------------------------
const SANOJA_KIERROKSELLA = 10;      // V-02
const VAIHTOEHTOJA = 6;              // V-04
const AIKA_3_TAHTEA = 5000;          // V-14: alle 5 s = 3 tähteä
const AIKA_2_TAHTEA = 10000;         // V-14: alle 10 s = 2 tähteä
const TAVUN_VAHIMMAISAIKA = 500;     // V-28: tavun korostus vähintään näin kauan (ms)
const SANAN_VAHIMMAISAIKA = 800;     // V-28: koko sanan korostus vähintään näin kauan (ms)
const TAUKO_LUKEMISEN_JALKEEN = 700; // tauko ennen seuraavaa sanaa (ms)
const PUHEEN_ENIMMAISAIKA = 3000;    // varmistus, jos selain ei ilmoita puheen loppumisesta
const TULOSTAULUN_RIVIT = 10;        // V-25
const KEHITYKSEN_KIERROKSET = 10;    // V-26

// --- Pelin tila --------------------------------------------------------
let kierroksenSanat = [];  // tämän kierroksen 10 sanaa
let nykyinen = 0;          // monesko sana on menossa (0 = ensimmäinen)
let oikeaSana = null;      // nykyisen tehtävän oikea sana (koko rivi sanalistasta)
let lukittu = false;       // true = odotetaan siirtymää, napautuksia ei oteta vastaan
let alkuaika = 0;          // milloin sana tuli näkyviin (V-13)
let vaaraArvaus = false;   // onko tässä tehtävässä arvattu väärin
let apuKaytetty = false;   // onko tässä tehtävässä avattu tavuapu
let kierroksenTahdet = 0;  // tällä kierroksella kerätyt tähdet

// --- Apufunktiot -------------------------------------------------------

// Lyhennysmerkintä: el("sana") = document.getElementById("sana")
function el(id) {
  return document.getElementById(id);
}

// Luo HTML-elementin. Teksti asetetaan textContentilla, joten pelaajan
// nimessä olevat merkit eivät voi muuttua HTML-koodiksi.
function luo(tagi, luokka, teksti) {
  const elementti = document.createElement(tagi);
  if (luokka) elementti.className = luokka;
  if (teksti !== undefined) elementti.textContent = teksti;
  return elementti;
}

// Palauttaa listan sekoitettuna satunnaiseen järjestykseen.
function sekoita(lista) {
  const kopio = [...lista];
  for (let i = kopio.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopio[i], kopio[j]] = [kopio[j], kopio[i]];
  }
  return kopio;
}

// Odottaa annetun ajan. Käytetään muodossa: await odota(500)
function odota(ms) {
  return new Promise(valmis => setTimeout(valmis, ms));
}

// Päivämäärä suomalaisessa muodossa: 26.11.2026
function paivamaara(iso) {
  const p = new Date(iso);
  return p.getDate() + "." + (p.getMonth() + 1) + "." + p.getFullYear();
}

// Näyttää yhden näkymän ja piilottaa muut.
function naytaNakyma(id) {
  document.querySelectorAll(".nakyma").forEach(n => n.classList.add("piilossa"));
  el(id).classList.remove("piilossa");
}

// Lausuu tekstin ääneen ja palauttaa lupauksen (Promise), joka täyttyy, kun puhe loppuu.
// Jos ääntä ei ole saatavilla, lupaus täyttyy heti, ja peli toimii silti (V-19).
function puhu(teksti) {
  return new Promise(valmis => {
    if (!("speechSynthesis" in window)) {
      valmis();
      return;
    }
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    // Pienillä kirjaimilla, ettei puhesynteesi tavaa sanaa kirjain kerrallaan
    const puhe = new SpeechSynthesisUtterance(teksti.toLowerCase());
    puhe.lang = "fi-FI";
    puhe.rate = 0.8;
    const suomiAani = speechSynthesis.getVoices().find(a => a.lang.startsWith("fi"));
    if (suomiAani) puhe.voice = suomiAani;

    let loppui = false;
    const lopeta = () => {
      if (!loppui) {
        loppui = true;
        valmis();
      }
    };
    puhe.onend = lopeta;
    puhe.onerror = lopeta;
    setTimeout(lopeta, PUHEEN_ENIMMAISAIKA);
    speechSynthesis.speak(puhe);
  });
}

// --- Pelaaja (V-21…V-23) -----------------------------------------------

// Sivun avautuessa: tunnettu pelaaja suoraan aloitukseen, muuten kysytään nimi.
function kaynnista() {
  if (nykyinenPelaaja()) {
    naytaAloitus();
  } else {
    naytaPelaajanValinta();
  }
}

function naytaPelaajanValinta() {
  const nimet = pelaajienNimet();
  el("pelaaja-otsikko").textContent = nimet.length ? "Kuka pelaa?" : "Mikä on nimesi?";
  el("nimi-kentta").placeholder = nimet.length ? "Uusi pelaaja" : "Nimi";
  el("nimi-kentta").value = "";

  const lista = el("pelaajalista");
  lista.innerHTML = "";
  for (const nimi of nimet) {
    const nappi = luo("button", "pelaaja-nappi", nimi);
    if (nimi === nykyinenPelaaja()) nappi.classList.add("valittu");
    nappi.addEventListener("click", () => {
      valitsePelaaja(nimi);
      naytaAloitus();
    });
    lista.appendChild(nappi);
  }

  // Takaisin-painike vain, jos pelaaja on jo valittu
  el("pelaaja-takaisin").classList.toggle("piilossa", !nykyinenPelaaja());
  naytaNakyma("pelaaja");
}

function uusiPelaaja(tapahtuma) {
  tapahtuma.preventDefault(); // estetään lomakkeen oletustoiminto (sivun uudelleenlataus)
  const kentta = el("nimi-kentta");
  if (valitsePelaaja(kentta.value)) {
    kentta.blur(); // piilotetaan iPadin näppäimistö
    naytaAloitus();
  } else {
    kentta.focus();
  }
}

// --- Tähdet ------------------------------------------------------------

// V-14: montako tähteä oikeasta vastauksesta saa.
function laskeTahdet(kestoMs, arvattuVaarin, apuaKaytetty) {
  if (arvattuVaarin) return 0;
  if (apuaKaytetty) return 1;
  if (kestoMs < AIKA_3_TAHTEA) return 3;
  if (kestoMs < AIKA_2_TAHTEA) return 2;
  return 1;
}

// Näyttää ansaitut tähdet ponnahdusanimaationa ruudun keskellä.
// Ilman tähtiä näytetään peukku, jotta oikea vastaus tuntuu silti hyvältä.
function naytaPalkinto(tahdet) {
  const palkinto = el("palkinto");
  palkinto.textContent = tahdet > 0 ? "⭐".repeat(tahdet) : "👍";
  palkinto.classList.remove("nayta");
  void palkinto.offsetWidth; // pakottaa selaimen huomaamaan poiston, jotta animaatio alkaa alusta
  palkinto.classList.add("nayta");
}

// --- Pelin kulku -------------------------------------------------------

function naytaAloitus() {
  el("pelaajan-nimi").textContent = nykyinenPelaaja();
  el("aloitus-kokonais").textContent = pelaajanTahdet();
  naytaNakyma("aloitus");
}

function aloitaKierros() {
  kierroksenSanat = sekoita(SANAT).slice(0, SANOJA_KIERROKSELLA);
  nykyinen = 0;
  kierroksenTahdet = 0;
  el("tahtilaskuri").textContent = "⭐ 0";
  naytaNakyma("tehtava");
  naytaTehtava();
}

// Arpoo väärät vaihtoehdot: eri sana eikä samaa sekoittuvien kuvien ryhmää (V-05).
function arvoVaarat(oikea, maara) {
  const sopivat = SANAT.filter(s =>
    s.sana !== oikea.sana && !(oikea.ryhma && s.ryhma === oikea.ryhma)
  );
  return sekoita(sopivat).slice(0, maara);
}

// Näyttää nykyisen sanan ja kuusi kuvavaihtoehtoa.
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

  const vaihtoehdot = sekoita([oikeaSana, ...arvoVaarat(oikeaSana, VAIHTOEHTOJA - 1)]);

  const kuvat = el("kuvat");
  kuvat.innerHTML = "";
  for (const vaihtoehto of vaihtoehdot) {
    const nappi = luo("button", "kuva", vaihtoehto.kuva);
    nappi.addEventListener("click", () => valitse(nappi, vaihtoehto === oikeaSana));
    kuvat.appendChild(nappi);
  }

  alkuaika = Date.now(); // ajanotto alkaa nyt, aikaa ei näytetä (V-13)
}

// Rakentaa tavut ruudulle: KA – LA. Palauttaa tavuelementit.
// Tavuavussa tavut ovat painikkeita, ääneenluvussa pelkkää tekstiä.
function rakennaTavut(sana, painikkeina) {
  const alue = el("tavut");
  alue.innerHTML = "";
  const tavuElementit = sana.tavut.map((tavu, i) => {
    if (i > 0) alue.appendChild(luo("span", "tavu-viiva", "–"));
    const tavuEl = luo(painikkeina ? "button" : "span", "tavu", tavu);
    alue.appendChild(tavuEl);
    return tavuEl;
  });
  el("sana").classList.add("piilossa");
  alue.classList.remove("piilossa");
  el("apu-nappi").classList.add("piilossa");
  return tavuElementit;
}

// Tavuapu: tavua napauttamalla kuulee tavun, kaiutin lausuu koko sanan (V-10…V-12).
function naytaTavuapu() {
  if (lukittu) return;
  apuKaytetty = true;
  const tavuElementit = rakennaTavut(oikeaSana, true);
  tavuElementit.forEach((tavuEl, i) => {
    tavuEl.addEventListener("click", () => puhu(oikeaSana.tavut[i]));
  });
  const kuuntele = luo("button", "kuuntele", "🔊");
  kuuntele.addEventListener("click", () => puhu(oikeaSana.sana));
  el("tavut").appendChild(kuuntele);
}

// V-28: tavut luetaan yksi kerrallaan korostettuina, lopuksi koko sana.
// "async" tarkoittaa, että funktio voi odottaa (await) puheen loppumista.
async function lueTavuittain(sana) {
  const tavuElementit = rakennaTavut(sana, false);
  for (let i = 0; i < tavuElementit.length; i++) {
    tavuElementit[i].classList.add("korostus");
    // Odotetaan, kunnes sekä puhe on loppunut että vähimmäisaika on kulunut
    await Promise.all([puhu(sana.tavut[i]), odota(TAVUN_VAHIMMAISAIKA)]);
    tavuElementit[i].classList.remove("korostus");
  }
  tavuElementit.forEach(t => t.classList.add("korostus"));
  await Promise.all([puhu(sana.sana), odota(SANAN_VAHIMMAISAIKA)]);
}

// Kutsutaan, kun lapsi napauttaa kuvaa.
async function valitse(nappi, onOikein) {
  if (lukittu || nappi.disabled) return;

  if (!onOikein) {
    // V-08: heilahdus ja himmennys, sitten saa yrittää uudelleen
    vaaraArvaus = true;
    nappi.classList.add("vaarin");
    nappi.disabled = true;
    return;
  }

  // V-07: korostus, tähdet, tavutettu ääneenluku ja seuraava sana
  lukittu = true;
  nappi.classList.add("oikein");

  const tahdet = laskeTahdet(Date.now() - alkuaika, vaaraArvaus, apuKaytetty);
  kierroksenTahdet += tahdet;
  lisaaTahtia(tahdet); // tallennetaan heti, ettei mitään katoa
  el("tahtilaskuri").textContent = "⭐ " + kierroksenTahdet;
  naytaPalkinto(tahdet);

  await lueTavuittain(oikeaSana);
  await odota(TAUKO_LUKEMISEN_JALKEEN);
  seuraava();
}

function seuraava() {
  nykyinen++;
  if (nykyinen >= SANOJA_KIERROKSELLA) {
    naytaLoppu();
  } else {
    naytaTehtava();
  }
}

// Loppunäyttö: tulos tallennetaan ja näytetään kannustava viesti (V-15, V-24).
function naytaLoppu() {
  const uusiEnnatys = tallennaTulos(kierroksenTahdet);

  const maksimi = SANOJA_KIERROKSELLA * 3;
  let otsikko = "Hyvin luettu!";
  if (kierroksenTahdet >= maksimi * 0.8) otsikko = "Mahtavaa!";
  else if (kierroksenTahdet >= maksimi * 0.5) otsikko = "Hienoa!";

  el("loppu-otsikko").textContent = otsikko;
  el("ennatys").classList.toggle("piilossa", !uusiEnnatys);
  el("kierroksen-tahdet").textContent = kierroksenTahdet;
  el("loppu-kokonais").textContent = pelaajanTahdet();
  naytaNakyma("loppu");
}

// --- Tulostaulu (V-25, V-26) -------------------------------------------

function naytaTulokset() {
  // Parhaat kierrokset taulukkona
  const parhaat = parhaatTulokset(TULOSTAULUN_RIVIT);
  const runko = el("parhaat");
  runko.innerHTML = "";
  const mitalit = ["🥇", "🥈", "🥉"];
  parhaat.forEach((tulos, i) => {
    const rivi = luo("tr");
    if (tulos.nimi === nykyinenPelaaja()) rivi.classList.add("oma");
    rivi.appendChild(luo("td", "sija", mitalit[i] || String(i + 1)));
    rivi.appendChild(luo("td", "nimi", tulos.nimi));
    rivi.appendChild(luo("td", "pvm", paivamaara(tulos.pvm)));
    rivi.appendChild(luo("td", "pisteet", "⭐ " + tulos.tahdet));
    runko.appendChild(rivi);
  });
  el("ei-tuloksia").classList.toggle("piilossa", parhaat.length > 0);

  // Pelaajavalinta kehitykselle, jos pelaajia on useampi
  const valinnat = el("kehitys-pelaajat");
  valinnat.innerHTML = "";
  const nimet = pelaajienNimet();
  if (nimet.length > 1) {
    for (const nimi of nimet) {
      const nappi = luo("button", "pelaaja-nappi pieni", nimi);
      nappi.addEventListener("click", () => naytaKehitys(nimi));
      valinnat.appendChild(nappi);
    }
  }
  naytaKehitys(nykyinenPelaaja());
  naytaNakyma("tulokset");
}

// Pylväskaavio pelaajan viimeisimmistä kierroksista. Pylvään korkeus on
// tähtien osuus maksimista (30). Arvo näytetään paras- ja viimeisimmälle pylväälle.
function naytaKehitys(nimi) {
  document.querySelectorAll("#kehitys-pelaajat .pelaaja-nappi").forEach(n =>
    n.classList.toggle("valittu", n.textContent === nimi)
  );

  const tulokset = viimeisimmatTulokset(nimi, KEHITYKSEN_KIERROKSET);
  const kaavio = el("kehitys");
  kaavio.innerHTML = "";

  if (tulokset.length === 0) {
    el("kehitys-yhteenveto").textContent = nimi + ": ei vielä kierroksia.";
    kaavio.classList.add("piilossa");
    return;
  }

  const maksimi = SANOJA_KIERROKSELLA * 3;
  const paras = Math.max(...tulokset.map(t => t.tahdet));
  const viimeisin = tulokset[tulokset.length - 1].tahdet;
  el("kehitys-yhteenveto").textContent =
    nimi + ": viimeisin ⭐ " + viimeisin + ", paras ⭐ " + parasTulos(nimi);
  kaavio.setAttribute("aria-label",
    nimi + " viimeiset " + tulokset.length + " kierrosta: " + tulokset.map(t => t.tahdet).join(", "));
  kaavio.classList.remove("piilossa");

  let parasMerkitty = false;
  tulokset.forEach((tulos, i) => {
    const sarake = luo("div", "kehitys-sarake");
    sarake.title = paivamaara(tulos.pvm) + ": " + tulos.tahdet + " tähteä";

    const onViimeisin = i === tulokset.length - 1;
    const onParas = tulos.tahdet === paras && !parasMerkitty;
    if (onParas) parasMerkitty = true;

    const arvo = luo("div", "kehitys-arvo", onViimeisin || onParas ? String(tulos.tahdet) : "");
    const alue = luo("div", "kehitys-alue");
    const pylvas = luo("div", "kehitys-pylvas");
    pylvas.style.height = Math.max(2, (tulos.tahdet / maksimi) * 100) + "%";
    alue.appendChild(pylvas);

    const p = new Date(tulos.pvm);
    sarake.appendChild(arvo);
    sarake.appendChild(alue);
    sarake.appendChild(luo("div", "kehitys-pvm", p.getDate() + "." + (p.getMonth() + 1) + "."));
    kaavio.appendChild(sarake);
  });
}

// --- Käynnistys --------------------------------------------------------
el("aloita-nappi").addEventListener("click", aloitaKierros);
el("uudestaan-nappi").addEventListener("click", aloitaKierros);
el("loppu-alkuun").addEventListener("click", naytaAloitus);
el("apu-nappi").addEventListener("click", naytaTavuapu);
el("vaihda-nappi").addEventListener("click", naytaPelaajanValinta);
el("uusi-pelaaja").addEventListener("submit", uusiPelaaja);
el("pelaaja-takaisin").addEventListener("click", naytaAloitus);
el("tulokset-nappi").addEventListener("click", naytaTulokset);
el("tulokset-takaisin").addEventListener("click", naytaAloitus);
kaynnista();
