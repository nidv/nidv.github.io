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
    'about.p1':          "I'm a <strong>developer</strong> with a passion for building clean and purposeful interfaces. I believe good design is invisible; it just works.",
    'about.p2':          'My work lives at the intersection of aesthetics and function. I enjoy taking complex ideas and distilling them into simple, elegant solutions that are a pleasure to use.',
    'about.p3':          'I have a background as an ERP developer, specializing in Business Central (previously known as Microsoft Dynamics NAV/Navision). Starting in 2026, I am furthering my education in full-stack .NET development with a focus on AI, broadening my expertise in modern development tools.',
    'projects.h':        'Projects',
    'projects.sub':      'Selected work',
    'stantrack.type':    'Full-stack · Personal',
    'stantrack.name':    'StanTrack',
    'stantrack.desc':    'A full-stack webapp for fans to follow their favorite celebs and see their upcoming events. Note: Due to being on Azure Free Plan, the site is asleep due to inactivity. Please allow a few minutes for the site to wake up upon visiting.',
    'cv.type':           'Web · Fictive',
    'cv.name':           'CV',
    'cv.desc':           'A clean and responsive CV website presenting professional experience, education, and skills in a structured, readable format.',
    'casino.type':       'Web · Personal',
    'casino.name':       'Casino Slots Game',
    'casino.desc':       'A clean and responsive 3-reel casino slots game, featuring engaging gameplay.',
    'cakery.type':       'Web · Fictive',
    'cakery.name':       'Cakery',
    'cakery.desc':       'A delightful bakery website with an elegant product showcase, warm visual identity, and seamless browsing experience for a local cakery.',
    'certs.h':           'Certificates',
    'certs.sub':         'Verified credentials',
    'cert1.issuer':      'freeCodeCamp & Microsoft · 2026',
    'cert1.name':        'C# Programming',
    'cert1.sub':         'Foundational C# with Microsoft',
    'cert1.badge':       'Verified',
    'cert2.issuer':      '1ClickFactory · 2018',
    'cert2.name':        'Extensions 2.0 Development',
    'cert2.sub':         'Business Central extension development',
    'cert2.badge':       'Verified',
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
    'about.p1':          'Jag är en <strong>utvecklare</strong> med passion för att bygga rena och genomtänkta lösningar. Jag tror att bra design är osynlig; den fungerar bara.',
    'about.p2':          'Mitt arbete lever i navet mellan estetik och funktion. Jag gillar att ta komplexa idéer och bryta ner dem till enkla och eleganta lösningar.',
    'about.p3':          'Jag har en bakgrund som utvecklare inom Microsoft Business Central (tidigare Dynamics NAV/Navision). Från 2026 breddar jag min kompetens inom fullstack .NET-utveckling med AI-inriktning.',
    'projects.h':        'Projekt',
    'projects.sub':      'Urvalt arbete',
    'stantrack.type':    'Fullstack · Personlig',
    'stantrack.name':    'StanTrack',
    'stantrack.desc':    'En fullstack-webbapp där fans kan följa sina favoritkändisar och se deras kommande evenemang. Obs: Eftersom appen ligger på Azures gratisplan "sover" den vid inaktivitet. Räkna med några minuters uppstartstid vid första besöket.',
    'cv.type':           'Webb · Fiktiv',
    'cv.name':           'CV',
    'cv.desc':           'En ren och responsiv CV-hemsida som presenterar yrkeserfarenhet, utbildning och kompetenser i ett strukturerat och lättläst format.',
    'casino.type':       'Webb · Personlig',
    'casino.name':       'Casino Slots-spel',
    'casino.desc':       'Ett rent och responsivt casinospel med tre hjul och engagerande spelupplevelse.',
    'cakery.type':       'Webb · Fiktiv',
    'cakery.name':       'Konditori',
    'cakery.desc':       'En charmig konditori-hemsida med en elegant produktpresentation, varm visuell identitet och smidig surfupplevelse för ett lokalt konditori.',
    'certs.h':           'Certifikat',
    'certs.sub':         'Verifierade meriter',
    'cert1.issuer':      'freeCodeCamp & Microsoft · 2026',
    'cert1.name':        'C#-programmering',
    'cert1.sub':         'Grundläggande C# med Microsoft',
    'cert1.badge':       'Verifierad',
    'cert2.issuer':      '1ClickFactory · 2018',
    'cert2.name':        'Extensions 2.0 Development',
    'cert2.sub':         'Tilläggsutveckling för Business Central',
    'cert2.badge':       'Verifierad',
    'contact.h1':        'Låt oss',
    'contact.h2':        'hålla kontakten.',
    'contact.sub':       'Öppen för nya möjligheter och samtal.\nHör gärna av er, ser fram emot det.',
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
  // Texter som innehåller HTML (t.ex. <strong>): parsa som DOM-noder istället.
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const html = t[el.dataset.i18nHtml];
    if (html !== undefined) {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      el.replaceChildren(...doc.body.childNodes);
    }
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

// ── Auto-detect language by location ─────────────────────────
// Fetches user's rough location by IP to select the starting language.
// If the visitor is from Sweden (SE), defaults to Swedish, otherwise English.
fetch('https://ipapi.co/json/')
  .then(res => res.json())
  .then(data => {
    if (data && data.country_code === 'SE') {
      // Hitta den svenska knappen och simulera ett klick på den.
      const svBtn = langBtns.find(b => b.dataset.lang === 'sv');
      if (svBtn && currentLang !== 'sv') {
        svBtn.click();
      }
    }
  })
  .catch(err => {
    // Om geolokaliseringen misslyckas (t.ex. nertid eller adblocker):
    // Vi låter bara sidan vara kvar på engelska (som den är från början).
  });
