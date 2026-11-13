// Cannabis strains tied to a place: mostly landraces (traditional local varieties)
// plus a few classics with a well-documented place of origin.
// Each strain carries the IANA time zone of its origin, so it shows up when it's 4:20 there.
//
// Sources are mostly seed banks and cannabis media, not peer-reviewed work –
// descriptions are kept short and cautious on purpose.
//
// Fields: name, cc (ISO country), tz, region {en, de}, kind ("landrace" | "classic"),
//         type ("sativa" | "indica" | "hybrid" | "ruderalis"), text {en, de}, wiki (optional)
const STRAINS = [
  // ---------- Pacific ----------
  {
    name: "Maui Wowie", cc: "us", tz: "Pacific/Honolulu",
    region: { en: "Maui, Hawaii", de: "Maui, Hawaii" }, kind: "classic", type: "sativa",
    text: {
      en: "Hawaiian island classic from the 1960s/70s, known for its tropical, pineapple-like aroma.",
      de: "Insel-Klassiker aus den 60ern/70ern, bekannt für sein tropisches, ananasartiges Aroma.",
    },
  },
  {
    name: "Molokaʻi", cc: "us", tz: "Pacific/Honolulu",
    region: { en: "Molokaʻi, Hawaii", de: "Molokaʻi, Hawaii" }, kind: "landrace", type: "sativa",
    text: {
      en: "Hawaiian island sativa, grown in the humid tropical climate of Molokaʻi.",
      de: "Hawaiianische Insel-Sativa aus dem feucht-tropischen Klima von Molokaʻi.",
    },
  },
  {
    name: "New Caledonia", cc: "nc", tz: "Pacific/Noumea",
    region: { en: "New Caledonia", de: "Neukaledonien" }, kind: "landrace", type: "sativa",
    text: {
      en: "Rare South Pacific sativa landrace with a long flowering time.",
      de: "Seltene Sativa-Landrasse aus dem Südpazifik mit langer Blütezeit.",
    },
  },
  {
    name: "Mullumbimby Madness", cc: "au", tz: "Australia/Sydney",
    region: { en: "Northern Rivers, New South Wales", de: "Northern Rivers, New South Wales" },
    kind: "classic", type: "sativa",
    text: {
      en: "Legend of the 1970s Northern Rivers counterculture. Its exact genetics are still debated – Thai roots are often cited.",
      de: "Legende der Gegenkultur der 70er in den Northern Rivers. Die genaue Genetik ist umstritten – oft werden thailändische Wurzeln genannt.",
    },
  },

  // ---------- North America ----------
  {
    name: "Haze", cc: "us", tz: "America/Los_Angeles",
    region: { en: "Santa Cruz, California", de: "Santa Cruz, Kalifornien" }, kind: "classic", type: "sativa",
    text: {
      en: "Bred in the 1970s around Santa Cruz from tropical landraces – ancestor of countless Haze hybrids.",
      de: "In den 70ern rund um Santa Cruz aus tropischen Landrassen gezüchtet – Urahn unzähliger Haze-Kreuzungen.",
    },
  },
  {
    name: "Trainwreck", cc: "us", tz: "America/Los_Angeles",
    region: { en: "Arcata, Humboldt County", de: "Arcata, Humboldt County" }, kind: "classic", type: "hybrid",
    text: {
      en: "Humboldt County classic, said to come from Arcata in Northern California.",
      de: "Humboldt-Klassiker, der aus Arcata in Nordkalifornien stammen soll.",
    },
  },
  {
    name: "Girl Scout Cookies", cc: "us", tz: "America/Los_Angeles",
    region: { en: "San Francisco Bay Area", de: "San Francisco Bay Area" }, kind: "classic", type: "hybrid",
    text: {
      en: "Came out of the Bay Area scene in the early 2010s and spawned a whole family of dessert strains.",
      de: "Entstand Anfang der 2010er in der Bay Area und begründete eine ganze Familie von „Dessert“-Strains.",
    },
  },
  {
    name: "OG Kush", cc: "us", tz: "America/Los_Angeles",
    region: { en: "Southern California", de: "Südkalifornien" }, kind: "classic", type: "hybrid",
    text: {
      en: "Likely emerged in the Southern California scene of the early 1990s – parent of many modern hybrids.",
      de: "Tauchte vermutlich Anfang der 90er in Südkalifornien auf – Elternteil vieler moderner Hybride.",
    },
  },
  {
    name: "Blue Dream", cc: "us", tz: "America/Los_Angeles",
    region: { en: "California", de: "Kalifornien" }, kind: "classic", type: "hybrid",
    text: {
      en: "Blueberry × Haze cross from around 2003, believed to originate in California.",
      de: "Kreuzung aus Blueberry und Haze von etwa 2003, vermutlich aus Kalifornien.",
    },
    wiki: "https://en.wikipedia.org/wiki/Blue_Dream",
  },
  {
    name: "Charlotte's Web", cc: "us", tz: "America/Denver",
    region: { en: "Colorado", de: "Colorado" }, kind: "classic", type: "hybrid",
    text: {
      en: "High-CBD, low-THC variety bred by the Stanley brothers in Colorado – famous in the medical debate.",
      de: "CBD-reiche, THC-arme Sorte der Stanley-Brüder aus Colorado – bekannt aus der Medizin-Debatte.",
    },
    wiki: "https://en.wikipedia.org/wiki/Charlotte%27s_Web_(cannabis)",
  },
  {
    name: "Jarilla de Sinaloa", cc: "mx", tz: "America/Mazatlan",
    region: { en: "Sinaloa, Mexico", de: "Sinaloa, Mexiko" }, kind: "landrace", type: "sativa",
    text: {
      en: "Mexican sativa landrace from the state of Sinaloa on the Pacific coast.",
      de: "Mexikanische Sativa-Landrasse aus dem Bundesstaat Sinaloa an der Pazifikküste.",
    },
  },
  {
    name: "Acapulco Gold", cc: "mx", tz: "America/Mexico_City",
    region: { en: "Guerrero, near Acapulco", de: "Guerrero, bei Acapulco" }, kind: "landrace", type: "sativa",
    text: {
      en: "Named after the nearest city and its golden colour – a US favourite as early as the 1960s.",
      de: "Benannt nach der nächsten Stadt und ihrer goldenen Farbe – schon in den 60ern ein Favorit in den USA.",
    },
    wiki: "https://en.wikipedia.org/wiki/Acapulco_Gold",
  },
  {
    name: "Highland Oaxaca Gold", cc: "mx", tz: "America/Mexico_City",
    region: { en: "Oaxaca highlands, Mexico", de: "Hochland von Oaxaca, Mexiko" }, kind: "landrace", type: "sativa",
    text: {
      en: "Sativa landrace from the mountains of Oaxaca in southern Mexico.",
      de: "Sativa-Landrasse aus den Bergen von Oaxaca im Süden Mexikos.",
    },
  },
  {
    name: "Guatemala", cc: "gt", tz: "America/Guatemala",
    region: { en: "Guatemalan jungle", de: "Dschungel von Guatemala" }, kind: "landrace", type: "sativa",
    text: {
      en: "Seeds reportedly collected in an indigenous village deep in the Guatemalan jungle; related to old Mexican lines.",
      de: "Samen sollen in einem indigenen Dorf tief im Dschungel Guatemalas gesammelt worden sein; verwandt mit alten mexikanischen Linien.",
    },
  },

  // ---------- Caribbean, Central & South America ----------
  {
    name: "Lamb's Bread", cc: "jm", tz: "America/Jamaica",
    region: { en: "Jamaica", de: "Jamaika" }, kind: "landrace", type: "sativa",
    text: {
      en: "Jamaican sativa, often said to have been one of Bob Marley's favourites.",
      de: "Jamaikanische Sativa, die oft als eine von Bob Marleys Lieblingssorten genannt wird.",
    },
  },
  {
    name: "Jamaican Blue Mountain", cc: "jm", tz: "America/Jamaica",
    region: { en: "Blue Mountains, Jamaica", de: "Blue Mountains, Jamaika" }, kind: "landrace", type: "sativa",
    text: {
      en: "Named after Jamaica's Blue Mountains – the same range known for its coffee.",
      de: "Benannt nach Jamaikas Blue Mountains – demselben Gebirge, das für seinen Kaffee bekannt ist.",
    },
  },
  {
    name: "Panama Red", cc: "pa", tz: "America/Panama",
    region: { en: "Panama", de: "Panama" }, kind: "landrace", type: "sativa",
    text: {
      en: "1960s cult sativa with reddish hairs – slow to grow, which is why it largely vanished later.",
      de: "Kult-Sativa der 60er mit rötlichen Härchen – wächst langsam und verschwand deshalb später fast.",
    },
    wiki: "https://en.wikipedia.org/wiki/Panama_red",
  },
  {
    name: "Colombian Gold", cc: "co", tz: "America/Bogota",
    region: { en: "Santa Marta mountains, Colombia", de: "Santa-Marta-Gebirge, Kolumbien" }, kind: "landrace", type: "sativa",
    text: {
      en: "Classic from the Sierra Nevada de Santa Marta; it went into the breeding of Skunk.",
      de: "Klassiker aus der Sierra Nevada de Santa Marta; floss in die Zucht von Skunk ein.",
    },
  },
  {
    name: "Punto Rojo", cc: "co", tz: "America/Bogota",
    region: { en: "Colombia", de: "Kolumbien" }, kind: "landrace", type: "sativa",
    text: {
      en: "“Red dot” – Colombian sativa landrace, also known as Punta Roja.",
      de: "„Roter Punkt“ – kolumbianische Sativa-Landrasse, auch Punta Roja genannt.",
    },
  },
  {
    name: "Corinto", cc: "co", tz: "America/Bogota",
    region: { en: "Cauca valleys, Colombia", de: "Täler von Cauca, Kolumbien" }, kind: "landrace", type: "sativa",
    text: {
      en: "From the high-altitude valleys of the Cauca region in southwestern Colombia.",
      de: "Aus den Hochtälern der Region Cauca im Südwesten Kolumbiens.",
    },
  },
  {
    name: "Peruvian", cc: "pe", tz: "America/Lima",
    region: { en: "Peru", de: "Peru" }, kind: "landrace", type: "sativa",
    text: {
      en: "South American sativa landrace from Peru.",
      de: "Südamerikanische Sativa-Landrasse aus Peru.",
    },
  },
  {
    name: "Manga Rosa", cc: "br", tz: "America/Sao_Paulo",
    region: { en: "Brazil", de: "Brasilien" }, kind: "landrace", type: "sativa",
    text: {
      en: "“Pink mango” – one of Brazil's best-known landraces.",
      de: "„Rosa Mango“ – eine der bekanntesten Landrassen Brasiliens.",
    },
  },

  // ---------- Europe ----------
  {
    name: "Cheese", cc: "gb", tz: "Europe/London",
    region: { en: "Luton, England", de: "Luton, England" }, kind: "classic", type: "hybrid",
    text: {
      en: "Clone-only Skunk #1 selection from Southern England, kept alive by the Exodus Collective in Luton.",
      de: "Skunk-#1-Selektion aus Südengland, die nur als Steckling existierte – bewahrt vom Exodus-Kollektiv in Luton.",
    },
  },
  {
    name: "Bedrocan", cc: "nl", tz: "Europe/Amsterdam",
    region: { en: "Netherlands", de: "Niederlande" }, kind: "classic", type: "sativa",
    text: {
      en: "Standardised Dutch medical cannabis variety – supplied to pharmacies, also in Germany.",
      de: "Standardisierte niederländische Medizinalsorte – wird an Apotheken geliefert, auch in Deutschland.",
    },
  },
  {
    name: "White Widow", cc: "nl", tz: "Europe/Amsterdam",
    region: { en: "Netherlands", de: "Niederlande" }, kind: "classic", type: "hybrid",
    text: {
      en: "Dutch coffeeshop icon of the 1990s, named for its frosty white trichomes.",
      de: "Coffeeshop-Ikone der 90er aus den Niederlanden, benannt nach den weißen Harzdrüsen.",
    },
    wiki: "https://en.wikipedia.org/wiki/White_Widow_(cannabis)",
  },
  {
    name: "Ruderalis", cc: "ru", tz: "Asia/Novosibirsk",
    region: { en: "Siberia & Central Asia", de: "Sibirien & Zentralasien" }, kind: "landrace", type: "ruderalis",
    text: {
      en: "Not a strain but a hardy wild type that flowers automatically – the reason “autoflowers” exist.",
      de: "Kein Strain, sondern eine robuste Wildform, die automatisch blüht – ihr verdanken wir „Autoflowers“.",
    },
    wiki: "https://en.wikipedia.org/wiki/Cannabis_ruderalis",
  },

  // ---------- Africa ----------
  {
    name: "Beldia", cc: "ma", tz: "Africa/Casablanca",
    region: { en: "Rif mountains, Morocco", de: "Rif-Gebirge, Marokko" }, kind: "landrace", type: "indica",
    text: {
      en: "Traditional Moroccan landrace from the Rif, used for centuries to make hashish.",
      de: "Traditionelle marokkanische Landrasse aus dem Rif, seit Jahrhunderten für Haschisch genutzt.",
    },
  },
  {
    name: "Nigerian", cc: "ng", tz: "Africa/Lagos",
    region: { en: "Nigeria", de: "Nigeria" }, kind: "landrace", type: "sativa",
    text: {
      en: "West African sativa landrace from Nigeria.",
      de: "Westafrikanische Sativa-Landrasse aus Nigeria.",
    },
  },
  {
    name: "Red Congolese", cc: "cd", tz: "Africa/Kinshasa",
    region: { en: "Congo", de: "Kongo" }, kind: "landrace", type: "sativa",
    text: {
      en: "Central African sativa, named for its reddish hairs.",
      de: "Zentralafrikanische Sativa, benannt nach ihren rötlichen Härchen.",
    },
  },
  {
    name: "Durban Poison", cc: "za", tz: "Africa/Johannesburg",
    region: { en: "Durban, South Africa", de: "Durban, Südafrika" }, kind: "landrace", type: "sativa",
    text: {
      en: "Named after the port city of Durban and brought to the US in the 1970s – known as an energetic sativa.",
      de: "Benannt nach der Hafenstadt Durban, in den 70ern in die USA gebracht – gilt als energetische Sativa.",
    },
  },
  {
    name: "Rooibaard", cc: "za", tz: "Africa/Johannesburg",
    region: { en: "South Africa", de: "Südafrika" }, kind: "landrace", type: "sativa",
    text: {
      en: "Afrikaans for “red beard” – South African sativa with red pistils.",
      de: "Afrikaans für „Rotbart“ – südafrikanische Sativa mit roten Blütenhärchen.",
    },
  },
  {
    name: "Swazi Gold", cc: "sz", tz: "Africa/Mbabane",
    region: { en: "Eswatini", de: "Eswatini" }, kind: "landrace", type: "sativa",
    text: {
      en: "From Eswatini (formerly Swaziland), known for a clear, cerebral high.",
      de: "Aus Eswatini (früher Swasiland), bekannt für ein klares, kopflastiges High.",
    },
  },
  {
    name: "Malawi Gold", cc: "mw", tz: "Africa/Blantyre",
    region: { en: "Malawi", de: "Malawi" }, kind: "landrace", type: "sativa",
    text: {
      en: "Africa's famous long-flowering sativa, traditionally sun-dried and wrapped in corn husks (“cobs”).",
      de: "Berühmte, lang blühende Sativa aus Afrika, traditionell in Maisblättern getrocknet („Cobs“).",
    },
    wiki: "https://en.wikipedia.org/wiki/Malawi_Gold",
  },
  {
    name: "Kilimanjaro", cc: "tz", tz: "Africa/Dar_es_Salaam",
    region: { en: "Kilimanjaro region", de: "Kilimandscharo-Region" }, kind: "landrace", type: "sativa",
    text: {
      en: "Fast-acting East African sativa named after Africa's highest mountain.",
      de: "Schnell wirkende ostafrikanische Sativa, benannt nach Afrikas höchstem Berg.",
    },
  },
  {
    name: "Ethiopian Highland", cc: "et", tz: "Africa/Addis_Ababa",
    region: { en: "Ethiopian highlands", de: "Äthiopisches Hochland" }, kind: "landrace", type: "sativa",
    text: {
      en: "Sativa landrace from the Ethiopian highlands.",
      de: "Sativa-Landrasse aus dem äthiopischen Hochland.",
    },
  },
  {
    name: "Zamal", cc: "re", tz: "Indian/Reunion",
    region: { en: "Réunion", de: "Réunion" }, kind: "landrace", type: "sativa",
    text: {
      en: "“Zamal” is simply the local word for cannabis on Réunion – a tropical sativa with very long flowering.",
      de: "„Zamal“ ist auf Réunion schlicht das Wort für Cannabis – eine tropische Sativa mit sehr langer Blüte.",
    },
    wiki: "https://en.wikipedia.org/wiki/Cannabis_in_R%C3%A9union",
  },

  // ---------- Middle East & Central / South Asia ----------
  {
    name: "Lebanese", cc: "lb", tz: "Asia/Beirut",
    region: { en: "Bekaa Valley, Lebanon", de: "Bekaa-Ebene, Libanon" }, kind: "landrace", type: "indica",
    text: {
      en: "Lebanon's traditional hash plant – “Red” and “Blond Lebanese” hash were legendary.",
      de: "Libanons traditionelle Haschpflanze – „Roter“ und „Blonder Libanese“ waren legendär.",
    },
  },
  {
    name: "Afghani", cc: "af", tz: "Asia/Kabul",
    region: { en: "Afghanistan", de: "Afghanistan" }, kind: "landrace", type: "indica",
    text: {
      en: "One of the oldest known strains – the archetypal heavy, relaxing indica.",
      de: "Einer der ältesten bekannten Strains – die Ur-Indica, schwer und entspannend.",
    },
  },
  {
    name: "Hindu Kush", cc: "af", tz: "Asia/Kabul",
    region: { en: "Hindu Kush mountains", de: "Hindukusch-Gebirge" }, kind: "landrace", type: "indica",
    text: {
      en: "Named after the mountain range on the Afghanistan–Pakistan border – the origin of the word “Kush”.",
      de: "Benannt nach dem Gebirge an der Grenze zwischen Afghanistan und Pakistan – daher kommt das Wort „Kush“.",
    },
    wiki: "https://en.wikipedia.org/wiki/Kush_(cannabis)",
  },
  {
    name: "Mazar-i-Sharif", cc: "af", tz: "Asia/Kabul",
    region: { en: "Mazar-i-Sharif, northern Afghanistan", de: "Masar-e Scharif, Nordafghanistan" },
    kind: "landrace", type: "indica",
    text: {
      en: "Indica landrace from the region around Mazar-i-Sharif in the north of Afghanistan.",
      de: "Indica-Landrasse aus der Gegend um Masar-e Scharif im Norden Afghanistans.",
    },
  },
  {
    name: "Pakistan Chitral Kush", cc: "pk", tz: "Asia/Karachi",
    region: { en: "Chitral, Pakistan", de: "Chitral, Pakistan" }, kind: "landrace", type: "indica",
    text: {
      en: "Indica from the remote Chitral valley in northern Pakistan, sometimes with purple hues.",
      de: "Indica aus dem abgelegenen Chitral-Tal im Norden Pakistans, teils mit violetten Tönen.",
    },
  },
  {
    name: "Malana Cream", cc: "in", tz: "Asia/Kolkata",
    region: { en: "Malana, Himachal Pradesh", de: "Malana, Himachal Pradesh" }, kind: "landrace", type: "indica",
    text: {
      en: "From the Himalayan village of Malana, famous for hand-rubbed charas. The pure landrace is slowly disappearing.",
      de: "Aus dem Himalaya-Dorf Malana, berühmt für handgeriebenes Charas. Die reine Landrasse verschwindet langsam.",
    },
  },
  {
    name: "Parvati", cc: "in", tz: "Asia/Kolkata",
    region: { en: "Parvati Valley, Himachal Pradesh", de: "Parvati-Tal, Himachal Pradesh" }, kind: "landrace", type: "indica",
    text: {
      en: "Himalayan landrace grown for generations in the Parvati Valley.",
      de: "Himalaya-Landrasse, die seit Generationen im Parvati-Tal wächst.",
    },
  },
  {
    name: "Kerala Gold", cc: "in", tz: "Asia/Kolkata",
    region: { en: "Idukki, Kerala", de: "Idukki, Kerala" }, kind: "landrace", type: "sativa",
    text: {
      en: "Also called Idukki Gold – a slow-flowering sativa from the Western Ghats, increasingly rare.",
      de: "Auch Idukki Gold genannt – lang blühende Sativa aus den Westghats, inzwischen selten.",
    },
    wiki: "https://en.wikipedia.org/wiki/Idukki_Gold",
  },
  {
    name: "Nepalese", cc: "np", tz: "Asia/Kathmandu",
    region: { en: "Nepal", de: "Nepal" }, kind: "landrace", type: "hybrid",
    text: {
      en: "Himalayan landrace, counted among the oldest known cannabis varieties.",
      de: "Himalaya-Landrasse, die zu den ältesten bekannten Cannabis-Sorten gezählt wird.",
    },
  },

  // ---------- Southeast & East Asia ----------
  {
    name: "Burmese", cc: "mm", tz: "Asia/Yangon",
    region: { en: "Myanmar", de: "Myanmar" }, kind: "landrace", type: "sativa",
    text: {
      en: "Southeast Asian landrace from Myanmar (Burma).",
      de: "Südostasiatische Landrasse aus Myanmar (Birma).",
    },
  },
  {
    name: "Thai", cc: "th", tz: "Asia/Bangkok",
    region: { en: "Thailand", de: "Thailand" }, kind: "landrace", type: "sativa",
    text: {
      en: "The famous “Thai stick” sativa – energetic, fast-hitting, and in the family tree of Haze and Juicy Fruit.",
      de: "Die berühmte „Thai Stick“-Sativa – energetisch, schnell wirkend und im Stammbaum von Haze und Juicy Fruit.",
    },
  },
  {
    name: "Chocolate Thai", cc: "th", tz: "Asia/Bangkok",
    region: { en: "Thailand", de: "Thailand" }, kind: "landrace", type: "sativa",
    text: {
      en: "Thai sativa with a chocolate-coffee aroma, a 1970s cult classic.",
      de: "Thai-Sativa mit Schoko-Kaffee-Aroma, Kultklassiker der 70er.",
    },
  },
  {
    name: "Luang Prabang", cc: "la", tz: "Asia/Vientiane",
    region: { en: "Northern Laos", de: "Nordlaos" }, kind: "landrace", type: "sativa",
    text: {
      en: "“Lao sativa” from northern Laos, close cousin of the Thai landraces.",
      de: "„Lao-Sativa“ aus dem Norden von Laos, enge Verwandte der Thai-Landrassen.",
    },
  },
  {
    name: "Vietnamese Black", cc: "vn", tz: "Asia/Ho_Chi_Minh",
    region: { en: "Vietnam", de: "Vietnam" }, kind: "landrace", type: "sativa",
    text: {
      en: "Named for its dark, almost black cured buds; spread to the US by returning soldiers in the 60s and 70s.",
      de: "Benannt nach den dunklen, fast schwarzen Blüten; kam in den 60ern und 70ern mit heimkehrenden Soldaten in die USA.",
    },
  },
  {
    name: "Aceh", cc: "id", tz: "Asia/Jakarta",
    region: { en: "Aceh, Sumatra", de: "Aceh, Sumatra" }, kind: "landrace", type: "sativa",
    text: {
      en: "Considered Indonesia's finest landrace and one of the oldest known strains.",
      de: "Gilt als feinste Landrasse Indonesiens und als einer der ältesten bekannten Strains.",
    },
  },
  {
    name: "China Yunnan", cc: "cn", tz: "Asia/Shanghai",
    region: { en: "Yunnan, China", de: "Yunnan, China" }, kind: "landrace", type: "hybrid",
    text: {
      en: "Landrace from the southwestern province of Yunnan, where hemp has long been grown.",
      de: "Landrasse aus der südwestchinesischen Provinz Yunnan, wo seit Langem Hanf angebaut wird.",
    },
  },
];
