// SANALISTA
// Jokainen sana on yksi rivi. Muoto on JSON:ia, joten voit lisätä sanoja
// kopioimalla rivin ja muuttamalla arvot. Muista pilkku rivin loppuun.
//
//   sana  = sana isoilla kirjaimilla
//   tavut = sana tavuihin jaettuna (käytetään tavuavussa)
//   kuva  = emoji
//   aihe  = aihepiiri (käytetään myöhemmin aihevalinnassa)
//   taso  = 1 helppo, 2 vaikeampi (käytetään myöhemmin vaikeustasoissa)

const SANAT = [
  // Maatila
  { "sana": "KANA",   "tavut": ["KA", "NA"],    "kuva": "🐔", "aihe": "maatila", "taso": 1 },
  { "sana": "TIPU",   "tavut": ["TI", "PU"],    "kuva": "🐤", "aihe": "maatila", "taso": 1 },
  { "sana": "MUNA",   "tavut": ["MU", "NA"],    "kuva": "🥚", "aihe": "maatila", "taso": 1 },
  { "sana": "LEHMÄ",  "tavut": ["LEH", "MÄ"],   "kuva": "🐄", "aihe": "maatila", "taso": 2 },
  { "sana": "POSSU",  "tavut": ["POS", "SU"],   "kuva": "🐷", "aihe": "maatila", "taso": 2 },
  { "sana": "LAMMAS", "tavut": ["LAM", "MAS"],  "kuva": "🐑", "aihe": "maatila", "taso": 2 },
  { "sana": "VUOHI",  "tavut": ["VUO", "HI"],   "kuva": "🐐", "aihe": "maatila", "taso": 2 },
  { "sana": "HEPPA",  "tavut": ["HEP", "PA"],   "kuva": "🐴", "aihe": "maatila", "taso": 2 },
  { "sana": "ANKKA",  "tavut": ["ANK", "KA"],   "kuva": "🦆", "aihe": "maatila", "taso": 2 },
  { "sana": "MAISSI", "tavut": ["MAIS", "SI"],  "kuva": "🌽", "aihe": "maatila", "taso": 2 },
  { "sana": "VILJA",  "tavut": ["VIL", "JA"],   "kuva": "🌾", "aihe": "maatila", "taso": 2 },
  { "sana": "KURKKU", "tavut": ["KURK", "KU"],  "kuva": "🥒", "aihe": "maatila", "taso": 2 },
  { "sana": "KAALI",  "tavut": ["KAA", "LI"],   "kuva": "🥬", "aihe": "maatila", "taso": 2 },

  // Ajoneuvot ja koneet
  { "sana": "JUNA",   "tavut": ["JU", "NA"],    "kuva": "🚆", "aihe": "ajoneuvot", "taso": 1 },
  { "sana": "MOPO",   "tavut": ["MO", "PO"],    "kuva": "🛵", "aihe": "ajoneuvot", "taso": 1 },
  { "sana": "VENE",   "tavut": ["VE", "NE"],    "kuva": "⛵", "aihe": "ajoneuvot", "taso": 1 },
  { "sana": "AUTO",   "tavut": ["AU", "TO"],    "kuva": "🚗", "aihe": "ajoneuvot", "taso": 2 },
  { "sana": "LAIVA",  "tavut": ["LAI", "VA"],   "kuva": "🚢", "aihe": "ajoneuvot", "taso": 2 },
  { "sana": "REKKA",  "tavut": ["REK", "KA"],   "kuva": "🚛", "aihe": "ajoneuvot", "taso": 2 },
  { "sana": "BUSSI",  "tavut": ["BUS", "SI"],   "kuva": "🚌", "aihe": "ajoneuvot", "taso": 2 },
  { "sana": "PYÖRÄ",  "tavut": ["PYÖ", "RÄ"],   "kuva": "🚲", "aihe": "ajoneuvot", "taso": 2 },
  { "sana": "KELKKA", "tavut": ["KELK", "KA"],  "kuva": "🛷", "aihe": "ajoneuvot", "taso": 2 },

  // Työkalut
  { "sana": "SAHA",   "tavut": ["SA", "HA"],    "kuva": "🪚", "aihe": "tyokalut", "taso": 1 },
  { "sana": "KYNÄ",   "tavut": ["KY", "NÄ"],    "kuva": "✏️", "aihe": "tyokalut", "taso": 1 },
  { "sana": "KIRVES", "tavut": ["KIR", "VES"],  "kuva": "🪓", "aihe": "tyokalut", "taso": 2 },
  { "sana": "RUUVI",  "tavut": ["RUU", "VI"],   "kuva": "🔩", "aihe": "tyokalut", "taso": 2 },
  { "sana": "AVAIN",  "tavut": ["A", "VAIN"],   "kuva": "🔑", "aihe": "tyokalut", "taso": 2 },
  { "sana": "SAKSET", "tavut": ["SAK", "SET"],  "kuva": "✂️", "aihe": "tyokalut", "taso": 2 },
  { "sana": "LUKKO",  "tavut": ["LUK", "KO"],   "kuva": "🔒", "aihe": "tyokalut", "taso": 2 },
  { "sana": "SANKO",  "tavut": ["SAN", "KO"],   "kuva": "🪣", "aihe": "tyokalut", "taso": 2 },
  { "sana": "LUUTA",  "tavut": ["LUU", "TA"],   "kuva": "🧹", "aihe": "tyokalut", "taso": 2 },
  { "sana": "KÖYSI",  "tavut": ["KÖY", "SI"],   "kuva": "🪢", "aihe": "tyokalut", "taso": 2 },
  { "sana": "VAAKA",  "tavut": ["VAA", "KA"],   "kuva": "⚖️", "aihe": "tyokalut", "taso": 2 },
  { "sana": "NEULA",  "tavut": ["NEU", "LA"],   "kuva": "🪡", "aihe": "tyokalut", "taso": 2 },

  // Eläimet
  { "sana": "KALA",   "tavut": ["KA", "LA"],    "kuva": "🐟", "aihe": "elaimet", "taso": 1 },
  { "sana": "PUPU",   "tavut": ["PU", "PU"],    "kuva": "🐰", "aihe": "elaimet", "taso": 1 },
  { "sana": "KISSA",  "tavut": ["KIS", "SA"],   "kuva": "🐱", "aihe": "elaimet", "taso": 2 },
  { "sana": "KARHU",  "tavut": ["KAR", "HU"],   "kuva": "🐻", "aihe": "elaimet", "taso": 2 },
  { "sana": "HIIRI",  "tavut": ["HII", "RI"],   "kuva": "🐭", "aihe": "elaimet", "taso": 2 },
  { "sana": "KOIRA",  "tavut": ["KOI", "RA"],   "kuva": "🐶", "aihe": "elaimet", "taso": 2 },
  { "sana": "KUKKA",  "tavut": ["KUK", "KA"],   "kuva": "🌸", "aihe": "elaimet", "taso": 2 },

  // Koti ja arki
  { "sana": "TALO",   "tavut": ["TA", "LO"],    "kuva": "🏠", "aihe": "koti", "taso": 1 },
  { "sana": "PALLO",  "tavut": ["PAL", "LO"],   "kuva": "⚽", "aihe": "koti", "taso": 2 },
  { "sana": "SUKKA",  "tavut": ["SUK", "KA"],   "kuva": "🧦", "aihe": "koti", "taso": 2 },
  { "sana": "KELLO",  "tavut": ["KEL", "LO"],   "kuva": "⏰", "aihe": "koti", "taso": 2 },
  { "sana": "NALLE",  "tavut": ["NAL", "LE"],   "kuva": "🧸", "aihe": "koti", "taso": 2 },
  { "sana": "KIRJA",  "tavut": ["KIR", "JA"],   "kuva": "📖", "aihe": "koti", "taso": 2 },
  { "sana": "KENKÄ",  "tavut": ["KEN", "KÄ"],   "kuva": "👟", "aihe": "koti", "taso": 2 },
  { "sana": "MAITO",  "tavut": ["MAI", "TO"],   "kuva": "🥛", "aihe": "koti", "taso": 2 },
  { "sana": "LEIPÄ",  "tavut": ["LEI", "PÄ"],   "kuva": "🍞", "aihe": "koti", "taso": 2 }
];
