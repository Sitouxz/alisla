/* ============================================================
   Al-Islah Redesign — Home page
   ============================================================ */

const VALUES = [
  { k: 'CARE', t: 'We care for our staff, volunteers, beneficiaries and congregants as much as we care for our families.', img: 'val-care' },
  { k: 'SERVICE', t: 'We serve with excellence in everything we do for the community.', img: 'val-service' },
  { k: 'KNOWLEDGE-DRIVEN', t: 'We seek knowledge continually to provide educational excellence.', img: 'val-knowledge' },
  { k: 'CREATIVITY', t: 'We appeal to our creativity in providing the best programmes and services.', img: 'val-creativity' },
  { k: 'AGILITY', t: 'We stand ready to adapt with current trends and affairs.', img: 'val-agility' },
];

const HOME_EVENTS = [
  { id: 'tafsir-jumaat', tag: 'Lecture', tagc: 'pink', date: 'Every Friday', time: '8:15 PM', title: 'Tafsir Jumaat: Surah Al-Kahf', loc: 'Main Prayer Hall', img: 'ev-tafsir' },
  { id: 'youth-night', tag: 'Youth', tagc: '', date: 'Sat, 14 Jun', time: '7:30 PM', title: 'Youth of Islah — Iman Recharge Night', loc: 'Level 3 Multipurpose Hall', img: 'ev-youth' },
  { id: 'quran-intensive', tag: 'Course', tagc: 'mint', date: 'Starts 21 Jun', time: '10:00 AM', title: 'Quran Reading Intensive (Beginner)', loc: 'Classroom 2', img: 'ev-quran' },
];

function ValueCards() {
  return (
    <div className="grid grid-3" style={{ gap: 20 }}>
      {VALUES.slice(0, 3).map((v) => (
        <div key={v.k} className="value-card">
          <div className="vc-media"><Img id={v.img} ph={v.k + ' — community photo'} /></div>
          <div className="value-overlay">
            <h3>{v.k}</h3>
            <p>{v.t}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function EventCard({ ev }) {
  return (
    <a className="card card-hover" href={'/dakwah/events/' + ev.id} onClick={(e) => navTo('/dakwah/events/' + ev.id, e)} style={{ display: 'block' }}>
      <div className="arch-sm" style={{ borderRadius: 0 }}><div className="media-4x3"><Img id={ev.img} ph={ev.title} /></div></div>
      <div className="card-body">
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <span className={'chip ' + (ev.tagc || '')}>{ev.tag}</span>
        </div>
        <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 12 }}>{ev.title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 'var(--fs-small)', color: 'var(--fg3)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="calendar" size={15} />{ev.date} · {ev.time}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="map-pin" size={15} />{ev.loc}</span>
        </div>
      </div>
    </a>
  );
}

function AnnouncementBanner() {
  const [posts, setPosts] = React.useState(null);
  const [dismissed, setDismissed] = React.useState(() => sessionStorage.getItem('ann-dismissed') === '1');
  React.useEffect(() => {
    fetch('https://ne-website-manager.vercel.app/api/client/al-islah/posts?category=Announcement&limit=1')
      .then(r => r.ok ? r.json() : [])
      .then(d => setPosts(Array.isArray(d) ? d : []))
      .catch(() => setPosts([]));
  }, []);
  const ann = posts && posts[0];
  if (dismissed || !ann) return null;
  return (
    <div style={{ background: 'var(--coral)', color: '#fff', padding: '10px 0' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <Icon name="sparkles" size={16} style={{ flexShrink: 0 }} />
        <span style={{ flex: 1, fontSize: 'var(--fs-small)', fontWeight: 500 }}>{ann.title}</span>
        {ann.slug && (
          <a href={'/learn/articles/' + ann.slug} onClick={(e) => navTo('/learn/articles/' + ann.slug, e)}
            style={{ color: '#fff', fontWeight: 700, fontSize: 'var(--fs-small)', whiteSpace: 'nowrap', textDecoration: 'underline' }}>
            Read more →
          </a>
        )}
        <button onClick={() => { setDismissed(true); sessionStorage.setItem('ann-dismissed', '1'); }}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4, display: 'grid', placeItems: 'center', opacity: 0.8, flexShrink: 0 }}
          aria-label="Dismiss">
          <Icon name="x" size={16} />
        </button>
      </div>
    </div>
  );
}

function Home() {
  return (
    <React.Fragment>
      <AnnouncementBanner />
      {/* Hero */}
      <section className="hero section-tight">
        <div className="container">
          <div className="hero-grid">
            <div>
              <Eyebrow>Masjid Al-Islah · Punggol</Eyebrow>
              <h1>A home for the <span className="accent">Punggol</span> Muslim community.</h1>
              <p className="hero-lead">Since 2015, Al-Islah Mosque has been a place of worship, learning and belonging — fostering a dynamic and inclusive community that emanates blessings to all.</p>
              <p style={{ color: 'var(--fg3)', fontSize: 'var(--fs-small)', marginTop: -12, marginBottom: 8, fontStyle: 'italic' }}>Sejak 2015, Masjid Al-Islah menjadi tempat ibadah, pembelajaran dan kebersamaan bagi komuniti Muslim Punggol.</p>
              <div className="hero-cta">
                <Btn to="/donations" icon="heart">Support our mosque</Btn>
                <Btn to="/about" variant="outline" iconRight="arrow-right">About Al-Islah</Btn>
              </div>
            </div>
            <div className="hero-media">
              <div className="arch"><div style={{ aspectRatio: '4/5' }}><Img id="hero-main" ph="Al-Islah Mosque exterior — modern Islamic architecture" src="assets/images/mosque-exterior-1.jpg" /></div></div>
              <div className="hero-badge">
                <div className="hb-ico"><Icon name="users" size={22} /></div>
                <div>
                  <div className="hb-num">5,000+</div>
                  <div className="hb-lbl">congregants every Friday</div>
                </div>
              </div>
            </div>
          </div>
          {/* Prayer widget overlapping below hero */}
          <div style={{ marginTop: 48 }}>
            <PrayerWidget />
          </div>
        </div>
      </section>

      {/* Infaq banner */}
      <section className="container" style={{ marginTop: 8, marginBottom: 8 }}>
        <a className="infaq-banner" href="/donations" onClick={(e) => navTo('/donations', e)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <Icon name="sparkles" size={30} />
            <div>
              <div className="if-title">Infaq for Al-Islah</div>
              <div className="if-sub">Support the upkeep, programmes and outreach of your mosque. <span style={{ opacity: .75 }}>· Sokong masjid anda.</span></div>
            </div>
          </div>
          <span className="infaq-cta">Contribute →</span>
        </a>
      </section>

      {/* About intro */}
      <section className="section">
        <div className="container">
          <div className="hero-grid" style={{ gridTemplateColumns: '.9fr 1.1fr', alignItems: 'center' }}>
            <div className="arch"><div style={{ aspectRatio: '1/1' }}><Img id="about-intro" ph="Prayer hall interior" src="assets/images/mosque-interior.jpg" /></div></div>
            <div>
              <SectionHead eyebrow="About the Mosque" title="Modern Islamic architecture in the heart of Punggol" />
              <div className="prose lead" style={{ marginTop: 8 }}>
                <p>Al-Islah Mosque was built in 2015 within the densely populated Punggol New Town, at the junction of Punggol Place and Punggol Field. Its clean, contemporary design has made it a landmark for the neighbourhood.</p>
                <p>Beyond daily prayers, the mosque is a hub for learning, family programmes, youth development and community service — open to all who seek knowledge and belonging.</p>
              </div>
              <div className="stat-band" style={{ marginTop: 36 }}>
                {[['2015', 'Established'], ['6', 'Daily congregational prayers'], ['40+', 'Weekly programmes'], ['300+', 'Active volunteers']].map(([n, l]) => (
                  <div className="stat" key={l}><div className="num">{n}</div><div className="lbl">{l}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission / Values */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead center eyebrow="Vision · Mission · Values" eyebrowColor="pink" title="What we stand for" />
          <div className="grid grid-2" style={{ marginTop: 48, gap: 28, alignItems: 'stretch' }}>
            <div className="card card-body" style={{ padding: 40 }}>
              <Eyebrow color="">Vision</Eyebrow>
              <Bilingual en="To foster a dynamic and inclusive Muslim community that emanates blessings to all." ms="Untuk memupuk masyarakat Islam yang dinamik dan inklusif yang menyemarakkan rahmat kepada semua." />
            </div>
            <div className="card card-body" style={{ padding: 40 }}>
              <Eyebrow color="pink">Mission</Eyebrow>
              <Bilingual en="To facilitate growth and progression within the community through our programmes." ms="Untuk memudahkan pembangunan dan kemajuan masyarakat melalui program-program kami." />
            </div>
          </div>
          <div style={{ marginTop: 48 }}>
            <Eyebrow color="mint">Core Values</Eyebrow>
            <ValueCards />
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <Btn to="/about" variant="ghost" iconRight="arrow-right">Read our full story</Btn>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes preview */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            <SectionHead eyebrow="What's On" title="Upcoming events & programmes" />
            <Btn to="/dakwah/events" variant="outline" iconRight="arrow-right">View all events</Btn>
          </div>
          <div className="grid grid-3">
            {HOME_EVENTS.map((ev) => <EventCard key={ev.id} ev={ev} />)}
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead center eyebrow="Get Involved" title="Find your place at Al-Islah" sub="Whether you come to learn, to serve, or to grow your family in faith — there's a path for you." />
          <div className="grid grid-4" style={{ marginTop: 48 }}>
            {[
              { ic: 'book', t: 'Learn & Study', d: 'Quran classes, Islamic courses and daily lectures for every level.', to: '/dakwah/courses', c: 'coral' },
              { ic: 'hand-helping', t: 'Volunteer', d: 'Lend your time and skills to serve the community.', to: '/volunteer/be-a-volunteer', c: 'pink' },
              { ic: 'users', t: 'Family & Youth', d: 'Programmes that nurture families and empower young Muslims.', to: '/community/family', c: 'mint' },
              { ic: 'heart', t: 'Give & Support', d: 'Sustain the mosque and its outreach through your infaq.', to: '/donations', c: 'coral' },
            ].map((p) => (
              <a key={p.t} className="card card-hover card-body" href={p.to} onClick={(e) => navTo(p.to, e)} style={{ padding: 28 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, display: 'grid', placeItems: 'center', marginBottom: 18,
                  background: p.c === 'pink' ? 'var(--pink-100)' : p.c === 'mint' ? 'var(--mint-100)' : 'var(--coral-100)',
                  color: p.c === 'pink' ? 'var(--pink-600)' : p.c === 'mint' ? 'var(--mint-600)' : 'var(--coral)' }}>
                  <Icon name={p.ic} size={26} />
                </div>
                <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 8 }}>{p.t}</h3>
                <p style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)' }}>{p.d}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / map */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ overflow: 'hidden' }}>
            <div className="hero-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 0, alignItems: 'stretch' }}>
              <div style={{ padding: 'clamp(32px, 5vw, 56px)' }}>
                <SectionHead eyebrow="Visit Us" title="Find Al-Islah Mosque" />
                <div style={{ marginTop: 24 }}>
                  {[
                    { ic: 'map-pin', l: 'Address', v: '30 Punggol Field, Singapore 828812' },
                    { ic: 'phone', l: 'Contact', v: '+65 6312 5174' },
                    { ic: 'clock', l: 'Office Hours', v: 'Mon–Sat 9am–7pm · Sun 9am–3pm' },
                    { ic: 'mail', l: 'Email', v: 'admin@alislah.sg' },
                  ].map((r) => (
                    <div className="info-row" key={r.l}>
                      <div className="info-ico"><Icon name={r.ic} size={18} /></div>
                      <div><div className="lbl">{r.l}</div><div className="val">{r.v}</div></div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 28 }}><Btn to="/contact" iconRight="arrow-right">Contact & directions</Btn></div>
              </div>
              <div style={{ minHeight: 420 }}>
                <iframe className="map-embed" style={{ height: '100%' }} title="Al-Islah Mosque map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.625167843812!2d103.89930031509022!3d1.4012636989780363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da15e2a0beb193%3A0x2ca7aa0600b6f1be!2sMasjid%20Al-Islah!5e0!3m2!1sen!2ssg!4v1674035455814"
                  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

window.ROUTES = Object.assign(window.ROUTES || {}, { '/': Home });
Object.assign(window, { EventCard, ValueCards, VALUES, HOME_EVENTS });
