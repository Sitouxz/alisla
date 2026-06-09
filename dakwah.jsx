/* ============================================================
   Al-Islah Redesign — Dakwah section
   events (+ detail), lectures, courses, tadarrus, quran-solat
   (physical/online), one-on-one
   ============================================================ */

const CMS_BASE_D = 'https://ne-website-manager.vercel.app';
const CLIENT_SLUG_D = 'al-islah';

/* Parse event metadata from CMS tags array: date:..., time:..., loc:..., speaker:..., fee:..., register:... */
function parseEventTags(tags) {
  const meta = {};
  (tags || []).forEach(t => {
    const idx = t.indexOf(':');
    if (idx > 0) {
      const k = t.slice(0, idx).trim();
      const v = t.slice(idx + 1).trim();
      if (['date','time','loc','speaker','fee','register','tag','tagc'].includes(k)) meta[k] = v;
    }
  });
  return meta;
}

function useCmsEvents() {
  const [events, setEvents] = React.useState(null);
  React.useEffect(() => {
    fetch(`${CMS_BASE_D}/api/client/${CLIENT_SLUG_D}/posts?category=Event&limit=50`)
      .then(r => r.ok ? r.json() : [])
      .then(posts => {
        if (!Array.isArray(posts) || posts.length === 0) { setEvents([]); return; }
        setEvents(posts.map((p, i) => {
          const meta = parseEventTags(p.tags);
          return {
            id: p.slug || `cms-${p.id}`,
            cat: meta.tag || 'Event',
            tag: meta.tag || 'Event',
            tagc: meta.tagc || '',
            date: meta.date || fmtDateD(p.published_at),
            time: meta.time || '',
            title: p.title,
            loc: meta.loc || 'Al-Islah Mosque',
            img: `ev-${(i % 4) + 1}`,
            cover: p.cover_url,
            speaker: meta.speaker || 'Al-Islah Asatizah',
            desc: p.excerpt || '',
            content: p.content || '',
            fee: meta.fee || 'Free',
            register: meta.register || '/learn/course-registration',
            fromCms: true,
          };
        }));
      })
      .catch(() => setEvents([]));
  }, []);
  return events;
}

function fmtDateD(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

const EVENTS = [
  { id: 'adil-solat-essentials', cat: 'Courses', tag: 'Course', tagc: 'mint', date: 'Sat, 17 Jan 2026', time: '9:00 AM', title: 'ADIL: Solat Essentials', loc: 'Online (Zoom)', img: 'ev-quran', speaker: 'Al-Islah Asatizah', desc: 'A focused one-day workshop covering the essentials of solat — from purification and conditions of validity to the actions and supplications of prayer. Free to attend; registration required.', fee: 'Free', register: 'https://tinyurl.com/adilf26' },
  { id: 'warkah-cinta-pertama', cat: 'Youth', tag: 'Youth', tagc: '', date: 'Coming soon', time: 'TBC', title: 'Warkah Cinta Pertama', loc: 'Al-Islah Mosque', img: 'ev-youth', speaker: 'Ustazah Syariati Sulaiman', desc: 'A qasidah and spiritual evening exploring the language of love in Islamic tradition, led by Ustazah Syariati Sulaiman. Tickets via the payment page.', fee: 'See payment page', register: '#/payment' },
  { id: 'tafsir-jumaat', cat: 'Lectures', tag: 'Lecture', tagc: 'pink', date: 'Every Friday', time: '8:15 PM', title: 'Tafsir Jumaat: Surah Al-Kahf', loc: 'Main Prayer Hall', img: 'ev-tafsir', speaker: 'Ustaz Mohamed Faizal', desc: 'A weekly tafsir circle unpacking the themes, stories and lessons of Surah Al-Kahf, verse by verse. Open to all; no registration required.', fee: 'Free' },
  { id: 'youth-night', cat: 'Youth', tag: 'Youth', tagc: '', date: 'Sat, 14 Jun', time: '7:30 PM', title: 'Youth of Islah — Iman Recharge Night', loc: 'Level 3 Multipurpose Hall', img: 'ev-youth', speaker: 'Youth of Islah Team', desc: 'An evening of reflection, halaqah and brotherhood/sisterhood for youths aged 15–25. Light refreshments provided.', fee: 'Free' },
  { id: 'fiqh-solat', cat: 'Lectures', tag: 'Lecture', tagc: 'pink', date: 'Every Wednesday', time: '8:30 PM', title: 'Fiqh of Solat — Weekly Class', loc: 'Classroom 1', img: 'ev-fiqh', speaker: 'Ustaz Daniel Hakim', desc: 'Strengthen your understanding of the rulings, conditions and etiquette of prayer in this practical weekly class.', fee: 'Free' },
  { id: 'tahajjud-night', cat: 'Worship', tag: 'Worship', tagc: 'slate', date: 'Last Fri monthly', time: '4:30 AM', title: 'Qiyamullail — Night of Worship', loc: 'Main Prayer Hall', img: 'ev-tahajjud', speaker: 'Imam of Al-Islah', desc: 'A monthly congregational night prayer, dzikir and supplication, ending with Subuh in congregation.', fee: 'Free' },
];

function EventGridCard({ ev }) {
  return (
    <a className="card card-hover" href={'/dakwah/events/' + ev.id} onClick={(e) => navTo('/dakwah/events/' + ev.id, e)} style={{ display: 'block' }}>
      <div className="media-4x3"><Img id={ev.img} ph={ev.title} /></div>
      <div className="card-body">
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}><span className={'chip ' + (ev.tagc || '')}>{ev.tag}</span></div>
        <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 12 }}>{ev.title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 'var(--fs-small)', color: 'var(--fg3)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="calendar" size={15} />{ev.date} · {ev.time}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="map-pin" size={15} />{ev.loc}</span>
        </div>
      </div>
    </a>
  );
}

function UpcomingEvents() {
  const cats = ['All', 'Lectures', 'Courses', 'Youth', 'Family', 'Worship', 'Event'];
  const [cat, setCat] = React.useState('All');
  const cmsEvents = useCmsEvents();
  /* CMS events shown first (if any), then static fallback events */
  const allEvents = cmsEvents && cmsEvents.length > 0 ? [...cmsEvents, ...EVENTS] : EVENTS;
  const loading = cmsEvents === null;
  const list = cat === 'All' ? allEvents : allEvents.filter((e) => e.cat === cat);
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Dakwah' }, { label: 'Upcoming Events' }]} eyebrow="Dakwah"
        title="Upcoming Events" sub="Lectures, classes and gatherings happening at Al-Islah. There is always something to learn and a community to belong to." />
      <section className="section">
        <div className="container">
          <div className="filter-bar" style={{ marginBottom: 36 }}>
            {cats.map((c) => <button key={c} className={'filter-btn' + (cat === c ? ' active' : '')} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          {loading ? (
            <div className="grid grid-3">
              {[1,2,3,4,5,6].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-3" key={cat}>
              {list.map((ev) => <EventGridCard key={ev.id} ev={ev} />)}
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
}

function EventDetail({ route }) {
  const id = route.split('/').pop();
  const [cmsEv, setCmsEv] = React.useState(undefined); // undefined=loading, null=not found, obj=found
  React.useEffect(() => {
    fetch(`${CMS_BASE_D}/api/client/${CLIENT_SLUG_D}/posts/${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(p => {
        if (!p) { setCmsEv(null); return; }
        const meta = parseEventTags(p.tags);
        setCmsEv({
          id: p.slug,
          cat: meta.tag || 'Event',
          tag: meta.tag || 'Event',
          date: meta.date || fmtDateD(p.published_at),
          time: meta.time || '',
          loc: meta.loc || 'Al-Islah Mosque',
          speaker: meta.speaker || 'Al-Islah Asatizah',
          fee: meta.fee || 'Free',
          register: meta.register || '/learn/course-registration',
          title: p.title,
          desc: p.excerpt || '',
          content: p.content || '',
          cover: p.cover_url,
        });
      })
      .catch(() => setCmsEv(null));
  }, [id]);

  /* Fall back to static array if CMS doesn't have it */
  const ev = (cmsEv !== undefined && cmsEv !== null) ? cmsEv : (cmsEv === null ? EVENTS.find((e) => e.id === id) : null);

  if (cmsEv === undefined) return (
    <React.Fragment>
      <div style={{ padding: 'clamp(60px,10vw,100px) 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Skeleton height={48} width="60%" />
          <Skeleton height={24} width="30%" />
        </div>
      </div>
    </React.Fragment>
  );

  if (!ev) return <div className="container section"><h1>Event not found</h1><Btn to="/dakwah/events">All events</Btn></div>;

  const registerTo = ev.register && !ev.register.startsWith('#') ? ev.register : '/learn/course-registration';
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Dakwah' }, { label: 'Events', to: '/dakwah/events' }, { label: ev.title }]} eyebrow={ev.tag} title={ev.title} />
      <section className="section">
        <div className="container">
          <div className="hero-grid" style={{ alignItems: 'start' }}>
            <div>
              <div className="arch-sm" style={{ marginBottom: 28 }}>
                <div className="media-16x9">
                  {ev.cover ? <img src={ev.cover} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Img id={ev.img || 'ev-tafsir'} ph={ev.title} />}
                </div>
              </div>
              <Eyebrow>About this event</Eyebrow>
              {ev.content ? (
                <div className="prose" dangerouslySetInnerHTML={{ __html: ev.content }} />
              ) : (
                <React.Fragment>
                  <p className="lead">{ev.desc}</p>
                  <p className="prose" style={{ marginTop: 16 }}>All are welcome to attend. Please arrive early to find a seat, and observe mosque etiquette and modest dress. For enquiries, contact the mosque office.</p>
                </React.Fragment>
              )}
            </div>
            <div className="card card-body" style={{ padding: 32, position: 'sticky', top: 96 }}>
              {[['calendar', 'Date', ev.date], ev.time && ['clock', 'Time', ev.time], ['map-pin', 'Location', ev.loc], ['user', 'Speaker', ev.speaker], ev.fee && ['credit-card', 'Fee', ev.fee]].filter(Boolean).map(([ic, l, v]) => (
                <div className="info-row" key={l}>
                  <div className="info-ico"><Icon name={ic} size={18} /></div>
                  <div><div className="lbl">{l}</div><div className="val">{v}</div></div>
                </div>
              ))}
              {registerTo.startsWith('http') ? (
                <a className="btn btn-primary" href={registerTo} target="_blank" rel="noopener"><Icon name="check" size={16} className="ico" />Register interest</a>
              ) : (
                <Btn to={registerTo} icon="check">Register interest</Btn>
              )}
              <div style={{ height: 10 }} />
              <Btn href="https://calendar.google.com" variant="outline" icon="calendar">Add to calendar</Btn>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

const LECTURES = [
  { day: 'Daily', time: 'After Subuh', title: 'Tazkirah Subuh', who: 'Rotating Asatizah', topic: 'Short reminders & hadith' },
  { day: 'Monday', time: '8:30 PM', title: 'Sirah Nabawiyah', who: 'Ustaz Mohamed Faizal', topic: 'Life of the Prophet ﷺ' },
  { day: 'Wednesday', time: '8:30 PM', title: 'Fiqh of Solat', who: 'Ustaz Daniel Hakim', topic: 'Rulings of prayer' },
  { day: 'Thursday', time: 'After Maghrib', title: 'Yasin & Tahlil', who: 'Imam of Al-Islah', topic: 'Weekly recitation' },
  { day: 'Friday', time: '8:15 PM', title: 'Tafsir Jumaat', who: 'Ustaz Mohamed Faizal', topic: 'Surah Al-Kahf' },
  { day: 'Sunday', time: '10:00 AM', title: 'Aqidah for Beginners', who: 'Ustazah Aishah Karim', topic: 'Foundations of faith' },
];
function DailyLectures() {
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Dakwah' }, { label: 'Daily Lectures' }]} eyebrow="Dakwah"
        title="Daily Lectures" sub="Regular halaqah and lectures throughout the week, led by our resident asatizah. Drop in — all are welcome." />
      <section className="section">
        <div className="container-narrow">
          <div className="card card-body" style={{ padding: 16 }}>
            {LECTURES.map((l, i) => (
              <div className="schedule-row" key={i}>
                <div className="schedule-time">{l.day}<div style={{ color: 'var(--fg3)', fontWeight: 400, fontSize: 'var(--fs-caption)' }}>{l.time}</div></div>
                <div>
                  <div style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--fg1)' }}>{l.title}</div>
                  <div style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)' }}>{l.topic} · {l.who}</div>
                </div>
                <span className="chip slate">{l.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

const COURSES = [
  { title: 'Quran & Solat Physical Classes', level: 'All levels', dur: 'Per term', fee: '$100', img: 'c1', desc: 'In-person classes at the mosque covering correct Quran recitation and the practical performance of solat. Small class sizes with personal attention.', link: '#/dakwah/quran-solat-physical' },
  { title: 'Quran & Solat Online Classes', level: 'All levels', dur: 'Per term', fee: '$80', img: 'c2', desc: 'Live, interactive Quran and solat lessons via Zoom for those who prefer learning from home. Flexible evening timeslots for working adults.', link: '#/dakwah/quran-solat-online' },
  { title: 'One-on-One Quranic Learning', level: 'All levels', dur: 'Per session', fee: 'From $30', img: 'c3', desc: 'Fully personalised private Quran lessons over Zoom, paced entirely around your goals — from basic reading to advanced tajweed and memorisation.', link: '#/dakwah/one-on-one' },
  { title: 'Tadarrus Al-Quran', level: 'All levels', dur: 'Ongoing', fee: 'Free', img: 'c4', desc: 'A communal reading circle where the community recites and completes the mushaf together. Daily after Maghrib at the main prayer hall.', link: '#/dakwah/tadarrus' },
  { title: 'Hifz Programme (Children)', level: 'Youth', dur: 'Ongoing', fee: 'Enquire', img: 'c5', desc: 'A structured Quran memorisation programme for children, guided by qualified teachers with a personalised memorisation plan.', link: '#/learn/course-registration' },
  { title: 'Islamic Short Courses', level: 'All levels', dur: 'Varies', fee: 'See details', img: 'c6', desc: 'Regular workshops and short courses on fiqh, aqidah, sirah and Arabic. Check Upcoming Events for the latest schedule.', link: '#/dakwah/events' },
];

function useCmsCourses() {
  const [courses, setCourses] = React.useState(null);
  React.useEffect(() => {
    fetch(`${CMS_BASE_D}/api/client/${CLIENT_SLUG_D}/posts?category=Course&limit=50`)
      .then(r => r.ok ? r.json() : [])
      .then(posts => {
        if (!Array.isArray(posts) || posts.length === 0) { setCourses([]); return; }
        setCourses(posts.map((p, i) => {
          const level = (p.tags || []).map(t => t.startsWith('level:') ? t.slice(6).trim() : null).find(Boolean) || 'All levels';
          const dur = (p.tags || []).map(t => t.startsWith('dur:') ? t.slice(4).trim() : null).find(Boolean) || 'Varies';
          const fee = (p.tags || []).map(t => t.startsWith('fee:') ? t.slice(4).trim() : null).find(Boolean) || 'See details';
          const link = (p.tags || []).map(t => t.startsWith('link:') ? t.slice(5).trim() : null).find(Boolean) || '/learn/course-registration';
          return { title: p.title, level, dur, fee, img: `c${(i % 6) + 1}`, cover: p.cover_url, desc: p.excerpt || '', link, slug: p.slug };
        }));
      })
      .catch(() => setCourses([]));
  }, []);
  return courses;
}

function IslamicCourses() {
  const cmsCourses = useCmsCourses();
  const allCourses = cmsCourses && cmsCourses.length > 0 ? cmsCourses : COURSES;
  const loading = cmsCourses === null;
  window.COURSES = allCourses;
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Dakwah' }, { label: 'Islamic Courses' }]} eyebrow="Dakwah"
        title="Islamic Courses" sub="Structured learning for every stage of your journey — from your first Quran lesson to deeper study of fiqh, aqidah and Arabic." />

      <section className="section-tight" style={{ background: 'var(--body-bg, #f8f7f4)' }}>
        <div className="container">
          <div className="card" style={{ overflow: 'hidden' }}>
            <div className="hero-grid" style={{ alignItems: 'center', gap: 0 }}>
              <div style={{ padding: 'clamp(28px,4vw,48px)' }}>
                <Eyebrow color="mint">Featured Programme</Eyebrow>
                <h2 style={{ fontSize: 'var(--fs-h2)', margin: '10px 0 14px' }}>ADIL — Al-Islah Deen &amp; Integrated Learning</h2>
                <p style={{ color: 'var(--fg2)', marginBottom: 24, maxWidth: 520 }}>
                  A comprehensive 2-year Islamic studies curriculum covering aqidah, fiqh, tafsir, sirah and more — taught in English and Malay via weekly Zoom sessions. Suitable for working adults at all levels.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 28 }}>
                  {[['calendar', 'Every Friday, 7:45–9:45 PM'], ['video', 'Live via Zoom'], ['book', '2-Year Curriculum'], ['globe', 'English & Malay']].map(([ic, lbl]) => (
                    <span key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 'var(--fs-small)', color: 'var(--fg2)' }}>
                      <Icon name={ic} size={16} />{lbl}
                    </span>
                  ))}
                </div>
                <a className="btn btn-primary" href="https://tinyurl.com/AdilAYIslah" target="_blank" rel="noopener">
                  <Icon name="external-link" size={16} className="ico" />Enrol in ADIL
                </a>
              </div>
              <div style={{ minHeight: 280 }}>
                <Img id="adil-prog" ph="ADIL Islamic studies programme" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="All Programmes" title="Other learning opportunities" />
          {loading ? (
            <div className="grid grid-3" style={{ marginTop: 36 }}>
              {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-3" style={{ marginTop: 36 }}>
              {allCourses.map((c) => (
                <a key={c.title} className="card card-hover"
                  href={c.link && !c.link.startsWith('#') ? c.link : '/learn/course-registration'}
                  onClick={c.link && !c.link.startsWith('#') && !c.link.startsWith('http') ? (e) => navTo(c.link, e) : undefined}
                  style={{ display: 'block' }}>
                  <div className="media-16x9">
                    {c.cover ? <img src={c.cover} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Img id={c.img} ph={c.title} />}
                  </div>
                  <div className="card-body">
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                      <span className="chip">{c.level}</span><span className="chip slate">{c.dur}</span>
                    </div>
                    <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 10 }}>{c.title}</h3>
                    <p style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)', marginBottom: 18 }}>{c.desc}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'var(--fw-bold)', color: 'var(--ink)' }}>{c.fee}</span>
                      <span className="btn btn-outline btn-sm">Learn more</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
}
/* ---- Reusable programme template for Quran/Solat & one-on-one pages ---- */
function ProgrammePage({ trail, eyebrow, title, sub, img, intro, details, points, faqs, ctaLabel = 'Register your interest', ctaTo = '/learn/course-registration' }) {
  return (
    <React.Fragment>
      <PageHero trail={trail} eyebrow={eyebrow} title={title} sub={sub} />
      <section className="section">
        <div className="container">
          <div className="hero-grid" style={{ alignItems: 'start' }}>
            <div>
              <div className="arch-sm" style={{ marginBottom: 28 }}><div className="media-16x9"><Img id={img} ph={title} /></div></div>
              <Eyebrow>Overview</Eyebrow>
              <div className="prose lead">{intro.map((p, i) => <p key={i}>{p}</p>)}</div>
              {points && (
                <div style={{ marginTop: 28 }}>
                  {points.map((pt, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
                      <span style={{ color: 'var(--mint-600)', flexShrink: 0, marginTop: 2 }}><Icon name="check-circle" size={20} /></span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}
              {faqs && <div style={{ marginTop: 40 }}><Eyebrow>Common questions</Eyebrow><Accordion items={faqs} /></div>}
            </div>
            <div className="card card-body" style={{ padding: 32, position: 'sticky', top: 96 }}>
              <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 14 }}>Programme details</h3>
              {details.map(([ic, l, v]) => (
                <div className="info-row" key={l}>
                  <div className="info-ico"><Icon name={ic} size={18} /></div>
                  <div><div className="lbl">{l}</div><div className="val">{v}</div></div>
                </div>
              ))}
              <Btn to={ctaTo} icon="arrow-right">{ctaLabel}</Btn>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

const Tadarrus = () => <ProgrammePage
  trail={[{ label: 'Dakwah' }, { label: 'Tadarrus Al-Quran' }]} eyebrow="Dakwah" title="Tadarrus Al-Quran"
  sub="A communal reading of the Quran where members recite together and complete the mushaf as one congregation."
  img="tadarrus"
  intro={['Tadarrus Al-Quran is a cherished gathering where the community comes together to recite, listen and complete the reading of the Quran collectively — especially treasured during the blessed month of Ramadan.', 'Sessions are guided so that members at every level can participate, correct their recitation, and earn the rewards of reciting in congregation.']}
  points={['Open to all ages and reading levels', 'Guided correction by qualified readers', 'Special intensive sessions during Ramadan', 'Mushaf provided on site']}
  details={[['calendar', 'Schedule', 'Daily after Maghrib'], ['map-pin', 'Venue', 'Main Prayer Hall'], ['users', 'For', 'All members'], ['credit-card', 'Fee', 'Free']]}
/>;

const QuranSolatPhysical = () => <ProgrammePage
  trail={[{ label: 'Dakwah' }, { label: 'Quran & Solat — Physical' }]} eyebrow="Dakwah" title="Quran & Solat Physical Classes"
  sub="In-person classes teaching correct Quran recitation and the practice of solat, held at the mosque."
  img="qs-physical"
  intro={['Our physical Quran & Solat classes provide hands-on, in-person learning for those who wish to read the Quran correctly and perfect their prayer.', 'Small class sizes ensure every learner receives personal attention from our experienced instructors.']}
  points={['Beginner to intermediate tracks', 'Separate classes for brothers and sisters', 'Practical solat coaching', 'Certificate on completion']}
  details={[['calendar', 'Schedule', 'Sat & Sun, 10am–12pm'], ['map-pin', 'Venue', 'Classrooms 1 & 2'], ['clock', 'Duration', '10 weeks'], ['credit-card', 'Fee', '$100 / term']]}
/>;

const QuranSolatOnline = () => <ProgrammePage
  trail={[{ label: 'Dakwah' }, { label: 'Quran & Solat — Online' }]} eyebrow="Dakwah" title="Quran & Solat Online Classes"
  sub="Learn Quran recitation and solat from home, live over Zoom with our qualified instructors."
  img="qs-online"
  intro={['Can\u2019t make it to the mosque? Our online Quran & Solat classes bring the same structured curriculum to you live over Zoom, wherever you are.', 'Interactive sessions let you recite, ask questions and receive corrections in real time.']}
  points={['Live, interactive Zoom sessions', 'Recordings shared with participants', 'Flexible evening timeslots', 'Suitable for working adults']}
  details={[['video', 'Format', 'Live via Zoom'], ['calendar', 'Schedule', 'Tue & Thu, 8:30pm'], ['clock', 'Duration', '10 weeks'], ['credit-card', 'Fee', '$80 / term']]}
  ctaLabel="Register for online class"
/>;

const OneOnOne = () => <ProgrammePage
  trail={[{ label: 'Dakwah' }, { label: 'One-on-One Quranic Learning' }]} eyebrow="Dakwah" title="One-on-One Quranic Learning via Zoom"
  sub="Personalised, private Quran lessons over Zoom, paced entirely around you and your goals."
  img="one-on-one"
  intro={['Our one-on-one Quranic learning offers fully personalised attention — ideal for learners who prefer privacy, have specific goals, or need a flexible schedule.', 'You\u2019ll be paired with a dedicated instructor who tailors each session to your level, from basic reading to advanced tajweed and memorisation.']}
  points={['Fully personalised curriculum', 'Choose your own timeslot', 'Available for adults and children', 'Progress tracked session to session']}
  details={[['video', 'Format', 'Private, via Zoom'], ['clock', 'Session', '45 minutes'], ['calendar', 'Schedule', 'By appointment'], ['credit-card', 'Fee', 'From $30 / session']]}
  ctaLabel="Book a session"
/>;

window.ROUTES = Object.assign(window.ROUTES || {}, {
  '/dakwah/events': UpcomingEvents,
  '/dakwah/events/:id': EventDetail,
  '/dakwah/lectures': DailyLectures,
  '/dakwah/courses': IslamicCourses,
  '/dakwah/tadarrus': Tadarrus,
  '/dakwah/quran-solat-physical': QuranSolatPhysical,
  '/dakwah/quran-solat-online': QuranSolatOnline,
  '/dakwah/one-on-one': OneOnOne,
});
Object.assign(window, { EVENTS, COURSES, ProgrammePage, EventGridCard });
