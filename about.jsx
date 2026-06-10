/* ============================================================
   Al-Islah Redesign — About section
   /about, /about/management-board, /about/staff, /about/career
   ============================================================ */

const CMS_BASE_A = 'https://ne-website-manager.vercel.app';
const CLIENT_SLUG_A = 'al-islah';

function PersonAvatar() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#EDE8E3', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
      <svg viewBox="0 0 120 130" xmlns="http://www.w3.org/2000/svg" style={{ width: '72%', display: 'block' }}>
        <ellipse cx="60" cy="42" rx="26" ry="28" fill="#B0A89E"/>
        <ellipse cx="60" cy="120" rx="52" ry="38" fill="#B0A89E"/>
      </svg>
    </div>
  );
}

function useCmsPeople(category) {
  const [people, setPeople] = React.useState(null);
  React.useEffect(() => {
    fetch(`${CMS_BASE_A}/api/client/${CLIENT_SLUG_A}/posts?category=${encodeURIComponent(category)}&limit=50`)
      .then(r => r.ok ? r.json() : [])
      .then(posts => {
        if (!Array.isArray(posts) || posts.length === 0) { setPeople([]); return; }
        setPeople(posts.map((p, i) => {
          const dept = (p.tags || []).map(t => t.startsWith('dept:') ? t.slice(5).trim() : null).find(Boolean) || '';
          const order = parseInt(((p.tags || []).map(t => t.startsWith('order:') ? t.slice(6).trim() : null).find(Boolean)) || '99', 10);
          return { name: p.title, role: p.excerpt || '', img: `cms-${i}`, cover: p.cover_url, note: p.content || '', dept, order };
        }).sort((a, b) => a.order - b.order));
      })
      .catch(() => setPeople([]));
  }, [category]);
  return people;
}

function PersonCard({ p }) {
  return (
    <div className="card card-hover" style={{ textAlign: 'center' }}>
      <div className="media-1x1"><PersonAvatar /></div>
      <div className="card-body">
        <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 4 }}>{p.name}</h3>
        <div style={{ color: 'var(--coral)', fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-small)' }}>{p.role}</div>
        {p.note && <p style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)', marginTop: 10 }}>{p.note}</p>}
      </div>
    </div>
  );
}

function About() {
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'About' }]} eyebrow="About the Mosque" title="About Al-Islah Mosque"
        sub="A community mosque built in 2015, serving the Muslim community of Punggol New Town." />

      <section className="section">
        <div className="container">
          <div className="hero-grid" style={{ alignItems: 'center' }}>
            <div className="prose lead">
              <p>Al-Islah Mosque is a mosque built in 2015 at Punggol, Singapore. The mosque features modern Islamic architecture that has become a recognisable landmark in the neighbourhood.</p>
              <p>Masjid Al-Islah is located within the densely populated Punggol New Town at 30 Punggol Field, Singapore 828812, at the junction of Punggol Place.</p>
              <p>The mosque serves the Muslim community in Punggol — offering daily prayers, religious education, family and youth programmes, and community service for residents of all ages.</p>
            </div>
            <div className="arch" style={{ boxShadow: 'var(--shadow-lg)' }}><div style={{ aspectRatio: '4/5' }}><Img id="about-hero" ph="Al-Islah Mosque — exterior daylight" src="/assets/images/mosque-official-2.jpg" /></div></div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'stretch' }}>
            <div className="card card-body" style={{ padding: 44 }}>
              <Eyebrow>Vision</Eyebrow>
              <Bilingual en="To foster a dynamic and inclusive Muslim community that emanates blessings to all." ms="Untuk memupuk masyarakat Islam yang dinamik dan inklusif yang menyemarakkan rahmat kepada semua." />
            </div>
            <div className="card card-body" style={{ padding: 44 }}>
              <Eyebrow color="pink">Mission</Eyebrow>
              <Bilingual en="To facilitate growth and progression within the community through our programmes." ms="Untuk memudahkan pembangunan dan kemajuan masyarakat melalui program-program kami." />
            </div>
          </div>

          <div style={{ marginTop: 56 }}>
            <SectionHead center eyebrow="Core Values" eyebrowColor="mint" title="The values that guide us" />
            <div className="grid values-grid" style={{ marginTop: 40, gap: 16 }}>
              {VALUES.map((v) => (
                <div key={v.k} className="card card-body" style={{ padding: 24 }}>
                  <div style={{ fontWeight: 'var(--fw-bold)', letterSpacing: '.04em', color: 'var(--ink)', fontSize: 'var(--fs-small)', marginBottom: 10 }}>{v.k}</div>
                  <p style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)' }}>{v.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card section-coral" style={{ padding: 'clamp(32px,5vw,56px)', textAlign: 'center', border: 'none' }}>
            <Eyebrow center>Support our mosque</Eyebrow>
            <h2 style={{ fontSize: 'var(--fs-h1)', maxWidth: 620, margin: '0 auto 18px' }}>You can support Al-Islah by contributing here</h2>
            <p className="lead" style={{ maxWidth: 540, margin: '0 auto 28px' }}>Every infaq sustains the mosque's prayers, programmes and community outreach.</p>
            <Btn to="/donations" icon="heart" size="lg">Contribute now</Btn>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

const BOARD = [
  { name: 'Hj. Abdul Rahman Salleh', role: 'Chairman', img: 'b1', note: 'Leading the mosque board since 2019.' },
  { name: 'Hjh. Faridah Mohamed', role: 'Vice-Chairman', img: 'b2' },
  { name: 'Ust. Mohamed Faizal', role: 'Religious Head', img: 'b3' },
  { name: 'Mr. Ismail Hakim', role: 'Honorary Secretary', img: 'b4' },
  { name: 'Mdm. Noraini Yusof', role: 'Honorary Treasurer', img: 'b5' },
  { name: 'Mr. Zulkifli Anwar', role: 'Board Member', img: 'b6' },
  { name: 'Mdm. Suriani Rashid', role: 'Board Member', img: 'b7' },
  { name: 'Mr. Hafiz Othman', role: 'Board Member', img: 'b8' },
];
function ManagementBoard() {
  const cmsPeople = useCmsPeople('Management Board');
  const board = cmsPeople && cmsPeople.length > 0 ? cmsPeople : BOARD;
  const loading = cmsPeople === null;
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'About', to: '/about' }, { label: 'Management Board' }]} eyebrow="About"
        title="Management Board" sub="The Mosque Management Board (MMB) provides governance and stewardship for Masjid Al-Islah, appointed under the guidance of MUIS." />
      <section className="section">
        <div className="container">
          {loading ? (
            <div className="grid grid-4">{[1,2,3,4,5,6,7,8].map(i => <SkeletonCard key={i} />)}</div>
          ) : (
            <div className="grid grid-4">
              {board.map((p) => (
                <div key={p.name} className="card card-hover" style={{ textAlign: 'center' }}>
                  <div className="media-1x1">
                    {p.cover ? <img src={p.cover} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <PersonAvatar name={p.name} />}
                  </div>
                  <div className="card-body">
                    <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 4 }}>{p.name}</h3>
                    <div style={{ color: 'var(--coral)', fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-small)' }}>{p.role}</div>
                    {p.note && <p style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)', marginTop: 10 }}>{p.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
}

const STAFF_DEPTS = [
  { dept: 'Religious & Dakwah', people: [
    { name: 'Ust. Mohamed Faizal', role: 'Head of Religious Affairs', img: 's1' },
    { name: 'Ustazah Aishah Karim', role: 'Religious Officer', img: 's2' },
    { name: 'Ust. Daniel Hakim', role: 'Quran Instructor', img: 's3' },
  ]},
  { dept: 'Administration & Operations', people: [
    { name: 'Mr. Khairul Anwar', role: 'Mosque Manager', img: 's4' },
    { name: 'Mdm. Liyana Hassan', role: 'Admin Executive', img: 's5' },
    { name: 'Mr. Rizwan Ali', role: 'Operations Officer', img: 's6' },
  ]},
  { dept: 'Community & Programmes', people: [
    { name: 'Mdm. Nurul Huda', role: 'Community Engagement Lead', img: 's7' },
    { name: 'Mr. Syafiq Rahman', role: 'Youth Programmes Officer', img: 's8' },
  ]},
];
function Staff() {
  const cmsPeople = useCmsPeople('Staff');
  const loading = cmsPeople === null;
  /* Group by dept — CMS or static fallback */
  const depts = React.useMemo(() => {
    if (loading) return null;
    if (cmsPeople && cmsPeople.length > 0) {
      const map = {};
      cmsPeople.forEach(p => {
        const d = p.dept || 'Other';
        if (!map[d]) map[d] = [];
        map[d].push(p);
      });
      return Object.entries(map).map(([dept, people]) => ({ dept, people }));
    }
    return STAFF_DEPTS;
  }, [cmsPeople, loading]);
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'About', to: '/about' }, { label: 'Our Staff' }]} eyebrow="About"
        title="Our Staff" sub="Meet the dedicated team serving the Al-Islah community day to day." />
      <section className="section">
        <div className="container">
          {loading ? (
            <React.Fragment>
              {[1,2].map(i => <div key={i} style={{ marginBottom: 56 }}><Skeleton height={24} width={200} style={{ marginBottom: 16 }} /><div className="grid grid-3">{[1,2,3].map(j => <SkeletonCard key={j} />)}</div></div>)}
            </React.Fragment>
          ) : (depts || []).map((d) => (
            <div key={d.dept} style={{ marginBottom: 56 }}>
              <Eyebrow>{d.dept}</Eyebrow>
              <div className="grid grid-3" style={{ marginTop: 8 }}>
                {d.people.map((p) => (
                  <div key={p.name} className="card card-hover" style={{ textAlign: 'center' }}>
                    <div className="media-1x1">
                      {p.cover ? <img src={p.cover} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <PersonAvatar name={p.name} />}
                    </div>
                    <div className="card-body">
                      <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 4 }}>{p.name}</h3>
                      <div style={{ color: 'var(--coral)', fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-small)' }}>{p.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </React.Fragment>
  );
}

const JOBS = [
  { title: 'Religious Officer (Asatizah)', type: 'Full-time', dept: 'Religious & Dakwah', desc: 'Lead religious classes, deliver lectures and support dakwah programmes. ARS-certified asatizah preferred.' },
  { title: 'Community Engagement Executive', type: 'Full-time', dept: 'Community', desc: 'Plan and run community, family and youth programmes; build partnerships with local organisations.' },
  { title: 'Operations Assistant', type: 'Part-time', dept: 'Operations', desc: 'Support the daily running of the mosque, facilities and events. Weekend availability required.' },
  { title: 'Quran Class Instructor', type: 'Contract', dept: 'Religious & Dakwah', desc: 'Teach Quran reading (Iqra & tajweed) to children and adults across beginner to intermediate levels.' },
];
function Career() {
  const [form, setForm] = React.useState({ name: '', email: '', role: '', msg: '' });
  const [sent, setSent] = React.useState(false);
  const onCh = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'About', to: '/about' }, { label: 'Career' }]} eyebrow="About"
        title="Careers at Al-Islah" sub="Serve the community with excellence. Explore current openings and join a team driven by care, knowledge and creativity." />
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'start' }}>
            <div>
              <Eyebrow>Open Positions</Eyebrow>
              <div style={{ marginTop: 8 }}>
                {JOBS.map((j) => (
                  <div key={j.title} className="card card-body" style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: 'var(--fs-h4)' }}>{j.title}</h3>
                      <span className="chip mint">{j.type}</span>
                    </div>
                    <div style={{ color: 'var(--fg3)', fontSize: 'var(--fs-small)', margin: '6px 0 12px' }}>{j.dept}</div>
                    <p style={{ fontSize: 'var(--fs-small)' }}>{j.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card card-body" style={{ padding: 36, position: 'sticky', top: 96 }}>
              {sent ? (
                <div className="success-banner"><Icon name="check-circle" size={22} />Thank you — your application has been received. We'll be in touch soon, insha'Allah.</div>
              ) : (
                <React.Fragment>
                  <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: 6 }}>Apply now</h3>
                  <p className="text-muted" style={{ fontSize: 'var(--fs-small)', marginBottom: 24 }}>Send us your details and we'll review your application.</p>
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      <Field label="Full name" name="name" required value={form.name} onChange={onCh} placeholder="Your name" />
                      <Field label="Email" type="email" name="email" required value={form.email} onChange={onCh} placeholder="you@example.com" />
                      <Field label="Position" type="select" name="role" required value={form.role} onChange={onCh} options={JOBS.map((j) => j.title)} placeholder="Select a role" />
                      <Field label="Message" type="textarea" name="msg" value={form.msg} onChange={onCh} placeholder="Tell us about yourself" />
                      <Btn type="submit" icon="arrow-right">Submit application</Btn>
                    </div>
                  </form>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

window.ROUTES = Object.assign(window.ROUTES || {}, {
  '/about': About,
  '/about/management-board': ManagementBoard,
  '/about/staff': Staff,
  '/about/career': Career,
});
Object.assign(window, { PersonCard });
