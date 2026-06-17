// ── Navigation ───────────────────────────────────────────────
// Den här delen sköter allt som har med att hoppa mellan sektionerna att göra:
// prick-menyn, vilken prick som lyser, fade-in när man scrollar och piltangenterna.

// Hämtar de element vi jobbar med. [...] gör om resultatet till en riktig array
// så vi kan använda forEach, indexOf osv på dem.
const wrap     = document.getElementById('wrap');   // scroll-lådan
const sections = [...document.querySelectorAll('section')]; // alla sektioner
const dots     = [...document.querySelectorAll('.dot')];    // prickarna i sidomenyn

// Klick på en prick → scrolla mjukt till motsvarande sektion.
// +d.dataset.i gör om texten "2" till siffran 2 så vi kan slå upp rätt sektion.
dots.forEach(d => d.addEventListener('click', () => {
  sections[+d.dataset.i].scrollIntoView({ behavior: 'smooth' });
}));

// IntersectionObserver = en "vakt" som säger till när en sektion kommer in i vyn.
// När en sektion syns till minst 45% (threshold 0.45) tänder vi rätt prick
// och lägger på klassen "in" på allt som ska fade:a in (elementen med klassen .r).
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;          // hoppa över sektioner som lämnar vyn
    const idx = sections.indexOf(e.target); // vilken sektion i ordningen är det?
    dots.forEach((d, i) => d.classList.toggle('active', i === idx)); // tänd rätt prick
    e.target.querySelectorAll('.r').forEach(el => el.classList.add('in')); // dra igång fade-in
  });
}, { threshold: 0.45, root: wrap });

// Säg åt vakten att hålla koll på varje sektion.
sections.forEach(s => io.observe(s));

// Låt piltangenterna upp/ner hoppa en sektion i taget.
document.addEventListener('keydown', e => {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return; // bry oss bara om upp/ner
  const active = dots.findIndex(d => d.classList.contains('active')); // var är vi nu?
  // Räkna ut nästa sektion, men stanna inom listan (Math.min/max = nudda inte kanterna).
  const next   = e.key === 'ArrowDown'
    ? Math.min(active + 1, sections.length - 1)
    : Math.max(active - 1, 0);
  sections[next].scrollIntoView({ behavior: 'smooth' });
});

// ── Obfuscated identity (deters scraping bots) ───────────────
(() => {
  // rev = liten hjälpare som vänder en sträng baklänges ("abc" → "cba").
  const rev = s => [...s].reverse().join('');

  // E-post: bygger ihop adressen av baklängesvända bitar och sätter mailto:-länken.
  const addr = `${rev('annylrad')}@${rev('moc.liamg')}`;
  const link = document.getElementById('email-link');
  const val  = document.getElementById('email-val');
  if (link) link.href = 'mailto:' + addr;   // klickbar mailto-länk
  if (val)  val.textContent = addr;          // adressen som syns på sidan

  // Namn: samma baklänges-trick, och vi bygger ihop hero-rubriken bit för bit.
  const first = rev('annylraD');
  const last  = rev('naV');
  const hero  = document.getElementById('hero-name');
  if (hero) {
    hero.append(first);                      // förnamnet
    hero.append(document.createElement('br')); // radbrytning
    const em = document.createElement('em');   // efternamnet i kursiv stil
    em.textContent = last + '.';
    hero.append(em);
  }
  // Sätt flikens titel till hela namnet.
  document.title = `${first} ${last} - Portfolio`;
})();

// ── Translations ─────────────────────────────────────────────
// Här bor alla texter på båda språken. Varje nyckel (t.ex. 'hero.eye') matchar
// ett data-i18n="..." ute i HTML:en. en = engelska, sv = svenska.
const translations = {
  en: {
    'label.about':       'About',
    'label.work':        'Work',
    'label.credentials': 'Credentials',
    'label.contact':     'Contact',
    'hero.eye':          'Developer',
    'hero.sub':          'Crafting thoughtful digital experiences - where clean code meets considered design.',
    'hero.scroll':       'Scroll to explore',
    'about.h1':          'A bit',
    'about.h2':          'about me.',
    'about.p1':          "I'm a <strong>developer</strong> with a passion for building clean, purposeful interfaces. I believe good design is invisible; it just works, and it feels right.",
    'about.p2':          'My work lives at the intersection of aesthetics and function. I enjoy taking complex ideas and distilling them into simple, elegant solutions that are a pleasure to use.',
    'projects.h':        'Projects',
    'projects.sub':      'Selected work',
    'cv.type':           'Web · Personal',
    'cv.name':           'CV Website',
    'cv.desc':           'A clean and responsive CV website presenting professional experience, education, and skills in a structured, readable format.',
    'casino.type':       'Web · Personal',
    'casino.name':       'Casino Slots Game',
    'casino.desc':       'A clean and responsive 3-reel casino slots game, featuring engaging gameplay.',
    'cakery.type':       'Web · Client',
    'cakery.name':       'Cakery Website',
    'cakery.desc':       'A delightful bakery website with an elegant product showcase, warm visual identity, and seamless browsing experience for a local cakery.',
    'certs.h':           'Certificates',
    'certs.sub':         'Verified credentials',
    'cert1.issuer':      'freeCodeCamp & Microsoft · 2026',
    'cert1.name':        'C# Programming',
    'cert1.sub':         'Foundational C# with Microsoft',
    'cert1.badge':       'Verified',
    'contact.h1':        "Let's",
    'contact.h2':        'connect.',
    'contact.sub':       "Open to new opportunities and conversations. Reach out - I'd love to hear from you.",
    'email.type':        'Email',
    'github.type':       'GitHub',
  },
  sv: {
    'label.about':       'Om mig',
    'label.work':        'Arbete',
    'label.credentials': 'Meriter',
    'label.contact':     'Kontakt',
    'hero.eye':          'Utvecklare',
    'hero.sub':          'Skapar genomtänkta digitala upplevelser - där ren kod möter genomtänkt design.',
    'hero.scroll':       'Scrolla för att utforska',
    'about.h1':          'Lite',
    'about.h2':          'om mig.',
    'about.p1':          'Jag är en <strong>utvecklare</strong> med passion för att bygga rena och genomtänkta gränssnitt. Jag tror att bra design är osynlig; den fungerar bara, och den känns rätt.',
    'about.p2':          'Mitt arbete lever i navet mellan estetik och funktion. Jag gillar att ta komplexa idéer och bryta ner dem till enkla och eleganta lösningar som är ett nöje att använda.',
    'projects.h':        'Projekt',
    'projects.sub':      'Urvalt arbete',
    'cv.type':           'Webb · Personlig',
    'cv.name':           'CV',
    'cv.desc':           'En ren och responsiv CV-hemsida som presenterar yrkeserfarenhet, utbildning och kompetenser i ett strukturerat och lättläst format.',
    'casino.type':       'Webb · Personlig',
    'casino.name':       'Casino Slots-spel',
    'casino.desc':       'Ett rent och responsivt casinospel med tre hjul och engagerande spelupplevelse.',
    'cakery.type':       'Webb · Klient',
    'cakery.name':       'Konditori',
    'cakery.desc':       'En charmig konditori-hemsida med en elegant produktpresentation, varm visuell identitet och smidig surfupplevelse för ett lokalt konditori.',
    'certs.h':           'Certifikat',
    'certs.sub':         'Verifierade meriter',
    'cert1.issuer':      'freeCodeCamp & Microsoft · 2026',
    'cert1.name':        'C#-programmering',
    'cert1.sub':         'Grundläggande C# med Microsoft',
    'cert1.badge':       'Verifierad',
    'contact.h1':        'Låt oss',
    'contact.h2':        'hålla kontakten.',
    'contact.sub':       'Öppen för nya möjligheter och samtal. Hör gärna av dig - ser fram emot att höra från dig.',
    'email.type':        'E-post',
    'github.type':       'GitHub',
  },
};

// ── Language switcher ────────────────────────────────────────
// Sköter själva språkbytet när man klickar EN/SV.
let currentLang = 'en'; // håller koll på vilket språk som är aktivt just nu

// applyLang byter ut alla texter på sidan till valt språk.
function applyLang(lang) {
  const t = translations[lang]; // plocka rätt språkpaket
  // Vanliga texter: byt ut textinnehållet. ?? betyder "finns ingen översättning, behåll det som står".
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t[el.dataset.i18n] ?? el.textContent;
  });
  // Texter som innehåller HTML (t.ex. <strong>): använd innerHTML istället.
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t[el.dataset.i18nHtml] ?? el.innerHTML;
  });
  document.documentElement.lang = lang; // uppdatera lang-attributet på <html>
}

const langBtns = [...document.querySelectorAll('.lang-btn')];

// Lyssna på klick på språkknapparna.
langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    if (lang === currentLang) return; // redan på det språket? gör inget
    currentLang = lang;

    // Markera den klickade knappen som aktiv (och avmarkera den andra).
    langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));

    // Liten fade-effekt: tona ut, byt texterna när det är osynligt, tona in igen.
    wrap.style.transition = 'opacity 0.15s ease';
    wrap.style.opacity    = '0';
    setTimeout(() => {
      applyLang(lang);
      wrap.style.opacity = '1';
    }, 150); // 150 ms matchar fade-tiden ovan
  });
});
