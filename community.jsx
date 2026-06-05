/* ============================================================
   Al-Islah Redesign — Community section
   /community, social-development, programmes, befrienders,
   family, youth
   ============================================================ */

function FeatureSplit({ eyebrow, eyebrowColor, title, body, img, reverse, children }) {
  const media = <div className="arch-sm" style={{ boxShadow: 'var(--shadow-md)' }}><div style={{ aspectRatio: '4/3' }}><Img id={img} ph={title} /></div></div>;
  return (
    <div className="hero-grid" style={{ alignItems: 'center' }}>
      {reverse && media}
      <div>
        <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
        <h2 style={{ fontSize: 'var(--fs-h1)', marginBottom: 16 }}>{title}</h2>
        <div className="prose lead">{body.map((p, i) => <p key={i}>{p}</p>)}</div>
        {children}
      </div>
      {!reverse && media}
    </div>
  );
}

function CommunityOverview() {
  const areas = [
    { ic: 'hand-helping', t: 'Social Development', d: 'Welfare programmes and befriending for those in need.', to: '/community/social-development', c: 'coral' },
    { ic: 'users', t: 'Family Development', d: 'Nurturing strong, faithful families across generations.', to: '/community/family', c: 'pink' },
    { ic: 'sparkles', t: 'Youth of Islah', d: 'Empowering the next generation of young Muslims.', to: '/community/youth', c: 'mint' },
  ];
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Community' }]} eyebrow="Community" title="Building community together"
        sub="Al-Islah is more than a place of prayer — it's a community that cares. Our programmes support families, empower youth and reach out to those in need." />
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {areas.map((a) => (
              <a key={a.t} className="card card-hover card-body" href={'#' + a.to} style={{ padding: 32 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, display: 'grid', placeItems: 'center', marginBottom: 20,
                  background: a.c === 'pink' ? 'var(--pink-100)' : a.c === 'mint' ? 'var(--mint-100)' : 'var(--coral-100)',
                  color: a.c === 'pink' ? 'var(--pink-600)' : a.c === 'mint' ? 'var(--mint-600)' : 'var(--coral)' }}>
                  <Icon name={a.ic} size={28} />
                </div>
                <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: 10 }}>{a.t}</h3>
                <p style={{ color: 'var(--fg3)' }}>{a.d}</p>
                <div style={{ marginTop: 18, color: 'var(--coral)', fontWeight: 'var(--fw-semibold)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-small)' }}>Explore <Icon name="arrow-right" size={16} /></div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="grid grid-4">
            {[['1,200+', 'Families supported'], ['300+', 'Active volunteers'], ['50+', 'Befriending pairs'], ['40+', 'Programmes a week']].map(([n, l]) => (
              <div className="stat" key={l} style={{ textAlign: 'center' }}><div className="num">{n}</div><div className="lbl">{l}</div></div>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

const PROGRAMMES = [
  { t: 'Health Screening', d: 'Free health screening for residents in partnership with Sengkang General Hospital. Includes basic checks for blood pressure, BMI and diabetes risk.', img: 'p1', tag: 'Health', partner: 'Sengkang General Hospital' },
  { t: 'Blood Donation Drive', d: 'Regular blood donation campaigns run in collaboration with the Red Cross, held at the mosque compound. All blood types welcome.', img: 'p2', tag: 'Health', partner: 'Singapore Red Cross' },
  { t: 'Purple Parade', d: 'Al-Islah participates in Singapore\'s largest movement celebrating inclusivity and support for persons with special needs.', img: 'p3', tag: 'Inclusion', partner: 'Purple Parade Singapore' },
  { t: 'Sign Language Course', d: 'Community sign language workshops to foster communication and inclusion for members of the deaf and hard-of-hearing community.', img: 'p4', tag: 'Inclusion' },
  { t: 'Interfaith Dialogue', d: 'Regular dialogues and visits with other faith communities to foster mutual understanding, respect and friendship.', img: 'p5', tag: 'Interfaith' },
  { t: 'Li Taarafu', d: 'An interfaith programme — the name means "so that you may know one another" (Quran 49:13). Building bridges across communities through shared experiences.', img: 'p6', tag: 'Interfaith' },
  { t: 'Blessings in Harmony', d: 'An annual fundraising gala that brings the community together in celebration, gratitude and support for the mosque\'s welfare and outreach programmes.', img: 'p1', tag: 'Fundraising' },
  { t: 'Monthly Food Aid', d: 'Grocery packs and meal vouchers distributed to families facing hardship in Punggol, funded through zakat and infaq contributions.', img: 'p2', tag: 'Welfare' },
];
function SocialDevelopment() {
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Community', to: '/community' }, { label: 'Social Development' }]} eyebrow="Community"
        title="Social Development" sub="Caring for the vulnerable and uplifting those in need — because we care for our community as much as we care for our families." />
      <section className="section">
        <div className="container">
          <FeatureSplit eyebrow="Our approach" title="Compassion in action"
            body={['Through our Social Development arm, Al-Islah channels zakat, infaq and volunteer effort into tangible help for residents facing hardship.', 'From food aid to financial assistance and befriending, we walk alongside families through difficult seasons of life.']}
            img="social-dev">
            <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Btn to="/community/programmes" iconRight="arrow-right">View programmes</Btn>
              <Btn to="/community/befrienders" variant="outline">Become a befriender</Btn>
            </div>
          </FeatureSplit>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <SectionHead center eyebrow="Two ways we serve" title="Programmes & Befrienders" />
          <div className="grid grid-2" style={{ marginTop: 40 }}>
            <a className="card card-hover" href="#/community/programmes">
              <div className="media-16x9"><Img id="sd-prog" ph="Community programmes" /></div>
              <div className="card-body"><h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: 8 }}>Programmes</h3><p className="text-muted">Welfare, education and health initiatives that reach families across Punggol.</p></div>
            </a>
            <a className="card card-hover" href="#/community/befrienders">
              <div className="media-16x9"><Img id="sd-befr" ph="Befrienders programme" /></div>
              <div className="card-body"><h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: 8 }}>Befrienders</h3><p className="text-muted">Trained volunteers offering friendship and a listening ear to isolated seniors.</p></div>
            </a>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function Programmes() {
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Community', to: '/community' }, { label: 'Social Development', to: '/community/social-development' }, { label: 'Programmes' }]} eyebrow="Social Development"
        title="Community Programmes" sub="The initiatives through which Al-Islah supports the well-being of families and individuals in our neighbourhood." />
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {PROGRAMMES.map((p) => (
              <div key={p.t} className="card card-hover">
                <div className="media-4x3"><Img id={p.img} ph={p.t} /></div>
                <div className="card-body">
                  <span className="chip" style={{ marginBottom: 12 }}>{p.tag}</span>
                  <h3 style={{ fontSize: 'var(--fs-h4)', margin: '12px 0 10px' }}>{p.t}</h3>
                  <p style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)', marginBottom: p.partner ? 10 : 0 }}>{p.d}</p>
                  {p.partner && <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--fg3)', display: 'flex', alignItems: 'center', gap: 5 }}><Icon name="users" size={13} />In partnership with {p.partner}</div>}
                </div>
              </div>
            ))}
          </div>
          <div className="card section-coral" style={{ marginTop: 48, padding: 44, textAlign: 'center', border: 'none' }}>
            <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: 12 }}>Help us reach more families</h2>
            <p className="lead" style={{ maxWidth: 520, margin: '0 auto 24px' }}>Your donation and volunteering keep these programmes running.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Btn to="/donations" icon="heart">Donate</Btn>
              <Btn to="/volunteer/be-a-volunteer" variant="outline">Volunteer</Btn>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function Befrienders() {
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', avail: '' });
  const [sent, setSent] = React.useState(false);
  const onCh = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Community', to: '/community' }, { label: 'Social Development', to: '/community/social-development' }, { label: 'Befrienders' }]} eyebrow="Social Development"
        title="Befrienders Programme" sub="Sometimes the greatest help is simply being there. Our befrienders offer companionship and a caring presence to isolated seniors and homebound residents." />
      <section className="section">
        <div className="container">
          <div className="hero-grid" style={{ alignItems: 'start' }}>
            <div>
              <div className="arch-sm" style={{ marginBottom: 28 }}><div className="media-16x9"><Img id="befr-hero" ph="Befriender visiting a senior" /></div></div>
              <Eyebrow>What befrienders do</Eyebrow>
              <p className="lead">Befrienders are trained volunteers who make regular visits or calls to seniors living alone, offering friendship, conversation and a watchful, caring eye.</p>
              <div style={{ marginTop: 24 }}>
                {['Regular home visits or phone check-ins', 'Accompaniment to appointments and errands', 'A listening ear and emotional support', 'Training and ongoing guidance provided'].map((t) => (
                  <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
                    <span style={{ color: 'var(--mint-600)', flexShrink: 0, marginTop: 2 }}><Icon name="check-circle" size={20} /></span><span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card card-body" style={{ padding: 36, position: 'sticky', top: 96 }}>
              {sent ? (
                <div className="success-banner"><Icon name="check-circle" size={22} />Jazakallah khair! We'll reach out about the next befriender orientation.</div>
              ) : (
                <React.Fragment>
                  <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: 6 }}>Become a befriender</h3>
                  <p className="text-muted" style={{ fontSize: 'var(--fs-small)', marginBottom: 24 }}>Sign up and our team will be in touch with next steps.</p>
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      <Field label="Full name" name="name" required value={form.name} onChange={onCh} placeholder="Your name" />
                      <Field label="Email" type="email" name="email" required value={form.email} onChange={onCh} placeholder="you@example.com" />
                      <Field label="Mobile" name="phone" required value={form.phone} onChange={onCh} placeholder="+65" />
                      <Field label="Availability" type="select" name="avail" value={form.avail} onChange={onCh} options={['Weekday mornings', 'Weekday evenings', 'Weekends', 'Flexible']} placeholder="When are you free?" />
                      <Btn type="submit" icon="hand-helping">Sign me up</Btn>
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

function FamilyDevelopment() {
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Community', to: '/community' }, { label: 'Family Development' }]} eyebrow="Community"
        title="Family Development" sub="Strong families are the foundation of a strong ummah. Our programmes equip couples and parents to build homes rooted in faith, love and understanding." />
      <section className="section">
        <div className="container">
          <FeatureSplit eyebrow="For every family" title="Nurturing faithful homes"
            body={['From marriage preparation to parenting workshops and family counselling, Al-Islah walks with families through every season.', 'Our family programmes create space for couples and parents to learn, connect and grow together in a supportive environment.']}
            img="family-hero" />
          <div className="grid grid-3" style={{ marginTop: 56 }}>
            {[
              { ic: 'heart', t: 'Cinta Abadi', d: 'A comprehensive pre-marital preparation programme equipping couples with the knowledge, skills and mindset for a lasting marriage. Learn more at cintaabadi.sg.', link: 'https://www.cintaabadi.sg', tagc: 'pink' },
              { ic: 'baby', t: 'Project ARIF', d: 'A holistic early childhood development programme in partnership with Temasek Foundation, KK Women\'s and Children\'s Hospital (KKH) and MUIS — supporting families with young children.', tagc: 'mint' },
              { ic: 'message-circle', t: 'Family Counselling', d: 'Confidential support and guidance for couples and families navigating challenges, provided by trained counsellors.', tagc: '' },
            ].map((x) => (
              <div key={x.t} className="card card-body" style={{ padding: 28 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: x.tagc === 'pink' ? 'var(--pink-100)' : x.tagc === 'mint' ? 'var(--mint-100)' : 'var(--coral-100)', color: x.tagc === 'pink' ? 'var(--pink-600)' : x.tagc === 'mint' ? 'var(--mint-600)' : 'var(--coral)', display: 'grid', placeItems: 'center', marginBottom: 18 }}><Icon name={x.ic} size={26} /></div>
                <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 8 }}>{x.t}</h3>
                <p style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)', marginBottom: x.link ? 12 : 0 }}>{x.d}</p>
                {x.link && <a href={x.link} target="_blank" rel="noopener" style={{ fontSize: 'var(--fs-small)', color: 'var(--coral)', fontWeight: 600 }}>Visit website <Icon name="external-link" size={13} /></a>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function YouthOfIslah() {
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Community', to: '/community' }, { label: 'Youth of Islah' }]} eyebrow="Community" tone="coral"
        title="Youth of Islah" sub="A vibrant community of young Muslims growing in faith, leadership and friendship. Come as you are — leave inspired." />
      <section className="section">
        <div className="container">
          <FeatureSplit reverse eyebrow="For ages 15–25" eyebrowColor="pink" title="Faith, friendship & purpose"
            body={['Youth of Islah is a movement of young people building meaningful connections with their deen and with each other.', 'Through halaqah, retreats, sports, volunteering and creative projects, we create space for youth to ask questions, find mentors and lead.']}
            img="youth-hero">
            <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Btn to="/dakwah/events" iconRight="arrow-right">Upcoming youth events</Btn>
              <Btn to="/volunteer/be-a-volunteer" variant="outline">Join the team</Btn>
            </div>
          </FeatureSplit>
          <div className="grid grid-3" style={{ marginTop: 56 }}>
            {[
              { ic: 'sunrise', t: 'Fajarthon', d: 'An all-night programme ending with Fajr prayer together — building brotherhood, sisterhood and the habit of waking for Fajr.' },
              { ic: 'tent', t: 'AYN Camp', d: 'Al-Islah Youth Night (AYN) annual camp — a multi-day residential retreat for deep reflection, leadership and bonding.' },
              { ic: 'users', t: 'Muslimah Youth Forum', d: 'A dedicated platform for young Muslimahs to explore their identity, faith and purpose through open dialogue and workshops.' },
              { ic: 'heart', t: 'Usrah Santai Janji Sampai', d: 'Small-group halaqah circles for youth to grow together in a relaxed, consistent and committed setting.' },
              { ic: 'moon', t: 'Tranquil Hearts', d: 'A mindfulness and spiritual wellness programme helping young Muslims build inner peace through Islamic practices.' },
              { ic: 'sparkles', t: 'GOTF', d: 'Give One to the Future — a community service and social initiative where youth give back through volunteering and outreach.' },
            ].map((x) => (
              <div key={x.t} className="card card-body" style={{ padding: 24 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--mint-100)', color: 'var(--mint-600)', display: 'grid', placeItems: 'center', marginBottom: 14 }}><Icon name={x.ic} size={24} /></div>
                <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 8 }}>{x.t}</h3>
                <p style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)' }}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

window.ROUTES = Object.assign(window.ROUTES || {}, {
  '/community': CommunityOverview,
  '/community/social-development': SocialDevelopment,
  '/community/programmes': Programmes,
  '/community/befrienders': Befrienders,
  '/community/family': FamilyDevelopment,
  '/community/youth': YouthOfIslah,
});
Object.assign(window, { FeatureSplit });
