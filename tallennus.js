// TALLENNUS: pelaajat, tähdet ja tulokset laitteen muistissa (localStorage).
// Kaikki tieto on yhdessä JSON-oliossa, joka näyttää tältä:
//
//   {
//     "versio": 2,
//     "nykyinen": "Eetu",                          <- viimeksi pelannut (V-21)
//     "pelaajat": { "Eetu": { "tahdetYhteensa": 125 } },
//     "tulokset": [ { "nimi": "Eetu", "pvm": "2026-11-26T09:15:00.000Z", "tahdet": 24 } ]
//   }

const TALLENNUSAVAIN = "lukupeli.data";
const VANHA_AVAIN = "lukupeli.tahdetYhteensa"; // versio 1:n tallennus
const NIMEN_PITUUS = 20;
const TULOKSIA_ENINTAAN = 500; // vanhimmat poistetaan, ettei muisti täyty

let data = lataaData();

function tyhjaData() {
  return { versio: 2, nykyinen: null, pelaajat: {}, tulokset: [] };
}

// Luetaan tallennus. Jos sitä ei ole tai se on rikki, aloitetaan tyhjästä.
function lataaData() {
  try {
    const teksti = localStorage.getItem(TALLENNUSAVAIN);
    if (teksti) {
      const luettu = JSON.parse(teksti);
      if (luettu && luettu.versio === 2) return luettu;
    }
  } catch (virhe) {
    // Tallennus ei ole käytettävissä (esim. yksityinen selaus)
  }
  return tyhjaData();
}

function tallennaData() {
  try {
    localStorage.setItem(TALLENNUSAVAIN, JSON.stringify(data));
  } catch (virhe) {
    // Tallennus ei onnistunut. Peli jatkuu silti normaalisti.
  }
}

// --- Pelaajat ----------------------------------------------------------

function nykyinenPelaaja() {
  return data.nykyinen;
}

// Pelaajien nimet aakkosjärjestyksessä.
function pelaajienNimet() {
  return Object.keys(data.pelaajat).sort((a, b) => a.localeCompare(b, "fi"));
}

// Valitsee pelaajan. Jos nimeä ei ole, luodaan uusi pelaaja (V-22, V-23).
// Palauttaa false, jos nimi on tyhjä.
function valitsePelaaja(syotetty) {
  const nimi = syotetty.trim().slice(0, NIMEN_PITUUS);
  if (!nimi) return false;

  // Isot ja pienet kirjaimet eivät erota pelaajia: "eetu" löytää pelaajan "Eetu"
  const olemassa = pelaajienNimet().find(n => n.toLowerCase() === nimi.toLowerCase());
  if (olemassa) {
    data.nykyinen = olemassa;
  } else {
    data.pelaajat[nimi] = { tahdetYhteensa: siirraVanhatTahdet() };
    data.nykyinen = nimi;
  }
  tallennaData();
  return true;
}

// V-16: version 1 tähdet siirretään laitteen ensimmäiselle pelaajalle.
function siirraVanhatTahdet() {
  try {
    const vanhat = parseInt(localStorage.getItem(VANHA_AVAIN), 10) || 0;
    localStorage.removeItem(VANHA_AVAIN);
    return vanhat;
  } catch (virhe) {
    return 0;
  }
}

// --- Tähdet ------------------------------------------------------------

function pelaajanTahdet() {
  const pelaaja = data.pelaajat[data.nykyinen];
  return pelaaja ? pelaaja.tahdetYhteensa : 0;
}

// Tähdet lisätään heti, joten keskeytetyn kierroksen tähdet säilyvät (V-27).
function lisaaTahtia(maara) {
  const pelaaja = data.pelaajat[data.nykyinen];
  if (!pelaaja) return;
  pelaaja.tahdetYhteensa += maara;
  tallennaData();
}

// --- Tulokset ----------------------------------------------------------

// Pelaajan paras kierros, tai null jos kierroksia ei ole.
function parasTulos(nimi) {
  const omat = data.tulokset.filter(t => t.nimi === nimi);
  return omat.length ? Math.max(...omat.map(t => t.tahdet)) : null;
}

// Tallentaa loppuun pelatun kierroksen (V-24).
// Palauttaa true, jos tulos on pelaajan uusi ennätys (V-15).
function tallennaTulos(tahdet) {
  const aiempiParas = parasTulos(data.nykyinen);
  data.tulokset.push({ nimi: data.nykyinen, pvm: new Date().toISOString(), tahdet: tahdet });
  if (data.tulokset.length > TULOKSIA_ENINTAAN) {
    data.tulokset = data.tulokset.slice(-TULOKSIA_ENINTAAN);
  }
  tallennaData();
  return aiempiParas !== null && tahdet > aiempiParas;
}

// Laitteen parhaat kierrokset. Tasatuloksissa aiempi ensin (V-25).
function parhaatTulokset(maara) {
  return [...data.tulokset]
    .sort((a, b) => b.tahdet - a.tahdet || a.pvm.localeCompare(b.pvm))
    .slice(0, maara);
}

// Pelaajan viimeisimmät kierrokset vanhimmasta uusimpaan (V-26).
function viimeisimmatTulokset(nimi, maara) {
  return data.tulokset
    .filter(t => t.nimi === nimi)
    .sort((a, b) => a.pvm.localeCompare(b.pvm))
    .slice(-maara);
}
