/* =========================================================================
   THE SAREE HOUSE — DATA LAYER
   Everything a reseller would change lives in this file: brand, catalog,
   media, reels, testimonials, copy. Layout and behaviour never touch it.
   Re-skin the store for a new seller by editing data here — not code.
   ========================================================================= */

(function () {
  "use strict";

  var IMG = function (id, w) {
    return "https://images.pexels.com/photos/" + id + "/pexels-photo-" + id +
      ".jpeg?auto=compress&cs=tinysrgb&w=" + (w || 800);
  };

  var DATA = {

    /* ------------------------------------------------ brand ------------- */
    brand: {
      name: "The Saree House",
      short: "The Saree House",
      /* logo lockup: line 1 in the display serif, line 2 letterspaced in gold */
      wordmark: { top: "The Saree", bottom: "House" },
      tagline: "Handpicked sarees, delivered with love",
      whatsappNumber: "919876543210",
      whatsappGreeting: "Hi The Saree House team! I'd like help choosing a saree.",
      instagram: "@thesareehouse",
      city: "Hyderabad",
      freeShippingOver: 1999,
      currency: "INR"
    },

    /* ------------------------------------------------ hero --------------
       Offer-led slides. badge = the deal, headline = what it's on.
       Images are AI-generated banners in assets/hero/ (model on the right,
       copy space on the left).                                             */
    heroSlides: [
      {
        image: "assets/hero/strip-1.jpg",
        alt: "Smiling model in a crimson Kanjivaram silk saree against a festive ivory backdrop",
        badge: "Up to 40% off",
        headline: "Grand Saree Spotlight Weekend",
        sub: "Three days only — festive favourites across the store.",
        ctaPrimary: { label: "Shop the sale", href: "shop.html" },
        ctaSecondary: { label: "Explore silks", href: "shop.html?fabric=Pure%20silk" }
      },
      {
        image: "assets/hero/strip-2.jpg",
        alt: "Laughing model in a rani pink pure silk saree with gold zari",
        badge: "Buy 1, get 1 free",
        headline: "Pure silk sarees",
        sub: "Add any two pure silks — the second one is on us.",
        ctaPrimary: { label: "Shop pure silk", href: "shop.html?fabric=Pure%20silk" },
        ctaSecondary: { label: "See Kanjivarams", href: "shop.html?collection=Kanjivaram" }
      },
      {
        image: "assets/hero/strip-3.jpg",
        alt: "Model twirling in a peacock blue silk saree among glowing diyas",
        badge: "32–50% off",
        headline: "The festive saree sale",
        sub: "Kanjivaram to Pochampally — every weave in celebration mode.",
        ctaPrimary: { label: "Shop festive", href: "shop.html?occasion=Festival" },
        ctaSecondary: { label: "Explore collection", href: "shop.html" }
      },
      {
        image: "assets/hero/strip-4.jpg",
        alt: "Model in a pastel lavender soft silk saree in airy morning light",
        badge: "50–60% off",
        headline: "Soft silks, softer prices",
        sub: "Feather-light drapes that last the whole function.",
        ctaPrimary: { label: "Shop soft silks", href: "shop.html?collection=Uppada" },
        ctaSecondary: { label: "See organzas", href: "shop.html?fabric=Organza" }
      },
      {
        image: "assets/hero/strip-5.jpg",
        alt: "Cheerful model in a leaf green cotton saree holding marigolds in morning sun",
        badge: "Flat 30% off",
        headline: "Cotton classics",
        sub: "Everyday mulmuls and handblocks, easy on everything.",
        ctaPrimary: { label: "Shop cotton", href: "shop.html?fabric=Cotton" },
        ctaSecondary: { label: "Daily wear picks", href: "shop.html?occasion=Daily%20Wear" }
      }
    ],

    /* offer tokens shown as small chips on matching product cards */
    fabricOffers: {
      "Pure silk": "Buy 1 get 1",
      "Cotton": "Flat 30% off"
    },

    /* scrolling offer ribbon under the header (Gehna-style marquee) */
    marquee: [
      "Buy 1 get 1 on pure silks",
      "Free shipping across India",
      "50,000+ happy customers",
      "Premium handpicked fabrics",
      "Cash on delivery available",
      "Easy 7-day returns",
      "New sarees every Friday"
    ],

    /* quick filter pills shown on the desktop offer strip */
    quickFilters: [
      { label: "Banarasi sarees", href: "shop.html?collection=Banarasi" },
      { label: "Cotton sarees", href: "shop.html?fabric=Cotton" },
      { label: "Silk sarees", href: "shop.html?fabric=Pure%20silk" },
      { label: "Curated collection", href: "shop.html" }
    ],

    /* ------------------------------------------------ occasions --------- */
    /* accent = jewel tone used only as a whisper (thin rule on the tile)   */
    occasions: [
      { name: "Wedding",    image: IMG(35007727, 700), art: "assets/occasions/wedding.jpg",    accent: "#7E2D3B", line: "Kanjivarams & bridal silks" },
      { name: "Baby Shower", image: IMG(6786971, 700), art: "assets/occasions/baby-shower.jpg", accent: "#8C2B5D", line: "Seemantham & godh bharai" },
      { name: "Puja & Rituals", image: IMG(36962415, 700), art: "assets/occasions/puja.jpg",   accent: "#7E2D3B", line: "Auspicious silks & cottons" },
      { name: "Haldi",      image: IMG(12622596, 700), art: "assets/occasions/haldi.jpg",      accent: "#B08D57", line: "Sunshine yellows" },
      { name: "Mehendi",    image: IMG(12936999, 700), art: "assets/occasions/mehendi.jpg",    accent: "#1E6B4F", line: "Greens for the morning" },
      { name: "Reception",  image: IMG(13802620, 700), art: "assets/occasions/reception.jpg",  accent: "#B08D57", line: "Gold that glows after dark" },
      { name: "Sangeet",    image: IMG(13031574, 700), art: "assets/occasions/sangeet.jpg",    accent: "#8C2B5D", line: "Twirl-friendly drapes" },
      { name: "Festival",   image: IMG(19115355, 700), art: "assets/occasions/festival.jpg",   accent: "#8C2B5D", line: "Colour for every pooja" },
      { name: "Party Wear", image: IMG(33276621, 700), art: "assets/occasions/party.jpg",      accent: "#16606E", line: "Evening statements" },
      { name: "Office",     image: IMG(17040892, 700), art: "assets/occasions/office.jpg",     accent: "#16606E", line: "Calm, crisp, comfortable" },
      { name: "Daily Wear", image: IMG(10527093, 700), art: "assets/occasions/daily.jpg",      accent: "#1E6B4F", line: "Soft enough to forget" }
    ],

    /* ------------------------------------------------ fabrics ------------
       Tiles use fabric close-ups (no model shots) so the weave is clear.  */
    fabrics: [
      { name: "Pure silk",  image: IMG(7676340, 700), line: "For the days that matter most" },
      { name: "Cotton",     image: IMG(6487380, 700), line: "Breathes with you, all day" },
      { name: "Linen",      image: IMG(4938326, 700), line: "Crisp drape, easy care" },
      { name: "Organza",    image: IMG(7717488, 700), line: "Light as a whisper" },
      { name: "Georgette",  image: IMG(7956639, 700), line: "Falls beautifully, packs small" },
      { name: "Chiffon",    image: IMG(8711176, 700), line: "Soft float for evenings" }
    ],

    /* ------------------------------------------------ collections -------
       The famous weaves of South India (AP, Telangana, Karnataka, TN,
       Kerala) plus Banarasi and the everyday fabrics.                     */
    collections: [
      { name: "Kanjivaram",     image: IMG(9419023, 500) },
      { name: "Banarasi",       image: IMG(16525657, 500) },
      { name: "Pochampally",    image: IMG(6842754, 500) },
      { name: "Gadwal",         image: IMG(29396108, 500) },
      { name: "Uppada",         image: IMG(28943474, 500) },
      { name: "Mangalagiri",    image: IMG(28517477, 500) },
      { name: "Dharmavaram",    image: IMG(28943603, 500) },
      { name: "Venkatagiri",    image: IMG(35108820, 500) },
      { name: "Narayanpet",     image: IMG(28943465, 500) },
      { name: "Ilkal",          image: IMG(29026116, 500) },
      { name: "Chettinad",      image: IMG(28943461, 500) },
      { name: "Kota Cotton",    image: IMG(7853471, 500) },
      { name: "Kalamkari",      image: IMG(29172765, 500) },
      { name: "Mysore Silk",    image: IMG(36041210, 500) },
      { name: "Kerala Kasavu",  image: IMG(34065634, 500) },
      { name: "Cotton",         image: IMG(34799137, 500), isFabric: true },
      { name: "Silk",           image: IMG(28943531, 500), isFabric: true },
      { name: "Linen",          image: IMG(7693907, 500),  isFabric: true },
      { name: "Organza",        image: IMG(35108855, 500), isFabric: true },
      { name: "Georgette",      image: IMG(13679112, 500), isFabric: true },
      { name: "Chiffon",        image: IMG(33276621, 500), isFabric: true }
    ],

    /* ------------------------------------------------ products ----------
       images[0] = drape shot, images[1] = detail/styling shot (card swap)
       price/mrp in rupees; tags: new | bestseller | trending | hot        */
    products: [
      {
        id: "sindoora-kanjivaram",
        name: "Sindoora bridal Kanjivaram",
        collection: "Kanjivaram", fabric: "Pure silk", color: "Red",
        occasions: ["Wedding"],
        price: 18490, mrp: 24999,
        rating: 4.8, reviews: 214, stock: 4, deliveryDays: [4, 6],
        tags: ["bestseller"],
        images: [IMG(28943531, 900), IMG(27918892, 900)],
        alts: ["Close-up of a woman in a vibrant red Kanjivaram saree with traditional gold jewellery",
               "Detail of stacked bangles against a colourful silk drape"],
        blouse: "Runs with an unstitched contrast blouse piece (0.8 m)",
        care: "Dry clean only. Store wrapped in muslin.",
        desc: "Deep kumkum red with a woven temple border and a pallu that carries the whole story. The zari is tested, the fall is pre-stitched-ready, and it photographs like a festival."
      },
      {
        id: "kanakadhara-kanjivaram",
        name: "Kanakadhara Kanjivaram",
        collection: "Kanjivaram", fabric: "Pure silk", color: "Red",
        occasions: ["Wedding", "Reception"],
        price: 21990, mrp: 28500,
        rating: 4.9, reviews: 187, stock: 3, deliveryDays: [4, 6],
        tags: ["hot"],
        images: [IMG(28943543, 900), IMG(28943601, 900)],
        alts: ["Woman in a red silk saree with gold jewellery photographed outdoors",
               "Evening close-up of gold jewellery against a vibrant saree"],
        blouse: "Runs with a woven zari blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "A wedding-day classic: rich red body, broad gold border, korvai join you can feel with your thumb. Heavy where it should be, never where it shouldn't."
      },
      {
        id: "shehnai-banarasi",
        name: "Shehnai Banarasi silk",
        collection: "Banarasi", fabric: "Pure silk", color: "Red",
        occasions: ["Wedding"],
        price: 16750, mrp: 21999,
        rating: 4.7, reviews: 162, stock: 6, deliveryDays: [3, 5],
        tags: ["trending"],
        images: [IMG(16525657, 900), IMG(12936999, 900)],
        alts: ["Indian bride in red attire with intricate jewellery and henna",
               "Close-up of hands with mehndi and traditional bridal jewellery"],
        blouse: "Runs with a brocade blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "Katan silk woven in Varanasi with floral kadhwa butis. The kind of red that makes the shehnai sound louder."
      },
      {
        id: "rajwada-banarasi",
        name: "Rajwada Banarasi",
        collection: "Banarasi", fabric: "Pure silk", color: "Red",
        occasions: ["Wedding", "Reception"],
        price: 19240, mrp: 25999,
        rating: 4.8, reviews: 143, stock: 5, deliveryDays: [3, 5],
        tags: ["new"],
        images: [IMG(35007727, 900), IMG(35963259, 900)],
        alts: ["Indian bride in regal red attire with traditional styling",
               "Close-up of a bride's traditional jewellery and ornate veil"],
        blouse: "Runs with a plain silk blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "Regal jangla work across a deep red body. Made for the long night — receptions, photographs, and one unforgettable entrance."
      },
      {
        id: "aarti-kanjivaram",
        name: "Aarti silk",
        collection: "Kanjivaram", fabric: "Pure silk", color: "Red",
        occasions: ["Wedding", "Festival"],
        price: 14990, mrp: 19499,
        rating: 4.6, reviews: 98, stock: 7, deliveryDays: [4, 6],
        tags: [],
        images: [IMG(32170148, 900), IMG(9329192, 900)],
        alts: ["Bride in red traditional attire in dramatic lighting",
               "Close-up of a South Asian bride with elegant jewellery"],
        blouse: "Runs with a contrast blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "Crimson silk with a slim gold selvedge — the choice for a morning muhurtham that flows into an evening aarti."
      },
      {
        id: "thalir-gadwal",
        name: "Thalir Gadwal",
        collection: "Gadwal", fabric: "Silk-cotton", color: "Red",
        occasions: ["Wedding", "Festival"],
        price: 9890, mrp: 12999,
        rating: 4.7, reviews: 121, stock: 8, deliveryDays: [3, 5],
        tags: ["bestseller"],
        images: [IMG(29396108, 900), IMG(12936998, 900)],
        alts: ["South Asian bride in vibrant red attire posing outdoors",
               "Hands with henna and traditional jewellery in wedding attire"],
        blouse: "Runs with a silk blouse piece (0.8 m)",
        care: "Gentle dry clean. Iron on low.",
        desc: "The Gadwal trick: cotton body that stays light, silk border that stays grand. Wear it through a full-day function without noticing the hours."
      },
      {
        id: "kesari-uppada",
        name: "Kesari Uppada silk",
        collection: "Uppada", fabric: "Pure silk", color: "Orange",
        occasions: ["Haldi", "Festival"],
        price: 7490, mrp: 9999,
        rating: 4.6, reviews: 176, stock: 9, deliveryDays: [3, 5],
        tags: ["trending"],
        images: [IMG(28943474, 900), IMG(28943484, 900)],
        alts: ["Woman in a traditional orange saree seated gracefully indoors",
               "Woman in an orange saree at a night market"],
        blouse: "Runs with a matching blouse piece (0.8 m)",
        care: "Dry clean recommended.",
        desc: "Kesari orange jamdani, woven so fine it folds into your palm. Haldi-proof colour with a soft, airy fall."
      },
      {
        id: "mandara-narayanpet",
        name: "Mandara Narayanpet",
        collection: "Narayanpet", fabric: "Silk-cotton", color: "Orange",
        occasions: ["Festival", "Daily Wear", "Puja & Rituals"],
        price: 4250, mrp: 5799,
        rating: 4.5, reviews: 204, stock: 12, deliveryDays: [2, 4],
        tags: ["bestseller"],
        images: [IMG(28943465, 900), IMG(28943495, 900)],
        alts: ["Woman in vibrant orange attire seated in a market setting",
               "Portrait of a woman in an orange saree with temple jewellery"],
        blouse: "Runs with an attached blouse piece (0.8 m)",
        care: "Hand wash cold, dry in shade.",
        desc: "The checked Narayanpet everyone borrows and nobody returns. Temple border, everyday price."
      },
      {
        id: "elaichi-mysore",
        name: "Elaichi Mysore silk",
        collection: "Mysore Silk", fabric: "Pure silk", color: "Green",
        occasions: ["Mehendi", "Office"],
        price: 8990, mrp: 11499,
        rating: 4.8, reviews: 156, stock: 6, deliveryDays: [3, 5],
        tags: ["new"],
        images: [IMG(36041210, 900), IMG(38281665, 900)],
        alts: ["Woman in a green Mysore silk saree with trees in the background",
               "Smiling woman in green traditional attire"],
        blouse: "Runs with a gold-tissue blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "Cardamom green crepe with that unmistakable Mysore sheen. Minimal border, maximum polish — mehendi by morning, boardroom by Monday."
      },
      {
        id: "pista-mul-cotton",
        name: "Pista mul cotton",
        collection: "Cotton", fabric: "Cotton", color: "Green",
        occasions: ["Mehendi", "Daily Wear", "Office"],
        price: 2190, mrp: 2999,
        rating: 4.6, reviews: 312, stock: 15, deliveryDays: [2, 4],
        tags: ["bestseller"],
        images: [IMG(10527093, 900), IMG(36041239, 900)],
        alts: ["Woman in a soft green cotton saree relaxing outdoors",
               "Woman in traditional dress posing beside water"],
        blouse: "Runs with a matching blouse piece (0.8 m)",
        care: "Machine wash gentle. Softens with every wash.",
        desc: "Mulmul cotton in pista green — the saree you reach for on a Tuesday and get compliments on till Friday."
      },
      {
        id: "neelam-pochampally",
        name: "Neelam Pochampally ikat",
        collection: "Pochampally", fabric: "Pure silk", color: "Blue",
        occasions: ["Party Wear", "Reception"],
        price: 6750, mrp: 8999,
        rating: 4.7, reviews: 134, stock: 5, deliveryDays: [3, 5],
        tags: ["trending"],
        images: [IMG(6842754, 900), IMG(7176430, 900)],
        alts: ["Woman in a peacock blue saree holding a glass at an evening event",
               "Woman in a vibrant blue saree posing against a grey wall"],
        blouse: "Runs with an ikat blouse piece (0.8 m)",
        care: "Dry clean recommended.",
        desc: "Peacock blue ikat, tie-dyed thread by thread before it ever meets the loom. Geometry that moves when you do."
      },
      {
        id: "mayil-uppada",
        name: "Mayil Uppada tissue",
        collection: "Uppada", fabric: "Tissue silk", color: "Blue",
        occasions: ["Festival", "Office"],
        price: 5890, mrp: 7499,
        rating: 4.6, reviews: 167, stock: 7, deliveryDays: [3, 5],
        tags: ["hot"],
        images: [IMG(7176438, 900), IMG(34799137, 900)],
        alts: ["Woman in a teal saree with hands clasped in greeting",
               "Smiling woman in a colourful saree under a blue sky"],
        blouse: "Runs with a tissue blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "Teal tissue with a peacock-feather shimmer that changes with the light. Weightless enough for a full workday."
      },
      {
        id: "vanam-linen",
        name: "Vanam linen",
        collection: "Linen", fabric: "Linen", color: "Blue",
        occasions: ["Office", "Daily Wear"],
        price: 3450, mrp: 4599,
        rating: 4.5, reviews: 228, stock: 11, deliveryDays: [2, 4],
        tags: ["new"],
        images: [IMG(7693907, 900), IMG(27719401, 900)],
        alts: ["Young woman in a blue saree outdoors with greenery behind",
               "Woman in a saree walking with an umbrella on a rainy day"],
        blouse: "Runs with a matching blouse piece (0.8 m)",
        care: "Machine wash gentle. Iron while damp.",
        desc: "Indigo linen with a silver zari edge. Creases honestly, breathes generously — the workweek uniform you'll actually look forward to."
      },
      {
        id: "gulaabi-venkatagiri",
        name: "Gulaabi Venkatagiri",
        collection: "Venkatagiri", fabric: "Pure silk", color: "Pink",
        occasions: ["Sangeet", "Party Wear", "Baby Shower"],
        price: 7990, mrp: 10499,
        rating: 4.8, reviews: 145, stock: 6, deliveryDays: [3, 5],
        tags: ["bestseller"],
        images: [IMG(35108820, 900), IMG(35108816, 900)],
        alts: ["Woman in a pink silk saree with traditional jewellery",
               "Woman in traditional attire with elegant jewellery, smiling"],
        blouse: "Runs with a zari-butta blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "Rose pink Venkatagiri with fine gold buttas scattered like first-dance confetti. Made to twirl."
      },
      {
        id: "vasantham-organza",
        name: "Vasantham organza",
        collection: "Organza", fabric: "Organza", color: "Pink",
        occasions: ["Reception", "Party Wear", "Baby Shower"],
        price: 4890, mrp: 6499,
        rating: 4.4, reviews: 89, stock: 8, deliveryDays: [3, 5],
        tags: ["new"],
        images: [IMG(35108855, 900), IMG(33019769, 900)],
        alts: ["Woman in a pink and blue organza saree",
               "Woman in traditional attire seated gracefully outdoors"],
        blouse: "Runs with a satin blouse piece (0.8 m)",
        care: "Dry clean only. Handle embellishments gently.",
        desc: "Pink fading into periwinkle, sheer as morning light. The saree equivalent of golden-hour photography."
      },
      {
        id: "rani-georgette",
        name: "Rani georgette",
        collection: "Georgette", fabric: "Georgette", color: "Pink",
        occasions: ["Sangeet"],
        price: 3990, mrp: 5299,
        rating: 4.5, reviews: 117, stock: 9, deliveryDays: [2, 4],
        tags: ["trending"],
        images: [IMG(4048041, 900), IMG(8710793, 900)],
        alts: ["Stylish Indian woman in a vibrant rani pink saree, studio drape shot",
               "Close-up of pink saree fabric with fine embroidery detail"],
        blouse: "Runs with a sequinned blouse piece (0.8 m)",
        care: "Dry clean recommended.",
        desc: "Rani pink georgette that falls like water and dances like it rehearsed. Sangeet-night certified."
      },
      {
        id: "mela-handblock-cotton",
        name: "Mela handblock cotton",
        collection: "Cotton", fabric: "Cotton", color: "Multicolour",
        occasions: ["Festival", "Daily Wear"],
        price: 2490, mrp: 3299,
        rating: 4.6, reviews: 274, stock: 14, deliveryDays: [2, 4],
        tags: ["hot"],
        images: [IMG(27719404, 900), IMG(27819381, 900)],
        alts: ["Woman in a vibrant colourful saree on a rural road",
               "Woman dancing joyfully at a vibrant outdoor festival"],
        blouse: "Runs with a matching blouse piece (0.8 m)",
        care: "Hand wash separately for the first two washes.",
        desc: "Hand-blocked in a riot of festival colour. Every repeat is slightly, humanly imperfect — that's how you know."
      },
      {
        id: "kamala-chiffon",
        name: "Kamala chiffon",
        collection: "Chiffon", fabric: "Chiffon", color: "Pink",
        occasions: ["Party Wear"],
        price: 3290, mrp: 4499,
        rating: 4.4, reviews: 96, stock: 10, deliveryDays: [2, 4],
        tags: ["new"],
        images: [IMG(13849008, 900), IMG(8711176, 900)],
        alts: ["Young model in a blush pink chiffon saree, confident pose",
               "Close-up of pink chiffon fabric with gold embroidery"],
        blouse: "Runs with a satin blouse piece (0.8 m)",
        care: "Gentle hand wash or dry clean.",
        desc: "Blush chiffon with a hand-rolled edge. Slips into a handbag, steps out ready for dinner."
      },
      {
        id: "manjal-soft-cotton",
        name: "Manjal soft cotton",
        collection: "Cotton", fabric: "Cotton", color: "Yellow",
        occasions: ["Haldi", "Festival"],
        price: 2890, mrp: 3799,
        rating: 4.7, reviews: 188, stock: 13, deliveryDays: [2, 4],
        tags: ["trending"],
        images: [IMG(19112397, 900), IMG(20685632, 900)],
        alts: ["Smiling Indian woman in a turmeric yellow saree with traditional jewellery",
               "Woman in a vibrant yellow saree holding a festive tray"],
        blouse: "Runs with a matching blouse piece (0.8 m)",
        care: "Machine wash gentle, wash darks separately.",
        desc: "Turmeric yellow that survives an actual haldi. Soft mul weave, sunshine guaranteed."
      },
      {
        id: "kanakam-banarasi",
        name: "Kanakam gold Banarasi",
        collection: "Banarasi", fabric: "Pure silk", color: "Gold",
        occasions: ["Reception", "Sangeet"],
        price: 12490, mrp: 15999,
        rating: 4.8, reviews: 132, stock: 4, deliveryDays: [3, 5],
        tags: ["bestseller"],
        images: [IMG(13802620, 900), IMG(19869152, 900)],
        alts: ["Bride in golden embroidered attire with a soft veil",
               "Bride in traditional clothing admiring herself in a mirror"],
        blouse: "Runs with a tissue blouse piece (0.8 m)",
        care: "Dry clean only. Store flat, refold monthly.",
        desc: "Molten antique gold, kadhwa-woven so the motifs float without a single loose thread behind. Reception lighting was invented for this."
      },
      {
        id: "thira-kasavu",
        name: "Thira Kerala Kasavu",
        collection: "Kerala Kasavu", fabric: "Cotton", color: "Cream",
        occasions: ["Festival", "Office", "Puja & Rituals"],
        price: 3690, mrp: 4899,
        rating: 4.7, reviews: 203, stock: 9, deliveryDays: [3, 5],
        tags: [],
        images: [IMG(36949450, 900), IMG(37550361, 900)],
        alts: ["South Indian woman in a cream and gold kasavu saree holding kanikkonna flowers",
               "Portrait of a woman in traditional Kerala Kasavu saree"],
        blouse: "Runs with a gold-border blouse piece (0.8 m)",
        care: "Hand wash cold. Starch lightly for the classic fall.",
        desc: "Cream handloom cotton with the honest gold kasavu border. Onam, Vishu, or any morning that deserves ceremony."
      },
      {
        id: "raatri-chiffon",
        name: "Raatri black chiffon",
        collection: "Chiffon", fabric: "Chiffon", color: "Black",
        occasions: ["Party Wear"],
        price: 4190, mrp: 5599,
        rating: 4.6, reviews: 151, stock: 6, deliveryDays: [2, 4],
        tags: ["hot"],
        images: [IMG(33276621, 900), IMG(14205210, 900)],
        alts: ["Woman in a black saree under streetlights at night",
               "Woman in a dark sari on a quiet forest path"],
        blouse: "Runs with a zari-edge blouse piece (0.8 m)",
        care: "Gentle hand wash or dry clean.",
        desc: "Jet black chiffon with a whisper of antique zari at the edge. City lights do the rest."
      },
      {
        id: "kaveri-kanjivaram",
        name: "Kaveri Kanjivaram",
        collection: "Kanjivaram", fabric: "Pure silk", color: "Red",
        occasions: ["Festival", "Wedding", "Puja & Rituals"],
        price: 13750, mrp: 17999,
        rating: 4.9, reviews: 241, stock: 5, deliveryDays: [4, 6],
        tags: ["bestseller"],
        images: [IMG(9419023, 900), IMG(28054616, 900)],
        alts: ["South Indian woman in a traditional saree with temple jewellery",
               "South Indian woman in a beautiful saree with cultural jewellery"],
        blouse: "Runs with a temple-border blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "A river of classic zari checks with a temple border — the Kanjivaram your grandmother would inspect and approve."
      },
      {
        id: "mysuru-malli-crepe",
        name: "Mysuru Malli crepe",
        collection: "Mysore Silk", fabric: "Silk crepe", color: "Cream",
        occasions: ["Office", "Reception"],
        price: 6990, mrp: 8999,
        rating: 4.7, reviews: 119, stock: 8, deliveryDays: [3, 5],
        tags: ["new"],
        images: [IMG(27575104, 900), IMG(36965126, 900)],
        alts: ["Woman in a luxurious ivory saree with traditional jewellery",
               "Portrait of a South Indian woman in a traditional saree outdoors"],
        blouse: "Runs with a matching blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "Jasmine-soft ivory crepe with a slim gold line. Quietly expensive — the saree that gets asked about, not announced."
      },
      {
        id: "sindhu-gadwal",
        name: "Sindhu Gadwal",
        collection: "Gadwal", fabric: "Silk-cotton", color: "Red",
        occasions: ["Festival", "Daily Wear"],
        price: 5490, mrp: 6999,
        rating: 4.5, reviews: 163, stock: 10, deliveryDays: [3, 5],
        tags: [],
        images: [IMG(14928074, 900), IMG(34964322, 900)],
        alts: ["Woman on a rural road wearing a vibrant red saree",
               "Woman in a red saree with a floral accessory walking outdoors"],
        blouse: "Runs with a contrast blouse piece (0.8 m)",
        care: "Gentle dry clean. Iron on low.",
        desc: "Brick red with a mustard border — the festival Gadwal that works just as hard on an ordinary Thursday."
      },
      {
        id: "roja-georgette",
        name: "Roja georgette",
        collection: "Georgette", fabric: "Georgette", color: "Red",
        occasions: ["Daily Wear", "Party Wear"],
        price: 2990, mrp: 3999,
        rating: 4.4, reviews: 142, stock: 12, deliveryDays: [2, 4],
        tags: [],
        images: [IMG(11629757, 900), IMG(34481843, 900)],
        alts: ["Young woman in a red georgette saree on a balcony in natural light",
               "Woman in a traditional saree near a river"],
        blouse: "Runs with a matching blouse piece (0.8 m)",
        care: "Machine wash gentle in a mesh bag.",
        desc: "Rose red georgette that irons itself on the hanger. Low effort, high compliment ratio."
      },
      {
        id: "godavari-uppada",
        name: "Godavari Uppada",
        collection: "Uppada", fabric: "Pure silk", color: "Multicolour",
        occasions: ["Office", "Festival"],
        price: 6450, mrp: 8299,
        rating: 4.6, reviews: 108, stock: 7, deliveryDays: [3, 5],
        tags: ["new"],
        images: [IMG(17040892, 900), IMG(37054318, 900)],
        alts: ["Portrait of a woman in a traditional saree outdoors on the hills",
               "Woman in a traditional saree posing by a large tree"],
        blouse: "Runs with a matching blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "Earth tones flowing into each other like the river it's named for. Handwoven Uppada lightness, everyday grace."
      },
      {
        id: "kila-banarasi",
        name: "Kila Banarasi georgette",
        collection: "Banarasi", fabric: "Georgette", color: "Red",
        occasions: ["Reception"],
        price: 11890, mrp: 14999,
        rating: 4.7, reviews: 127, stock: 5, deliveryDays: [3, 5],
        tags: ["trending"],
        images: [IMG(31450180, 900), IMG(30809480, 900)],
        alts: ["Elegant woman in a red saree at a historic archway",
               "Close-up of red bridal styling with traditional jewellery"],
        blouse: "Runs with a brocade blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "Banarasi zari on flowing georgette — palace-grade grandeur at half the weight. Built for long receptions and longer photo sessions."
      },
      {
        id: "neelima-mangalagiri",
        name: "Neelima Mangalagiri",
        collection: "Mangalagiri", fabric: "Cotton", color: "Blue",
        occasions: ["Office", "Daily Wear"],
        price: 3290, mrp: 4299,
        rating: 4.6, reviews: 142, stock: 11, deliveryDays: [2, 4],
        tags: ["new"],
        images: [IMG(28517477, 900), IMG(34368242, 900)],
        alts: ["Woman in a blue Mangalagiri saree with silver details",
               "Woman in a blue saree seated on a tree branch outdoors"],
        blouse: "Runs with a matching blouse piece (0.8 m)",
        care: "Machine wash gentle.",
        desc: "Classic Mangalagiri cotton with the plain body and Nizam zari border it's famous for. Crisp in the morning, soft by evening."
      },
      {
        id: "sona-mangalagiri",
        name: "Sona Mangalagiri",
        collection: "Mangalagiri", fabric: "Cotton", color: "Yellow",
        occasions: ["Daily Wear", "Office"],
        price: 2690, mrp: 3499,
        rating: 4.5, reviews: 168, stock: 12, deliveryDays: [2, 4],
        tags: ["hot"],
        images: [IMG(20158855, 900), IMG(20158863, 900)],
        alts: ["Woman in a yellow saree seated on a bench in a rustic setting",
               "Portrait of a woman in a yellow saree against a stone wall"],
        blouse: "Runs with a matching blouse piece (0.8 m)",
        care: "Machine wash gentle.",
        desc: "Sunny Mangalagiri cotton with a slim gold border — the saree that makes Tuesday feel like a small festival."
      },
      {
        id: "pachcha-dharmavaram",
        name: "Pachcha Dharmavaram silk",
        collection: "Dharmavaram", fabric: "Pure silk", color: "Green",
        occasions: ["Wedding", "Festival", "Puja & Rituals"],
        price: 11490, mrp: 14999,
        rating: 4.8, reviews: 133, stock: 5, deliveryDays: [4, 6],
        tags: ["trending"],
        images: [IMG(28943603, 900), IMG(6167463, 900)],
        alts: ["Young woman in a traditional green and gold Dharmavaram silk saree",
               "Close-up of a saree with intricate golden paisley patterns"],
        blouse: "Runs with a gold-border blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "Dharmavaram's broad gold borders on a deep parrot green — heavier zari than Kanjivaram, at a friendlier price."
      },
      {
        id: "rajahamsa-dharmavaram",
        name: "Rajahamsa Dharmavaram",
        collection: "Dharmavaram", fabric: "Pure silk", color: "Red",
        occasions: ["Wedding", "Reception"],
        price: 13990, mrp: 17999,
        rating: 4.7, reviews: 96, stock: 4, deliveryDays: [4, 6],
        tags: ["bestseller"],
        images: [IMG(17001511, 900), IMG(12426868, 900)],
        alts: ["Bride in a red Dharmavaram silk saree gazing through a window",
               "Close-up of bridal hands with henna and detailed gold embroidery"],
        blouse: "Runs with a brocade blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "Temple-town grandeur: deep red body, swan motifs in the pallu, gold that photographs like sunrise."
      },
      {
        id: "chandrakala-ilkal",
        name: "Chandrakala Ilkal",
        collection: "Ilkal", fabric: "Silk-cotton", color: "Cream",
        occasions: ["Festival", "Daily Wear"],
        price: 3890, mrp: 4999,
        rating: 4.6, reviews: 157, stock: 9, deliveryDays: [3, 5],
        tags: ["hot"],
        images: [IMG(29026116, 900), IMG(33711585, 900)],
        alts: ["Joyful woman in a classic white Ilkal saree with red blouse",
               "Woman in a white and red saree walking by a brick wall"],
        blouse: "Runs with a red kasuti blouse piece (0.8 m)",
        care: "Gentle machine wash.",
        desc: "The Ilkal classic — white body, red tope-teni pallu, woven in Karnataka the same way for four hundred years."
      },
      {
        id: "kandangi-chettinad",
        name: "Kandangi Chettinad cotton",
        collection: "Chettinad", fabric: "Cotton", color: "Orange",
        occasions: ["Office", "Daily Wear"],
        price: 2990, mrp: 3899,
        rating: 4.5, reviews: 181, stock: 13, deliveryDays: [2, 4],
        tags: ["hot"],
        images: [IMG(28943461, 900), IMG(28943572, 900)],
        alts: ["Woman in a bold orange Chettinad cotton saree walking outdoors",
               "Woman in a colourful saree shopping at a vibrant Indian market"],
        blouse: "Runs with a contrast blouse piece (0.8 m)",
        care: "Machine wash gentle.",
        desc: "Bold Chettinad checks and stripes in kavi orange — Tamil Nadu's most confident everyday cotton."
      },
      {
        id: "jharokha-kota",
        name: "Jharokha Kota doria",
        collection: "Kota Cotton", fabric: "Cotton", color: "Yellow",
        occasions: ["Daily Wear", "Office"],
        price: 2390, mrp: 3199,
        rating: 4.4, reviews: 129, stock: 14, deliveryDays: [2, 4],
        tags: ["new"],
        images: [IMG(7853471, 900), IMG(14953105, 900)],
        alts: ["Woman in a light yellow Kota saree on a wooden bridge in a forest",
               "Serene portrait of a woman in a yellow saree outdoors"],
        blouse: "Runs with a matching blouse piece (0.8 m)",
        care: "Hand wash cold, drip dry.",
        desc: "Kota doria's square-check weave makes it the lightest cotton you can drape — air with a border."
      },
      {
        id: "mogra-kota",
        name: "Mogra Kota doria",
        collection: "Kota Cotton", fabric: "Cotton", color: "Pink",
        occasions: ["Daily Wear"],
        price: 2590, mrp: 3399,
        rating: 4.5, reviews: 114, stock: 12, deliveryDays: [2, 4],
        tags: ["hot"],
        images: [IMG(29480426, 900), IMG(33067044, 900)],
        alts: ["Young woman in a soft pink Kota saree near a rustic wall",
               "Woman in a pink saree outdoors on a rainy day"],
        blouse: "Runs with a matching blouse piece (0.8 m)",
        care: "Hand wash cold, drip dry.",
        desc: "Blush pink Kota, sheer as a mogra evening — the summer saree your cupboard is missing."
      },
      {
        id: "katha-kalamkari",
        name: "Katha Kalamkari print",
        collection: "Kalamkari", fabric: "Cotton", color: "Black",
        occasions: ["Office", "Party Wear"],
        price: 3490, mrp: 4599,
        rating: 4.7, reviews: 203, stock: 8, deliveryDays: [2, 4],
        tags: ["trending"],
        images: [IMG(29172765, 900), IMG(29172767, 900)],
        alts: ["Woman in a black Kalamkari print saree with intricate patterns",
               "Rear view of a woman in a black patterned saree by a window"],
        blouse: "Runs with a printed blouse piece (0.8 m)",
        care: "Wash separately in cold water.",
        desc: "Pen Kalamkari from Srikalahasti — every motif tells a story, hand-drawn in natural dyes on deep black."
      },
      {
        id: "vriksha-kalamkari",
        name: "Vriksha Kalamkari",
        collection: "Kalamkari", fabric: "Cotton", color: "Multicolour",
        occasions: ["Festival", "Daily Wear"],
        price: 3190, mrp: 4199,
        rating: 4.6, reviews: 176, stock: 10, deliveryDays: [2, 4],
        tags: ["hot"],
        images: [IMG(33711579, 900), IMG(26998087, 900)],
        alts: ["Smiling woman in a vibrant Kalamkari saree outdoors",
               "Two women in vibrant sarees against a rustic wall"],
        blouse: "Runs with a printed blouse piece (0.8 m)",
        care: "Wash separately in cold water.",
        desc: "Tree-of-life Kalamkari blocks in madder red and indigo — Andhra's oldest art, worn fresh."
      },
      {
        id: "meenakari-banarasi",
        name: "Meenakari Banarasi",
        collection: "Banarasi", fabric: "Pure silk", color: "Multicolour",
        occasions: ["Wedding", "Reception"],
        price: 15490, mrp: 19999,
        rating: 4.8, reviews: 148, stock: 5, deliveryDays: [3, 5],
        tags: ["new"],
        images: [IMG(29743627, 900), IMG(30193764, 900)],
        alts: ["Joyful woman in a vibrant Banarasi saree at a traditional wedding",
               "Two women in traditional sarees and jewellery, poised and elegant"],
        blouse: "Runs with a brocade blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "Meenakari detailing weaves tiny jewel colours into the zari — the Banarasi that changes shade as you move."
      },
      {
        id: "shikargah-banarasi",
        name: "Shikargah Banarasi",
        collection: "Banarasi", fabric: "Pure silk", color: "Green",
        occasions: ["Reception"],
        price: 17250, mrp: 21999,
        rating: 4.7, reviews: 112, stock: 4, deliveryDays: [3, 5],
        tags: ["hot"],
        images: [IMG(33729216, 900), IMG(5174199, 900)],
        alts: ["Woman in a rich green Banarasi saree in a lush garden",
               "Weaver crafting intricate patterns on a traditional loom"],
        blouse: "Runs with a plain silk blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "The legendary shikargah hunt scene, woven figure by figure into forest green katan silk."
      },
      {
        id: "lahari-uppada",
        name: "Lahari Uppada",
        collection: "Uppada", fabric: "Tissue silk", color: "Yellow",
        occasions: ["Sangeet", "Party Wear", "Baby Shower"],
        price: 6990, mrp: 8999,
        rating: 4.6, reviews: 121, stock: 7, deliveryDays: [3, 5],
        tags: ["new"],
        images: [IMG(19267195, 900), IMG(15226347, 900)],
        alts: ["Woman in a vibrant yellow Uppada saree with green blouse",
               "Portrait of a woman in a yellow saree against a grey background"],
        blouse: "Runs with a green contrast blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "Wave-light Uppada tissue in haldi yellow — folds smaller than a handkerchief, shines like noon."
      },
      {
        id: "tara-venkatagiri",
        name: "Tara Venkatagiri",
        collection: "Venkatagiri", fabric: "Pure silk", color: "Cream",
        occasions: ["Wedding", "Festival", "Baby Shower", "Puja & Rituals"],
        price: 8490, mrp: 10999,
        rating: 4.7, reviews: 139, stock: 6, deliveryDays: [3, 5],
        tags: ["bestseller"],
        images: [IMG(36994956, 900), IMG(36952539, 900)],
        alts: ["Elegant woman in a cream saree with yellow flowers",
               "Serene portrait of a woman in traditional cream attire outdoors"],
        blouse: "Runs with a zari blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "Venkatagiri's fine cream silk scattered with gold star buttas — quiet enough for puja, grand enough for the reception lunch."
      },
      {
        id: "amrapali-gadwal",
        name: "Amrapali Gadwal",
        collection: "Gadwal", fabric: "Silk-cotton", color: "Pink",
        occasions: ["Festival", "Wedding"],
        price: 7290, mrp: 9499,
        rating: 4.6, reviews: 107, stock: 8, deliveryDays: [3, 5],
        tags: ["trending"],
        images: [IMG(33067047, 900), IMG(33067049, 900)],
        alts: ["Young woman in a pink Gadwal saree against a lush green backdrop",
               "Elegant woman in a pink saree smiling in a garden"],
        blouse: "Runs with a silk blouse piece (0.8 m)",
        care: "Gentle dry clean.",
        desc: "Gadwal's famous trick — featherweight cotton body, pure silk border — in a rose that flatters every skin tone."
      },
      {
        id: "jade-mysore",
        name: "Jade Mysore silk",
        collection: "Mysore Silk", fabric: "Silk crepe", color: "Green",
        occasions: ["Office", "Party Wear"],
        price: 7990, mrp: 9999,
        rating: 4.7, reviews: 93, stock: 6, deliveryDays: [3, 5],
        tags: ["new"],
        images: [IMG(29819596, 900), IMG(36041222, 900)],
        alts: ["Smiling woman in a jade green Mysore silk saree outdoors",
               "Woman in a green saree standing among tall trees"],
        blouse: "Runs with a matching blouse piece (0.8 m)",
        care: "Dry clean only.",
        desc: "That unmistakable Mysore crepe sheen in cool jade — minimal border, maximum polish."
      },
      {
        id: "surya-pochampally",
        name: "Surya Pochampally",
        collection: "Pochampally", fabric: "Pure silk", color: "Orange",
        occasions: ["Festival", "Party Wear", "Puja & Rituals"],
        price: 6590, mrp: 8499,
        rating: 4.6, reviews: 118, stock: 7, deliveryDays: [3, 5],
        tags: ["bestseller"],
        images: [IMG(28943520, 900), IMG(7326221, 900)],
        alts: ["Woman in a vibrant orange Pochampally ikat saree, rustic backdrop",
               "Woman in a vibrant saree against a rustic brick wall"],
        blouse: "Runs with an ikat blouse piece (0.8 m)",
        care: "Dry clean recommended.",
        desc: "Sunset-orange ikat diamonds, tie-dyed before weaving in Bhoodan Pochampally — geometry with warmth."
      }
    ],

    /* ------------------------------------------------ reels ------------- */
    reels: [
      {
        video: "https://videos.pexels.com/video-files/7684694/7684694-hd_1080_1920_30fps.mp4",
        poster: "https://images.pexels.com/videos/7684694/pexels-photo-7684694.jpeg?cs=tinysrgb&dpr=1&w=500",
        caption: "That pallu drop ✨", views: "312K", likes: "24.1K",
        productId: "sindoora-kanjivaram"
      },
      {
        video: "https://videos.pexels.com/video-files/8810995/8810995-hd_1080_1920_25fps.mp4",
        poster: "https://images.pexels.com/videos/8810995/adult-art-bracelet-candle-8810995.jpeg?cs=tinysrgb&dpr=1&w=500",
        caption: "Diya-light test: passed", views: "198K", likes: "16.8K",
        productId: "aarti-kanjivaram"
      },
      {
        video: "https://videos.pexels.com/video-files/36520409/15485798_1080_1920_100fps.mp4",
        poster: "https://images.pexels.com/videos/36520409/pexels-photo-36520409.jpeg?cs=tinysrgb&dpr=1&w=500",
        caption: "Twirl check 💃", views: "451K", likes: "38.2K",
        productId: "gulaabi-venkatagiri"
      },
      {
        video: "https://videos.pexels.com/video-files/8811275/8811275-hd_1080_1920_25fps.mp4",
        poster: "https://images.pexels.com/videos/8811275/pexels-photo-8811275.jpeg?cs=tinysrgb&dpr=1&w=500",
        caption: "Gold hour, literally", views: "176K", likes: "14.3K",
        productId: "kanakam-banarasi"
      },
      {
        video: "https://videos.pexels.com/video-files/35040390/14843251_1080_1920_60fps.mp4",
        poster: "https://images.pexels.com/videos/35040390/4k-video-aesthetic-electric-railway-indian-saree-35040390.jpeg?cs=tinysrgb&dpr=1&w=500",
        caption: "Monday commute, upgraded", views: "287K", likes: "22.6K",
        productId: "roja-georgette"
      },
      {
        video: "https://videos.pexels.com/video-files/7685041/7685041-hd_1080_1920_30fps.mp4",
        poster: "https://images.pexels.com/videos/7685041/adult-authentic-beautiful-celebration-7685041.jpeg?cs=tinysrgb&dpr=1&w=500",
        caption: "Festival mode: on", views: "224K", likes: "19.5K",
        productId: "mela-handblock-cotton"
      },
      {
        video: "https://videos.pexels.com/video-files/36419491/15442464_1080_1920_100fps.mp4",
        poster: "https://images.pexels.com/videos/36419491/pexels-photo-36419491.jpeg?cs=tinysrgb&dpr=1&w=500",
        caption: "Ikat up close", views: "163K", likes: "12.9K",
        productId: "neelam-pochampally"
      },
      {
        video: "https://videos.pexels.com/video-files/36423364/15443889_1080_1920_100fps.mp4",
        poster: "https://images.pexels.com/videos/36423364/pexels-photo-36423364.jpeg?cs=tinysrgb&dpr=1&w=500",
        caption: "Sunlight + Uppada silk", views: "142K", likes: "11.4K",
        productId: "kesari-uppada"
      },
      {
        video: "https://videos.pexels.com/video-files/36520406/15485790_1080_1920_100fps.mp4",
        poster: "https://images.pexels.com/videos/36520406/pexels-photo-36520406.jpeg?cs=tinysrgb&dpr=1&w=500",
        caption: "Border details 🔍", views: "98K", likes: "8.4K",
        productId: "surya-pochampally"
      },
      {
        video: "https://videos.pexels.com/video-files/36520410/15485807_1080_1920_100fps.mp4",
        poster: "https://images.pexels.com/videos/36520410/pexels-photo-36520410.jpeg?cs=tinysrgb&dpr=1&w=500",
        caption: "Green & gold, no filter", views: "187K", likes: "15.2K",
        productId: "pachcha-dharmavaram"
      },
      {
        video: "https://videos.pexels.com/video-files/36520413/15485814_1080_1920_100fps.mp4",
        poster: "https://images.pexels.com/videos/36520413/pexels-photo-36520413.jpeg?cs=tinysrgb&dpr=1&w=500",
        caption: "Ilkal classic, back in stock", views: "121K", likes: "9.7K",
        productId: "chandrakala-ilkal"
      },
      {
        video: "https://videos.pexels.com/video-files/38201169/16217337_1080_1920_29fps.mp4",
        poster: "https://images.pexels.com/videos/38201169/pexels-photo-38201169.jpeg?cs=tinysrgb&dpr=1&w=500",
        caption: "Wedding guest? Sorted.", views: "265K", likes: "21.3K",
        productId: "meenakari-banarasi"
      }
    ],
    reelsInitial: 6,

    /* ------------------------------------------------ save tiers -------- */
    saveTiers: [
      { qty: 2, off: 5,  note: "Two sarees" },
      { qty: 3, off: 10, note: "Three sarees" },
      { qty: 5, off: 15, note: "Five or more" }
    ],
    saveTiersLine: "Buy 2 sarees, get 5% off. Buy 3, get 10% off. Buy 5, get 15% off. Discount is added automatically in your cart.",

    /* ------------------------------------------------ customer reviews ---
       Photo-first reviews: customer photo, one short plain line, stars.
       CTA is always "View this saree" (never "shop her saree").            */
    reviewsEyebrow: "Customer reviews",
    reviewsTitle: "Our customers, in their new sarees",
    reviewsSub: "Tap any photo to see the saree they bought.",
    ugc: [
      { photo: IMG(37550166, 600), alt: "Customer taking a selfie in her cream and gold Kasavu saree",   name: "Lakshmi",  city: "Kochi",     productId: "thira-kasavu",           rating: 5, line: "Loved the design, loved the fabric." },
      { photo: IMG(33067039, 600), alt: "Smiling customer in her pink saree outdoors",                    name: "Ananya",   city: "Hyderabad", productId: "gulaabi-venkatagiri",    rating: 5, line: "Colour is exactly like the photos." },
      { photo: IMG(34799137, 600), alt: "Customer laughing in her colourful saree under a blue sky",      name: "Meera",    city: "Chennai",   productId: "mela-handblock-cotton",  rating: 5, line: "Got it in 3 days. So soft!" },
      { photo: IMG(29601839, 600), alt: "Customer in her vibrant orange saree, smiling outdoors",         name: "Sneha",    city: "Vizag",     productId: "mandara-narayanpet",     rating: 4, line: "Everyone asked where I bought it." },
      { photo: IMG(21008999, 600), alt: "Two friends smiling together in their new sarees",               name: "Priya & Kavya", city: "Bengaluru", productId: "pista-mul-cotton",   rating: 5, line: "We ordered matching ones!" },
      { photo: IMG(38372672, 600), alt: "Customer in glasses smiling in her linen saree",                 name: "Divya",    city: "Pune",      productId: "vanam-linen",            rating: 5, line: "Perfect for office. Very comfortable." },
      { photo: IMG(19668292, 600), alt: "Customer posing in her pink georgette saree in a meadow",        name: "Ritika",   city: "Jaipur",    productId: "rani-georgette",         rating: 4, line: "Best saree in my cupboard now." },
      { photo: IMG(4428278, 600),  alt: "Joyful customer in her Kanjivaram saree",                        name: "Saraswathi Amma", city: "Madurai", productId: "kanakadhara-kanjivaram", rating: 5, line: "Zari is original. I checked!" }
    ],

    /* ------------------------------------------------ trust ------------- */
    trust: [
      { icon: "shield",   line: "100% authentic, quality-checked sarees" },
      { icon: "lock",     line: "Secure payments — UPI, cards, COD" },
      { icon: "refresh",  line: "7-day easy returns, no questions" },
      { icon: "truck",    line: "Fast shipping across India" },
      { icon: "whatsapp", line: "Shop over WhatsApp, like you already do" },
      { icon: "video",    line: "Book a video shopping appointment" },
      { icon: "pin",      line: "Live order tracking, dispatch to door" },
      { icon: "headset",  line: "Real people on support, 10 am–8 pm" }
    ],

    /* ------------------------------------------------ video call -------- */
    videoCall: {
      eyebrow: "Personal shopping",
      title: "Shop via video call",
      line: "Can't decide from photos? Book a live video call — we'll show you the saree in hand, in daylight, and answer everything before you buy.",
      button: "Book a video call",
      image: IMG(8886948, 1000),
      alt: "Customer examining saree fabric with help from a shop assistant",
      points: ["See the real colour on video", "Ask anything, live", "No booking fee"]
    },

    /* ------------------------------------------------ community/footer -- */
    community: {
      whatsapp: {
        title: "Join our WhatsApp channel",
        line: "New arrivals, restock alerts and offers — daily updates, no spam.",
        button: "Join on WhatsApp"
      },
      instagram: {
        title: "Follow us on Instagram",
        line: "Daily drape videos, styling ideas and behind-the-scenes.",
        button: "Follow @thesareehouse",
        url: "https://instagram.com/thesareehouse"
      }
    },

    footer: {
      about: "The Saree House brings handpicked handloom and designer sarees from weaving towns across India to your doorstep — with real humans to help you choose.",
      note: "Prices include all taxes. Blouse stitching available on request."
    }
  };

  /* Mock review content — deterministic per product (seeded), so the PDP
     always shows the same believable reviews without a backend. */
  DATA.reviewSeeds = {
    names: ["Anita S.", "Kavya R.", "Shalini M.", "Deepa N.", "Ritu P.", "Sneha K.",
            "Vidya T.", "Pooja B.", "Radhika V.", "Nithya J.", "Aparna D.", "Farah L."],
    cities: ["Chennai", "Hyderabad", "Bengaluru", "Mumbai", "Coimbatore", "Vizag",
             "Pune", "Kochi", "Mysuru", "Delhi", "Vijayawada", "Trichy"],
    quotes: [
      "Colour is true to the photos. Fall is lovely.",
      "Got so many compliments. Blouse piece is generous.",
      "Packaging was beautiful — felt like a gift to myself.",
      "Delivered two days early. Quality feels above the price.",
      "The border is even prettier in person.",
      "Second order from this store. Consistency is rare — they have it.",
      "Draped easily, pleats hold well all day.",
      "Sent a WhatsApp query at night, got a reply in minutes.",
      "Zari work is neat, no loose threads anywhere.",
      "Light on the shoulder even after six hours of function."
    ]
  };

  window.SAREE_HOUSE = DATA;
})();
