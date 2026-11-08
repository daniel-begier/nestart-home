/* Nestart Home — site behaviour
   cart drawer · product options · Virtual Gallery Wall Customiser · contact form */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const eur = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });
  const money = (n) => eur.format(n);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>';

  /* ---------- Catalogue ---------- */
  const PRODUCTS = {
    valletta: { name: 'Valletta Architecture Line Art', short: 'Valletta Line Art', price: 22 },
    gozo: { name: 'Gozo Sunset Minimalist Print', short: 'Gozo Sunset', price: 24 },
    blue: { name: 'Abstract Mediterranean Blue', short: 'Mediterranean Blue', price: 26 },
  };
  const SIZES = {
    a4: { label: 'A4', dims: '21 × 29.7 cm', w: 21, h: 29.7, add: 0, frame: 15 },
    a3: { label: 'A3', dims: '29.7 × 42 cm', w: 29.7, h: 42, add: 8, frame: 19 },
    b2: { label: '50 × 70 cm', dims: '50 × 70 cm', w: 50, h: 70, add: 18, frame: 29 },
  };
  const FRAMES = { none: 'No frame', oak: 'Natural oak frame', black: 'Matte black frame', white: 'Gallery white frame' };
  const WALLS = { limestone: 'Maltese limestone', plaster: 'whitewashed plaster', concrete: 'warm micro-cement', charcoal: 'a charcoal feature wall' };
  const FRAME_CM = 2.2;
  const FREE_DELIVERY = 50;
  const DELIVERY = 3.5;
  const unitPrice = (p, s, f) => PRODUCTS[p].price + SIZES[s].add + (f === 'none' ? 0 : SIZES[s].frame);

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
  };

  /* ---------- Artwork ---------- */
  const artHTML = (art, decorative = true) => `<span class="print__art">${window.NestArt.svg(art, { decorative })}</span>`;
  function fillPrints(root = document) {
    $$('.print[data-art]', root).forEach((el) => {
      if (el.dataset.ready) return;
      el.innerHTML = artHTML(el.dataset.art, el.hasAttribute('data-decorative'));
      el.dataset.ready = '1';
    });
  }
  const printHTML = (art, frame) => `<span class="print" data-frame="${frame}">${artHTML(art)}</span>`;

  /* ---------- Room scenes (1 unit = 1 cm, true scale) ---------- */
  const SIDEBOARD = `<svg viewBox="0 0 160 106" aria-hidden="true" focusable="false">
    <rect x="19" y="13.5" width="32" height="3.6" fill="#1F3A5F"/><rect x="22" y="17.1" width="26" height="4.9" fill="#E2D7C3"/><rect x="20" y="22" width="30" height="6" fill="#B8643E"/>
    <path d="M62 28q8-8 16 0z" fill="#CDBFA6"/>
    <g stroke="#5B5841" stroke-width=".5" fill="none" stroke-linecap="round"><path d="M124 15C123 9 119 4 112 1"/><path d="M124.5 15C126 9 130 5 137 2"/><path d="M124 15C124 9 125 4 124 -2"/></g>
    <g fill="#6F6C4E"><ellipse cx="114" cy="2.4" rx="2.2" ry=".9" transform="rotate(-25 114 2.4)"/><ellipse cx="118" cy="5.5" rx="2" ry=".8" transform="rotate(-35 118 5.5)"/><ellipse cx="134.5" cy="3.4" rx="2.2" ry=".9" transform="rotate(20 134.5 3.4)"/><ellipse cx="130" cy="6.6" rx="2" ry=".8" transform="rotate(30 130 6.6)"/><ellipse cx="124.3" cy="0" rx=".8" ry="2"/></g>
    <path d="M121 28C116.5 23 117 18.5 121 16.5V14h6v2.5C131 18.5 131.5 23 127 28Z" fill="#EEE7DB"/>
    <path d="M127 16.5C131 18.5 131.5 23 127 28h-2C128.5 23 128 19 125.5 16.5Z" fill="#000" fill-opacity=".08"/>
    <rect x="0" y="28" width="160" height="4" fill="#5E4330"/><rect x="3" y="32" width="154" height="58" fill="#86623F"/>
    <path d="M3 32.4h154" stroke="#000" stroke-opacity=".25" stroke-width=".8"/>
    <path d="M54.3 33v57M105.7 33v57" stroke="#5E4330" stroke-width=".6"/>
    <g fill="#3E2C20"><rect x="48" y="56" width="1.2" height="10"/><rect x="59.6" y="56" width="1.2" height="10"/><rect x="99.6" y="56" width="1.2" height="10"/><rect x="111" y="56" width="1.2" height="10"/></g>
    <g fill="#4A3426"><path d="M10 90h3l-.6 16h-1.8z"/><path d="M147 90h3l-.6 16h-1.8z"/></g>
  </svg>`;

  const sceneMarkup = (wall) => `
    <div class="scene__wall wall--${wall}"></div><div class="scene__light"></div><div class="scene__floor"></div>
    <div class="scene__furniture">${SIDEBOARD}<span class="dim dim--furn">Sideboard · 160 cm</span></div>
    <div class="scene__hang"></div>`;

  function scenePrint(art, size, frame) {
    const s = SIZES[size];
    const fw = frame === 'none' ? 0 : FRAME_CM;
    return `<div class="print print--scene" data-frame="${frame}" style="--w:${(s.w + 2 * fw).toFixed(1)};--pad:calc(var(--cm) * ${fw});--ar:${s.w} / ${s.h}">${artHTML(art)}<span class="dim">${s.dims}</span></div>`;
  }
  function setWall(scene, wall) {
    const el = $('.scene__wall', scene);
    el.className = `scene__wall wall--${wall}`;
    el.style.backgroundImage = '';
    scene.classList.toggle('is-dark', wall === 'charcoal');
  }

  /* ---------- Header, menu, footer ---------- */
  const header = $('.header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const nav = $('.nav');
  const menuBtn = $('.menu-btn');
  if (nav && menuBtn) {
    const menu = document.createElement('div');
    menu.className = 'mmenu';
    menu.id = 'mmenu';
    menu.innerHTML = `<nav aria-label="Mobile">${$$('a', nav).map((a, i) =>
      `<a href="${a.getAttribute('href')}"${a.hasAttribute('aria-current') ? ' aria-current="page"' : ''}>${a.innerHTML}<span>0${i + 1}</span></a>`).join('')}</nav>
      <p>Poster decorations &amp; wall art, designed in Malta. Free delivery across Malta &amp; Gozo on orders over €50.</p>`;
    document.body.append(menu);
    const setMenu = (open) => {
      document.body.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    };
    menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    window.matchMedia('(min-width: 761px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  const footer = $('#site-footer');
  if (footer) {
    footer.innerHTML = `
    <div class="wrap">
      <div class="footer__top">
        <div>
          <p class="display footer__title">Make your walls feel like <em>home.</em></p>
          <a class="btn btn--light" href="shop.html">Shop Collection ${ARROW}</a>
        </div>
        <nav class="footer__cols" aria-label="Footer">
          <div><p class="eyebrow">Shop</p><ul>
            <li><a href="shop.html">The Art Collection</a></li>
            <li><a href="shop.html#customiser">Wall Customiser</a></li>
            <li><a href="index.html#values">Sizes &amp; paper</a></li>
          </ul></div>
          <div><p class="eyebrow">Studio</p><ul>
            <li><a href="about.html">Our Story</a></li>
            <li><a href="about.html#contact">Contact</a></li>
            <li><a href="about.html?subject=wholesale#contact">Wholesale</a></li>
          </ul></div>
          <div class="guarantee">
            <p class="guarantee__seal"><svg viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><circle cx="17" cy="17" r="15.5"/><circle cx="17" cy="17" r="11.5" stroke-dasharray="1.5 2"/><path d="M11.5 17.5l3.6 3.4 7.4-7.6"/></svg>Local support guarantee</p>
            <p>Based in Malta, answered in Malta. A real person replies within one working day, in English or Maltese, and any print that arrives damaged is replaced free of charge.</p>
          </div>
        </nav>
      </div>
      <div class="footer__bottom">
        <p>Copyright © 2026 Nestart Home Malta. All rights reserved.</p>
        <ul class="socials" aria-label="Social media">
          <li><a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none"/></svg></a></li>
          <li><a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"/></svg></a></li>
          <li><a href="#" aria-label="Pinterest"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M10.6 20.2l1.9-8.2M11.3 15c3.3 1.2 5.6-1 5.2-3.8-.4-2.9-4.3-3.8-6.6-2.1-1.6 1.2-1.7 3.5-.6 4.4"/></svg></a></li>
          <li><a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3.5v11.2a3.6 3.6 0 1 1-3.6-3.6"/><path d="M14 3.5c.5 2.6 2.4 4.4 5 4.6"/></svg></a></li>
        </ul>
        <p class="footer__proto">Concept prototype created for a university marketing project. No real orders are taken.</p>
      </div>
      <p class="footer__word" aria-hidden="true">Nestart <em>Home</em></p>
    </div>`;
  }

  /* ---------- Toast ---------- */
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.append(toast);
  let toastT;
  function notify(msg) {
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove('is-on'), 2600);
  }

  /* ---------- Cart ---------- */
  const CART_KEY = 'nestart-cart-v1';
  let cart = store.get(CART_KEY, []).filter((i) => i && PRODUCTS[i.p] && SIZES[i.s] && FRAMES[i.f] && i.qty > 0);

  const drawer = document.createElement('div');
  drawer.className = 'drawer';
  drawer.innerHTML = `
    <div class="drawer__scrim" data-close></div>
    <aside class="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <header class="drawer__head">
        <h2 id="cart-title">Your cart <sup data-cart-qty>0</sup></h2>
        <button class="icon-btn" type="button" data-close aria-label="Close cart"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 3l10 10M13 3L3 13"/></svg></button>
      </header>
      <div class="drawer__ship"><p data-ship-msg></p><div class="bar"><span data-ship-bar></span></div></div>
      <ul class="drawer__list" data-cart-list></ul>
      <footer class="drawer__foot" data-cart-foot>
        <dl class="totals">
          <div><dt>Subtotal</dt><dd data-sub></dd></div>
          <div><dt>Delivery · Malta &amp; Gozo</dt><dd data-ship></dd></div>
          <div class="total"><dt>Total <span class="muted">(incl. VAT)</span></dt><dd data-total></dd></div>
        </dl>
        <button class="btn btn--block" type="button" data-checkout>Checkout securely ${ARROW}</button>
        <p class="drawer__note" data-checkout-note hidden>This is a concept prototype, so checkout is switched off. Thanks for testing the journey.</p>
        <p class="drawer__fine">Packed by hand in Malta · Dispatched in 1–3 working days</p>
      </footer>
    </aside>`;
  document.body.append(drawer);
  const panel = $('.drawer__panel', drawer);
  let lastFocus = null;

  function openCart() {
    lastFocus = document.activeElement;
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('.icon-btn', drawer).focus(), 80);
  }
  function closeCart() {
    if (!drawer.classList.contains('is-open')) return;
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
    $('[data-checkout-note]', drawer).hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  drawer.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeCart(); });
  document.addEventListener('keydown', (e) => {
    if (!drawer.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeCart();
    if (e.key === 'Tab') {
      const f = $$('button:not([disabled]), a[href]', panel);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  $$('[data-open-cart]').forEach((b) => b.addEventListener('click', openCart));
  $('[data-checkout]', drawer).addEventListener('click', () => { $('[data-checkout-note]', drawer).hidden = false; });

  function renderCart() {
    const count = cart.reduce((a, i) => a + i.qty, 0);
    const sub = cart.reduce((a, i) => a + unitPrice(i.p, i.s, i.f) * i.qty, 0);
    const ship = sub === 0 || sub >= FREE_DELIVERY ? 0 : DELIVERY;
    $$('[data-cart-count]').forEach((el) => { el.textContent = count; el.hidden = count === 0; });
    $$('[data-open-cart]').forEach((b) => b.setAttribute('aria-label', `Open cart, ${count} item${count === 1 ? '' : 's'}`));
    $('[data-cart-qty]', drawer).textContent = count;
    $('[data-cart-list]', drawer).innerHTML = cart.length
      ? cart.map((i) => `
        <li class="ci" data-key="${i.key}">
          <div class="ci__thumb wall--plaster">${printHTML(i.p, i.f)}</div>
          <div class="ci__body">
            <p class="ci__name">${PRODUCTS[i.p].name}</p>
            <p class="ci__meta">${SIZES[i.s].label} · ${FRAMES[i.f]} · ${money(unitPrice(i.p, i.s, i.f))} each</p>
            <div class="ci__row">
              <div class="qty"><button type="button" data-dec aria-label="Decrease quantity">−</button><output>${i.qty}</output><button type="button" data-inc aria-label="Increase quantity">+</button></div>
              <span class="ci__price">${money(unitPrice(i.p, i.s, i.f) * i.qty)}</span>
            </div>
            <button class="ci__remove" type="button" data-remove>Remove</button>
          </div>
        </li>`).join('')
      : `<li class="cart-empty"><p>Your walls are waiting.</p><p class="muted">Pick a print from the collection, or preview one on your wall first.</p><a class="btn" href="shop.html">Shop Collection ${ARROW}</a></li>`;
    $('[data-cart-foot]', drawer).hidden = !cart.length;
    $('[data-sub]', drawer).textContent = money(sub);
    $('[data-ship]', drawer).textContent = ship === 0 ? 'Free' : money(ship);
    $('[data-total]', drawer).textContent = money(sub + ship);
    const left = FREE_DELIVERY - sub;
    $('[data-ship-msg]', drawer).innerHTML = sub === 0
      ? `Free delivery across Malta &amp; Gozo on orders over ${money(FREE_DELIVERY)}.`
      : left > 0 ? `You’re <b>${money(left)}</b> away from free delivery across Malta &amp; Gozo.`
        : '<b>Free delivery unlocked.</b> Packed by hand in Malta.';
    $('[data-ship-bar]', drawer).style.width = `${Math.min(100, (sub / FREE_DELIVERY) * 100)}%`;
  }
  function saveCart() { store.set(CART_KEY, cart); renderCart(); }

  function addToCart(items) {
    items.forEach(({ p, s, f }) => {
      const key = `${p}|${s}|${f}`;
      const found = cart.find((i) => i.key === key);
      if (found) found.qty += 1; else cart.push({ key, p, s, f, qty: 1 });
    });
    saveCart();
    $$('[data-cart-count]').forEach((el) => { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); });
    notify(items.length > 1 ? `${items.length} prints added to your cart` : `${PRODUCTS[items[0].p].short} added to your cart`);
    openCart();
  }

  $('[data-cart-list]', drawer).addEventListener('click', (e) => {
    const row = e.target.closest('.ci');
    if (!row) return;
    const item = cart.find((i) => i.key === row.dataset.key);
    if (!item) return;
    if (e.target.closest('[data-inc]')) item.qty += 1;
    else if (e.target.closest('[data-dec]')) item.qty -= 1;
    else if (e.target.closest('[data-remove]')) item.qty = 0;
    else return;
    const wasRemove = item.qty === 0;
    cart = cart.filter((i) => i.qty > 0);
    saveCart();
    if (wasRemove) $('.icon-btn', drawer).focus();
    else { const again = $(`.ci[data-key="${item.key}"] ${e.target.closest('[data-inc]') ? '[data-inc]' : '[data-dec]'}`, drawer); if (again) again.focus(); }
  });

  /* ---------- Hero + teaser scenes ---------- */
  const heroScene = $('[data-scene="hero"]');
  if (heroScene) {
    heroScene.innerHTML = sceneMarkup('limestone');
    $('.scene__hang', heroScene).innerHTML = scenePrint('valletta', 'a3', 'black') + scenePrint('gozo', 'b2', 'oak') + scenePrint('blue', 'a3', 'white');
  }

  const teaser = $('[data-scene="teaser"]');
  if (teaser) {
    teaser.innerHTML = sceneMarkup('limestone');
    $('.scene__hang', teaser).innerHTML = scenePrint('gozo', 'b2', 'oak');
    const order = ['limestone', 'plaster', 'concrete', 'charcoal'];
    const dots = $$('[data-wall-dot]');
    const label = $('[data-teaser-label]');
    let n = 0;
    const show = () => {
      setWall(teaser, order[n]);
      dots.forEach((d) => d.classList.toggle('is-active', d.dataset.wallDot === order[n]));
      if (label) label.textContent = `On ${WALLS[order[n]]}`;
    };
    show();
    if (!reduced) setInterval(() => { n = (n + 1) % order.length; show(); }, 2800);
  }

  /* ---------- Product cards ---------- */
  const PRINT_WIDTH = { a4: '31%', a3: '40%', b2: '51%' };
  let customiser = null;

  $$('.product').forEach((card) => {
    const p = card.dataset.product;
    const sizeSel = $('[data-size]', card);
    const frames = $$('input[type="radio"]', card);
    const print = $('.product__media .print', card);
    const state = () => ({ p, s: sizeSel.value, f: (frames.find((i) => i.checked) || { value: 'none' }).value });
    const update = () => {
      const { s, f } = state();
      print.dataset.frame = f;
      print.style.setProperty('--pw', PRINT_WIDTH[s]);
      $('[data-price]', card).textContent = money(unitPrice(p, s, f));
      $('[data-frame-price]', card).textContent = `+${money(SIZES[s].frame)} for ${SIZES[s].label}`;
      $('[data-scale]', card).textContent = SIZES[s].dims;
    };
    sizeSel.addEventListener('change', update);
    frames.forEach((i) => i.addEventListener('change', update));
    update();
    $('[data-add]', card).addEventListener('click', () => addToCart([state()]));
    const prev = $('[data-preview]', card);
    if (prev) prev.addEventListener('click', () => {
      const { s, f } = state();
      if (customiser) customiser.set({ art: p, layout: 'single', size: s, frame: f });
      const target = $('#customiser');
      if (target) target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  /* ---------- Virtual Gallery Wall Customiser ---------- */
  const czRoot = $('#customiser-app');
  if (czRoot) {
    const scene = $('[data-scene="cz"]', czRoot);
    scene.innerHTML = sceneMarkup('limestone');
    const hang = $('.scene__hang', scene);
    const wallEl = $('.scene__wall', scene);
    const tools = $('[data-photo-tools]', czRoot);
    const fileInput = $('input[name="cz-photo"]', czRoot);
    const uploadOpt = fileInput.closest('.opt');
    const zoomInput = $('input[name="cz-zoom"]', czRoot);
    const st = { art: 'gozo', layout: 'single', wall: 'limestone', size: 'b2', frame: 'oak', dims: true, photo: null, zoom: 1, x: 50, y: 42 };
    const arts = () => (st.layout === 'trio' ? ['valletta', 'gozo', 'blue'] : [st.art]);

    const sync = () => {
      const set = (name, val) => $$(`input[name="${name}"]`, czRoot).forEach((i) => { i.checked = i.value === val; });
      set('cz-art', st.art); set('cz-layout', st.layout); set('cz-size', st.size); set('cz-frame', st.frame);
      $$('input[name="cz-wall"]', czRoot).forEach((i) => { i.checked = !st.photo && i.value === st.wall; });
      uploadOpt.classList.toggle('is-active', !!st.photo);
      $('input[name="cz-dims"]', czRoot).checked = st.dims;
      $('[data-art-group]', czRoot).disabled = st.layout === 'trio';
      zoomInput.value = st.zoom;
    };
    const place = () => { scene.style.setProperty('--x', `${st.x}%`); scene.style.setProperty('--y', `${st.y}%`); };

    function render() {
      const list = arts();
      hang.innerHTML = list.map((a) => scenePrint(a, st.size, st.frame)).join('');
      if (st.photo) {
        wallEl.className = 'scene__wall is-photo';
        wallEl.style.backgroundImage = `url("${st.photo}")`;
      } else setWall(scene, st.wall);
      scene.classList.toggle('is-photo', !!st.photo);
      scene.classList.toggle('is-dark', !st.photo && st.wall === 'charcoal');
      scene.classList.toggle('show-dims', st.dims);
      scene.style.setProperty('--zoom', st.photo ? st.zoom : 1);
      hang.tabIndex = st.photo ? 0 : -1;
      hang.setAttribute('aria-label', st.photo ? 'Print position. Use arrow keys to move it.' : '');
      place();
      tools.hidden = !st.photo;
      const total = list.reduce((a, p) => a + unitPrice(p, st.size, st.frame), 0);
      $('[data-cz-price]', czRoot).textContent = money(total);
      $('[data-cz-sum]', czRoot).textContent = `${list.length > 1 ? '3 prints' : '1 print'} · ${SIZES[st.size].label} · ${FRAMES[st.frame]}`;
      $('[data-cz-caption]', czRoot).innerHTML = `<b>${list.length > 1 ? 'Gallery trio' : PRODUCTS[st.art].name}</b> · ${SIZES[st.size].dims} · ${FRAMES[st.frame]} · on ${st.photo ? 'your own wall' : WALLS[st.wall]}`;
      $('[data-cz-add]', czRoot).innerHTML = `Add ${list.length > 1 ? 'all 3 prints' : 'this setup'} to cart ${ARROW}`;
      sync();
    }
    const clearPhoto = () => { if (st.photo) URL.revokeObjectURL(st.photo); st.photo = null; st.zoom = 1; };

    czRoot.addEventListener('change', (e) => {
      const t = e.target;
      switch (t.name) {
        case 'cz-art': st.art = t.value; break;
        case 'cz-layout': st.layout = t.value; break;
        case 'cz-size': st.size = t.value; break;
        case 'cz-frame': st.frame = t.value; break;
        case 'cz-dims': st.dims = t.checked; break;
        case 'cz-wall': clearPhoto(); st.wall = t.value; break;
        case 'cz-photo': {
          const file = t.files && t.files[0];
          if (file && file.type.startsWith('image/')) {
            clearPhoto();
            st.photo = URL.createObjectURL(file);
            st.x = 50; st.y = 42;
            notify('Photo added. Drag the print into place.');
          }
          t.value = '';
          break;
        }
        default: return;
      }
      render();
    });
    zoomInput.addEventListener('input', () => { st.zoom = +zoomInput.value; scene.style.setProperty('--zoom', st.zoom); });
    $('[data-photo-clear]', czRoot).addEventListener('click', () => { clearPhoto(); render(); });
    $('[data-cz-add]', czRoot).addEventListener('click', () => addToCart(arts().map((p) => ({ p, s: st.size, f: st.frame }))));

    // drag + keyboard positioning on a user photo
    let drag = null;
    hang.addEventListener('pointerdown', (e) => {
      if (!st.photo) return;
      const r = scene.getBoundingClientRect();
      drag = { dx: e.clientX - (r.left + (st.x / 100) * r.width), dy: e.clientY - (r.top + (st.y / 100) * r.height) };
      hang.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    hang.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const r = scene.getBoundingClientRect();
      st.x = clamp(((e.clientX - drag.dx - r.left) / r.width) * 100, 4, 96);
      st.y = clamp(((e.clientY - drag.dy - r.top) / r.height) * 100, 4, 96);
      place();
    });
    const endDrag = () => { drag = null; };
    hang.addEventListener('pointerup', endDrag);
    hang.addEventListener('pointercancel', endDrag);
    hang.addEventListener('keydown', (e) => {
      if (!st.photo) return;
      const step = e.shiftKey ? 5 : 1.5;
      const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
      if (!moves[e.key]) return;
      e.preventDefault();
      st.x = clamp(st.x + moves[e.key][0], 4, 96);
      st.y = clamp(st.y + moves[e.key][1], 4, 96);
      place();
    });

    customiser = { set(o) { Object.assign(st, o); render(); } };
    render();
  }

  /* ---------- Contact form ---------- */
  const form = $('#contact-form');
  if (form) {
    const el = (n) => form.elements.namedItem(n);
    const subject = new URLSearchParams(window.location.search).get('subject');
    if (subject) {
      const r = $$('input[name="subject"]', form).find((i) => i.value === subject);
      if (r) r.checked = true;
    }
    const msg = el('message');
    const counter = $('[data-count]', form);
    msg.addEventListener('input', () => { counter.textContent = `${msg.value.length} / 1000`; });

    const rules = {
      fullname: () => el('fullname').value.trim().length >= 2 || 'Please tell us your full name.',
      email: () => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el('email').value.trim()) || 'Please enter a valid email address, e.g. name@example.com.',
      subject: () => !!$('input[name="subject"]:checked', form) || 'Choose what your message is about.',
      message: () => msg.value.trim().length >= 10 || 'Add a few more details (at least 10 characters).',
    };
    const check = (name) => {
      const field = $(`[data-field="${name}"]`, form);
      const res = rules[name]();
      const ok = res === true;
      field.classList.toggle('is-invalid', !ok);
      $('.field__error', field).textContent = ok ? '' : res;
      const input = name === 'subject' ? null : el(name);
      if (input) input.setAttribute('aria-invalid', String(!ok));
      return ok;
    };
    ['fullname', 'email', 'message'].forEach((n) => {
      el(n).addEventListener('blur', () => { if (el(n).value) check(n); });
      el(n).addEventListener('input', () => { if ($(`[data-field="${n}"]`, form).classList.contains('is-invalid')) check(n); });
    });
    form.addEventListener('change', (e) => { if (e.target.name === 'subject') check('subject'); });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const results = Object.keys(rules).map(check);
      if (results.includes(false)) {
        const first = $('.is-invalid input, .is-invalid textarea', form);
        if (first) first.focus();
        return;
      }
      const first = el('fullname').value.trim().split(/\s+/)[0];
      const topic = $('input[name="subject"]:checked + span', form).textContent;
      const done = document.createElement('div');
      done.className = 'form-success';
      done.setAttribute('role', 'status');
      done.tabIndex = -1;
      done.innerHTML = `
        <span class="eyebrow">Message received · ${esc(topic)}</span>
        <h3 class="h2">Grazzi, <em>${esc(first)}.</em></h3>
        <p>Thanks for getting in touch. Someone from our Malta studio will reply to <b>${esc(el('email').value.trim())}</b> within one working day.</p>
        <p style="font-size:.8rem;opacity:.65">Prototype note: this demo form doesn’t send messages.</p>
        <a class="btn btn--light" href="shop.html">Browse the collection ${ARROW}</a>`;
      form.replaceWith(done);
      done.focus();
    });
  }

  /* ---------- Artwork + reveal ---------- */
  fillPrints();
  $$('.product__props').forEach((el) => { el.innerHTML = SIDEBOARD; });
  renderCart();

  const revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    revealEls.forEach((r) => io.observe(r));
  } else revealEls.forEach((r) => r.classList.add('is-in'));
})();
