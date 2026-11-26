// SANALISTA (100 sanaa)
// Jokainen sana on yksi rivi. Muoto on JSON:ia, joten voit lisätä sanoja
// kopioimalla rivin ja muuttamalla arvot. Muista pilkku rivin loppuun.
//
//   sana  = sana isoilla kirjaimilla
//   tavut = sana tavuihin jaettuna (tavuapu ja ääneenluku)
//   kuva  = emoji (tarkista, että näkyy Windows 10:ssä ja iPadilla)
//   aihe  = aihepiiri
//   taso  = 1 helppo, 2 vaikeampi, 3 kolmitavuinen
//   ryhma = (valinnainen) sekoittuvien kuvien ryhmä: saman ryhmän sanat
//           eivät ole samassa tehtävässä

const SANAT = [
  // Maatila
  { "sana": "KANA",     "tavut": ["KA", "NA"],          "kuva": "🐔", "aihe": "maatila", "taso": 1, "ryhma": "kanalintu" },
  { "sana": "TIPU",     "tavut": ["TI", "PU"],          "kuva": "🐤", "aihe": "maatila", "taso": 1, "ryhma": "kanalintu" },
  { "sana": "MUNA",     "tavut": ["MU", "NA"],          "kuva": "🥚", "aihe": "maatila", "taso": 1 },
  { "sana": "LEHMÄ",    "tavut": ["LEH", "MÄ"],         "kuva": "🐄", "aihe": "maatila", "taso": 2 },
  { "sana": "POSSU",    "tavut": ["POS", "SU"],         "kuva": "🐷", "aihe": "maatila", "taso": 2 },
  { "sana": "LAMMAS",   "tavut": ["LAM", "MAS"],        "kuva": "🐑", "aihe": "maatila", "taso": 2 },
  { "sana": "VUOHI",    "tavut": ["VUO", "HI"],         "kuva": "🐐", "aihe": "maatila", "taso": 2 },
  { "sana": "HEPPA",    "tavut": ["HEP", "PA"],         "kuva": "🐴", "aihe": "maatila", "taso": 2, "ryhma": "hevonen" },
  { "sana": "ANKKA",    "tavut": ["ANK", "KA"],         "kuva": "🦆", "aihe": "maatila", "taso": 2 },
  { "sana": "MAISSI",   "tavut": ["MAIS", "SI"],        "kuva": "🌽", "aihe": "maatila", "taso": 2 },
  { "sana": "VILJA",    "tavut": ["VIL", "JA"],         "kuva": "🌾", "aihe": "maatila", "taso": 2 },
  { "sana": "KURKKU",   "tavut": ["KURK", "KU"],        "kuva": "🥒", "aihe": "maatila", "taso": 2, "ryhma": "vihannes" },
  { "sana": "KAALI",    "tavut": ["KAA", "LI"],         "kuva": "🥬", "aihe": "maatila", "taso": 2, "ryhma": "vihannes" },
  { "sana": "PERUNA",   "tavut": ["PE", "RU", "NA"],    "kuva": "🥔", "aihe": "maatila", "taso": 3 },
  { "sana": "PORKKANA", "tavut": ["PORK", "KA", "NA"],  "kuva": "🥕", "aihe": "maatila", "taso": 3 },
  { "sana": "OMENA",    "tavut": ["O", "ME", "NA"],     "kuva": "🍎", "aihe": "maatila", "taso": 3 },
  { "sana": "MANSIKKA", "tavut": ["MAN", "SIK", "KA"],  "kuva": "🍓", "aihe": "maatila", "taso": 3 },
  { "sana": "KALKKUNA", "tavut": ["KALK", "KU", "NA"],  "kuva": "🦃", "aihe": "maatila", "taso": 3, "ryhma": "kanalintu" },

  // Ajoneuvot ja koneet
  { "sana": "JUNA",     "tavut": ["JU", "NA"],          "kuva": "🚆", "aihe": "ajoneuvot", "taso": 1 },
  { "sana": "MOPO",     "tavut": ["MO", "PO"],          "kuva": "🛵", "aihe": "ajoneuvot", "taso": 1 },
  { "sana": "VENE",     "tavut": ["VE", "NE"],          "kuva": "⛵", "aihe": "ajoneuvot", "taso": 1 },
  { "sana": "AUTO",     "tavut": ["AU", "TO"],          "kuva": "🚗", "aihe": "ajoneuvot", "taso": 2 },
  { "sana": "LAIVA",    "tavut": ["LAI", "VA"],         "kuva": "🚢", "aihe": "ajoneuvot", "taso": 2 },
  { "sana": "REKKA",    "tavut": ["REK", "KA"],         "kuva": "🚛", "aihe": "ajoneuvot", "taso": 2, "ryhma": "kuorma" },
  { "sana": "BUSSI",    "tavut": ["BUS", "SI"],         "kuva": "🚌", "aihe": "ajoneuvot", "taso": 2 },
  { "sana": "PYÖRÄ",    "tavut": ["PYÖ", "RÄ"],         "kuva": "🚲", "aihe": "ajoneuvot", "taso": 2 },
  { "sana": "KELKKA",   "tavut": ["KELK", "KA"],        "kuva": "🛷", "aihe": "ajoneuvot", "taso": 2 },
  { "sana": "TRAKTORI", "tavut": ["TRAK", "TO", "RI"],  "kuva": "🚜", "aihe": "ajoneuvot", "taso": 3, "ryhma": "kuorma" },
  { "sana": "RAKETTI",  "tavut": ["RA", "KET", "TI"],   "kuva": "🚀", "aihe": "ajoneuvot", "taso": 3 },
  { "sana": "KOPTERI",  "tavut": ["KOP", "TE", "RI"],   "kuva": "🚁", "aihe": "ajoneuvot", "taso": 3 },

  // Työkalut
  { "sana": "KYNÄ",     "tavut": ["KY", "NÄ"],          "kuva": "✏️", "aihe": "tyokalut", "taso": 1 },
  { "sana": "KIRVES",   "tavut": ["KIR", "VES"],        "kuva": "🪓", "aihe": "tyokalut", "taso": 2 },
  { "sana": "RUUVI",    "tavut": ["RUU", "VI"],         "kuva": "🔩", "aihe": "tyokalut", "taso": 2 },
  { "sana": "AVAIN",    "tavut": ["A", "VAIN"],         "kuva": "🔑", "aihe": "tyokalut", "taso": 2 },
  { "sana": "SAKSET",   "tavut": ["SAK", "SET"],        "kuva": "✂️", "aihe": "tyokalut", "taso": 2 },
  { "sana": "LUKKO",    "tavut": ["LUK", "KO"],         "kuva": "🔒", "aihe": "tyokalut", "taso": 2 },
  { "sana": "LUUTA",    "tavut": ["LUU", "TA"],         "kuva": "🧹", "aihe": "tyokalut", "taso": 2 },
  { "sana": "VAAKA",    "tavut": ["VAA", "KA"],         "kuva": "⚖️", "aihe": "tyokalut", "taso": 2 },
  { "sana": "HAKKU",    "tavut": ["HAK", "KU"],         "kuva": "⛏️", "aihe": "tyokalut", "taso": 2, "ryhma": "isku" },
  { "sana": "TIILI",    "tavut": ["TII", "LI"],         "kuva": "🧱", "aihe": "tyokalut", "taso": 2 },
  { "sana": "KETJU",    "tavut": ["KET", "JU"],         "kuva": "🔗", "aihe": "tyokalut", "taso": 2 },
  { "sana": "LANKA",    "tavut": ["LAN", "KA"],         "kuva": "🧵", "aihe": "tyokalut", "taso": 2 },
  { "sana": "VASARA",   "tavut": ["VA", "SA", "RA"],    "kuva": "🔨", "aihe": "tyokalut", "taso": 3, "ryhma": "isku" },

  // Eläimet
  { "sana": "KALA",     "tavut": ["KA", "LA"],          "kuva": "🐟", "aihe": "elaimet", "taso": 1, "ryhma": "kala" },
  { "sana": "PUPU",     "tavut": ["PU", "PU"],          "kuva": "🐰", "aihe": "elaimet", "taso": 1 },
  { "sana": "MATO",     "tavut": ["MA", "TO"],          "kuva": "🐛", "aihe": "elaimet", "taso": 1 },
  { "sana": "RAPU",     "tavut": ["RA", "PU"],          "kuva": "🦀", "aihe": "elaimet", "taso": 1 },
  { "sana": "KISSA",    "tavut": ["KIS", "SA"],         "kuva": "🐱", "aihe": "elaimet", "taso": 2 },
  { "sana": "KARHU",    "tavut": ["KAR", "HU"],         "kuva": "🐻", "aihe": "elaimet", "taso": 2, "ryhma": "karhu" },
  { "sana": "HIIRI",    "tavut": ["HII", "RI"],         "kuva": "🐭", "aihe": "elaimet", "taso": 2 },
  { "sana": "KOIRA",    "tavut": ["KOI", "RA"],         "kuva": "🐶", "aihe": "elaimet", "taso": 2, "ryhma": "koira" },
  { "sana": "KETTU",    "tavut": ["KET", "TU"],         "kuva": "🦊", "aihe": "elaimet", "taso": 2, "ryhma": "koira" },
  { "sana": "SIILI",    "tavut": ["SII", "LI"],         "kuva": "🦔", "aihe": "elaimet", "taso": 2 },
  { "sana": "PÖLLÖ",    "tavut": ["PÖL", "LÖ"],         "kuva": "🦉", "aihe": "elaimet", "taso": 2 },
  { "sana": "KOTKA",    "tavut": ["KOT", "KA"],         "kuva": "🦅", "aihe": "elaimet", "taso": 2 },
  { "sana": "HIRVI",    "tavut": ["HIR", "VI"],         "kuva": "🦌", "aihe": "elaimet", "taso": 2 },
  { "sana": "VALAS",    "tavut": ["VA", "LAS"],         "kuva": "🐋", "aihe": "elaimet", "taso": 2, "ryhma": "kala" },
  { "sana": "NORSU",    "tavut": ["NOR", "SU"],         "kuva": "🐘", "aihe": "elaimet", "taso": 2 },
  { "sana": "SEEPRA",   "tavut": ["SEE", "PRA"],        "kuva": "🦓", "aihe": "elaimet", "taso": 2, "ryhma": "hevonen" },
  { "sana": "PANDA",    "tavut": ["PAN", "DA"],         "kuva": "🐼", "aihe": "elaimet", "taso": 2, "ryhma": "karhu" },
  { "sana": "SAMMAKKO", "tavut": ["SAM", "MAK", "KO"],  "kuva": "🐸", "aihe": "elaimet", "taso": 3 },

  // Luonto
  { "sana": "LUMI",     "tavut": ["LU", "MI"],          "kuva": "❄️", "aihe": "luonto", "taso": 1 },
  { "sana": "TULI",     "tavut": ["TU", "LI"],          "kuva": "🔥", "aihe": "luonto", "taso": 1 },
  { "sana": "MERI",     "tavut": ["ME", "RI"],          "kuva": "🌊", "aihe": "luonto", "taso": 1 },
  { "sana": "KUKKA",    "tavut": ["KUK", "KA"],         "kuva": "🌸", "aihe": "luonto", "taso": 2 },
  { "sana": "SIENI",    "tavut": ["SIE", "NI"],         "kuva": "🍄", "aihe": "luonto", "taso": 2 },
  { "sana": "PILVI",    "tavut": ["PIL", "VI"],         "kuva": "☁️", "aihe": "luonto", "taso": 2 },
  { "sana": "KUUSI",    "tavut": ["KUU", "SI"],         "kuva": "🌲", "aihe": "luonto", "taso": 2 },
  { "sana": "LEHTI",    "tavut": ["LEH", "TI"],         "kuva": "🍁", "aihe": "luonto", "taso": 2 },
  { "sana": "VUORI",    "tavut": ["VUO", "RI"],         "kuva": "⛰️", "aihe": "luonto", "taso": 2 },

  // Koti
  { "sana": "TALO",     "tavut": ["TA", "LO"],          "kuva": "🏠", "aihe": "koti", "taso": 1 },
  { "sana": "PALLO",    "tavut": ["PAL", "LO"],         "kuva": "⚽", "aihe": "koti", "taso": 2 },
  { "sana": "KELLO",    "tavut": ["KEL", "LO"],         "kuva": "⏰", "aihe": "koti", "taso": 2 },
  { "sana": "NALLE",    "tavut": ["NAL", "LE"],         "kuva": "🧸", "aihe": "koti", "taso": 2, "ryhma": "karhu" },
  { "sana": "KIRJA",    "tavut": ["KIR", "JA"],         "kuva": "📖", "aihe": "koti", "taso": 2 },
  { "sana": "SÄNKY",    "tavut": ["SÄN", "KY"],         "kuva": "🛏️", "aihe": "koti", "taso": 2 },
  { "sana": "TUOLI",    "tavut": ["TUO", "LI"],         "kuva": "🪑", "aihe": "koti", "taso": 2 },
  { "sana": "LAMPPU",   "tavut": ["LAMP", "PU"],        "kuva": "💡", "aihe": "koti", "taso": 2 },
  { "sana": "RUMPU",    "tavut": ["RUM", "PU"],         "kuva": "🥁", "aihe": "koti", "taso": 2 },
  { "sana": "LAHJA",    "tavut": ["LAH", "JA"],         "kuva": "🎁", "aihe": "koti", "taso": 2 },
  { "sana": "VEITSI",   "tavut": ["VEIT", "SI"],        "kuva": "🔪", "aihe": "koti", "taso": 2 },

  // Vaatteet
  { "sana": "SUKKA",    "tavut": ["SUK", "KA"],         "kuva": "🧦", "aihe": "vaatteet", "taso": 2 },
  { "sana": "KENKÄ",    "tavut": ["KEN", "KÄ"],         "kuva": "👟", "aihe": "vaatteet", "taso": 2 },
  { "sana": "HATTU",    "tavut": ["HAT", "TU"],         "kuva": "🎩", "aihe": "vaatteet", "taso": 2 },
  { "sana": "TAKKI",    "tavut": ["TAK", "KI"],         "kuva": "🧥", "aihe": "vaatteet", "taso": 2, "ryhma": "vaate" },
  { "sana": "PAITA",    "tavut": ["PAI", "TA"],         "kuva": "👕", "aihe": "vaatteet", "taso": 2, "ryhma": "vaate" },
  { "sana": "HOUSUT",   "tavut": ["HOU", "SUT"],        "kuva": "👖", "aihe": "vaatteet", "taso": 2 },
  { "sana": "LASIT",    "tavut": ["LA", "SIT"],         "kuva": "👓", "aihe": "vaatteet", "taso": 2 },
  { "sana": "KRUUNU",   "tavut": ["KRUU", "NU"],        "kuva": "👑", "aihe": "vaatteet", "taso": 2 },

  // Ruoka
  { "sana": "MAITO",    "tavut": ["MAI", "TO"],         "kuva": "🥛", "aihe": "ruoka", "taso": 2 },
  { "sana": "LEIPÄ",    "tavut": ["LEI", "PÄ"],         "kuva": "🍞", "aihe": "ruoka", "taso": 2 },
  { "sana": "PIZZA",    "tavut": ["PIZ", "ZA"],         "kuva": "🍕", "aihe": "ruoka", "taso": 2 },
  { "sana": "KAKKU",    "tavut": ["KAK", "KU"],         "kuva": "🎂", "aihe": "ruoka", "taso": 2 },
  { "sana": "JUUSTO",   "tavut": ["JUUS", "TO"],        "kuva": "🧀", "aihe": "ruoka", "taso": 2 },
  { "sana": "KEKSI",    "tavut": ["KEK", "SI"],         "kuva": "🍪", "aihe": "ruoka", "taso": 2 },
  { "sana": "KARKKI",   "tavut": ["KARK", "KI"],        "kuva": "🍬", "aihe": "ruoka", "taso": 2 },

  // Keho
  { "sana": "KÄSI",     "tavut": ["KÄ", "SI"],          "kuva": "✋", "aihe": "keho", "taso": 1 },
  { "sana": "NENÄ",     "tavut": ["NE", "NÄ"],          "kuva": "👃", "aihe": "keho", "taso": 1 },
  { "sana": "JALKA",    "tavut": ["JAL", "KA"],         "kuva": "🦶", "aihe": "keho", "taso": 2 },
  { "sana": "HAMMAS",   "tavut": ["HAM", "MAS"],        "kuva": "🦷", "aihe": "keho", "taso": 2 }
];
