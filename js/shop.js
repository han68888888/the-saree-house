/* =========================================================================
   DIVYA'S SAREES — SHOP / LISTING
   Sticky chip filters (fabric, occasion, colour, price, collection) + sort.
   Instant updates, URL-driven deep links, thumb-reachable sheet on mobile.
   ========================================================================= */

(function () {
  "use strict";

  var D = window.DIVYA;

  document.addEventListener("DOMContentLoaded", function () {
    var A = window.DivyaApp;
    var $ = A.$, $$ = A.$$, esc = A.esc, I = A.icons;

    /* ---------- filter model ---------- */
    var PRICE_BANDS = [
      { label: "Under ₹3,000", min: 0, max: 2999 },
      { label: "₹3,000–₹7,000", min: 3000, max: 6999 },
      { label: "₹7,000–₹15,000", min: 7000, max: 14999 },
      { label: "₹15,000 & above", min: 15000, max: Infinity }
    ];
    var SORTS = [
      { key: "featured", label: "Featured" },
      { key: "price-asc", label: "Price: low to high" },
      { key: "price-desc", label: "Price: high to low" },
      { key: "rating", label: "Top rated" },
      { key: "new", label: "Newest first" }
    ];
    var uniq = function (arr) { return arr.filter(function (v, i) { return arr.indexOf(v) === i; }); };

    var GROUPS = {
      fabric: { label: "Fabric", options: uniq(D.products.map(function (p) { return p.fabric; })) },
      occasion: { label: "Occasion", options: D.occasions.map(function (o) { return o.name; }) },
      color: { label: "Colour", options: uniq(D.products.map(function (p) { return p.color; })) },
      price: { label: "Price", options: PRICE_BANDS.map(function (b) { return b.label; }) },
      collection: { label: "Collection", options: uniq(D.products.map(function (p) { return p.collection; })) }
    };

    /* state: sets of selected option labels per group */
    var state = { fabric: [], occasion: [], color: [], price: [], collection: [], sort: "featured", tag: null };

    /* seed from URL */
    (function initFromURL() {
      var q = new URLSearchParams(location.search);
      ["fabric", "occasion", "color", "collection"].forEach(function (g) {
        var v = q.get(g);
        if (!v) return;
        /* tolerate values that match loosely (e.g. fabric=Cotton matches "Cotton") */
        GROUPS[g].options.forEach(function (opt) {
          if (opt.toLowerCase() === v.toLowerCase()) state[g].push(opt);
        });
        /* collection may be a fabric pseudo-collection from the home rail */
        if (g === "collection" && !state.collection.length) {
          GROUPS.fabric.options.forEach(function (opt) {
            if (opt.toLowerCase().indexOf(v.toLowerCase()) >= 0) state.fabric.push(opt);
          });
        }
      });
      var tag = q.get("tag");
      if (tag) state.tag = tag;
    })();

    var TAG_TITLES = { new: "New arrivals", trending: "Trending now", bestseller: "Best sellers", hot: "Hot sellers" };

    /* ---------- filtering ---------- */
    function matches(p) {
      if (state.tag && p.tags.indexOf(state.tag) < 0) return false;
      if (state.fabric.length && state.fabric.indexOf(p.fabric) < 0) return false;
      if (state.occasion.length && !state.occasion.some(function (o) { return p.occasions.indexOf(o) >= 0; })) return false;
      if (state.color.length && state.color.indexOf(p.color) < 0) return false;
      if (state.collection.length && state.collection.indexOf(p.collection) < 0) return false;
      if (state.price.length) {
        var ok = state.price.some(function (label) {
          var b = PRICE_BANDS.filter(function (x) { return x.label === label; })[0];
          return b && p.price >= b.min && p.price <= b.max;
        });
        if (!ok) return false;
      }
      return true;
    }
    function sorted(list) {
      var out = list.slice();
      switch (state.sort) {
        case "price-asc": out.sort(function (a, b) { return a.price - b.price; }); break;
        case "price-desc": out.sort(function (a, b) { return b.price - a.price; }); break;
        case "rating": out.sort(function (a, b) { return b.rating - a.rating || b.reviews - a.reviews; }); break;
        case "new": out.sort(function (a, b) {
          return (b.tags.indexOf("new") >= 0 ? 1 : 0) - (a.tags.indexOf("new") >= 0 ? 1 : 0);
        }); break;
        default: /* featured: bestsellers first, then rating */
          out.sort(function (a, b) {
            var av = (a.tags.indexOf("bestseller") >= 0 ? 1 : 0), bv = (b.tags.indexOf("bestseller") >= 0 ? 1 : 0);
            return bv - av || b.rating - a.rating;
          });
      }
      return out;
    }

    /* ---------- render: always-visible option rows ---------- */
    function renderOptRows() {
      ["occasion", "collection"].forEach(function (g) {
        var box = $("#optrow-" + g);
        if (!box) return;
        box.innerHTML = GROUPS[g].options.map(function (opt) {
          var on = state[g].indexOf(opt) >= 0;
          return '<button class="chip' + (on ? " active" : "") + '" type="button" role="checkbox" aria-checked="' + on + '" data-rowopt="' + esc(opt) + '">' +
            (on ? I.check + " " : "") + esc(opt) + "</button>";
        }).join("");
        $$("[data-rowopt]", box).forEach(function (b) {
          b.addEventListener("click", function () {
            var v = b.getAttribute("data-rowopt");
            var arr = state[g];
            var i = arr.indexOf(v);
            if (i >= 0) arr.splice(i, 1); else arr.push(v);
            renderAll();
          });
        });
      });
    }

    /* ---------- render: chips ---------- */
    var chipRow = $("#chip-row");
    function activeCount() {
      return state.fabric.length + state.occasion.length + state.color.length + state.price.length + state.collection.length;
    }
    function renderChips() {
      var html = "";
      Object.keys(GROUPS).forEach(function (g) {
        var n = state[g].length;
        html += '<button class="chip' + (n ? " active" : "") + '" type="button" data-group="' + g + '" aria-haspopup="dialog">' +
          esc(GROUPS[g].label) + (n ? ' <span class="u-mono">' + n + "</span>" : "") + " " + I.chevR.replace('viewBox', 'style="transform:rotate(90deg)" viewBox') +
        "</button>";
      });
      var sortLabel = SORTS.filter(function (s) { return s.key === state.sort; })[0].label;
      html += '<button class="chip' + (state.sort !== "featured" ? " active" : "") + '" type="button" data-group="sort" aria-haspopup="dialog">' +
        "Sort: " + esc(sortLabel) + "</button>";
      if (activeCount() || state.tag) {
        html += '<button class="chip chip--clear" type="button" id="chip-clear">Clear all</button>';
      }
      chipRow.innerHTML = html;
      $$("[data-group]", chipRow).forEach(function (b) {
        b.addEventListener("click", function () { openDrop(b.getAttribute("data-group")); });
      });
      var clear = $("#chip-clear");
      if (clear) clear.addEventListener("click", clearAll);
    }
    function clearAll() {
      state = { fabric: [], occasion: [], color: [], price: [], collection: [], sort: "featured", tag: null };
      history.replaceState(null, "", "shop.html");
      renderAll();
    }

    /* ---------- floating filter dropdown (attached under the sticky bar) - */
    var drop = $("#filter-drop");
    var dropGroup = null;

    function openDrop(group) {
      if (dropGroup === group && !drop.hidden) { closeDrop(); return; }
      dropGroup = group;
      $("#drop-title").textContent = group === "sort" ? "Sort by" : GROUPS[group].label;
      renderDropOpts();
      drop.hidden = false;
    }
    function closeDrop() { drop.hidden = true; dropGroup = null; }
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrop(); });
    document.addEventListener("click", function (e) {
      if (drop.hidden) return;
      if (!document.body.contains(e.target)) return; /* option chips re-render mid-click */
      if (!e.target.closest("#filter-bar")) closeDrop();
    });

    function renderDropOpts() {
      var box = $("#drop-opts");
      if (dropGroup === "sort") {
        box.innerHTML = SORTS.map(function (s) {
          var on = state.sort === s.key;
          return '<button class="chip' + (on ? " active" : "") + '" type="button" role="radio" aria-checked="' + on + '" data-opt="' + s.key + '">' +
            (on ? I.check + " " : "") + esc(s.label) + "</button>";
        }).join("");
      } else {
        box.innerHTML = GROUPS[dropGroup].options.map(function (opt) {
          var on = state[dropGroup].indexOf(opt) >= 0;
          return '<button class="chip' + (on ? " active" : "") + '" type="button" role="checkbox" aria-checked="' + on + '" data-opt="' + esc(opt) + '">' +
            (on ? I.check + " " : "") + esc(opt) + "</button>";
        }).join("");
      }
      $$("[data-opt]", box).forEach(function (b) {
        b.addEventListener("click", function () {
          var v = b.getAttribute("data-opt");
          if (dropGroup === "sort") {
            state.sort = v;
            renderAll();
            closeDrop();
            return;
          }
          var arr = state[dropGroup];
          var i = arr.indexOf(v);
          if (i >= 0) arr.splice(i, 1); else arr.push(v);
          var g = dropGroup;
          renderAll();
          dropGroup = g;
          renderDropOpts(); /* stay open for multi-select */
        });
      });
      $("#drop-reset").onclick = function () {
        if (dropGroup === "sort") state.sort = "featured";
        else state[dropGroup] = [];
        var g = dropGroup;
        renderAll();
        dropGroup = g;
        renderDropOpts();
      };
    }

    /* ---------- render: grid ---------- */
    var grid = $("#shop-grid");
    function renderGrid() {
      var list = sorted(D.products.filter(matches));
      var line = $("#result-line");
      line.textContent = list.length ?
        list.length + (list.length === 1 ? " saree" : " sarees") +
        (activeCount() ? " · " + activeCount() + (activeCount() === 1 ? " filter" : " filters") + " on" : "") :
        "";
      $("#shop-empty").classList.toggle("hidden", list.length > 0);
      grid.innerHTML = list.map(function (p) { return A.cardHTML(p); }).join("");
      A.bindCards(grid);
    }

    function renderTitle() {
      var title = "Shop";
      if (state.tag && TAG_TITLES[state.tag]) title = TAG_TITLES[state.tag];
      else if (state.collection.length === 1) { title = state.collection[0] + " sarees"; }
      else if (state.occasion.length === 1) { title = state.occasion[0] + " sarees"; }
      else if (state.fabric.length === 1) { title = state.fabric[0] + " sarees"; }
      $("#shop-title").textContent = title;
      document.title = title + " — " + D.brand.name;
    }

    function renderAll() {
      renderOptRows();
      renderChips();
      renderTitle();
      renderGrid();
    }

    $("#empty-clear").addEventListener("click", clearAll);

    renderAll();
  });
})();
