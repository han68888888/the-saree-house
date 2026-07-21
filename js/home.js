/* =========================================================================
   DIVYA'S SAREES — HOMEPAGE
   Offer strip (desktop), occasion tiles with counts, compact reels rail
   with View all, collections, product rails, reviews, trust, newsletter.
   Data in, DOM out.
   ========================================================================= */

(function () {
  "use strict";

  var D = window.DIVYA;

  document.addEventListener("DOMContentLoaded", function () {
    var A = window.DivyaApp;
    var $ = A.$, $$ = A.$$, esc = A.esc, money = A.money, I = A.icons;

    /* ================= slim offer strip (desktop only) ================= */
    (function offerStrip() {
      var mount = $("#offer-strip");
      if (!mount) return;
      var slides = D.heroSlides;
      mount.innerHTML =
        slides.map(function (s, i) {
          return '<div class="offer-strip__slide' + (i === 0 ? " active" : "") + '" role="group" aria-roledescription="slide" ' +
            'aria-label="' + (i + 1) + " of " + slides.length + '"' + (i === 0 ? "" : ' aria-hidden="true"') + ">" +
            '<img src="' + esc(s.image) + '" alt="' + esc(s.alt) + '"' + (i === 0 ? ' fetchpriority="high"' : ' loading="lazy"') + ">" +
            '<div class="offer-strip__copy">' +
              '<span class="offer-strip__badge">' + esc(s.badge) + "</span>" +
              "<h2>" + esc(s.headline) + "</h2>" +
              '<a class="btn btn--primary btn--sm go" href="' + esc(s.ctaPrimary.href) + '">' + esc(s.ctaPrimary.label) + "</a>" +
            "</div>" +
          "</div>";
        }).join("") +
        '<button class="offer-strip__arrow offer-strip__arrow--prev" type="button" aria-label="Previous offer">' + I.chevL + "</button>" +
        '<button class="offer-strip__arrow offer-strip__arrow--next" type="button" aria-label="Next offer">' + I.chevR + "</button>" +
        '<div class="offer-strip__pills">' +
          D.quickFilters.map(function (q) {
            return '<a href="' + esc(q.href) + '">' + esc(q.label) + "</a>";
          }).join("") +
        "</div>" +
        '<div class="offer-strip__dots" role="tablist" aria-label="Choose offer">' +
          slides.map(function (s, i) {
            return '<button type="button" role="tab" aria-label="Offer ' + (i + 1) + '" aria-current="' + (i === 0) + '"></button>';
          }).join("") +
        "</div>";

      var els = $$(".offer-strip__slide", mount);
      var dots = $$(".offer-strip__dots button", mount);
      var idx = 0, timer = null, INTERVAL = 5000;

      function setSlide(n) {
        idx = (n + els.length) % els.length;
        els.forEach(function (el, i) {
          el.classList.toggle("active", i === idx);
          el.setAttribute("aria-hidden", i === idx ? "false" : "true");
        });
        dots.forEach(function (d, i) { d.setAttribute("aria-current", String(i === idx)); });
      }
      /* Always-on rotation. It must never be able to get stuck, so the timer
         is self-healing: a single ticker checks the clock instead of relying
         on pause/resume pairs (a missed mouseleave on touch used to freeze
         the carousel permanently). */
      var lastAdvance = Date.now();
      var pausedUntil = 0; /* a deadline, never an on/off flag */

      function go(n) { setSlide(n); lastAdvance = Date.now(); }

      /* Hovering holds the current slide, but the hold EXPIRES on its own.
         A pause that depends on a matching mouseleave can be orphaned (the
         pointer leaves the window, the tab blurs, a touch fires a synthetic
         mouseenter) and the carousel would then sit frozen forever. */
      function holdBriefly() { pausedUntil = Date.now() + 2000; }
      function release() { pausedUntil = 0; lastAdvance = Date.now(); }

      setInterval(function () {
        /* keep the clock rolling in a background tab so coming back doesn't
           snap through several slides at once */
        if (document.hidden) { lastAdvance = Date.now(); return; }
        if (Date.now() < pausedUntil) { lastAdvance = Date.now(); return; }
        if (Date.now() - lastAdvance >= INTERVAL) go(idx + 1);
      }, 400);

      $(".offer-strip__arrow--prev", mount).addEventListener("click", function () { go(idx - 1); });
      $(".offer-strip__arrow--next", mount).addEventListener("click", function () { go(idx + 1); });
      dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); }); });

      /* only a real, moving mouse holds it — and only while it keeps moving */
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        mount.addEventListener("mousemove", holdBriefly);
        mount.addEventListener("mouseleave", release);
      }
      A.refreshLoadedFrames(mount);
    })();

    /* ================= occasions: illustrated collection banners =========
       The wordmark is real type over the artwork, so renaming an occasion
       in data.js is all it takes to re-label a banner.                    */
    $("#occasion-grid").innerHTML = D.occasions.map(function (o) {
      var count = D.products.filter(function (p) { return p.occasions.indexOf(o.name) >= 0; }).length;
      return '<a class="occ-banner reveal" href="shop.html?occasion=' + encodeURIComponent(o.name) + '">' +
        A.imgFrame(o.art || o.image, o.name + " collection") +
        '<span class="occ-banner__wm">' +
          "<strong>" + esc(o.name) + "</strong>" +
          "<em>Collections</em>" +
          '<span class="count">' + count + (count === 1 ? " style" : " styles") + "</span>" +
        "</span>" +
      "</a>";
    }).join("");

    /* ================= fabric tiles ================= */
    $("#fabric-grid").innerHTML = D.fabrics.map(function (f, i) {
      var count = D.products.filter(function (p) {
        return p.fabric.toLowerCase().indexOf(f.name.toLowerCase()) >= 0;
      }).length;
      return '<a class="tile reveal" style="transition-delay:' + (i % 3) * 60 + 'ms" href="shop.html?fabric=' + encodeURIComponent(f.name) + '">' +
        A.imgFrame(f.image, f.name + " sarees") +
        '<span class="tile__label"><span class="accent" style="background:var(--zari)"></span>' +
          "<strong>" + esc(f.name) + "</strong><span>" + esc(f.line) + "</span>" +
          (count ? '<span class="count">' + count + (count === 1 ? " style" : " styles") + "</span>" : "") +
        "</span>" +
      "</a>";
    }).join("");

    /* ================= collections rail ================= */
    $("#coll-rail").innerHTML = D.collections.map(function (c) {
      var count = D.products.filter(function (p) {
        return p.collection === c.name || (c.isFabric && (p.fabric.toLowerCase().indexOf(c.name.toLowerCase()) >= 0));
      }).length;
      return '<a class="coll-card" href="shop.html?collection=' + encodeURIComponent(c.name) + '">' +
        A.imgFrame(c.image, c.name + " collection") +
        "<strong>" + esc(c.name) + "</strong>" +
        (count ? "<span>" + count + (count === 1 ? " style" : " styles") + "</span>" : "") +
      "</a>";
    }).join("");

    /* ================= product grids (vertical, capped at 10) ============ */
    $$("[data-rail]").forEach(function (rail) {
      var tag = rail.getAttribute("data-rail");
      var items = D.products.filter(function (p) { return p.tags.indexOf(tag) >= 0; }).slice(0, 10);
      rail.innerHTML = items.map(function (p) { return A.cardHTML(p, { forceTag: tag }); }).join("");
      A.bindCards(rail);
    });

    /* ================= reels — compact rail + View all ================= */
    (function reels() {
      var rail = $("#reel-rail");
      var initial = D.reelsInitial || 6;
      rail.innerHTML = D.reels.map(function (r, i) {
        var p = A.product(r.productId);
        var extra = i >= initial;
        return '<article class="reel' + (extra ? " extra" : "") + '"' + (extra ? " hidden" : "") + ' data-i="' + i + '">' +
          '<div class="reel__stage">' +
            '<video muted playsinline loop preload="none" poster="' + esc(r.poster) + '" aria-label="Reel: ' + esc(r.caption) + '">' +
              '<source data-src="' + esc(r.video) + '" type="video/mp4">' +
            "</video>" +
            '<img class="poster" src="' + esc(r.poster) + '" alt="" aria-hidden="true" loading="lazy">' +
            '<div class="reel__grad"></div>' +
            '<button class="reel__sound" type="button" aria-label="Unmute reel" aria-pressed="false">' + I.soundOff + "</button>" +
            '<button class="reel__play" type="button" aria-label="Play reel">' + I.play + "</button>" +
            '<div class="reel__stats">' +
              '<span class="reel__caption">' + esc(r.caption) + "</span>" +
              '<span class="reel__counts"><span>' + I.eye + " " + r.views + "</span><span>" + I.heartMini + " " + r.likes + "</span></span>" +
            "</div>" +
          "</div>" +
          '<div class="reel__stitch" aria-hidden="true"></div>' +
          (p ?
            '<a class="reel__product" href="product.html?id=' + p.id + '">' +
              A.imgFrame(p.images[0].replace("w=900", "w=200"), "") +
              "<span><strong>" + esc(p.name) + '</strong><span class="price-now">' + money(p.price) + "</span>" +
              '<span class="shoplook">Shop this look →</span></span>' +
            "</a>" : "") +
        "</article>";
      }).join("");
      A.refreshLoadedFrames(rail);

      var viewAll = $("#reel-viewall");
      if (viewAll) {
        if (D.reels.length <= initial) viewAll.hidden = true;
        viewAll.addEventListener("click", function () {
          $$(".reel.extra", rail).forEach(function (r) { r.hidden = false; });
          viewAll.hidden = true;
          A.refreshLoadedFrames(rail);
        });
      }

      /* floating left/right arrows — each pair scrolls its own rail */
      $$(".reel-arrow").forEach(function (b) {
        b.innerHTML = b.classList.contains("reel-arrow--next") ? I.chevR : I.chevL;
        var target = b.parentElement.querySelector(".reel-rail, .coll-rail");
        if (!target) return;
        b.addEventListener("click", function () {
          var dir = b.classList.contains("reel-arrow--next") ? 1 : -1;
          target.scrollBy({ left: dir * Math.max(target.clientWidth * 0.8, 220), behavior: A.reducedMotion ? "auto" : "smooth" });
        });
      });

      var reelEls = $$(".reel", rail);

      function ensureSrc(video) {
        var s = $("source", video);
        if (s && !s.src) { s.src = s.getAttribute("data-src"); video.load(); }
      }
      function tryPlay(reel) {
        var video = $("video", reel);
        ensureSrc(video);
        var pr = video.play();
        if (pr && pr.then) {
          pr.then(function () { reel.classList.remove("needs-tap"); })
            .catch(function () { reel.classList.add("needs-tap"); });
        }
      }
      function pauseReel(reel) {
        var video = $("video", reel);
        if (!video.paused) video.pause();
      }

      reelEls.forEach(function (reel) {
        var video = $("video", reel);
        video.addEventListener("playing", function () { reel.classList.add("playing"); });
        $(".reel__play", reel).addEventListener("click", function () { tryPlay(reel); });
        var soundBtn = $(".reel__sound", reel);
        soundBtn.addEventListener("click", function () {
          video.muted = !video.muted;
          soundBtn.innerHTML = video.muted ? I.soundOff : I.soundOn;
          soundBtn.setAttribute("aria-label", video.muted ? "Unmute reel" : "Mute reel");
          soundBtn.setAttribute("aria-pressed", String(!video.muted));
          if (video.paused) tryPlay(reel);
        });
      });

      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            var reel = en.target;
            if (en.isIntersecting && en.intersectionRatio >= 0.55) {
              if (A.reducedMotion) { reel.classList.add("needs-tap"); return; }
              tryPlay(reel);
            } else {
              pauseReel(reel);
            }
          });
        }, { threshold: [0, 0.55] });
        reelEls.forEach(function (r) { io.observe(r); });
      } else {
        reelEls.forEach(function (r) { r.classList.add("needs-tap"); });
      }
    })();

    /* ================= customer reviews (photo-first) ================= */
    (function reviews() {
      $("#ugc-eyebrow").textContent = D.reviewsEyebrow;
      $("#ugc-title").textContent = D.reviewsTitle;
      $("#ugc-sub").textContent = D.reviewsSub;
      var rail = $("#ugc-rail");
      rail.innerHTML = D.ugc.map(function (u) {
        var p = A.product(u.productId);
        return '<a class="ugc" href="product.html?id=' + (p ? p.id : "") + '" aria-label="' +
          esc("Review by " + u.name + " from " + u.city) + '">' +
          A.imgFrame(u.photo, u.alt) +
          '<span class="ugc__cap">' +
            '<span class="stars" role="img" aria-label="' + u.rating + ' out of 5 stars">' + A.stars(u.rating) + "</span>" +
            '<span class="line">"' + esc(u.line) + '"</span>' +
            '<span class="who">' + esc(u.name) + " · " + esc(u.city) + "</span>" +
            (p ? '<span class="shop">View this saree</span>' : "") +
          "</span></a>";
      }).join("");
      A.refreshLoadedFrames(rail);
      $$("[data-testi]").forEach(function (b) {
        b.innerHTML = b.getAttribute("data-testi") === "-1" ? I.chevL : I.chevR;
        b.addEventListener("click", function () {
          rail.scrollBy({ left: 265 * Number(b.getAttribute("data-testi")), behavior: A.reducedMotion ? "auto" : "smooth" });
        });
      });
    })();

    /* ================= trust ================= */
    $("#trust-grid").innerHTML = D.trust.map(function (t) {
      return '<div class="trust"><span class="trust__icon">' + (A.trustIcons[t.icon] || "") + "</span><span>" + esc(t.line) + "</span></div>";
    }).join("");

    /* ================= shop via video call ================= */
    (function videoCall() {
      var v = D.videoCall;
      var mount = $("#vcall");
      if (!v || !mount) return;
      mount.innerHTML =
        '<div class="vcall__copy">' +
          '<span class="eyebrow">' + esc(v.eyebrow) + "</span>" +
          "<h2>" + esc(v.title) + "</h2>" +
          "<p>" + esc(v.line) + "</p>" +
          '<ul class="vcall__points">' +
            v.points.map(function (pt) { return "<li>" + I.check + esc(pt) + "</li>"; }).join("") +
          "</ul>" +
          '<a class="btn btn--primary" href="' + A.waLink("Hi! I'd like to book a video call to see some sarees.") +
            '" target="_blank" rel="noopener">' + I.video + " " + esc(v.button) + "</a>" +
        "</div>" +
        '<div class="vcall__media">' +
          A.imgFrame(v.image, v.alt) +
          '<span class="vcall__selvedge" aria-hidden="true"></span>' +
        "</div>";
      A.refreshLoadedFrames(mount);
    })();

    /* ================= community (WhatsApp channel + Instagram) ========= */
    (function community() {
      var c = D.community;
      var mount = $("#community-cards");
      if (!c || !mount) return;
      mount.innerHTML =
        '<div class="community__card">' +
          '<span class="community__icon community__icon--wa">' + I.whatsapp + "</span>" +
          "<h3>" + esc(c.whatsapp.title) + "</h3>" +
          "<p>" + esc(c.whatsapp.line) + "</p>" +
          '<a class="btn btn--wa" href="' + A.waLink("Hi! Please add me to the Divya's Sarees updates channel.") + '" target="_blank" rel="noopener">' +
            I.whatsapp + " " + esc(c.whatsapp.button) + "</a>" +
        "</div>" +
        '<div class="community__card">' +
          '<span class="community__icon community__icon--ig">' + I.instagram + "</span>" +
          "<h3>" + esc(c.instagram.title) + "</h3>" +
          "<p>" + esc(c.instagram.line) + "</p>" +
          '<a class="btn btn--ghost" href="' + esc(c.instagram.url) + '" target="_blank" rel="noopener">' +
            I.instagram + " " + esc(c.instagram.button) + "</a>" +
        "</div>";
    })();

    A.watchReveals(document);
  });
})();
