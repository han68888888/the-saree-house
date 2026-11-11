/* =========================================================================
   THE SAREE HOUSE — SHARED APP CORE
   Header, footer, drawers, cart, wishlist, product cards, helpers.
   Reads everything from window.SAREE_HOUSE (js/data.js). No backend.
   ========================================================================= */

(function () {
  "use strict";

  var D = window.SAREE_HOUSE;

  /* ---------------- helpers ---------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function money(n) { return "₹" + Number(n).toLocaleString("en-IN"); }
  function pctOff(p) { return Math.round((1 - p.price / p.mrp) * 100); }
  function product(id) {
    for (var i = 0; i < D.products.length; i++) if (D.products[i].id === id) return D.products[i];
    return null;
  }
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- icons ---------------- */
  var I = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6.3 7h11.4l1.2 12.2a1.5 1.5 0 0 1-1.5 1.8H6.6a1.5 1.5 0 0 1-1.5-1.8L6.3 7Z"/><path d="M9 9.5V6a3 3 0 0 1 6 0v3.5"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 20.5S4 15.3 4 9.9C4 7.2 6.1 5 8.8 5c1.3 0 2.5.7 3.2 1.7A3.9 3.9 0 0 1 15.2 5C17.9 5 20 7.2 20 9.9c0 5.4-8 10.6-8 10.6Z"/></svg>',
    star: '<svg class="star" viewBox="0 0 24 24"><path d="M12 2.6l2.8 6 6.4.7-4.8 4.4 1.3 6.3L12 16.8 6.3 20l1.3-6.3L2.8 9.3l6.4-.7 2.8-6z"/></svg>',
    starMuted: '<svg class="star" viewBox="0 0 24 24" style="fill:#DCCFB8"><path d="M12 2.6l2.8 6 6.4.7-4.8 4.4 1.3 6.3L12 16.8 6.3 20l1.3-6.3L2.8 9.3l6.4-.7 2.8-6z"/></svg>',
    chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 6L9 12l5.5 6"/></svg>',
    chevR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 6L15 12l-5.5 6"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.8v14.4a.7.7 0 0 0 1.1.6l11-7.2a.7.7 0 0 0 0-1.2l-11-7.2a.7.7 0 0 0-1.1.6Z"/></svg>',
    soundOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4Z" fill="currentColor" stroke="none"/><path d="M16 9.8l4.5 4.5M20.5 9.8L16 14.3"/></svg>',
    soundOn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4Z" fill="currentColor" stroke="none"/><path d="M15.5 9.2a4 4 0 0 1 0 5.6M18 6.8a7.4 7.4 0 0 1 0 10.4"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.6"/></svg>',
    heartMini: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.5S4 15.3 4 9.9C4 7.2 6.1 5 8.8 5c1.3 0 2.5.7 3.2 1.7A3.9 3.9 0 0 1 15.2 5C17.9 5 20 7.2 20 9.9c0 5.4-8 10.6-8 10.6Z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a9.9 9.9 0 0 0-8.6 14.9L2 22l5.3-1.4A10 10 0 1 0 12 2Zm0 18.1a8 8 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 1.9 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.4-.2Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3l7 2.6v5.6c0 4.4-2.9 7.6-7 9.2-4.1-1.6-7-4.8-7-9.2V5.6L12 3Z"/><path d="M9 12l2.2 2.2L15.5 9.7" stroke-linecap="round"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.5M20 4v4.5h-4.5"/><path d="M20 12a8 8 0 0 1-13.7 5.7L4 15.5M4 20v-4.5h4.5"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3v3.5h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="M16 10.5l5-2.7v8.4l-5-2.7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 21s7-5.8 7-11a7 7 0 1 0-14 0c0 5.2 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    headset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M4 13a8 8 0 0 1 16 0"/><rect x="3" y="13" width="4" height="6" rx="1.8"/><rect x="17" y="13" width="4" height="6" rx="1.8"/><path d="M20 18.5V19a2.5 2.5 0 0 1-2.5 2.5H14" stroke-linecap="round"/></svg>',
    swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 9h11l-3-3M17 15H6l3 3"/></svg>',
    zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2M11 8.5v5M8.5 11h5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6.3 7h11.4l1.2 12.2a1.5 1.5 0 0 1-1.5 1.8H6.6a1.5 1.5 0 0 1-1.5-1.8L6.3 7Z"/><path d="M9 9.5V6a3 3 0 0 1 6 0v3.5"/></svg>'
  };
  var trustIcons = { shield: I.shield, lock: I.lock, refresh: I.refresh, truck: I.truck, whatsapp: I.whatsapp, video: I.video, pin: I.pin, headset: I.headset };

  /* ---------------- logo ----------------
     The mark is a butta — the small woven motif repeated across a saree
     body — drawn as four lotus-temple petals around a zari centre, using
     the same dot rhythm as the selvedge border. It carries no letterform
     on purpose: this template gets re-skinned for other sellers, so the
     mark has to survive any name.                                        */
  var MARK =
    '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">' +
      '<g class="lm-petal">' +
        '<path d="M24 4.5 Q29.4 15.8 24 23.2 Q18.6 15.8 24 4.5 Z"/>' +
        '<path d="M43.5 24 Q32.2 29.4 24.8 24 Q32.2 18.6 43.5 24 Z"/>' +
        '<path d="M24 43.5 Q18.6 32.2 24 24.8 Q29.4 32.2 24 43.5 Z"/>' +
        '<path d="M4.5 24 Q15.8 18.6 23.2 24 Q15.8 29.4 4.5 24 Z"/>' +
      "</g>" +
      '<g class="lm-zari">' +
        '<circle cx="36" cy="12" r="1.7"/><circle cx="36" cy="36" r="1.7"/>' +
        '<circle cx="12" cy="36" r="1.7"/><circle cx="12" cy="12" r="1.7"/>' +
        '<circle cx="24" cy="24" r="3.4"/>' +
      "</g>" +
    "</svg>";

  function logoHTML(tag, href, cls) {
    var wm = D.brand.wordmark || { top: D.brand.short, bottom: "" };
    var open = tag === "a" ? '<a class="logo ' + (cls || "") + '" href="' + href + '">' : '<span class="logo ' + (cls || "") + '">';
    return open +
      '<span class="logo__mark">' + MARK + "</span>" +
      '<span class="logo__type"><strong>' + esc(wm.top) + "</strong>" +
      (wm.bottom ? "<em>" + esc(wm.bottom) + "</em>" : "") + "</span>" +
      (tag === "a" ? "</a>" : "</span>");
  }

  function stars(rating, max) {
    max = max || 5;
    var out = "";
    for (var i = 1; i <= max; i++) out += (i <= Math.round(rating) ? I.star : I.starMuted);
    return out;
  }

  /* image with skeleton frame */
  function imgFrame(src, alt, opts) {
    opts = opts || {};
    return '<span class="img-frame ' + (opts.cls || "") + '">' +
      '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="' + (opts.eager ? "eager" : "lazy") + '"' +
      (opts.fetchpriority ? ' fetchpriority="' + opts.fetchpriority + '"' : "") + ">" + "</span>";
  }
  /* mark frames loaded (event delegation, capture phase catches img load) */
  document.addEventListener("load", function (e) {
    var t = e.target;
    if (t && t.tagName === "IMG" && t.parentElement && t.parentElement.classList.contains("img-frame")) {
      t.parentElement.classList.add("loaded");
    }
  }, true);
  function refreshLoadedFrames(root) {
    $$(".img-frame img", root).forEach(function (img) {
      if (img.complete && img.naturalWidth > 0) img.parentElement.classList.add("loaded");
    });
  }

  /* ---------------- stores ---------------- */
  function store(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; }
  }
  function persist(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  var cart = store("sareehouse_cart", []);          /* [{id, qty}] */
  var wishlist = store("sareehouse_wishlist", []);  /* [id] */

  function cartCount() { return cart.reduce(function (n, it) { return n + it.qty; }, 0); }
  function cartSubtotal() {
    return cart.reduce(function (n, it) {
      var p = product(it.id); return n + (p ? p.price * it.qty : 0);
    }, 0);
  }
  function currentTier() {
    var qty = cartCount(), tier = null;
    D.saveTiers.forEach(function (t) { if (qty >= t.qty) tier = t; });
    return tier;
  }
  function nextTier() {
    var qty = cartCount();
    for (var i = 0; i < D.saveTiers.length; i++) if (qty < D.saveTiers[i].qty) return D.saveTiers[i];
    return null;
  }
  function cartTotals() {
    var sub = cartSubtotal();
    var tier = currentTier();
    var off = tier ? Math.round(sub * tier.off / 100) : 0;
    return { subtotal: sub, tier: tier, discount: off, total: sub - off, mrpSavings: cart.reduce(function (n, it) {
      var p = product(it.id); return n + (p ? (p.mrp - p.price) * it.qty : 0);
    }, 0) };
  }

  function addToCart(id, qty) {
    var p = product(id);
    if (!p) return;
    var line = null;
    cart.forEach(function (it) { if (it.id === id) line = it; });
    if (line) line.qty = Math.min(line.qty + (qty || 1), p.stock);
    else cart.push({ id: id, qty: Math.min(qty || 1, p.stock) });
    persist("sareehouse_cart", cart);
    syncCartUI();
    toast("Added to cart — " + p.name, "View cart", openCart);
  }
  function setQty(id, qty) {
    cart = cart.filter(function (it) { return !(it.id === id && qty <= 0); });
    cart.forEach(function (it) { if (it.id === id) it.qty = qty; });
    persist("sareehouse_cart", cart);
    syncCartUI();
  }
  function toggleWish(id) {
    var i = wishlist.indexOf(id);
    if (i >= 0) { wishlist.splice(i, 1); toast("Removed from wishlist"); }
    else { wishlist.push(id); toast("Saved to wishlist"); }
    persist("sareehouse_wishlist", wishlist);
    $$('[data-wish]').forEach(function (b) {
      if (b.getAttribute("data-wish") === id) {
        var on = wishlist.indexOf(id) >= 0;
        b.classList.toggle("on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      }
    });
  }

  /* ---------------- toast ---------------- */
  var toastTimer = null;
  function toast(msg, actionLabel, actionFn) {
    var el = $("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast"; el.className = "toast"; el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.innerHTML = "<span>" + esc(msg) + "</span>" +
      (actionLabel ? '<button class="link" type="button">' + esc(actionLabel) + "</button>" : "");
    if (actionLabel) $("button.link", el).addEventListener("click", function () {
      hideToast(); if (actionFn) actionFn();
    });
    requestAnimationFrame(function () { el.classList.add("show"); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 3400);
  }
  function hideToast() { var el = $("#toast"); if (el) el.classList.remove("show"); }

  /* ---------------- header / footer / drawers ---------------- */
  function waLink(text) {
    return "https://wa.me/" + D.brand.whatsappNumber + "?text=" + encodeURIComponent(text || D.brand.whatsappGreeting);
  }

  function renderChrome() {
    var page = document.body.getAttribute("data-page") || "";
    var nav = [
      { label: "Home", href: "index.html", key: "home" },
      { label: "Shop all", href: "shop.html", key: "shop" },
      { label: "Occasions", href: "index.html#occasions", key: "" },
      { label: "Collections", href: "index.html#collections", key: "" },
      { label: "Reels", href: "index.html#reels", key: "" }
    ];
    var navLinks = nav.map(function (n) {
      var cur = n.key && n.key === page ? ' aria-current="page"' : "";
      return '<a href="' + n.href + '"' + cur + ">" + n.label + "</a>";
    }).join("");

    /* desktop nav with hover dropdowns: options pop up without clicking */
    function ddList(items, moreHref) {
      return "<ul>" + items.map(function (it) {
        return '<li><a href="' + it.href + '">' + esc(it.label) + "</a></li>";
      }).join("") + (moreHref ? '<li><a class="more" href="' + moreHref + '">View all →</a></li>' : "") + "</ul>";
    }
    var occItems = D.occasions.map(function (o) {
      return { label: o.name, href: "shop.html?occasion=" + encodeURIComponent(o.name) };
    });
    var collItems = D.collections.filter(function (c) { return !c.isFabric; }).map(function (c) {
      return { label: c.name, href: "shop.html?collection=" + encodeURIComponent(c.name) };
    });
    var fabItems = D.fabrics.map(function (f) {
      return { label: f.name, href: "shop.html?fabric=" + encodeURIComponent(f.name) };
    });
    var desktopNav =
      '<a href="index.html"' + (page === "home" ? ' aria-current="page"' : "") + ">Home</a>" +
      '<div class="nav-dd"><a href="shop.html"' + (page === "shop" ? ' aria-current="page"' : "") + ">Shop all</a>" +
        '<div class="nav-dd__menu"><div class="nav-dd__panel">' +
          "<div><h5>Occasions</h5>" + ddList(occItems.slice(0, 7), "shop.html") + "</div>" +
          "<div><h5>Collections</h5>" + ddList(collItems.slice(0, 7), "shop.html") + "</div>" +
          "<div><h5>Fabric</h5>" + ddList(fabItems) + "</div>" +
        "</div></div></div>" +
      '<div class="nav-dd"><a href="index.html#occasions">Occasions</a>' +
        '<div class="nav-dd__menu"><div class="nav-dd__panel">' +
          "<div>" + ddList(occItems.slice(0, 6)) + "</div>" +
          "<div>" + ddList(occItems.slice(6)) + "</div>" +
        "</div></div></div>" +
      '<div class="nav-dd"><a href="index.html#collections">Collections</a>' +
        '<div class="nav-dd__menu"><div class="nav-dd__panel">' +
          "<div>" + ddList(collItems.slice(0, 8)) + "</div>" +
          "<div>" + ddList(collItems.slice(8), "shop.html") + "</div>" +
        "</div></div></div>" +
      '<a href="index.html#reels">Reels</a>';

    var header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML =
      '<div class="page site-header__in">' +
        '<a class="skip-link" href="#main">Skip to content</a>' +
        '<button class="icon-btn nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">' + I.menu + "</button>" +
        logoHTML("a", "index.html") +
        '<nav class="main-nav" aria-label="Main">' + desktopNav + "</nav>" +
        '<button class="icon-btn" type="button" data-open-cart aria-label="Open cart">' + I.cart +
          '<span class="cart-count" id="cart-count" hidden></span></button>' +
      "</div>";
    document.body.insertBefore(header, document.body.firstChild);

    /* scrolling offer ribbon (marquee) directly under the header */
    if (D.marquee && D.marquee.length) {
      var ribbon = document.createElement("div");
      ribbon.className = "marquee";
      ribbon.setAttribute("aria-hidden", "true");
      var seq = D.marquee.map(function (m) { return esc(m) + " <i>◆</i>"; }).join(" ");
      ribbon.innerHTML = '<div class="marquee__track"><span>' + seq + "</span><span>" + seq + "</span></div>";
      header.insertAdjacentElement("afterend", ribbon);
    }

    /* mobile menu */
    var menu = document.createElement("div");
    menu.className = "menu-drawer"; menu.id = "menu-drawer";
    menu.setAttribute("aria-hidden", "true");
    menu.innerHTML =
      '<div class="menu-drawer__scrim" data-close-menu></div>' +
      '<div class="menu-drawer__panel" role="dialog" aria-modal="true" aria-label="Menu">' +
        '<div class="menu-drawer__head">' + logoHTML("span") +
        '<button class="icon-btn" type="button" data-close-menu aria-label="Close menu">' + I.close + "</button></div>" +
        '<nav aria-label="Mobile">' + navLinks + "</nav>" +
        '<div class="menu-drawer__foot">' + esc(D.brand.tagline) + "<br>" + esc(D.brand.instagram) + "</div>" +
      "</div>";
    document.body.appendChild(menu);

    /* cart drawer */
    var drawer = document.createElement("div");
    drawer.className = "cart-drawer"; drawer.id = "cart-drawer";
    drawer.setAttribute("aria-hidden", "true");
    drawer.innerHTML =
      '<div class="cart-drawer__scrim" data-close-cart></div>' +
      '<div class="cart-drawer__panel" role="dialog" aria-modal="true" aria-label="Your cart">' +
        '<div class="cart-drawer__head"><h2>Your cart<span class="u-mono" id="cart-headcount"></span></h2>' +
        '<button class="icon-btn" type="button" data-close-cart aria-label="Close cart">' + I.close + "</button></div>" +
        '<div id="cart-body"></div>' +
      "</div>";
    document.body.appendChild(drawer);

    /* footer */
    var occLinks = D.occasions.slice(0, 6).map(function (o) {
      return '<li><a href="shop.html?occasion=' + encodeURIComponent(o.name) + '">' + esc(o.name) + "</a></li>";
    }).join("");
    var collLinks = D.collections.slice(0, 6).map(function (c) {
      return '<li><a href="shop.html?collection=' + encodeURIComponent(c.name) + '">' + esc(c.name) + "</a></li>";
    }).join("");
    var footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="selvedge selvedge--wide selvedge--dark selvedge--flip" aria-hidden="true"></div>' +
      '<div class="page">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' + logoHTML("a", "index.html") +
            "<p>" + esc(D.footer.about) + "</p></div>" +
          "<div><h4>Occasions</h4><ul>" + occLinks + "</ul></div>" +
          "<div><h4>Collections</h4><ul>" + collLinks + "</ul></div>" +
          '<div><h4>Help</h4><ul>' +
            '<li><a href="' + waLink("Hi! I have a question about my order.") + '" target="_blank" rel="noopener">Chat on WhatsApp</a></li>' +
            '<li><a href="shop.html">Track your order</a></li>' +
            '<li><a href="shop.html">Returns &amp; exchange</a></li>' +
            '<li><a href="shop.html">Blouse stitching</a></li>' +
            '<li><a href="shop.html">How to drape</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<span>© 2026 " + esc(D.brand.name) + " · " + esc(D.brand.city) + "</span>" +
          "<span>UPI · Cards · Netbanking · COD</span>" +
          "<span>" + esc(D.footer.note) + "</span>" +
        "</div>" +
      "</div>";
    document.body.appendChild(footer);

    /* quick view modal */
    var qv = document.createElement("div");
    qv.className = "qv"; qv.id = "quick-view";
    qv.setAttribute("aria-hidden", "true");
    qv.innerHTML =
      '<div class="qv__scrim" data-close-qv></div>' +
      '<div class="qv__panel" role="dialog" aria-modal="true" aria-label="Quick view">' +
        '<button class="qv__close" type="button" data-close-qv aria-label="Close quick view">' + I.close + "</button>" +
        '<div class="qv__media" id="qv-media"></div>' +
        '<div class="qv__body" id="qv-body"></div>' +
      "</div>";
    document.body.appendChild(qv);
    $$("[data-close-qv]", qv).forEach(function (el) { el.addEventListener("click", closeQuickView); });

    /* WhatsApp float */
    var wa = document.createElement("a");
    wa.className = "wa-float";
    wa.href = waLink();
    wa.target = "_blank"; wa.rel = "noopener";
    wa.setAttribute("aria-label", "Chat with us on WhatsApp");
    wa.innerHTML = I.whatsapp;
    document.body.appendChild(wa);

    /* wire drawers */
    $(".nav-toggle").addEventListener("click", openMenu);
    $$("[data-close-menu]").forEach(function (el) { el.addEventListener("click", closeMenu); });
    $$("[data-open-cart]").forEach(function (el) { el.addEventListener("click", openCart); });
    $$("[data-close-cart]").forEach(function (el) { el.addEventListener("click", closeCart); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeMenu(); closeCart(); closeQuickView(); }
    });
    syncCartUI();
  }

  /* ---------------- quick view ---------------- */
  function openQuickView(id) {
    var p = product(id);
    var qv = $("#quick-view");
    if (!p || !qv) return;
    $("#qv-media").innerHTML = imgFrame(p.images[0].replace("w=900", "w=600"), p.alts[0], { eager: true });
    $("#qv-body").innerHTML =
      '<div class="qv__tags"><span>' + esc(p.collection) + "</span><span>" + esc(p.fabric) + "</span><span>" + esc(p.color) + "</span></div>" +
      "<h3>" + esc(p.name) + "</h3>" +
      '<div class="qv__price"><span class="price-now">' + money(p.price) + '</span><span class="price-mrp">' + money(p.mrp) +
        '</span><span class="price-off">' + pctOff(p) + "% off</span></div>" +
      '<div class="qv__rating">' + I.star + " " + p.rating.toFixed(1) + " · " + p.reviews + " reviews</div>" +
      '<button class="btn btn--primary" type="button" id="qv-add">' + I.bag + " Add to cart</button>" +
      '<a class="qv__details" href="product.html?id=' + p.id + '">View full details →</a>';
    $("#qv-add").addEventListener("click", function () { addToCart(p.id, 1); closeQuickView(); });
    refreshLoadedFrames(qv);
    qv.classList.add("open");
    qv.setAttribute("aria-hidden", "false");
  }
  function closeQuickView() {
    var qv = $("#quick-view");
    if (!qv) return;
    qv.classList.remove("open");
    qv.setAttribute("aria-hidden", "true");
  }

  function openMenu() {
    var m = $("#menu-drawer"); m.classList.add("open"); m.setAttribute("aria-hidden", "false");
    $(".nav-toggle").setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    var m = $("#menu-drawer"); if (!m) return;
    m.classList.remove("open"); m.setAttribute("aria-hidden", "true");
    var t = $(".nav-toggle"); if (t) t.setAttribute("aria-expanded", "false");
  }
  function openCart() {
    renderCartBody();
    var c = $("#cart-drawer"); c.classList.add("open"); c.setAttribute("aria-hidden", "false");
  }
  function closeCart() {
    var c = $("#cart-drawer"); if (!c) return;
    c.classList.remove("open"); c.setAttribute("aria-hidden", "true");
  }

  function syncCartUI() {
    var n = cartCount();
    var badge = $("#cart-count");
    if (badge) { badge.textContent = n; badge.hidden = n === 0; }
    var head = $("#cart-headcount");
    if (head) head.textContent = n ? " · " + n + (n === 1 ? " item" : " items") : "";
    if ($("#cart-drawer") && $("#cart-drawer").classList.contains("open")) renderCartBody();
  }

  function renderCartBody() {
    var body = $("#cart-body");
    if (!body) return;
    var head = $("#cart-headcount");
    if (head) { var n0 = cartCount(); head.textContent = n0 ? " · " + n0 + (n0 === 1 ? " item" : " items") : ""; }

    if (!cart.length) {
      body.innerHTML =
        '<div class="cart-empty">' +
          "<h3>Your cart is empty</h3>" +
          "<p>Browse new arrivals or tell us the occasion — we'll shortlist for you.</p>" +
          '<a class="btn btn--primary" href="shop.html" data-close-cart-link>Start shopping</a>' +
        "</div>";
      var link = $("[data-close-cart-link]", body);
      if (link) link.addEventListener("click", closeCart);
      return;
    }

    var t = cartTotals();
    var items = cart.map(function (it) {
      var p = product(it.id);
      if (!p) return "";
      return '<div class="cart-item" data-line="' + p.id + '">' +
        '<a href="product.html?id=' + p.id + '">' + imgFrame(p.images[0].replace("w=900", "w=200"), p.alts[0]) + "</a>" +
        "<div>" +
          '<a class="cart-item__name" href="product.html?id=' + p.id + '">' + esc(p.name) + "</a>" +
          '<div class="cart-item__meta">' + esc(p.fabric) + " · " + esc(p.collection) + "</div>" +
          '<div class="cart-item__row">' +
            '<div class="qty" aria-label="Quantity for ' + esc(p.name) + '">' +
              '<button type="button" data-qty="-1" aria-label="Decrease quantity">−</button>' +
              "<span>" + it.qty + "</span>" +
              '<button type="button" data-qty="1" aria-label="Increase quantity"' + (it.qty >= p.stock ? " disabled" : "") + ">+</button>" +
            "</div>" +
            '<span class="price-now">' + money(p.price * it.qty) + "</span>" +
          "</div>" +
          '<button class="cart-item__remove" type="button" data-remove>Remove</button>' +
        "</div>" +
      "</div>";
    }).join("");

    var nt = nextTier();
    var tierNote = "";
    if (t.tier) {
      tierNote = '<div class="cart-tiernote"><strong>' + t.tier.off + "% off applied</strong> — buy-more save-more." +
        (nt ? " Add " + (nt.qty - cartCount()) + " more to reach " + nt.off + "% off." : " You've unlocked our best price.") + "</div>";
    } else if (nt) {
      tierNote = '<div class="cart-tiernote">Add <strong>' + (nt.qty - cartCount()) + " more saree" + (nt.qty - cartCount() > 1 ? "s" : "") +
        "</strong> to unlock " + nt.off + "% off your whole order.</div>";
    }

    var waMsg = "Hi " + D.brand.name + "! I'd like to order:\n" + cart.map(function (it) {
      var p = product(it.id);
      return "• " + p.name + " × " + it.qty + " — " + money(p.price * it.qty);
    }).join("\n") + "\nTotal: " + money(t.total) + (t.tier ? " (incl. " + t.tier.off + "% bundle discount)" : "");

    body.innerHTML =
      '<div class="cart-items">' + items + "</div>" +
      tierNote +
      '<div class="cart-summary">' +
        '<div class="row"><span>Subtotal</span><span class="u-mono">' + money(t.subtotal) + "</span></div>" +
        (t.discount ? '<div class="row discount"><span>Bundle discount (' + t.tier.off + "%)</span><span class=\"u-mono\">−" + money(t.discount) + "</span></div>" : "") +
        '<div class="row"><span>Delivery</span><span class="u-mono">' + (t.total >= D.brand.freeShippingOver ? "Free" : money(99)) + "</span></div>" +
        '<div class="row total"><span>Total</span><span class="u-mono">' + money(t.total + (t.total >= D.brand.freeShippingOver ? 0 : 99)) + "</span></div>" +
        '<a class="btn btn--primary" href="' + waLink(waMsg) + '" target="_blank" rel="noopener">' + I.whatsapp + " Checkout on WhatsApp</a>" +
        '<p class="note">Pay by UPI, card or cash on delivery — you choose at confirmation.</p>' +
      "</div>";

    $$(".cart-item", body).forEach(function (row) {
      var id = row.getAttribute("data-line");
      var line = cart.filter(function (it) { return it.id === id; })[0];
      $$("[data-qty]", row).forEach(function (b) {
        b.addEventListener("click", function () {
          setQty(id, line.qty + Number(b.getAttribute("data-qty")));
        });
      });
      $("[data-remove]", row).addEventListener("click", function () {
        var p = product(id);
        setQty(id, 0);
        toast("Removed " + (p ? p.name : "item") + " from cart");
      });
    });
    refreshLoadedFrames(body);
  }

  /* ---------------- product card ---------------- */
  var TAG_LABELS = { bestseller: "Bestseller", new: "New", trending: "Trending", hot: "Hot seller" };
  function cardHTML(p, opts) {
    opts = opts || {};
    var tag = p.tags && p.tags.length ? TAG_LABELS[opts.forceTag || p.tags[0]] : null;
    if (opts.forceTag && p.tags.indexOf(opts.forceTag) < 0) tag = TAG_LABELS[p.tags[0]] || null;
    var wished = wishlist.indexOf(p.id) >= 0;
    var fab = p.fabric === "Cotton" ? "100% cotton" : (p.fabric === "Pure silk" ? "Pure silk" : null);
    return '<article class="pcard" data-id="' + p.id + '">' +
      '<a class="pcard__media" href="product.html?id=' + p.id + '" aria-label="' + esc(p.name) + '">' +
        '<span class="img-frame" style="position:absolute;inset:0;border-radius:0">' +
          '<img src="' + esc(p.images[0].replace("w=900", "w=600")) + '" alt="' + esc(p.alts[0]) + '" loading="lazy">' +
        "</span>" +
        '<img class="alt" src="' + esc(p.images[1].replace("w=900", "w=600")) + '" alt="" loading="lazy" aria-hidden="true">' +
        (tag ? '<span class="pcard__tags"><span class="pcard__tag">' + tag + "</span></span>" : "") +
        (fab ? '<span class="pcard__fab">' + fab + "</span>" : "") +
      "</a>" +
      '<button class="pcard__wish' + (wished ? " on" : "") + '" type="button" data-wish="' + p.id + '" aria-pressed="' + wished + '" aria-label="Save ' + esc(p.name) + ' to wishlist">' + I.heart + "</button>" +
      '<button class="pcard__swap" type="button" data-swap aria-label="See detail photo">' + I.swap + "</button>" +
      '<button class="pcard__view" type="button" data-view="' + p.id + '" aria-label="Quick view ' + esc(p.name) + '">' + I.eye + " view</button>" +
      '<div class="pcard__body">' +
        '<a class="pcard__name" href="product.html?id=' + p.id + '">' + esc(p.name) + "</a>" +
        '<div class="pcard__meta">' + esc(p.fabric) + " · " + esc(p.collection) + "</div>" +
        '<div class="pcard__price">' +
          '<span class="price-now">' + money(p.price) + "</span>" +
          '<span class="price-mrp">' + money(p.mrp) + "</span>" +
          '<span class="price-off">' + pctOff(p) + "% off</span>" +
        "</div>" +
        (D.fabricOffers && D.fabricOffers[p.fabric] ?
          '<span class="pcard__offer">' + esc(D.fabricOffers[p.fabric]) + "</span>" : "") +
        '<div class="pcard__rating">' + I.star + " " + p.rating.toFixed(1) + ' <span>(' + p.reviews + ")</span></div>" +
      "</div>" +
    "</article>";
  }
  function bindCards(root) {
    $$(".pcard", root).forEach(function (card) {
      var wishBtn = $("[data-wish]", card);
      if (wishBtn && !wishBtn.__wired) {
        wishBtn.__wired = true;
        wishBtn.addEventListener("click", function () { toggleWish(wishBtn.getAttribute("data-wish")); });
      }
      var swapBtn = $("[data-swap]", card);
      if (swapBtn && !swapBtn.__wired) {
        swapBtn.__wired = true;
        swapBtn.addEventListener("click", function (e) {
          e.preventDefault();
          card.classList.toggle("swapped");
          var on = card.classList.contains("swapped");
          swapBtn.setAttribute("aria-label", on ? "See drape photo" : "See detail photo");
        });
      }
      var viewBtn = $("[data-view]", card);
      if (viewBtn && !viewBtn.__wired) {
        viewBtn.__wired = true;
        viewBtn.addEventListener("click", function (e) {
          e.preventDefault();
          openQuickView(viewBtn.getAttribute("data-view"));
        });
      }
    });
    refreshLoadedFrames(root);
  }

  /* ---------------- reveal on scroll ---------------- */
  var revealIO = null;
  var ioEverFired = false;
  function watchReveals(root) {
    var els = $$(".reveal:not(.in)", root);
    if (reducedMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries) {
        ioEverFired = true;
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
      /* safety net: if the observer never reports (throttled/odd renderers),
         show everything rather than leave the page blank */
      setTimeout(function () {
        if (!ioEverFired) $$(".reveal:not(.in)").forEach(function (el) { el.classList.add("in"); });
      }, 2500);
    }
    els.forEach(function (el) { revealIO.observe(el); });
  }

  /* ---------------- boot ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderChrome();
    watchReveals(document);
  });

  /* public surface for page scripts */
  window.SareeHouseApp = {
    $: $, $$: $$, esc: esc, money: money, pctOff: pctOff, product: product,
    icons: I, trustIcons: trustIcons, stars: stars, imgFrame: imgFrame,
    refreshLoadedFrames: refreshLoadedFrames,
    cardHTML: cardHTML, bindCards: bindCards, watchReveals: watchReveals,
    addToCart: addToCart, toggleWish: toggleWish, openCart: openCart,
    wishlist: function () { return wishlist; },
    toast: toast, waLink: waLink,
    reducedMotion: reducedMotion
  };
})();
