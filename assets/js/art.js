/* Nestart Home — original poster artwork.
   Drawn as inline SVG so the page's web fonts apply and every
   print stays sharp at any size. viewBox is 500 × 700 (5:7). */
(function () {
  'use strict';
  let uid = 0;
  const SERIF = "'Instrument Serif', Georgia, serif";
  const SANS = "'Inter Tight', system-ui, sans-serif";
  const label = (x, y, text, fill, size = 10.5, anchor = 'start') =>
    `<text x="${x}" y="${y}" fill="${fill}" font-family="${SANS}" font-size="${size}" font-weight="500" letter-spacing="3" text-anchor="${anchor}">${text}</text>`;
  const title = (x, y, text, fill, size) =>
    `<text x="${x}" y="${y}" fill="${fill}" font-family="${SERIF}" font-size="${size}" font-style="italic">${text}</text>`;

  const ART = {
    valletta: {
      alt: 'Valletta Architecture Line Art: a fine black line drawing of Valletta’s domes, spire and wooden balconies above the bastions, with a terracotta sun',
      draw: () => `
<rect width="500" height="700" fill="#EFE8DC"/>
<circle cx="372" cy="196" r="56" fill="#C9683F"/>
${title(40, 104, 'Valletta', '#1C1B19', 66)}
${label(43, 134, 'MALTA · 35.89°N 14.51°E', '#1C1B19')}
<g fill="#EFE8DC" stroke="#1C1B19" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M324 300 L341 172 L358 300 Z"/>
  <rect x="326" y="300" width="30" height="100"/>
  <path d="M334 318 v16 M348 318 v16" fill="none"/>
  <rect x="206" y="292" width="48" height="66"/>
  <path d="M214 316 v14 M226 316 v14 M238 316 v14 M248 316 v14" fill="none"/>
  <path d="M202 292 C202 238 258 238 258 292 Z"/>
  <path d="M218 291 C219 266 225 254 230 251 M242 291 C241 266 235 254 230 251" fill="none"/>
  <rect x="224" y="234" width="12" height="17"/>
  <path d="M221 235 Q230 222 239 235 Z"/>
  <path d="M230 223 V209 M225 214 H235" fill="none"/>
  <rect x="72" y="384" width="72" height="86"/>
  <path d="M86 402 h12 v18 h-12z M116 402 h12 v18 h-12z M86 438 h12 v18 h-12z M116 438 h12 v18 h-12z"/>
  <rect x="144" y="352" width="56" height="118"/>
  <rect x="152" y="376" width="40" height="32"/>
  <path d="M165 376 v32 M179 376 v32 M152 391 h40 M157 408 l5 9 M187 408 l-5 9" fill="none"/>
  <path d="M164 432 h16 v26 h-16z"/>
  <rect x="200" y="378" width="62" height="92"/>
  <path d="M195 378 L231 352 L267 378 Z"/>
  <path d="M210 386 v84 M252 386 v84" fill="none"/>
  <circle cx="231" cy="400" r="6.5"/>
  <path d="M223 470 v-26 a8 8 0 0 1 16 0 v26"/>
  <rect x="262" y="364" width="62" height="106"/>
  <rect x="270" y="386" width="46" height="32"/>
  <path d="M285 386 v32 M301 386 v32 M270 401 h46 M276 418 l5 9 M310 418 l-5 9" fill="none"/>
  <path d="M276 438 h12 v22 h-12z M298 438 h12 v22 h-12z"/>
  <rect x="324" y="394" width="60" height="76"/>
  <path d="M336 410 h12 v18 h-12z M360 410 h12 v18 h-12z M336 442 h12 v18 h-12z M360 442 h12 v18 h-12z"/>
  <rect x="384" y="372" width="48" height="98"/>
  <rect x="390" y="392" width="36" height="28"/>
  <path d="M402 392 v28 M414 392 v28 M390 405 h36" fill="none"/>
  <path d="M402 438 h12 v22 h-12z"/>
  <path d="M40 612 L66 470 H434 L460 612 Z"/>
  <path d="M58 515 H442 M50 560 H450 M44 590 H456" fill="none"/>
  <path d="M70 470 v-20 h20 v20"/>
  <path d="M68 450 Q80 432 92 450 Z"/>
</g>
<path d="M70 640 h46 M150 646 h70 M262 640 h40 M340 648 h60 M120 662 h30 M300 664 h50" stroke="#1C1B19" stroke-width="1.4" stroke-linecap="round"/>
${label(40, 688, 'NESTART HOME — LINE SERIES N°01', '#1C1B19', 9)}`,
    },

    gozo: {
      alt: 'Gozo Sunset Minimalist Print: flat bands of apricot sky, a red sun sinking into a deep blue sea between Gozo cliffs and Fungus Rock',
      draw: () => `
<rect width="500" height="700" fill="#F2DCC2"/>
<rect y="150" width="500" height="120" fill="#EDC7A1"/>
<rect y="270" width="500" height="150" fill="#E5A97E"/>
<circle cx="250" cy="420" r="104" fill="#C4532F"/>
<path d="M0 352 L52 344 L104 360 L146 388 L176 420 H0 Z" fill="#4A372D"/>
<path d="M356 420 C356 384 368 362 394 360 C420 358 434 380 438 420 Z" fill="#4A372D"/>
<rect y="420" width="500" height="280" fill="#2D4766"/>
<g fill="#3D5C82"><rect y="452" width="500" height="3"/><rect y="492" width="500" height="3"/><rect y="540" width="500" height="3"/></g>
<g fill="#D9714A"><rect x="186" y="432" width="128" height="5" rx="2.5"/><rect x="204" y="450" width="92" height="4" rx="2"/><rect x="222" y="468" width="56" height="4" rx="2"/><rect x="238" y="486" width="24" height="3" rx="1.5"/></g>
${label(40, 64, 'SUNSET SERIES N°02', '#8A4A2E')}
${title(40, 628, 'Għawdex', '#F2DCC2', 64)}
${label(42, 658, 'DWEJRA, GOZO · 19:42', '#F2DCC2')}`,
    },

    blue: {
      alt: 'Abstract Mediterranean Blue: a deep blue arch, pale blue half-circle, terracotta quarter-circle, sand-coloured sun and a hand-drawn wave',
      draw: () => `
<rect width="500" height="700" fill="#EAE4D9"/>
<circle cx="372" cy="190" r="44" fill="#D9AE68"/>
<path d="M90 640 V340 A160 160 0 0 1 410 340 V640 Z" fill="#1F3A5F"/>
<path d="M60 262 q30 -26 60 0 t60 0 t60 0" fill="none" stroke="#1F3A5F" stroke-width="7" stroke-linecap="round"/>
<path d="M156 640 V500 A94 94 0 0 1 344 500 V640 Z" fill="#9DB6CF"/>
<path d="M90 640 V560 A80 80 0 0 1 170 640 Z" fill="#B8643E"/>
<circle cx="250" cy="304" r="10" fill="#EAE4D9"/>
${title(40, 96, 'Blu', '#1F3A5F', 60)}
${label(42, 124, 'ABSTRACT SERIES N°03', '#1F3A5F')}
${label(40, 676, 'NESTART HOME', '#1F3A5F', 9)}`,
    },

    abstract: {
      alt: 'Minimalist abstract print: a thin black circle, a terracotta half-circle and a sand block on warm white',
      draw: () => `
<rect width="500" height="700" fill="#E6DFD3"/>
<rect x="76" y="404" width="120" height="196" fill="#CDB896"/>
<circle cx="230" cy="290" r="130" fill="none" stroke="#1C1B19" stroke-width="2"/>
<path d="M190 600 A100 100 0 0 1 390 600 Z" fill="#B8643E"/>
<path d="M336 110 V600 M60 600 H440" stroke="#1C1B19" stroke-width="2"/>
<circle cx="150" cy="200" r="9" fill="#1C1B19"/>
${label(40, 664, 'FORM STUDY N°07', '#1C1B19', 9)}`,
    },

    luzzu: {
      alt: 'Mediterranean print: a colourful Maltese luzzu fishing boat with the eye of Osiris on a blue sea under a golden sun',
      draw: (id) => `
<rect width="500" height="700" fill="#F1E3C9"/>
<circle cx="360" cy="196" r="70" fill="#E9A85E"/>
<rect y="470" width="500" height="230" fill="#2F5D8A"/>
<path d="M40 548 h80 M180 566 h120 M360 548 h90 M90 606 h70 M260 624 h110 M50 662 h60" stroke="#5D86B0" stroke-width="3" stroke-linecap="round"/>
<clipPath id="hull${id}"><path d="M76 446 H408 L418 404 H430 L414 478 Q402 506 350 508 H164 Q114 506 100 480 Z"/></clipPath>
<rect x="70" y="414" width="8" height="40" fill="#C2412D"/>
<g clip-path="url(#hull${id})">
  <rect x="60" y="398" width="380" height="120" fill="#F2C230"/>
  <rect x="60" y="446" width="380" height="14" fill="#2B5A8C"/>
  <rect x="60" y="460" width="380" height="7" fill="#C2412D"/>
  <rect x="60" y="467" width="380" height="7" fill="#3E7D52"/>
</g>
<path d="M364 484 Q378 472 392 484 Q378 494 364 484 Z" fill="#F4EDE0" stroke="#1C1B19" stroke-width="1.5"/>
<circle cx="378" cy="484" r="4" fill="#1C1B19"/>
<g fill="#F2C230" opacity=".55"><rect x="150" y="518" width="190" height="4" rx="2"/><rect x="186" y="530" width="118" height="3" rx="1.5"/></g>
${title(40, 104, 'Luzzu', '#2F5D8A', 62)}
${label(42, 132, 'MARSAXLOKK · MALTA', '#2F5D8A')}`,
    },

    type: {
      alt: 'Typography print reading “Ħajja Sabiħa.” — Maltese for “a beautiful life” — in large black serif letters on sand',
      draw: () => `
<rect width="500" height="700" fill="#D8C9AE"/>
${label(40, 64, 'IL-MALTI · N°11', '#1C1B19')}
<text font-family="${SERIF}" fill="#1C1B19" font-size="132" letter-spacing="-2"><tspan x="32" y="320">Ħajja</tspan><tspan x="32" y="448" font-style="italic">Sabiħa.</tspan></text>
<path d="M40 512 H460" stroke="#1C1B19" stroke-width="1.5"/>
<text x="40" y="550" font-family="${SERIF}" font-size="26" font-style="italic" fill="#1C1B19">(n.) a beautiful life.</text>
<circle cx="428" cy="622" r="26" fill="#B8643E"/>`,
    },
  };

  function svg(name, { decorative = false } = {}) {
    const art = ART[name];
    if (!art) return '';
    const id = ++uid;
    const a11y = decorative ? 'aria-hidden="true"' : `role="img" aria-label="${art.alt}"`;
    return `<svg viewBox="0 0 500 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" ${a11y}>${art.draw(id)}</svg>`;
  }

  window.NestArt = { svg, has: (n) => n in ART };
})();
