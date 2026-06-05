/* ============================================================
   Al-Islah Redesign — Learn section
   /learn/articles, /learn/videos, /learn/know-islam,
   /learn/course-registration
   ============================================================ */

const ARTICLES = [
  { t: 'Sifat Sombong Pemusnah Segalanya', cat: 'Character', date: '2 Jun 2026', read: '5 min', img: 'a1', feat: true, excerpt: 'Sombong adalah sifat yang amat dibenci oleh Allah SWT. Artikel ini menelusuri bahaya sifat sombong dan cara kita menghindarinya.' },
  { t: 'DO NOT LOSE HOPE IN ALLAH SWT', cat: 'Worship', date: '28 May 2026', read: '4 min', img: 'a2', excerpt: 'No matter how far you feel, the door of Allah\'s mercy is always open. A reminder for those who feel they have strayed.' },
  { t: 'Sampaikan Dengan Hikmah', cat: 'Dakwah', date: '21 May 2026', read: '6 min', img: 'a3', excerpt: 'Bagaimana cara kita berkongsi Islam dengan orang lain secara bijaksana, penuh kasih sayang dan berkesan.' },
  { t: 'Ayat al-Quran Yang Buat Nabi Menangis', cat: 'Tafsir', date: '14 May 2026', read: '5 min', img: 'a4', excerpt: 'Terdapat ayat al-Quran yang menyentuh hati Rasulullah SAW hingga baginda menangis. Apakah ayat tersebut dan mengapa?' },
  { t: 'Configuring my Tahajjud', cat: 'Worship', date: '7 May 2026', read: '7 min', img: 'a5', excerpt: 'A practical guide to establishing the night prayer as a consistent habit — timings, rakaat counts, and what to recite.' },
  { t: 'The Spirit of Community in Islam', cat: 'Community', date: '1 May 2026', read: '5 min', img: 'a6', excerpt: 'Why togetherness is at the heart of our faith and how the mosque is its centre.' },
];
function GeneralArticles() {
  const cats = ['All', 'Fiqh', 'Worship', 'Tafsir', 'Family', 'Community'];
  const [cat, setCat] = React.useState('All');
  const feat = ARTICLES.find((a) => a.feat);
  const rest = ARTICLES.filter((a) => (cat === 'All' || a.cat === cat) && !a.feat);
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Learn' }, { label: 'General Articles' }]} eyebrow="Learn"
        title="Articles & Reflections" sub="Knowledge for everyday life — short reads on faith, worship, family and community from our asatizah." />
      <section className="section">
        <div className="container">
          {/* Featured */}
          <a className="card card-hover" href="#/learn/articles" style={{ display: 'block', marginBottom: 48 }}>
            <div className="hero-grid" style={{ gap: 0, alignItems: 'stretch' }}>
              <div className="media-16x9" style={{ minHeight: 320 }}><Img id={feat.img} ph={feat.t} /></div>
              <div style={{ padding: 'clamp(28px,4vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}><span className="chip pink">Featured</span><span className="chip slate">{feat.cat}</span></div>
                <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: 14 }}>{feat.t}</h2>
                <p className="lead">{feat.excerpt}</p>
                <div style={{ marginTop: 20, color: 'var(--fg3)', fontSize: 'var(--fs-small)' }}>{feat.date} · {feat.read} read</div>
              </div>
            </div>
          </a>
          <div className="filter-bar" style={{ marginBottom: 32 }}>
            {cats.map((c) => <button key={c} className={'filter-btn' + (cat === c ? ' active' : '')} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          <div className="grid grid-3" key={cat}>
            {rest.map((a) => (
              <a key={a.t} className="card card-hover" href="#/learn/articles" style={{ display: 'block' }}>
                <div className="media-16x9"><Img id={a.img} ph={a.t} /></div>
                <div className="card-body">
                  <span className="chip slate" style={{ marginBottom: 12 }}>{a.cat}</span>
                  <h3 style={{ fontSize: 'var(--fs-h4)', margin: '12px 0 10px' }}>{a.t}</h3>
                  <p style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)', marginBottom: 14 }}>{a.excerpt}</p>
                  <div style={{ color: 'var(--fg3)', fontSize: 'var(--fs-caption)' }}>{a.date} · {a.read} read</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

const VIDEOS = [
  { t: 'Hajj Series Ep.1 — Miqat: The Starting Point', dur: '18:32', img: 'v1', views: '4.2K', series: 'Hajj Series' },
  { t: 'Hajj Series Ep.2 — Wuquf di Arafah', dur: '21:15', img: 'v2', views: '3.8K', series: 'Hajj Series' },
  { t: 'Hajj Series Ep.3 — Muzdalifah & Mina', dur: '16:40', img: 'v3', views: '2.9K', series: 'Hajj Series' },
  { t: 'Hajj Series Ep.4 — Tawaf & Saie', dur: '24:08', img: 'v4', views: '3.1K', series: 'Hajj Series' },
  { t: 'Hajj Series Ep.5 — Korban & Tahalul', dur: '14:55', img: 'v5', views: '2.4K', series: 'Hajj Series' },
  { t: 'Hajj Series Ep.6 — Basic Info & Checklist', dur: '12:30', img: 'v6', views: '6.7K', series: 'Hajj Series' },
  { t: 'Muslimah Series Ep.1 — Who Are You?', dur: '28:14', img: 'v1', views: '5.1K', series: 'Muslimah Series' },
  { t: 'Muslimah Series Ep.2 — Strength in Modesty', dur: '31:22', img: 'v2', views: '4.3K', series: 'Muslimah Series' },
  { t: 'Muslimah Series Ep.3 — Leading the Family', dur: '26:50', img: 'v3', views: '3.6K', series: 'Muslimah Series' },
];
function OnlineVideos() {
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Learn' }, { label: 'Online Videos' }]} eyebrow="Learn"
        title="Online Videos" sub="Watch khutbah, lectures and learning series from Al-Islah. Subscribe to IslahTV for the latest uploads." />
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 28 }}>
            <Btn href="https://www.youtube.com/islahtv" variant="outline" icon="youtube">Visit IslahTV on YouTube</Btn>
          </div>
          <div className="grid grid-3">
            {VIDEOS.map((v) => (
              <a key={v.t} className="card card-hover" href="https://www.youtube.com/islahtv" target="_blank" rel="noopener" style={{ display: 'block' }}>
                <div style={{ position: 'relative' }}>
                  <div className="media-16x9"><Img id={v.img} ph={v.t} /></div>
                  <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
                    <span style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,.92)', display: 'grid', placeItems: 'center', color: 'var(--coral)', boxShadow: 'var(--shadow-md)' }}><Icon name="play" size={24} fill="currentColor" strokeWidth={0} /></span>
                  </div>
                  <span style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,.78)', color: '#fff', fontSize: 'var(--fs-caption)', padding: '3px 8px', borderRadius: 6, fontWeight: 600 }}>{v.dur}</span>
                </div>
                <div className="card-body">
                  {v.series && <span className="chip slate" style={{ marginBottom: 8 }}>{v.series}</span>}
                  <h3 style={{ fontSize: 'var(--fs-body)', margin: '8px 0 6px' }}>{v.t}</h3>
                  <div style={{ color: 'var(--fg3)', fontSize: 'var(--fs-small)' }}>{v.views} views · IslahTV</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function KnowIslam() {
  const pillars = [
    { ic: 'star', t: 'Shahadah', d: 'The declaration of faith: there is no god but Allah, and Muhammad ﷺ is His Messenger.' },
    { ic: 'compass', t: 'Solat', d: 'The five daily prayers that anchor a Muslim\u2019s day in remembrance of God.' },
    { ic: 'hand-helping', t: 'Zakat', d: 'Obligatory charity that purifies wealth and supports those in need.' },
    { ic: 'moon', t: 'Sawm', d: 'Fasting in the month of Ramadan, building discipline and God-consciousness.' },
    { ic: 'map-pin', t: 'Hajj', d: 'The pilgrimage to Makkah, undertaken once in a lifetime if able.' },
  ];
  const faqs = [
    { q: 'What is Islam?', a: 'Islam means peace and submission to the will of God (Allah). Muslims believe in one God and follow the teachings of the Prophet Muhammad ﷺ, as preserved in the Quran and Sunnah.' },
    { q: 'I\u2019m interested in learning more — where do I start?', a: 'You\u2019re most welcome to visit us. Speak to our office or asatizah, attend a Know Islam session, or join our beginner courses. There is no pressure — only a warm welcome and answers to your questions.' },
    { q: 'Can non-Muslims visit the mosque?', a: 'Absolutely. Visitors of all faiths are welcome. We simply ask that you dress modestly and observe the etiquette of the prayer hall. Guided visits can be arranged through our office.' },
    { q: 'How do I become a Muslim?', a: 'Embracing Islam is as simple as sincerely declaring the Shahadah. Our asatizah can guide you through it and support your journey afterwards. Reach out to the mosque office to speak with someone.' },
  ];
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Learn' }, { label: 'Know Islam' }]} eyebrow="Learn" tone="coral"
        title="Know Islam" sub="New to Islam, or simply curious? Start here. We welcome every question with warmth and without judgement." />
      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="The Five Pillars" eyebrowColor="pink" title="The foundations of Islam" sub="Islam is built upon five pillars — acts of worship that shape a Muslim's relationship with God and community." />
          <div className="grid" style={{ gridTemplateColumns: 'repeat(5,1fr)', marginTop: 44, gap: 16 }}>
            {pillars.map((p) => (
              <div key={p.t} className="card card-body" style={{ padding: 24, textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--coral-100)', color: 'var(--coral)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}><Icon name={p.ic} size={26} /></div>
                <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 8 }}>{p.t}</h3>
                <p style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)' }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container-narrow">
          <SectionHead center eyebrow="Questions & Answers" title="Curious? You're in good company" />
          <div style={{ marginTop: 32 }}><Accordion items={faqs} /></div>
          <div className="card card-body" style={{ marginTop: 40, padding: 40, textAlign: 'center', background: 'var(--ink)', color: '#fff', border: 'none' }}>
            <h2 style={{ color: '#fff', fontSize: 'var(--fs-h2)', marginBottom: 12 }}>Want to talk to someone?</h2>
            <p style={{ color: '#b6b6c0', maxWidth: 480, margin: '0 auto 24px' }}>Our asatizah are happy to meet you, answer questions, and walk with you — at your own pace.</p>
            <Btn to="/contact" variant="light" icon="message-circle">Get in touch</Btn>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function CourseRegistration() {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({ course: '', name: '', email: '', phone: '', nric: '', dob: '', notes: '' });
  const onCh = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const courseList = (window.COURSES || []).map((c) => c.title);
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Learn' }, { label: 'Course Registration' }]} eyebrow="Learn"
        title="Course Registration" sub="Register for any Al-Islah course or programme. It only takes a couple of minutes." />
      <section className="section">
        <div className="container-narrow">
          {/* Steps indicator */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
            {['Course', 'Your details', 'Confirm'].map((s, i) => (
              <div key={s} style={{ flex: 1 }}>
                <div style={{ height: 4, borderRadius: 4, background: step >= i + 1 ? 'var(--coral)' : 'var(--slate-100)', marginBottom: 8 }}></div>
                <div style={{ fontSize: 'var(--fs-small)', fontWeight: 600, color: step >= i + 1 ? 'var(--coral)' : 'var(--fg3)' }}>{i + 1}. {s}</div>
              </div>
            ))}
          </div>
          <div className="card card-body" style={{ padding: 'clamp(28px,4vw,44px)' }}>
            {step === 1 && (
              <React.Fragment>
                <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: 20 }}>Choose a course</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {courseList.map((c) => (
                    <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', border: '1.5px solid ' + (form.course === c ? 'var(--coral)' : 'var(--border)'), borderRadius: 'var(--r-md)', cursor: 'pointer', background: form.course === c ? 'var(--coral-100)' : '#fff' }}>
                      <input type="radio" name="course" checked={form.course === c} onChange={() => setForm({ ...form, course: c })} style={{ accentColor: 'var(--coral)' }} />
                      <span style={{ fontWeight: 500, color: 'var(--fg1)' }}>{c}</span>
                    </label>
                  ))}
                </div>
                <div style={{ marginTop: 28, display: 'flex', justifyContent: 'flex-end' }}>
                  <Btn onClick={() => form.course && setStep(2)} iconRight="arrow-right">Continue</Btn>
                </div>
              </React.Fragment>
            )}
            {step === 2 && (
              <React.Fragment>
                <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: 20 }}>Your details</h3>
                <div className="form-grid">
                  <Field label="Full name" name="name" required value={form.name} onChange={onCh} placeholder="As per NRIC" />
                  <Field label="Email" type="email" name="email" required value={form.email} onChange={onCh} placeholder="you@example.com" />
                  <Field label="Mobile" name="phone" required value={form.phone} onChange={onCh} placeholder="+65" />
                  <Field label="Date of birth" type="date" name="dob" value={form.dob} onChange={onCh} />
                  <Field full label="Anything we should know?" type="textarea" name="notes" value={form.notes} onChange={onCh} placeholder="Optional — accessibility needs, prior experience, etc." />
                </div>
                <div style={{ marginTop: 28, display: 'flex', justifyContent: 'space-between' }}>
                  <Btn variant="outline" onClick={() => setStep(1)}>Back</Btn>
                  <Btn onClick={() => form.name && form.email && setStep(3)} iconRight="arrow-right">Review</Btn>
                </div>
              </React.Fragment>
            )}
            {step === 3 && (
              <React.Fragment>
                <div className="success-banner" style={{ marginBottom: 24 }}><Icon name="check-circle" size={22} />Registration submitted — jazakallah khair!</div>
                <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: 18 }}>Confirmation</h3>
                <div className="card" style={{ background: 'var(--bg-alt)', border: 'none' }}>
                  <div style={{ padding: 8 }}>
                    {[['Course', form.course], ['Name', form.name], ['Email', form.email], ['Mobile', form.phone || '—']].map(([l, v]) => (
                      <div key={l} className="info-row" style={{ padding: '14px 16px' }}><div><div className="lbl">{l}</div><div className="val">{v}</div></div></div>
                    ))}
                  </div>
                </div>
                <p className="text-muted" style={{ fontSize: 'var(--fs-small)', marginTop: 18 }}>We've sent a confirmation to your email. Our team will follow up with payment and joining details.</p>
                <div style={{ marginTop: 24 }}><Btn to="/dakwah/courses" variant="outline">Browse more courses</Btn></div>
              </React.Fragment>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

window.ROUTES = Object.assign(window.ROUTES || {}, {
  '/learn/articles': GeneralArticles,
  '/learn/videos': OnlineVideos,
  '/learn/know-islam': KnowIslam,
  '/learn/course-registration': CourseRegistration,
});
