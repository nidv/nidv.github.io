// ── Navigation ───────────────────────────────────────────────
const wrap     = document.getElementById('wrap');
const sections = [...document.querySelectorAll('section')];
const dots     = [...document.querySelectorAll('.dot')];

dots.forEach(d => d.addEventListener('click', () => {
  sections[+d.dataset.i].scrollIntoView({ behavior: 'smooth' });
}));

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const idx = sections.indexOf(e.target);
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    e.target.querySelectorAll('.r').forEach(el => el.classList.add('in'));
  });
}, { threshold: 0.45, root: wrap });

sections.forEach(s => io.observe(s));

document.addEventListener('keydown', e => {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
  const active = dots.findIndex(d => d.classList.contains('active'));
  const next   = e.key === 'ArrowDown'
    ? Math.min(active + 1, sections.length - 1)
    : Math.max(active - 1, 0);
  sections[next].scrollIntoView({ behavior: 'smooth' });
});

// ── Obfuscated identity (deters scraping bots) ───────────────
// Name and email are stored as reversed fragments so the plaintext
// strings never appear in the page source; assembled at runtime.
(() => {
  const rev = s => [...s].reverse().join('');

  // Email
  const addr = `${rev('annylrad')}@${rev('moc.liamg')}`;
  const link = document.getElementById('email-link');
  const val  = document.getElementById('email-val');
  if (link) link.href = 'mailto:' + addr;
  if (val)  val.textContent = addr;

  // Name
  const first = rev('annylraD');
  const last  = rev('naV');
  const hero  = document.getElementById('hero-name');
  if (hero) {
    hero.append(first);
    hero.append(document.createElement('br'));
    const em = document.createElement('em');
    em.textContent = last + '.';
    hero.append(em);
  }
  document.title = `${first} ${last} - Portfolio`;
})();

// ── Translations ─────────────────────────────────────────────
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
    'about.p1':          "I'm a <strong>developer and designer</strong> with a passion for building clean, purposeful interfaces. I believe good design is invisible; it just works, and it feels right.",
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
let currentLang = 'en';

function applyLang(lang) {
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t[el.dataset.i18n] ?? el.textContent;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t[el.dataset.i18nHtml] ?? el.innerHTML;
  });
  document.documentElement.lang = lang;
}

const langBtns = [...document.querySelectorAll('.lang-btn')];

langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    if (lang === currentLang) return;
    currentLang = lang;

    langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));

    wrap.style.transition = 'opacity 0.15s ease';
    wrap.style.opacity    = '0';
    setTimeout(() => {
      applyLang(lang);
      wrap.style.opacity = '1';
    }, 150);
  });
});
