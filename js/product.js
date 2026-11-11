/* =========================================================================
   THE SAREE HOUSE — PRODUCT DETAIL
   Gallery + zoom, price/offer, stock, delivery, reviews (seeded mock),
   wishlist, add-to-cart, related rail, sticky mobile buy bar.
   ========================================================================= */

(function () {
  "use strict";

  var D = window.SAREE_HOUSE;

  document.addEventListener("DOMContentLoaded", function () {
    var A = window.SareeHouseApp;
    var $ = A.$, $$ = A.$$, esc = A.esc, money = A.money, I = A.icons;

    var root = $("#pdp-root");
    var id = new URLSearchParams(location.search).get("id");
    var p = A.product(id) || null;

    if (!p) {
      root.innerHTML =
        '<div class="error-block">' +
          "<h1>We can't find that saree</h1>" +
          "<p>It may have sold out or the link is incomplete. The full collection is one tap away.</p>" +
          '<a class="btn btn--primary" href="shop.html">Browse all sarees</a>' +
        "</div>";
      $("#related-wrap").classList.add("hidden");
      $("#related-occ-wrap").classList.add("hidden");
      return;
    }

    document.title = p.name + " — " + D.brand.name;

    /* ---------- deterministic mock reviews ---------- */
    function seededReviews(prod) {
      var seed = 0;
      for (var i = 0; i < prod.id.length; i++) seed = (seed * 31 + prod.id.charCodeAt(i)) % 997;
      function rnd() { seed = (seed * 73 + 41) % 997; return seed / 997; }
      var S = D.reviewSeeds, out = [], n = 3;
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
      for (var k = 0; k < n; k++) {
        var stars = rnd() > 0.72 ? 4 : 5;
        out.push({
          name: S.names[Math.floor(rnd() * S.names.length)],
          city: S.cities[Math.floor(rnd() * S.cities.length)],
          quote: S.quotes[Math.floor(rnd() * S.quotes.length)],
          stars: stars,
          date: months[Math.floor(rnd() * months.length)] + " 2026"
        });
      }
      return out;
    }

    /* ---------- render ---------- */
    var low = p.stock <= 5;
    var wished = A.wishlist().indexOf(p.id) >= 0;
    var occLinks = p.occasions.map(function (o) {
      return '<a href="shop.html?occasion=' + encodeURIComponent(o) + '">' + esc(o) + "</a>";
    }).join(", ");

    root.innerHTML =
      '<nav class="breadcrumb" aria-label="Breadcrumb">' +
        '<a href="index.html">Home</a> <span aria-hidden="true">/</span> ' +
        '<a href="shop.html">Shop</a> <span aria-hidden="true">/</span> ' +
        '<a href="shop.html?collection=' + encodeURIComponent(p.collection) + '">' + esc(p.collection) + "</a>" +
        ' <span aria-hidden="true">/</span> <span aria-current="page">' + esc(p.name) + "</span>" +
      "</nav>" +
      '<div class="pdp__layout">' +
        '<div class="pdp__gallery">' +
          '<button class="pdp__main" type="button" id="pdp-main" aria-label="Zoom photo of ' + esc(p.name) + '">' +
            '<span class="img-frame"><img id="pdp-main-img" src="' + esc(p.images[0]) + '" alt="' + esc(p.alts[0]) + '" fetchpriority="high"></span>' +
            '<span class="zoom-hint">' + I.zoom + " Tap to zoom</span>" +
          "</button>" +
          '<div class="pdp__thumbs" role="tablist" aria-label="Product photos">' +
            p.images.map(function (src, i) {
              return '<button type="button" role="tab" class="' + (i === 0 ? "active" : "") + '" data-thumb="' + i + '" aria-label="Photo ' + (i + 1) + '" aria-selected="' + (i === 0) + '">' +
                '<img src="' + esc(src.replace("w=900", "w=200")) + '" alt="">' +
              "</button>";
            }).join("") +
          "</div>" +
        "</div>" +
        '<div class="pdp__info">' +
          "<h1>" + esc(p.name) + "</h1>" +
          '<p class="pdp__collline">' + esc(p.collection) + " · " + esc(p.fabric) + " · " + esc(p.color) + "</p>" +
          '<a class="pdp__rating" href="#reviews">' +
            '<span class="stars" role="img" aria-label="Rated ' + p.rating + ' out of 5">' + A.stars(p.rating) + "</span>" +
            "<span>" + p.rating.toFixed(1) + " · " + p.reviews + " reviews</span>" +
          "</a>" +
          '<div class="pdp__price">' +
            '<span class="price-now">' + money(p.price) + "</span>" +
            '<span class="price-mrp">MRP ' + money(p.mrp) + "</span>" +
            '<span class="price-off">' + A.pctOff(p) + "% off</span>" +
          "</div>" +
          '<p class="pdp__taxline">Inclusive of all taxes · Free delivery over ' + money(D.brand.freeShippingOver) + "</p>" +
          '<p class="pdp__stock' + (low ? " low" : "") + '"><span class="dot"></span>' +
            (low ? "Only " + p.stock + " left in stock" : "In stock — ready to ship") + "</p>" +
          '<p class="pdp__delivery">' + I.truck + " Delivers in " + p.deliveryDays[0] + "–" + p.deliveryDays[1] + " days across India</p>" +
          '<div class="pdp__ctas">' +
            '<button class="btn btn--primary" type="button" id="add-cart">' + I.bag + " Add to cart</button>" +
            '<button class="wish' + (wished ? " on" : "") + '" type="button" data-wish="' + p.id + '" aria-pressed="' + wished + '" aria-label="Save to wishlist">' + I.heart + "</button>" +
          "</div>" +
          '<p class="pdp__desc">' + esc(p.desc) + "</p>" +
          '<dl class="pdp__facts">' +
            '<div class="fact"><dt>Fabric</dt><dd>' + esc(p.fabric) + "</dd></div>" +
            '<div class="fact"><dt>Collection</dt><dd>' + esc(p.collection) + "</dd></div>" +
            '<div class="fact"><dt>Occasions</dt><dd>' + occLinks + "</dd></div>" +
            '<div class="fact"><dt>Blouse</dt><dd>' + esc(p.blouse) + "</dd></div>" +
            '<div class="fact"><dt>Care</dt><dd>' + esc(p.care) + "</dd></div>" +
          "</dl>" +
        "</div>" +
      "</div>" +
      '<section class="pdp-reviews" id="reviews">' +
        '<div class="section-head"><div><span class="eyebrow">Reviews</span><h2>What buyers say</h2></div></div>' +
        '<div class="summary">' +
          '<span class="big">' + p.rating.toFixed(1) + "</span>" +
          '<span><span class="stars">' + A.stars(p.rating) + '</span><span class="count">' + p.reviews + " verified ratings</span></span>" +
        "</div>" +
        '<div class="review-list">' +
          seededReviews(p).map(function (r) {
            return '<article class="review">' +
              '<div class="stars" role="img" aria-label="' + r.stars + ' out of 5 stars">' + A.stars(r.stars) + "</div>" +
              "<p>" + esc(r.quote) + "</p>" +
              '<div class="who"><span>' + esc(r.name) + " · " + esc(r.city) + "</span><span>·</span><span>" + esc(r.date) +
              '</span><span class="verified">' + I.check + " Verified</span></div>" +
            "</article>";
          }).join("") +
        "</div>" +
      "</section>";

    A.refreshLoadedFrames(root);

    /* wishlist on PDP */
    $("[data-wish]", root).addEventListener("click", function () {
      A.toggleWish(p.id);
    });

    /* add to cart */
    $("#add-cart").addEventListener("click", function () { A.addToCart(p.id, 1); });

    /* ---------- gallery ---------- */
    var mainImg = $("#pdp-main-img");
    var current = 0;
    $$("[data-thumb]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        current = Number(b.getAttribute("data-thumb"));
        mainImg.src = p.images[current];
        mainImg.alt = p.alts[current] || p.alts[0];
        $$("[data-thumb]", root).forEach(function (x) {
          var on = x === b;
          x.classList.toggle("active", on);
          x.setAttribute("aria-selected", String(on));
        });
      });
    });

    /* ---------- lightbox zoom ---------- */
    var lightbox = $("#lightbox");
    var lbImg = $("#lightbox-stage img");
    $("#lightbox-close").innerHTML = I.close;
    function openLightbox() {
      lbImg.src = p.images[current].replace("w=900", "w=1600");
      lbImg.alt = p.alts[current] || p.alts[0];
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
      $("#lightbox-close").focus();
    }
    function closeLightbox() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
      $("#pdp-main").focus();
    }
    $("#pdp-main").addEventListener("click", openLightbox);
    $("#lightbox-close").addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.id === "lightbox-stage" || e.target === lbImg) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    });

    /* ---------- sticky mobile buy bar ---------- */
    var bar = $("#stickybar");
    bar.innerHTML =
      "<div><span class=\"price-now\">" + money(p.price) + "</span> " +
      "<span class=\"price-mrp\">" + money(p.mrp) + "</span></div>" +
      '<button class="btn btn--primary" type="button" id="bar-add">Add to cart</button>';
    $("#bar-add").addEventListener("click", function () { A.addToCart(p.id, 1); });

    if ("IntersectionObserver" in window) {
      var ctas = $(".pdp__ctas");
      var io = new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        bar.classList.toggle("show", !visible);
        bar.setAttribute("aria-hidden", String(visible));
        document.body.classList.toggle("has-stickybar", !visible);
      }, { threshold: 0 });
      io.observe(ctas);
    }

    /* ---------- related: same collection ---------- */
    var relColl = D.products.filter(function (x) {
      return x.id !== p.id && x.collection === p.collection;
    }).slice(0, 8);
    if (relColl.length) {
      $("#rel-coll-title").textContent = "More " + p.collection + " sarees";
      $("#rel-coll-viewall").href = "shop.html?collection=" + encodeURIComponent(p.collection);
      var rail = $("#related-rail");
      rail.innerHTML = relColl.map(function (x) { return A.cardHTML(x); }).join("");
      A.bindCards(rail);
    } else {
      $("#related-wrap").classList.add("hidden");
    }

    /* ---------- related: same occasion ---------- */
    var occ = p.occasions[0];
    var relOcc = D.products.filter(function (x) {
      return x.id !== p.id && x.occasions.indexOf(occ) >= 0 &&
        !relColl.some(function (r) { return r.id === x.id; });
    }).slice(0, 8);
    if (occ && relOcc.length) {
      $("#rel-occ-title").textContent = "More for " + occ;
      $("#rel-occ-viewall").href = "shop.html?occasion=" + encodeURIComponent(occ);
      var occRail = $("#related-occ-rail");
      occRail.innerHTML = relOcc.map(function (x) { return A.cardHTML(x); }).join("");
      A.bindCards(occRail);
    } else {
      $("#related-occ-wrap").classList.add("hidden");
    }
    A.watchReveals(document);
  });
})();
