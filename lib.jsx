/* ============================================================
   Al-Islah Redesign — shared primitives, icons, routing, data
   Exposes helpers on window for the page bundles to consume.
   ============================================================ */

/* ---------- Icon set (Lucide-style, 24x24 stroke) ---------- */
const ICONS = {
  menu: 'M4 6h16M4 12h16M4 18h16',
  x: 'M6 6l12 12M18 6L6 18',
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-right': 'M9 6l6 6-6 6',
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-up-right': 'M7 17L17 7M8 7h9v9',
  clock: 'M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z',
  calendar: 'M8 3v4M16 3v4M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z',
  'map-pin': 'M12 21s7-6.13 7-11a7 7 0 10-14 0c0 4.87 7 11 7 11z M12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  mail: 'M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z M3.5 7l8.5 6 8.5-6',
  printer: 'M6 9V3h12v6M6 18H4a1 1 0 01-1-1v-5a1 1 0 011-1h16a1 1 0 011 1v5a1 1 0 01-1 1h-2M6 14h12v7H6z',
  heart: 'M12 20s-7-4.5-9.5-9A5 5 0 0112 5a5 5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z',
  users: 'M16 19v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 9a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM22 19v-2a4 4 0 00-3-3.87M16 2.13A4 4 0 0116 9.87',
  user: 'M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  book: 'M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5zM4 5v14',
  'graduation-cap': 'M22 9L12 4 2 9l10 5 10-5zM6 11v5c0 1 3 3 6 3s6-2 6-3v-5',
  'hand-helping': 'M3 12h3l3 3 4-4 5 1M2 17l4 4M11 11l3-3a2 2 0 013 0l3 3',
  sunrise: 'M12 3v5M5 11a7 7 0 0114 0M3 16h18M8 8l4-4 4 4M5 20h14',
  sun: 'M12 7a5 5 0 100 10 5 5 0 000-10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  sunset: 'M12 10V3M5 18a7 7 0 0114 0M3 22h18M8 14l4 4 4-4',
  moon: 'M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z',
  star: 'M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18l-5.8 3 1.1-6.5L2.6 9.8l6.5-.9z',
  check: 'M5 12l5 5L20 6',
  'check-circle': 'M9 12l2 2 4-4M12 21a9 9 0 100-18 9 9 0 000 18z',
  plus: 'M12 5v14M5 12h14',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3',
  play: 'M6 4l14 8-14 8V4z',
  video: 'M3 7a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7zM15 10l6-3v10l-6-3',
  'file-text': 'M14 3v5h5M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8l-5-5zM8 13h8M8 17h6',
  'credit-card': 'M3 6h18a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7a1 1 0 011-1zM2 10h20',
  lock: 'M6 11h12a1 1 0 011 1v8a1 1 0 01-1 1H6a1 1 0 01-1-1v-8a1 1 0 011-1zM8 11V7a4 4 0 018 0v4',
  building: 'M4 21V5a1 1 0 011-1h6a1 1 0 011 1v16M12 21V9h6a1 1 0 011 1v11M3 21h18M7 8h2M7 12h2M7 16h2M15 13h1M15 17h1',
  gift: 'M20 12v8a1 1 0 01-1 1H5a1 1 0 01-1-1v-8M2 7h20v5H2zM12 21V7M12 7H8.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h3.5a2.5 2.5 0 000-5C13 2 12 7 12 7z',
  baby: 'M9 12h.01M15 12h.01M10 16c.5.5 1.2.8 2 .8s1.5-.3 2-.8M12 3a9 9 0 100 18 9 9 0 000-18zM9 3c0 1 1 2 3 2s3-1 3-2',
  rings: 'M8 14a5 5 0 100-10 5 5 0 000 10zM16 20a5 5 0 100-10 5 5 0 000 10zM8 4l2-2M14 2l2 2',
  briefcase: 'M3 8h18a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V9a1 1 0 011-1zM8 8V5a1 1 0 011-1h6a1 1 0 011 1v3M2 13h20',
  globe: 'M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3a14 14 0 010 18 14 14 0 010-18z',
  sparkles: 'M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z',
  compass: 'M12 21a9 9 0 100-18 9 9 0 000 18zM16 8l-2 6-6 2 2-6 6-2z',
  quote: 'M7 7h4v4l-2 5H6l2-5H6a1 1 0 01-1-1V8a1 1 0 011-1zm9 0h4v4l-2 5h-3l2-5h-2a1 1 0 01-1-1V8a1 1 0 011-1z',
  'message-circle': 'M21 11.5a8.5 8.5 0 01-12 7.7L3 21l1.8-6A8.5 8.5 0 1121 11.5z',
  facebook: 'M15 3h-3a4 4 0 00-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 011-1h3z',
  instagram: 'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zM12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM17.5 6.5h.01',
  youtube: 'M22 8.5a3 3 0 00-2.1-2.1C18 6 12 6 12 6s-6 0-7.9.4A3 3 0 002 8.5 31 31 0 002 12a31 31 0 00.1 3.5 3 3 0 002.1 2.1C6 18 12 18 12 18s6 0 7.9-.4a3 3 0 002.1-2.1A31 31 0 0022 12a31 31 0 00-.1-3.5zM10 15V9l5 3z',
  download: 'M12 3v12M7 11l5 5 5-5M5 21h14',
  external: 'M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5',
  filter: 'M3 5h18M6 12h12M10 19h4',
};

function Icon({ name, size = 20, className = '', strokeWidth = 1.85, fill = 'none', style }) {
  const d = ICONS[name] || '';
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={fill}
      stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={style} aria-hidden="true">
      {d.split('M').filter(Boolean).map((seg, i) => <path key={i} d={'M' + seg} />)}
    </svg>
  );
}

/* ---------- Image slot wrapper ---------- */
// Real Al-Islah Mosque photography (Wikimedia Commons + the mosque's own media),
// used as drop-in DUMMY defaults. A user dragging their own image onto a slot
// still overrides these. Assigned deterministically by slot id so each slot is
// stable across reloads and adjacent cards vary.
const IMG_POOL = [
  'assets/images/about-main.jpg',
  'assets/images/mosque-exterior-1.jpg',
  'assets/images/mosque-exterior-2.jpg',
  'assets/images/mosque-interior.jpg',
  'assets/images/mosque-photo.jpg',
  'assets/images/community-1.jpg',
  'assets/images/community-2.jpg',
  'assets/images/community-3.jpg',
  'assets/images/community-4.jpg',
  'assets/images/community-5.jpg',
  'assets/images/article-1.jpg',
  'assets/images/article-2.jpg',
  'assets/images/article-3.jpg',
];
function hashId(s) { let h = 0; for (let i = 0; i < (s || '').length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
function poolSrc(id) { return IMG_POOL[hashId(id || 'x') % IMG_POOL.length]; }
function Img({ id, ph, className = '', radius, shape = 'rect', fit = 'cover', style, src }) {
  return (
    <image-slot id={id} shape={shape} fit={fit} radius={radius}
      class={className} placeholder={ph} src={src || poolSrc(id)}
      style={{ width: '100%', height: '100%', ...style }}></image-slot>
  );
}

/* ---------- Layout primitives ---------- */
function Eyebrow({ children, color = '', center }) {
  return <div className={'eyebrow ' + color + (center ? ' center' : '')}>{children}</div>;
}
function SectionHead({ eyebrow, eyebrowColor, title, sub, center, children }) {
  return (
    <div className={'section-head' + (center ? ' center' : '')}>
      {eyebrow && <Eyebrow color={eyebrowColor} center={center}>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
      {children}
    </div>
  );
}
function navTo(to, e) {
  if (e) e.preventDefault();
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'auto' });
}
function Btn({ to, href, variant = 'primary', size, icon, iconRight, children, onClick, type }) {
  const cls = `btn btn-${variant}${size ? ' btn-' + size : ''}`;
  const inner = <>{icon && <Icon name={icon} size={18} className="ico" />}{children}{iconRight && <Icon name={iconRight} size={18} className="ico" />}</>;
  if (to) return <a className={cls} href={to} onClick={(e) => { navTo(to, e); onClick && onClick(e); }}>{inner}</a>;
  if (href) return <a className={cls} href={href} target="_blank" rel="noopener" onClick={onClick}>{inner}</a>;
  return <button className={cls} type={type || 'button'} onClick={onClick}>{inner}</button>;
}
function Breadcrumb({ trail }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <a href="/" onClick={(e) => navTo('/', e)}>Home</a>
      {trail.map((t, i) => (
        <React.Fragment key={i}>
          <span className="sep"><Icon name="chevron-right" size={13} /></span>
          {t.to && i < trail.length - 1
            ? <a href={t.to} onClick={(e) => navTo(t.to, e)}>{t.label}</a>
            : <span style={{ color: 'var(--fg1)', fontWeight: 500 }}>{t.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}
function PageHero({ trail, eyebrow, title, sub, tone = '' }) {
  return (
    <header className={'page-hero ' + tone}>
      <div className="container">
        {trail && <Breadcrumb trail={trail} />}
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
    </header>
  );
}

/* ---------- Bilingual statement ---------- */
function Bilingual({ en, ms }) {
  return (
    <div className="bilingual">
      <p className="en">{en}</p>
      <p className="ms">{ms}</p>
    </div>
  );
}

/* ---------- Accordion ---------- */
function Accordion({ items }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} className={'accordion-item' + (open === i ? ' open' : '')}>
          <div className="accordion-head" onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{it.q}</span>
            <span className="acc-ico"><Icon name="plus" size={16} /></span>
          </div>
          <div className="accordion-body" style={{ maxHeight: open === i ? '320px' : '0' }}>
            <div className="accordion-body-inner">{it.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Form field ---------- */
function Field({ label, type = 'text', name, required, full, placeholder, hint, options, value, onChange, error, rows }) {
  const cls = 'field' + (full ? ' full' : '');
  const inputCls = error ? 'invalid' : '';
  return (
    <div className={cls}>
      {label && <label htmlFor={name}>{label} {required && <span className="req">*</span>}</label>}
      {type === 'textarea' ? (
        <textarea id={name} name={name} rows={rows || 4} placeholder={placeholder} value={value} onChange={onChange} className={inputCls} />
      ) : type === 'select' ? (
        <select id={name} name={name} value={value} onChange={onChange} className={inputCls}>
          <option value="">{placeholder || 'Select…'}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input id={name} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} className={inputCls} />
      )}
      {error ? <span className="error">{error}</span> : hint ? <span className="hint">{hint}</span> : null}
    </div>
  );
}

/* ---------- Prayer time logic — live from Aladhan API ---------- */
// Fallback hardcoded in case API is unavailable
const PRAYERS_FALLBACK = [
  { key: 'subuh',   name: 'Subuh',   arabic: 'الفجر',  icon: 'sunrise', time: '05:42' },
  { key: 'syuruk',  name: 'Syuruk',  arabic: 'الشروق', icon: 'sun',     time: '07:03' },
  { key: 'zohor',   name: 'Zohor',   arabic: 'الظهر',  icon: 'sun',     time: '13:09' },
  { key: 'asar',    name: 'Asar',    arabic: 'العصر',  icon: 'sunset',  time: '16:32' },
  { key: 'maghrib', name: 'Maghrib', arabic: 'المغرب', icon: 'sunset',  time: '19:11' },
  { key: 'isyak',   name: 'Isyak',   arabic: 'العشاء', icon: 'moon',    time: '20:25' },
];

const HIJRI_MONTHS_MS = ['Muharram','Safar','Rabiulawal','Rabiulakhir','Jamadilawal','Jamadilakhir','Rejab','Syaaban','Ramadan','Syawal','Zulkaedah','Zulhijjah'];

function parsePrayerTimes(timings) {
  const map = [
    { key: 'subuh',   api: 'Fajr',    name: 'Subuh',   arabic: 'الفجر',  icon: 'sunrise' },
    { key: 'syuruk',  api: 'Sunrise', name: 'Syuruk',  arabic: 'الشروق', icon: 'sun'     },
    { key: 'zohor',   api: 'Dhuhr',   name: 'Zohor',   arabic: 'الظهر',  icon: 'sun'     },
    { key: 'asar',    api: 'Asr',     name: 'Asar',    arabic: 'العصر',  icon: 'sunset'  },
    { key: 'maghrib', api: 'Maghrib', name: 'Maghrib', arabic: 'المغرب', icon: 'sunset'  },
    { key: 'isyak',   api: 'Isha',    name: 'Isyak',   arabic: 'العشاء', icon: 'moon'    },
  ];
  return map.map((p) => ({ ...p, time: (timings[p.api] || '').slice(0, 5) }));
}

function formatHijri(hijri) {
  if (!hijri) return '';
  const day = hijri.day;
  const monthNum = parseInt(hijri.month.number || hijri.month, 10);
  const monthName = HIJRI_MONTHS_MS[monthNum - 1] || hijri.month.en || '';
  const year = hijri.year;
  return `${day} ${monthName} ${year}H`;
}

// Cache prayer data in localStorage, keyed by YYYY-MM-DD
function getPrayerCache(dateKey) {
  try {
    const raw = localStorage.getItem('prayer_' + dateKey);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function setPrayerCache(dateKey, data) {
  try { localStorage.setItem('prayer_' + dateKey, JSON.stringify(data)); } catch {}
}

let PRAYERS = PRAYERS_FALLBACK;
let HIJRI_DATE = '';

// Fetch once on module load
(function fetchPrayerData() {
  const now = new Date();
  // Use Singapore local date (UTC+8) for cache key
  const sgDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Singapore' }).format(now); // YYYY-MM-DD
  const dateKey = sgDate;
  // Aladhan API expects DD-MM-YYYY
  const [yr, mo, dy] = sgDate.split('-');
  const apiDate = `${dy}-${mo}-${yr}`;
  const cached = getPrayerCache(dateKey);
  if (cached) {
    PRAYERS = parsePrayerTimes(cached.timings);
    HIJRI_DATE = formatHijri(cached.hijri);
    return;
  }
  const url = `https://api.aladhan.com/v1/timingsByCity/${apiDate}?city=Singapore&country=Singapore&method=11`;
  fetch(url)
    .then((r) => r.ok ? r.json() : null)
    .then((json) => {
      if (!json || !json.data) return;
      const timings = json.data.timings;
      const hijri = json.data.date && json.data.date.hijri;
      setPrayerCache(dateKey, { timings, hijri });
      PRAYERS = parsePrayerTimes(timings);
      HIJRI_DATE = formatHijri(hijri);
      // Trigger re-render of PrayerWidget by dispatching custom event
      window.dispatchEvent(new Event('prayer-data-ready'));
    })
    .catch(() => {
      // Fallback: compute Hijri with Intl
      try {
        const hf = new Intl.DateTimeFormat('en-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' });
        HIJRI_DATE = hf.format(now);
      } catch {}
    });
})();

function toMins(t) { const [h, m] = t.split(':').map(Number); return h * 60 + m; }
function fmt12(t) {
  if (!t) return '—';
  let [h, m] = t.split(':').map(Number);
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')} ${ap}`;
}
function useNextPrayer() {
  const [now, setNow] = React.useState(new Date());
  const [, forceUpdate] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    const onReady = () => forceUpdate((n) => n + 1);
    window.addEventListener('prayer-data-ready', onReady);
    return () => { clearInterval(t); window.removeEventListener('prayer-data-ready', onReady); };
  }, []);
  const mins = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
  const obligatory = PRAYERS.filter((p) => p.key !== 'syuruk');
  let next = obligatory.find((p) => toMins(p.time) > mins) || obligatory[0];
  let target = toMins(next.time) - mins;
  if (target < 0) target += 24 * 60;
  const totalSec = Math.round(target * 60);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const countdown = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return { next, countdown, now };
}
function gregorian(now) {
  return now.toLocaleDateString('en-SG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

/* ---------- Skeleton loader ---------- */
function Skeleton({ width = '100%', height = 20, radius = 6, style = {} }) {
  return (
    <div style={{
      width, height, borderRadius: radius,
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'skeleton-shimmer 1.4s infinite',
      ...style,
    }} />
  );
}
function SkeletonCard() {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
      <Skeleton height={200} radius={0} />
      <div style={{ padding: 20 }}>
        <Skeleton height={12} width="40%" style={{ marginBottom: 12 }} />
        <Skeleton height={18} style={{ marginBottom: 8 }} />
        <Skeleton height={18} width="80%" style={{ marginBottom: 16 }} />
        <Skeleton height={12} width="60%" />
      </div>
    </div>
  );
}

/* ---------- Routing — path-based with History API ---------- */
function useRoute() {
  const [route, setRoute] = React.useState(window.location.pathname || '/');
  React.useEffect(() => {
    const onPop = () => {
      setRoute(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return route;
}

Object.assign(window, {
  Icon, Img, Eyebrow, SectionHead, Btn, Breadcrumb, PageHero, Bilingual,
  Accordion, Field, PRAYERS, fmt12, useNextPrayer, useRoute, HIJRI_DATE, gregorian, toMins,
  Skeleton, SkeletonCard,
});
