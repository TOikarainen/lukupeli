# Lukupeli – määrittely (versio 1)

## 1. Tavoite

Sovellus auttaa 5-vuotiasta lasta, joka tuntee kirjaimet, oppimaan lukemaan kokonaisia
suomenkielisiä sanoja. Ensimmäisessä versiossa sanat ovat 4–6-kirjaimisia ja kaksitavuisia
ja ne kirjoitetaan isoilla kirjaimilla.

## 2. Käyttäjät ja käyttötilanne

- **Pääkäyttäjä:** 5-vuotias lapsi. Ei osaa kirjoittaa, lukee isoja kirjaimia.
- **Tukikäyttäjä:** Aikuinen istuu aluksi vieressä, käynnistää pelin ja auttaa tarvittaessa.
- **Laitteet:** iPad (Safari, kosketusnäyttö) ja kehitysvaiheessa Windows-tietokoneen selain.

## 3. Tekninen ratkaisu

- Verkkosivu: HTML (rakenne), CSS (ulkoasu), JavaScript (toiminta).
- Sanalista JSON-tiedostossa, jotta sanoja voi lisätä koodiin koskematta.
- Kuvat ovat emojeita, joten kuvatiedostoja ei tarvita.
- Ääni tulee selaimen omasta puhesynteesistä (suomenkielinen ääni).
- Ei kirjautumista eikä palvelinta. Tiedot tallennetaan vain laitteelle.

## 4. Toiminnalliset vaatimukset

### Aloitus
- **V-01** Aloitusnäytössä on iso "Aloita"-painike ja kerätyt tähdet yhteensä.
- **V-02** Peli koostuu 10 sanan kierroksesta.

### Harjoitus A: Sana ja kuvat
- **V-03** Ruudun yläosassa näkyy yksi sana isoilla kirjaimilla ja suurella fontilla.
- **V-04** Sanan alla on 3 kuvaa (emojia), joista yksi vastaa sanaa. Oikean kuvan paikka arvotaan.
- **V-05** Väärät vaihtoehdot ovat muita listan sanoja. Sama kuva ei esiinny kahdesti samassa tehtävässä.
- **V-06** Sanaa **ei** lausuta automaattisesti, koska tarkoitus on, että lapsi lukee sen itse.
- **V-07** Oikea vastaus: kuva korostuu, sovellus lausuu sanan ääneen, tähdet lisätään ja peli siirtyy seuraavaan sanaan pienen tauon jälkeen.
- **V-08** Väärä vastaus: kuva heilahtaa lyhyesti ja himmenee. Ei rangaistusta, vaan lapsi voi yrittää uudelleen.

### Harjoitus C: Tavuapu
- **V-09** Tehtävänäytössä on "Apua"-painike (esim. 🔊 tai korvan kuva).
- **V-10** Painettaessa sana näytetään tavuihin jaettuna: KA – LA.
- **V-11** Tavua napauttamalla sovellus lausuu sen tavun.
- **V-12** Erillisestä painikkeesta sovellus lausuu koko sanan.

### Pisteytys (tähdet)
- **V-13** Ajanotto alkaa, kun sana tulee näkyviin. Aikaa **ei** näytetä lapselle, ettei tule kiire.
- **V-14** Tähdet sanaa kohden:

  | Tilanne | Tähdet |
  |---|---|
  | Oikein ensimmäisellä yrityksellä, alle 5 s | ⭐⭐⭐ |
  | Oikein ensimmäisellä yrityksellä, 5–10 s | ⭐⭐ |
  | Oikein yli 10 s, väärän arvauksen jälkeen tai tavuavun kanssa | ⭐ |

  Jokaisesta oikeasta vastauksesta saa siis aina vähintään yhden tähden. Avun käyttämisestä ei rangaista.
- **V-15** Kierroksen lopussa näytetään kierroksen tähdet ja kannustava viesti.
- **V-16** Kokonaistähdet tallentuvat laitteelle ja säilyvät, vaikka sivu suljetaan.

### Yleistä
- **V-17** Kaikki painikkeet ja kuvat ovat isoja ja helppoja napauttaa sormella.
- **V-18** Sovellus toimii iPadilla vaaka- ja pystyasennossa.
- **V-19** Jos laitteessa ei ole suomenkielistä ääntä, peli toimii silti ilman ääntä.

## 5. Sanalista (50 sanaa)

Lapsen lempiaiheet ovat maatila, työkoneet ja työkalut.

**Taso** kertoo sanan vaikeuden:
- **1** = helppo: pelkkiä lyhyitä avotavuja (KA-LA, SA-HA)
- **2** = vaikeampi: sanassa on kaksoiskonsonantti (KIS-SA), pitkä vokaali (HII-RI) tai diftongi (AU-TO, KOI-RA)

Versiossa 1 kaikki sanat arvotaan samasta joukosta. Taso ja aihe tallennetaan jo nyt, jotta
myöhemmin voi tehdä vaikeustasot ja aihevalinnan.

### Maatila (13)
| Sana | Tavut | Kuva | Taso |
|---|---|---|---|
| KANA | KA-NA | 🐔 | 1 |
| TIPU | TI-PU | 🐤 | 1 |
| MUNA | MU-NA | 🥚 | 1 |
| LEHMÄ | LEH-MÄ | 🐄 | 2 |
| POSSU | POS-SU | 🐷 | 2 |
| LAMMAS | LAM-MAS | 🐑 | 2 |
| VUOHI | VUO-HI | 🐐 | 2 |
| HEPPA | HEP-PA | 🐴 | 2 |
| ANKKA | ANK-KA | 🦆 | 2 |
| MAISSI | MAIS-SI | 🌽 | 2 |
| VILJA | VIL-JA | 🌾 | 2 |
| KURKKU | KURK-KU | 🥒 | 2 |
| KAALI | KAA-LI | 🥬 | 2 |

### Ajoneuvot ja koneet (9)
| Sana | Tavut | Kuva | Taso |
|---|---|---|---|
| JUNA | JU-NA | 🚆 | 1 |
| MOPO | MO-PO | 🛵 | 1 |
| VENE | VE-NE | ⛵ | 1 |
| AUTO | AU-TO | 🚗 | 2 |
| LAIVA | LAI-VA | 🚢 | 2 |
| REKKA | REK-KA | 🚛 | 2 |
| BUSSI | BUS-SI | 🚌 | 2 |
| PYÖRÄ | PYÖ-RÄ | 🚲 | 2 |
| KELKKA | KELK-KA | 🛷 | 2 |

### Työkalut (12)
| Sana | Tavut | Kuva | Taso |
|---|---|---|---|
| KYNÄ | KY-NÄ | ✏️ | 1 |
| KIRVES | KIR-VES | 🪓 | 2 |
| RUUVI | RUU-VI | 🔩 | 2 |
| AVAIN | A-VAIN | 🔑 | 2 |
| SAKSET | SAK-SET | ✂️ | 2 |
| LUKKO | LUK-KO | 🔒 | 2 |
| LUUTA | LUU-TA | 🧹 | 2 |
| VAAKA | VAA-KA | ⚖️ | 2 |
| HAKKU | HAK-KU | ⛏️ | 2 |
| TIILI | TII-LI | 🧱 | 2 |
| KETJU | KET-JU | 🔗 | 2 |
| LANKA | LAN-KA | 🧵 | 2 |

### Eläimet (7)
| Sana | Tavut | Kuva | Taso |
|---|---|---|---|
| KALA | KA-LA | 🐟 | 1 |
| PUPU | PU-PU | 🐰 | 1 |
| KISSA | KIS-SA | 🐱 | 2 |
| KARHU | KAR-HU | 🐻 | 2 |
| HIIRI | HII-RI | 🐭 | 2 |
| KOIRA | KOI-RA | 🐶 | 2 |
| KUKKA | KUK-KA | 🌸 | 2 |

### Koti ja arki (9)
| Sana | Tavut | Kuva | Taso |
|---|---|---|---|
| TALO | TA-LO | 🏠 | 1 |
| PALLO | PAL-LO | ⚽ | 2 |
| SUKKA | SUK-KA | 🧦 | 2 |
| KELLO | KEL-LO | ⏰ | 2 |
| NALLE | NAL-LE | 🧸 | 2 |
| KIRJA | KIR-JA | 📖 | 2 |
| KENKÄ | KEN-KÄ | 👟 | 2 |
| MAITO | MAI-TO | 🥛 | 2 |
| LEIPÄ | LEI-PÄ | 🍞 | 2 |

**Huomioita sanavalinnoista:**
- Monet aiheen tärkeimmistä sanoista ovat kolmitavuisia: TRAKTORI 🚜, KAIVURI, NOSTURI, VASARA 🔨, LAPIO, HARAVA. Ne sopivat seuraavalle vaikeustasolle.
- Mukaan ei otettu sanoja, joiden kuva sekoittuisi toiseen (esim. KUKKO 🐓 ja KANA 🐔, TAKSI 🚕 ja AUTO 🚗).
- Uudemmat emojit eivät näy Windows 10:ssä (testauksessa havaittu). Siksi SAHA, SANKO, KÖYSI ja NEULA
  korvattiin sanoilla HAKKU, TIILI, KETJU ja LANKA. Uusia sanoja lisättäessä kuva pitää tarkistaa sekä
  tietokoneella että iPadilla.

## 6. Rajaukset (ei kuulu versioon 1)

- Pienet kirjaimet
- Kolmi- ja useampitavuiset sanat
- Vaikeustasot
- Harjoitukset B (kuva ja sanat) ja D (lue ääneen aikuiselle)
- Useampi pelaaja tai profiili
- Aikuisen asetusnäkymä (esim. sanojen valinta)

## 7. Avoimet kysymykset

- Ovatko aikarajat (5 s ja 10 s) sopivat? Tarkistetaan testauksessa lapsen kanssa.

## 8. Hyväksymiskriteerit (versio 1 valmis, kun)

1. Aikuinen saa avattua pelin iPadilla ja lapsi pelaa 10 sanan kierroksen loppuun.
2. Kaikki vaatimukset V-01…V-19 on testattu.
3. Lapsi ymmärtää aikuisen lyhyen opastuksen jälkeen, mitä pitää tehdä.
