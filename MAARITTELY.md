# Lukupeli – määrittely (versio 2)

## Muutoshistoria

| Versio | Päivä | Muutokset |
|---|---|---|
| 1 | 23.11.2026 | Ensimmäinen versio: harjoitus A, tavuapu, tähdet |
| 2 | 26.11.2026 | 100 sanaa (joista 10 kolmitavuista), 6 kuvavaihtoehtoa, väärä arvaus = 0 tähteä, pelaajat ja tulostaulu, tavutettu ääneenluku korostuksella, selkeämpi fontti |

Muutetut vaatimukset on merkitty **(v2)**, uudet **(uusi v2)**. Vaatimusnumerot pysyvät samoina, jotta
testitapaukset voi jäljittää versiosta toiseen.

## 1. Tavoite

Sovellus auttaa 5-vuotiasta lasta, joka tuntee kirjaimet, oppimaan lukemaan kokonaisia
suomenkielisiä sanoja. Sanat ovat pääosin 4–6-kirjaimisia ja kaksitavuisia, ja mukana on
10 kolmitavuista sanaa. Kaikki sanat kirjoitetaan isoilla kirjaimilla.

## 2. Käyttäjät ja käyttötilanne

- **Pääkäyttäjä:** 5-vuotias lapsi. Ei osaa kirjoittaa, lukee isoja kirjaimia.
- **Tukikäyttäjä:** Aikuinen istuu aluksi vieressä, syöttää pelaajan nimen ja auttaa tarvittaessa.
- **Laitteet:** iPad (Safari, kotivalikkoon lisättynä) ja Windows-tietokoneen selain.

## 3. Tekninen ratkaisu

- Verkkosivu: HTML (rakenne), CSS (ulkoasu), JavaScript (toiminta). Julkaistu GitHub Pagesissa.
- Sanalista tiedostossa `sanat.js` (JSON-muotoinen).
- Kuvat ovat emojeita. Jokaisen kuvan on näyttävä sekä Windows 10:ssä että iPadilla.
- Ääni tulee selaimen omasta puhesynteesistä (suomenkielinen ääni).
- Ei kirjautumista eikä palvelinta. Pelaajat, tähdet ja tulokset tallennetaan laitteelle (localStorage).

### Pelaajan tunnistaminen
Pelaaja tunnistetaan **laitteen** perusteella: laite muistaa, kuka pelasi viimeksi.
IP-osoitetta ei voi käyttää, koska:
- sivulla ei ole palvelinta, joka näkisi IP-osoitteen, ja
- kaikilla kodin laitteilla on sama julkinen IP-osoite, joka myös vaihtuu ajoittain.

**Rajoitukset, jotka on hyvä tietää:**
- Pelaajat ja tulokset näkyvät vain sillä laitteella, jolla on pelattu.
- iPadissa kotivalikkoon lisätyllä pelillä ja Safari-välilehdellä on **eri muisti**. Pelaa aina samasta paikasta.
- Laitteiden yhteinen tulostaulu vaatisi palvelimen (ks. rajaukset).

## 4. Toiminnalliset vaatimukset

### Pelaaja ja aloitus
- **V-01 (v2)** Aloitusnäytössä on iso "Aloita"-painike, tervehdys pelaajan nimellä ja pelaajan kerätyt tähdet.
- **V-21 (uusi v2)** Laite muistaa viimeksi pelanneen pelaajan.
- **V-22 (uusi v2)** Jos laitteella ei ole yhtään pelaajaa, pelaajan nimi kysytään ennen ensimmäistä peliä.
- **V-23 (uusi v2)** Aloitusnäytössä on "Vaihda pelaaja" -painike, josta voi valita aiemman pelaajan tai lisätä uuden. Nimi on 1–20 merkkiä. Isot ja pienet kirjaimet eivät erota pelaajia (Eetu = EETU).
- **V-02** Peli koostuu 10 sanan kierroksesta.

### Harjoitus A: Sana ja kuvat
- **V-03** Ruudun yläosassa näkyy yksi sana isoilla kirjaimilla ja suurella fontilla.
- **V-04 (v2)** Sanan alla on **6 kuvaa** ruudukossa, joista yksi vastaa sanaa. Oikean kuvan paikka arvotaan.
- **V-05 (v2)** Väärät vaihtoehdot ovat muita listan sanoja. Sama kuva ei esiinny kahdesti. Väärä vaihtoehto ei ole samasta **sekoittuvien kuvien ryhmästä** kuin oikea sana (esim. KARHU 🐻 ja NALLE 🧸 eivät ole samassa tehtävässä).
- **V-06** Sanaa **ei** lausuta ennen vastausta, koska tarkoitus on, että lapsi lukee sen itse.
- **V-07 (v2)** Oikea vastaus: kuva korostuu, tähdet lisätään, sana näytetään tavuina ja luetaan ääneen (V-28). Sen jälkeen peli siirtyy seuraavaan sanaan.
- **V-28 (uusi v2)** Tavutettu ääneenluku: tavut luetaan yksi kerrallaan, ja luettava tavu korostetaan. Lopuksi luetaan koko sana, ja kaikki tavut korostetaan. Jos ääntä ei ole, korostus etenee ajastettuna.
- **V-08** Väärä vastaus: kuva heilahtaa lyhyesti ja himmenee. Lapsi voi yrittää uudelleen.

### Harjoitus C: Tavuapu
- **V-09** Tehtävänäytössä on "Apua"-painike.
- **V-10** Painettaessa sana näytetään tavuihin jaettuna: KA – LA.
- **V-11** Tavua napauttamalla sovellus lausuu sen tavun.
- **V-12** Erillisestä painikkeesta sovellus lausuu koko sanan.

### Pisteytys (tähdet)
- **V-13** Ajanotto alkaa, kun sana tulee näkyviin. Aikaa **ei** näytetä lapselle.
- **V-14 (v2)** Tähdet sanaa kohden:

  | Tilanne | Tähdet |
  |---|---|
  | Yksikin väärä arvaus | 0 |
  | Tavuapu käytössä, ei vääriä arvauksia | ⭐ |
  | Oikein ilman apua, yli 10 s | ⭐ |
  | Oikein ilman apua, 5–10 s | ⭐⭐ |
  | Oikein ilman apua, alle 5 s | ⭐⭐⭐ |

  Arvaaminen ei siis kannata, mutta avun käyttämisestä saa silti tähden. Kierroksen maksimi on 30 tähteä.
- **V-15 (v2)** Kierroksen lopussa näytetään kierroksen tähdet ja kannustava viesti. Jos tulos on pelaajan uusi ennätys, siitä kerrotaan.
- **V-16 (v2)** Kerätyt tähdet tallennetaan pelaajakohtaisesti laitteelle. Version 1 tähdet siirtyvät laitteen ensimmäiselle pelaajalle.

### Tulostaulu
- **V-24 (uusi v2)** Jokaisesta loppuun pelatusta kierroksesta tallennetaan pelaajan nimi, päivämäärä ja tähdet.
- **V-25 (uusi v2)** Aloitusnäytön "🏆 Tulokset" -painike avaa tulostaulun, jossa on laitteen 10 parasta kierrosta (sija, nimi, päivämäärä, tähdet). Tasatuloksissa aiemmin saavutettu on ylempänä.
- **V-26 (uusi v2)** Tulostaulussa näkyy valitun pelaajan kehitys: 10 viimeisintä kierrosta pylväinä. Pelaajan voi valita, jos pelaajia on useampi.
- **V-27 (uusi v2)** Kesken jätetty kierros ei tallennu tulostauluun. Sen aikana ansaitut tähdet jäävät kuitenkin kokonaismäärään.

### Yleistä
- **V-17** Kaikki painikkeet ja kuvat ovat isoja ja helppoja napauttaa sormella.
- **V-18** Sovellus toimii iPadilla vaaka- ja pystyasennossa.
- **V-19** Jos laitteessa ei ole suomenkielistä ääntä, peli toimii silti.
- **V-20 (uusi v2)** Fonttina on Andika, joka on suunniteltu lukemaan opetteleville. Jos fontti ei lataudu (esim. ei verkkoyhteyttä), käytetään laitteen omaa fonttia.

## 5. Sanalista (100 sanaa)

Sanalista on tiedostossa `sanat.js`. Se on listan **ainoa virallinen lähde**, joten sanoja ei toisteta tässä.

**Taso** kertoo sanan vaikeuden:
- **1** = kaksitavuinen, pelkkiä lyhyitä avotavuja (KA-LA, MA-TO), 17 sanaa
- **2** = kaksitavuinen, jossa on kaksoiskonsonantti, pitkä vokaali tai diftongi (KIS-SA, HII-RI, AU-TO), 73 sanaa
- **3** = kolmitavuinen (TRAK-TO-RI, VA-SA-RA), 10 sanaa

Versiossa 2 kaikki sanat arvotaan samasta joukosta.

**Aiheet:** maatila 18, eläimet 18, työkalut 13, ajoneuvot 12, koti 11, luonto 9, vaatteet 8, ruoka 7, keho 4.

**Sekoittuvien kuvien ryhmät** (kentässä `ryhma`): sanat, joiden kuvat näyttävät pienellä
ruudulla toisiltaan, eivät ole samassa tehtävässä oikeana ja vääränä vaihtoehtona:
- hevonen: HEPPA, SEEPRA
- karhu: KARHU, PANDA, NALLE
- koira: KOIRA, KETTU
- kanalintu: KANA, TIPU, KALKKUNA
- isku: HAKKU, VASARA
- vihannes: KURKKU, KAALI
- vaate: PAITA, TAKKI
- kala: KALA, VALAS
- kuorma: REKKA, TRAKTORI

**Huomioita:**
- Uudemmat emojit eivät näy Windows 10:ssä. Siksi SAHA, SANKO, KÖYSI ja NEULA korvattiin versiossa 1. Uuden sanan kuva pitää tarkistaa sekä tietokoneella että iPadilla.
- 👂 (KORVA) ja ⭐ (TÄHTI) jätettiin pois, koska ne ovat käytössä pelin painikkeissa ja pisteissä.

## 6. Rajaukset (ei kuulu versioon 2)

- Laitteiden yhteinen tulostaulu (vaatisi palvelimen ja lapsen nimen tallentamisen verkkoon)
- Vaikeustason tai aiheen valinta
- Pienet kirjaimet
- Harjoitukset B (kuva ja sanat) ja D (lue ääneen aikuiselle)
- Pelaajan tai tulosten poistaminen
- Aikuisen asetusnäkymä

## 7. Avoimet kysymykset

- Ovatko aikarajat (5 s ja 10 s) sopivat, kun vaihtoehtoja on 6?
- Kuulostavatko yksittäiset tavut (esim. "kurk", "kalk") puhesynteesillä luontevilta?

## 8. Hyväksymiskriteerit (versio 2 valmis, kun)

1. Uusi pelaaja voi syöttää nimensä ja pelata 10 sanan kierroksen loppuun iPadilla.
2. Tulos näkyy tulostaulussa ja kehityksessä nimen ja päivämäärän kanssa.
3. Kaikki vaatimukset V-01…V-28 on testattu.
