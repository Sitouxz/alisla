/* ============================================================
   Al-Islah Redesign — App shell: nav model, Header, PrayerWidget,
   Footer, MobileDrawer, and the hash router (App).
   ============================================================ */

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about', children: [
    { label: 'About Al-Islah', to: '/about' },
    { label: 'Management Board', to: '/about/management-board' },
    { label: 'Our Staff', to: '/about/staff' },
    { label: 'Career', to: '/about/career' },
  ]},
  { label: 'Dakwah', children: [
    { label: 'Upcoming Events', to: '/dakwah/events' },
    { label: 'Daily Lectures', to: '/dakwah/lectures' },
    { label: 'Islamic Courses', to: '/dakwah/courses' },
    { label: 'Tadarrus Al-Quran', to: '/dakwah/tadarrus' },
    { label: 'Quran & Solat — Physical', to: '/dakwah/quran-solat-physical' },
    { label: 'Quran & Solat — Online', to: '/dakwah/quran-solat-online' },
    { label: 'One-on-One Quranic Learning', to: '/dakwah/one-on-one' },
  ]},
  { label: 'Community', to: '/community', children: [
    { label: 'Community Overview', to: '/community' },
    { label: 'Social Development', to: '/community/social-development' },
    { label: 'Programmes', to: '/community/programmes', sub: true },
    { label: 'Befrienders', to: '/community/befrienders', sub: true },
    { label: 'Family Development', to: '/community/family' },
    { label: 'Youth of Islah', to: '/community/youth' },
  ]},
  { label: 'Learn', children: [
    { label: 'General Articles', to: '/learn/articles' },
    { label: 'Khutbah Archive', to: '/learn/sermons' },
    { label: 'Online Videos', to: '/learn/videos' },
    { label: 'Know Islam', to: '/learn/know-islam' },
    { label: 'Course Registration', to: '/learn/course-registration' },
  ]},
  { label: 'Services', children: [
    { label: 'Wedding (Nikah)', to: '/services/wedding' },
    { label: 'Tahnik', to: '/services/tahnik' },
  ]},
  { label: 'Volunteer', children: [
    { label: 'Be a Volunteer', to: '/volunteer/be-a-volunteer' },
    { label: 'Volunteering Events', to: '/volunteer/events' },
  ]},
  { label: 'Payment', to: '/payment', children: [
    { label: 'Payment Overview', to: '/payment' },
    { label: 'Fee Payment', to: '/payment/fee-payment' },
  ]},
];

function Brand() {
  return (
    <a className="brand" href="/" onClick={(e) => navTo('/', e)} aria-label="Masjid Al-Islah home">
      <img src="assets/images/logo.png" alt="Masjid Al-Islah" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
      <span className="brand-text">
        <span className="brand-top">MASJID</span>
        <span className="brand-bot">AL-ISLAH</span>
      </span>
    </a>
  );
}

function Header({ route }) {
  const [openIdx, setOpenIdx] = React.useState(-1);
  const [mobile, setMobile] = React.useState(false);
  const closeT = React.useRef(null);
  const topOf = (to) => '/' + (to || '').split('/')[1];
  const isActive = (item) => {
    if (item.to === '/') return route === '/';
    const t = item.to || (item.children && item.children[0].to);
    return route === t || (item.children && item.children.some((c) => c.to === route)) || (t && route.startsWith(topOf(t)) && topOf(t) !== '/');
  };
  const enter = (i) => { clearTimeout(closeT.current); setOpenIdx(i); };
  const leave = () => { closeT.current = setTimeout(() => setOpenIdx(-1), 140); };
  return (
    <header className="header">
      <div className="container header-bar">
        <Brand />
        <nav className="nav">
          {NAV.map((item, i) => (
            <div key={item.label} className={'nav-item' + (openIdx === i ? ' open' : '')}
              onMouseEnter={() => item.children && enter(i)} onMouseLeave={() => item.children && leave()}>
              <a className={'nav-link' + (isActive(item) ? ' active' : '')}
                href={item.to || (item.children && item.children[0].to) || '/'}
                onClick={(e) => navTo(item.to || (item.children && item.children[0].to) || '/', e)}>
                {item.label}
                {item.children && <Icon name="chevron-down" size={13} className="caret" />}
              </a>
              {item.children && (
                <div className="dropdown" onMouseEnter={() => enter(i)} onMouseLeave={leave}>
                  {item.children.map((c) => (
                    <a key={c.to} className={'dd-link' + (c.sub ? ' dd-sub' : '')} href={c.to} onClick={(e) => navTo(c.to, e)}>{c.label}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="header-actions">
          <a className="icon-btn desktop-only" href="/login" onClick={(e) => navTo('/login', e)} aria-label="Login"><Icon name="user" size={18} /></a>
          <a className="btn btn-primary btn-sm desktop-only" href="/donations" onClick={(e) => navTo('/donations', e)}><Icon name="heart" size={16} className="ico" />Donate</a>
          <button className="icon-btn burger" aria-label="Open menu" onClick={() => setMobile(true)}><Icon name="menu" size={20} /></button>
        </div>
      </div>
      <MobileDrawer open={mobile} onClose={() => setMobile(false)} route={route} />
    </header>
  );
}

function MobileDrawer({ open, onClose, route }) {
  const [acc, setAcc] = React.useState(-1);
  return (
    <div className={'mobile-drawer' + (open ? ' open' : '')} onClick={onClose}>
      <div className="mobile-panel" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <Brand />
          <button className="icon-btn" aria-label="Close menu" onClick={onClose}><Icon name="x" size={20} /></button>
        </div>
        <a className="btn btn-primary" href="/donations" onClick={(e) => { navTo('/donations', e); onClose(); }} style={{ width: '100%', justifyContent: 'center', marginBottom: 14 }}><Icon name="heart" size={16} className="ico" />Donate</a>
        {NAV.map((item, i) => (
          item.children ? (
            <div key={item.label}>
              <div className="m-acc-head" onClick={() => setAcc(acc === i ? -1 : i)}>
                {item.label}
                <Icon name="chevron-down" size={16} style={{ transform: acc === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
              </div>
              {acc === i && (
                <div className="m-acc-body">
                  {item.children.map((c) => <a key={c.to} href={c.to} onClick={(e) => { navTo(c.to, e); onClose(); }}>{c.label}</a>)}
                </div>
              )}
            </div>
          ) : (
            <a key={item.label} className="m-acc-head" href={item.to} onClick={(e) => { navTo(item.to, e); onClose(); }} style={{ display: 'block' }}>{item.label}</a>
          )
        ))}
        <a className="m-acc-head" href="/login" onClick={(e) => { navTo('/login', e); onClose(); }} style={{ display: 'block' }}>Login</a>
        <a className="m-acc-head" href="/contact" onClick={(e) => { navTo('/contact', e); onClose(); }} style={{ display: 'block' }}>Contact</a>
      </div>
    </div>
  );
}

function PrayerWidget({ compact }) {
  const { next, countdown, now } = useNextPrayer();
  return (
    <div className="prayer-widget">
      <div className="prayer-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(176,122,51,.22)', display: 'grid', placeItems: 'center', color: 'var(--coral-300)' }}>
            <Icon name={next.icon} size={24} />
          </div>
          <div>
            <div className="prayer-next-label">Next Prayer <span style={{ opacity: .6, fontWeight: 400 }}>· Waktu Solat Seterusnya</span></div>
            <div className="prayer-next-name">{next.name} <span style={{ color: '#76767f', fontWeight: 400, fontSize: 'var(--fs-body)' }}>{fmt12(next.time)}</span></div>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="prayer-next-label">Time remaining <span style={{ opacity: .6, fontWeight: 400 }}>· Masa Berbaki</span></div>
          <div className="prayer-countdown">{countdown}</div>
        </div>
        <div className="prayer-date">
          <div>{gregorian(now)}</div>
          <div className="hijri">{HIJRI_DATE}</div>
        </div>
      </div>
      <div className="prayer-row">
        {PRAYERS.map((p) => (
          <div key={p.key} className={'prayer-cell' + (p.key === next.key ? ' is-next' : '')}>
            <div className="pname">{p.name}</div>
            <div className="ptime">{fmt12(p.time)}</div>
            <div className="parabic">{p.arabic}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  const cols = [
    { h: 'Explore', links: [['About Al-Islah', '/about'], ['Upcoming Events', '/dakwah/events'], ['Islamic Courses', '/dakwah/courses'], ['Community', '/community'], ['Learn', '/learn/articles']] },
    { h: 'Get Involved', links: [['Donate / Infaq', '/donations'], ['Be a Volunteer', '/volunteer/be-a-volunteer'], ['Career', '/about/career'], ['Fee Payment', '/payment/fee-payment'], ['Course Registration', '/learn/course-registration']] },
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-text">Masjid Al-Islah</div>
            <p className="footer-addr" style={{ marginTop: 14 }}>
              A community mosque serving Punggol since 2015, fostering a dynamic and inclusive Muslim community that emanates blessings to all.
            </p>
            <div className="social-row">
              <a className="social-btn" href="https://www.facebook.com/alislahmosque" target="_blank" rel="noopener" aria-label="Facebook"><Icon name="facebook" size={18} /></a>
              <a className="social-btn" href="https://www.instagram.com/alislahmosque" target="_blank" rel="noopener" aria-label="Instagram"><Icon name="instagram" size={18} /></a>
              <a className="social-btn" href="https://www.youtube.com/islahtv" target="_blank" rel="noopener" aria-label="YouTube"><Icon name="youtube" size={18} /></a>
              <a className="social-btn" href="https://twitter.com/alislahmosque" target="_blank" rel="noopener" aria-label="Twitter / X"><Icon name="twitter" size={18} /></a>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h4>{c.h}</h4>
              <div className="footer-links">
                {c.links.map(([l, to]) => <a key={to + l} href={to} onClick={(e) => navTo(to, e)}>{l}</a>)}
              </div>
            </div>
          ))}
          <div>
            <h4>Visit Us</h4>
            <p className="footer-addr">
              30 Punggol Field<br />Singapore 828812<br />
              <span style={{ color: '#cfcfd6' }}>Tel</span> +65 6312 5174<br />
              <span style={{ color: '#cfcfd6' }}>Fax</span> +65 6312 4205<br />
              <br /><span style={{ color: '#cfcfd6' }}>Office hours</span><br />
              Mon–Sat 9am–7pm · Sun 9am–3pm
            </p>
            <a className="btn btn-outline btn-sm" href="/contact" onClick={(e) => navTo('/contact', e)} style={{ marginTop: 16, color: '#fff', borderColor: 'rgba(255,255,255,.25)' }}>Contact & directions</a>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Masjid Al-Islah. All rights reserved.</span>
          <span style={{ display: 'flex', gap: 20 }}>
            <a href="/login" onClick={(e) => navTo('/login', e)}>Member login</a>
            <a href="/contact" onClick={(e) => navTo('/contact', e)}>Contact</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Router ---------- */
function NotFound() {
  return (
    <div className="container section" style={{ textAlign: 'center' }}>
      <Eyebrow center>404</Eyebrow>
      <h1 style={{ fontSize: 'var(--fs-display)' }}>Page not found</h1>
      <p className="lead" style={{ margin: '14px auto 28px', maxWidth: 420 }}>We couldn't find that page. Let's get you back home.</p>
      <Btn to="/" icon="arrow-right">Return home</Btn>
    </div>
  );
}

function App() {
  const route = useRoute();
  const Page = (window.ROUTES && window.ROUTES[route]) || (window.ROUTES && matchDynamic(route)) || NotFound;
  return (
    <React.Fragment>
      <Header route={route} />
      <main key={route}>
        <Page route={route} />
      </main>
      <Footer />
    </React.Fragment>
  );
}
function matchDynamic(route) {
  // event detail: /dakwah/events/:id
  if (window.ROUTES) {
    for (const pat in window.ROUTES) {
      if (pat.includes(':')) {
        const re = new RegExp('^' + pat.replace(/:[^/]+/g, '[^/]+') + '$');
        if (re.test(route)) return window.ROUTES[pat];
      }
    }
  }
  return null;
}

Object.assign(window, { Header, Footer, PrayerWidget, App, NAV, Brand });
