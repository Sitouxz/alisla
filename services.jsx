/* ============================================================
   Al-Islah Redesign — Services, Volunteer, Payment, Donations,
   Login, Contact
   ============================================================ */

/* ---------- Reusable booking form ---------- */
function BookingForm({ title, fields, successMsg }) {
  const [form, setForm] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const onCh = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  if (sent) return <div className="success-banner"><Icon name="check-circle" size={22} />{successMsg}</div>;
  return (
    <React.Fragment>
      <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: 6 }}>{title}</h3>
      <p className="text-muted" style={{ fontSize: 'var(--fs-small)', marginBottom: 24 }}>Submit a request and our office will confirm availability with you.</p>
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <div className="form-grid">
          {fields.map((f) => <Field key={f.name} {...f} value={form[f.name] || ''} onChange={onCh} />)}
        </div>
        <div style={{ marginTop: 24 }}><Btn type="submit" icon="arrow-right">Submit request</Btn></div>
      </form>
    </React.Fragment>
  );
}

function ServicePage({ trail, eyebrow, title, sub, img, ic, intro, points, details, form }) {
  return (
    <React.Fragment>
      <PageHero trail={trail} eyebrow={eyebrow} title={title} sub={sub} />
      <section className="section">
        <div className="container">
          <div className="hero-grid" style={{ alignItems: 'start' }}>
            <div>
              <div className="arch-sm" style={{ marginBottom: 28 }}><div className="media-16x9"><Img id={img} ph={title} /></div></div>
              <Eyebrow>About this service</Eyebrow>
              <div className="prose lead">{intro.map((p, i) => <p key={i}>{p}</p>)}</div>
              <div style={{ marginTop: 28 }}>
                {points.map((pt) => (
                  <div key={pt} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
                    <span style={{ color: 'var(--mint-600)', flexShrink: 0, marginTop: 2 }}><Icon name="check-circle" size={20} /></span><span>{pt}</span>
                  </div>
                ))}
              </div>
              <div className="card card-body" style={{ marginTop: 28, background: 'var(--bg-alt)', border: 'none' }}>
                {details.map(([dic, l, v]) => (
                  <div className="info-row" key={l}><div className="info-ico"><Icon name={dic} size={18} /></div><div><div className="lbl">{l}</div><div className="val">{v}</div></div></div>
                ))}
              </div>
            </div>
            <div className="card card-body" style={{ padding: 36, position: 'sticky', top: 96 }}>{form}</div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

const WEDDING_PACKAGES = [
  {
    id: 'pkg-a', name: 'Package A — Solemnisation Only', price: '$500',
    breakdown: 'Rental $300 · Cleaning & Admin $100 · Security Deposit $100 (refundable)',
    duration: '2 hours (10am – 12pm)', capacity: 'Close family & witnesses',
    includes: ['Main Prayer Hall for solemnisation','Wedding couple seat & 2 round cushions','1 wireless microphone','15 chairs','Non-Iktikaf solemnisation area'],
  },
  {
    id: 'pkg-b', name: 'Package B — Full Wedding & Reception', price: '$2,200',
    breakdown: 'Rental $1,500 · Cleaning & Admin $200 · Security Deposit $200 (refundable) · Decoration setup $300',
    duration: '5 hours (10am – 3pm)', capacity: '500–600 guests',
    includes: ['Everything in Package A','Air-conditioned multipurpose room','Air-conditioned changing room','Half-basement carpark for dining','Foyer for welcoming area','2 basement parking lots','Decoration setup slot (day before, 7pm–10pm)'],
  },
];
const CANCEL_POLICY = [
  { when: '6+ months before', refund: '100% refund (minus $50/$100 admin fee)' },
  { when: '3–6 months before', refund: '50% refund + partial deposit' },
  { when: 'Less than 3 months', refund: '30% refund only' },
  { when: 'Less than 1 month', refund: 'Non-refundable' },
];
function Wedding() {
  const [pkg, setPkg] = React.useState('pkg-a');
  const [form, setForm] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const onCh = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const selected = WEDDING_PACKAGES.find((p) => p.id === pkg);
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Services' }, { label: 'Wedding (Nikah)' }]} eyebrow="Services"
        title="Wedding (Nikah)" sub="Begin your marriage in the blessing of the mosque. Al-Islah offers solemnisation and full reception packages." />
      <section className="section"><div className="container"><div className="hero-grid" style={{ alignItems: 'start' }}>
        {/* Left */}
        <div>
          <div className="arch-sm" style={{ marginBottom: 28 }}><div className="media-16x9"><Img id="wedding" ph="Nikah at Masjid Al-Islah" /></div></div>
          <Eyebrow>Choose your package</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16, marginBottom: 32 }}>
            {WEDDING_PACKAGES.map((p) => (
              <div key={p.id} onClick={() => setPkg(p.id)} style={{ border: '2px solid ' + (pkg === p.id ? 'var(--coral)' : 'var(--border)'), borderRadius: 'var(--r-lg)', padding: 20, cursor: 'pointer', background: pkg === p.id ? 'var(--coral-100)' : '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 'var(--fw-bold)' }}>{p.name}</span>
                  <span style={{ fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-h3)', color: 'var(--coral)' }}>{p.price}</span>
                </div>
                <div style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)', marginBottom: 6 }}>{p.duration} · {p.capacity}</div>
                <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--fg3)' }}>{p.breakdown}</div>
                {pkg === p.id && <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {p.includes.map((item) => <li key={item} style={{ display: 'flex', gap: 10, fontSize: 'var(--fs-small)' }}><span style={{ color: 'var(--mint-600)', flexShrink: 0 }}><Icon name="check-circle" size={16} /></span>{item}</li>)}
                </ul>}
              </div>
            ))}
          </div>
          <Eyebrow>Important requirements</Eyebrow>
          <div className="card card-body" style={{ marginTop: 16, marginBottom: 28 }}>
            {[
              { ok: false, t: 'No music, kompang or hadra', d: 'Emcee/host permitted at minimal volume. Karaoke prohibited.' },
              { ok: true,  t: 'Modest & decent attire required', d: 'No footwear in mosque area. No smoking on premises.' },
              { ok: true,  t: 'Catering: disposable cutlery only', d: 'No on-site cooking or washing. Buffet setup within booking timeframe.' },
              { ok: true,  t: 'PayNow payment required', d: 'UEN: T13MQ0001J · Include your name in PayNow remarks · Send screenshot to office.' },
            ].map((r) => <div className="info-row" key={r.t}>
              <div className="info-ico" style={{ color: r.ok ? 'var(--mint-600)' : 'var(--coral)' }}><Icon name={r.ok ? 'check-circle' : 'x'} size={18} /></div>
              <div><div className="val">{r.t}</div><div style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)' }}>{r.d}</div></div>
            </div>)}
          </div>
          <Eyebrow>Cancellation policy</Eyebrow>
          <div className="card card-body" style={{ marginTop: 16, padding: 8 }}>
            {CANCEL_POLICY.map((c) => <div key={c.when} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 12px', borderBottom: '1px solid var(--border)', fontSize: 'var(--fs-small)' }}>
              <span style={{ fontWeight: 'var(--fw-semibold)' }}>{c.when}</span>
              <span style={{ color: 'var(--fg3)' }}>{c.refund}</span>
            </div>)}
          </div>
        </div>
        {/* Right: booking form */}
        <div className="card card-body" style={{ padding: 36, position: 'sticky', top: 96 }}>
          {sent ? <div className="success-banner"><Icon name="check-circle" size={22} />Booking request received. Our office will contact you. Barakallahu lakuma!</div> : (
            <React.Fragment>
              <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: 4 }}>Request a booking</h3>
              <p style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)', marginBottom: 22 }}>Selected: <strong>{selected.name}</strong> ({selected.price})</p>
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="form-grid">
                  <Field label="Groom’s full name" name="groom" required value={form.groom||''} onChange={onCh} placeholder="Full name as per IC" />
                  <Field label="Bride’s full name" name="bride" required value={form.bride||''} onChange={onCh} placeholder="Full name as per IC" />
                  <Field label="Contact email" name="email" type="email" required full value={form.email||''} onChange={onCh} placeholder="you@example.com" />
                  <Field label="Mobile" name="phone" required value={form.phone||''} onChange={onCh} placeholder="+65" />
                  <Field label="Preferred date" name="date" type="date" value={form.date||''} onChange={onCh} />
                  <Field label="Package" type="select" name="pkg" value={pkg} onChange={(e) => setPkg(e.target.value)} options={WEDDING_PACKAGES.map((p) => p.name)} />
                  <Field label="Notes / special requests" name="notes" type="textarea" full value={form.notes||''} onChange={onCh} placeholder="Guest count, accessibility needs…" />
                </div>
                <div className="card card-body" style={{ background:'var(--bg-alt)', border:'none', marginTop:20, marginBottom:20, fontSize:'var(--fs-small)' }}>
                  <strong>Payment via PayNow</strong><br/><span style={{ color:'var(--fg3)' }}>UEN: T13MQ0001J · Include full name in remarks · Email screenshot to admin@alislah.sg</span>
                </div>
                <Btn type="submit" icon="arrow-right">Submit booking request</Btn>
              </form>
            </React.Fragment>
          )}
        </div>
      </div></div></section>
    </React.Fragment>
  );
}
// Legacy alias kept so old JSX ref still resolves
const _WeddingUnused = () => <ServicePage
  trail={[{ label: 'Services' }, { label: 'Wedding (Nikah)' }]} eyebrow="Services" title="Wedding (Nikah)"
  sub="Begin your marriage in the blessing of the mosque."
  img="wedding" intro={[]} points={[]} details={[]}
  form={<BookingForm title="Request a nikah booking"
    successMsg="Your nikah request has been received. Our office will contact you to confirm. Barakallahu lakuma!"
    fields={[
      { label: 'Groom\u2019s name', name: 'groom', required: true, placeholder: 'Full name' },
      { label: 'Bride\u2019s name', name: 'bride', required: true, placeholder: 'Full name' },
      { label: 'Contact email', name: 'email', type: 'email', required: true, full: true, placeholder: 'you@example.com' },
      { label: 'Mobile', name: 'phone', required: true, placeholder: '+65' },
      { label: 'Preferred date', name: 'date', type: 'date' },
      { label: 'Notes', name: 'notes', type: 'textarea', full: true, placeholder: 'Number of guests, special requests…' },
    ]} />}
/>;

const Tahnik = () => <ServicePage
  trail={[{ label: 'Services' }, { label: 'Tahnik' }]} eyebrow="Services" title="Tahnik"
  sub="Welcome your newborn into the world with the blessed sunnah of tahnik, performed by our asatizah."
  img="tahnik"
  intro={['Tahnik is the beautiful sunnah of softening a date and gently placing it on a newborn\u2019s palate, accompanied by du\u2019a for the child.', 'Al-Islah offers a warm, simple tahnik service for families welcoming a new baby — a lovely way to begin your child\u2019s life with barakah.']}
  points={['Performed by our asatizah', 'Du\u2019a and blessings for the newborn', 'A keepsake certificate for the family', 'By appointment, at the mosque or arranged']}
  details={[['baby', 'For', 'Newborns'], ['clock', 'Duration', '~30 minutes'], ['calendar', 'Booking', 'By appointment'], ['credit-card', 'Fee', 'By donation']]}
  form={<BookingForm title="Request tahnik"
    successMsg="Your tahnik request has been received — congratulations on your new baby! We'll be in touch shortly."
    fields={[
      { label: 'Parent\u2019s name', name: 'parent', required: true, full: true, placeholder: 'Full name' },
      { label: 'Email', name: 'email', type: 'email', required: true, placeholder: 'you@example.com' },
      { label: 'Mobile', name: 'phone', required: true, placeholder: '+65' },
      { label: 'Baby\u2019s date of birth', name: 'dob', type: 'date' },
      { label: 'Preferred date', name: 'date', type: 'date' },
      { label: 'Notes', name: 'notes', type: 'textarea', full: true, placeholder: 'Anything we should know?' },
    ]} />}
/>;

/* ---------- Volunteer ---------- */
function BeAVolunteer() {
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', area: '', avail: '', why: '' });
  const [sent, setSent] = React.useState(false);
  const onCh = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const areas = [
    { ic: 'hand-helping', t: 'Welfare & Outreach', d: 'Pack and distribute aid, befriend seniors.' },
    { ic: 'book', t: 'Education', d: 'Assist in classes and learning programmes.' },
    { ic: 'sparkles', t: 'Youth & Events', d: 'Help run youth nights and community events.' },
    { ic: 'building', t: 'Operations', d: 'Support the smooth running of the mosque.' },
  ];
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Volunteer' }, { label: 'Be a Volunteer' }]} eyebrow="Volunteer" tone="coral"
        title="Be a Volunteer" sub="Your time is a gift. Join 300+ volunteers serving the Al-Islah community with care and excellence." />
      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="Where you can serve" title="Find your role" />
          <div className="grid grid-4" style={{ margin: '40px 0 56px' }}>
            {areas.map((a) => (
              <div key={a.t} className="card card-body" style={{ padding: 26, textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--coral-100)', color: 'var(--coral)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}><Icon name={a.ic} size={26} /></div>
                <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 8 }}>{a.t}</h3>
                <p style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)' }}>{a.d}</p>
              </div>
            ))}
          </div>
          <div className="card card-body" style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(28px,4vw,44px)' }}>
            {sent ? (
              <div className="success-banner"><Icon name="check-circle" size={22} />Jazakallah khair for stepping forward! Our volunteer team will reach out about onboarding.</div>
            ) : (
              <React.Fragment>
                <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: 6 }}>Sign up to volunteer</h3>
                <p className="text-muted" style={{ fontSize: 'var(--fs-small)', marginBottom: 24 }}>Tell us a little about yourself and how you'd like to help.</p>
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div className="form-grid">
                    <Field label="Full name" name="name" required value={form.name} onChange={onCh} placeholder="Your name" />
                    <Field label="Email" type="email" name="email" required value={form.email} onChange={onCh} placeholder="you@example.com" />
                    <Field label="Mobile" name="phone" required value={form.phone} onChange={onCh} placeholder="+65" />
                    <Field label="Preferred area" type="select" name="area" value={form.area} onChange={onCh} options={areas.map((a) => a.t)} placeholder="Select an area" />
                    <Field label="Availability" type="select" name="avail" value={form.avail} onChange={onCh} options={['Weekday mornings', 'Weekday evenings', 'Weekends', 'Flexible']} placeholder="When are you free?" />
                    <Field label="During Ramadan?" type="select" name="ramadan" value={form.ramadan || ''} onChange={onCh} options={['Yes', 'No', 'Maybe']} placeholder="Available in Ramadan?" />
                    <Field full label="Why do you want to volunteer?" type="textarea" name="why" value={form.why} onChange={onCh} placeholder="Optional" />
                  </div>
                  <div style={{ marginTop: 24 }}><Btn type="submit" icon="hand-helping">Sign me up</Btn></div>
                </form>
              </React.Fragment>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

const VOL_EVENTS = [
  { t: 'Ramadan Iftar Crew', date: 'Throughout Ramadan', slots: '12 slots / night', img: 've1', tag: 'Welfare' },
  { t: 'Food Pack Distribution', date: 'Sat, 14 Jun · 9am', slots: '20 volunteers', img: 've2', tag: 'Welfare' },
  { t: 'Youth Carnival Helpers', date: 'Sun, 29 Jun · 8am', slots: '30 volunteers', img: 've3', tag: 'Events' },
  { t: 'Mosque Spring Clean', date: 'Sat, 5 Jul · 8am', slots: '40 volunteers', img: 've4', tag: 'Operations' },
];
function VolunteeringEvents() {
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Volunteer' }, { label: 'Volunteering Events' }]} eyebrow="Volunteer"
        title="Volunteering Events" sub="Upcoming opportunities to roll up your sleeves and make a difference. Sign up for a slot below." />
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {VOL_EVENTS.map((v) => (
              <div key={v.t} className="card card-hover">
                <div className="hero-grid" style={{ gap: 0, gridTemplateColumns: '0.8fr 1.2fr', alignItems: 'stretch' }}>
                  <div className="media-1x1" style={{ minHeight: 180 }}><Img id={v.img} ph={v.t} /></div>
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span className="chip" style={{ alignSelf: 'flex-start', marginBottom: 12 }}>{v.tag}</span>
                    <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 12 }}>{v.t}</h3>
                    <div style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="calendar" size={15} />{v.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="users" size={15} />{v.slots}</span>
                    </div>
                    <a className="btn btn-outline btn-sm" href="#/volunteer/be-a-volunteer" style={{ alignSelf: 'flex-start' }}>Sign up</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

/* ---------- Payment ---------- */
function PaymentOverview() {
  const types = [
    { ic: 'book', t: 'Course & Class Fees', d: 'Pay for Quran classes, Islamic courses and programmes.', to: '/payment/fee-payment' },
    { ic: 'rings', t: 'Service Fees', d: 'Settle fees for nikah, facility bookings and more.', to: '/payment/fee-payment' },
    { ic: 'heart', t: 'Donations & Infaq', d: 'Make a one-off or recurring contribution to the mosque.', to: '/donations' },
  ];
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Payment' }]} eyebrow="Payment" title="Payments" sub="Securely settle your fees and contributions to Masjid Al-Islah online." />
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {types.map((t) => (
              <a key={t.t} className="card card-hover card-body" href={'#' + t.to} style={{ padding: 32 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--coral-100)', color: 'var(--coral)', display: 'grid', placeItems: 'center', marginBottom: 18 }}><Icon name={t.ic} size={26} /></div>
                <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 8 }}>{t.t}</h3>
                <p style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)' }}>{t.d}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function PaymentForm({ heading, sub, trail }) {
  const [form, setForm] = React.useState({ type: '', ref: '', amount: '', name: '', email: '', card: '', exp: '', cvv: '' });
  const [sent, setSent] = React.useState(false);
  const onCh = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <React.Fragment>
      <PageHero trail={trail} eyebrow="Payment" title={heading} sub={sub} />
      <section className="section">
        <div className="container-narrow">
          {sent ? (
            <div className="card card-body" style={{ padding: 48, textAlign: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--mint-100)', color: 'var(--mint-600)', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}><Icon name="check-circle" size={36} /></div>
              <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: 10 }}>Payment successful</h2>
              <p className="lead" style={{ marginBottom: 8 }}>Thank you, {form.name || 'friend'}. A receipt has been sent to your email.</p>
              <p className="text-muted" style={{ fontSize: 'var(--fs-small)' }}>Reference: AIM-{Math.floor(100000 + Math.random() * 900000)}</p>
              <div style={{ marginTop: 28 }}><Btn to="/" variant="outline">Back to home</Btn></div>
            </div>
          ) : (
            <form className="card card-body" style={{ padding: 'clamp(28px,4vw,44px)' }} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: 20 }}>Payment details</h3>
              <div className="form-grid">
                <Field label="Fee type" type="select" name="type" required value={form.type} onChange={onCh} options={['Course / Class Fee', 'Nikah / Service Fee', 'Facility Booking', 'Other']} placeholder="Select fee type" />
                <Field label="Reference / Invoice no." name="ref" value={form.ref} onChange={onCh} placeholder="Optional" />
                <Field full label="Amount (SGD)" name="amount" required value={form.amount} onChange={onCh} placeholder="$0.00" />
              </div>
              <hr className="divider" style={{ margin: '28px 0' }} />
              <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 18 }}>Payer & card</h3>
              <div className="form-grid">
                <Field label="Full name" name="name" required value={form.name} onChange={onCh} placeholder="Name on card" />
                <Field label="Email" type="email" name="email" required value={form.email} onChange={onCh} placeholder="For your receipt" />
                <Field full label="Card number" name="card" required value={form.card} onChange={onCh} placeholder="4242 4242 4242 4242" />
                <Field label="Expiry" name="exp" value={form.exp} onChange={onCh} placeholder="MM / YY" />
                <Field label="CVV" name="cvv" value={form.cvv} onChange={onCh} placeholder="123" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '20px 0', color: 'var(--fg3)', fontSize: 'var(--fs-small)' }}>
                <Icon name="lock" size={16} />Payments are encrypted and secure. This is a demo form.
              </div>
              <Btn type="submit" icon="credit-card" size="lg">Pay {form.amount || 'now'}</Btn>
            </form>
          )}
        </div>
      </section>
    </React.Fragment>
  );
}
const FEE_COURSES = [
  // AQSA Clinic Quran
  { label: 'AQSA Clinic Quran — Basic', price: 40 },
  { label: 'AQSA Clinic Quran — Intermediate', price: 50 },
  // Islamic Services
  { label: 'Tahnik Service', price: 150 },
  // Community
  { label: 'Basic Sign Language Course', price: 95 },
  // ADIL Programme
  { label: 'ADIL — Ulum Al-Quran Module', price: 80 },
  { label: 'ADIL — Fiqh Module', price: 80 },
  { label: 'ADIL — Sirah Module', price: 80 },
  { label: 'ADIL — Aqidah Module', price: 80 },
  { label: 'ADIL — Full Academic Year (English)', price: 320 },
  { label: 'ADIL — Full Academic Year (Malay)', price: 320 },
  // Quran & Solat
  { label: 'Quran & Solat — Physical Classes (per term)', price: 100 },
  { label: 'Quran & Solat — Online Classes (per term)', price: 80 },
  { label: 'One-on-One Quranic Learning (per session)', price: 30 },
  { label: 'Quran Reading — Beginner Iqra (8 weeks)', price: 80 },
  { label: 'Tajweed Intermediate (10 weeks)', price: 100 },
  { label: 'Aqidah & Fiqh Foundations (12 weeks)', price: 120 },
  { label: 'Sirah of the Prophet (8 weeks)', price: 80 },
  { label: 'Arabic Language Level 1 (12 weeks)', price: 140 },
  // Grief Counseling
  { label: 'Grief Counselling Programme', price: 50 },
  // Arabic Calligraphy
  { label: 'Arabic Calligraphy Course', price: 120 },
  // Events
  { label: 'Warkah Cinta Pertama — Event Ticket', price: 15 },
  { label: 'Al-Islah Family Carnival — Ticket', price: 5 },
  // Marriage Prep
  { label: 'Cinta Abadi — Marriage Preparation Course', price: 200 },
  // Facility
  { label: 'Nikah Venue — Package A', price: 500 },
  { label: 'Nikah Venue — Package B', price: 2200 },
  // Other
  { label: 'Other / Custom amount', price: 0 },
];

function FeePayment() {
  const [form, setForm] = React.useState({ payee: '', contact: '', student: '', email: '', course: '', custom: '' });
  const [sent, setSent] = React.useState(false);
  const onCh = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const selected = FEE_COURSES.find((c) => c.label === form.course);
  const total = selected ? (selected.price === 0 ? (parseFloat(form.custom) || 0) : selected.price) : 0;
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Payment', to: '/payment' }, { label: 'Fee Payment' }]} eyebrow="Payment"
        title="Fee Payment" sub="Pay for courses, classes, services and events at Masjid Al-Islah." />
      <section className="section"><div className="container-narrow">
        {sent ? (
          <div className="card card-body" style={{ padding: 48, textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--mint-100)', color: 'var(--mint-600)', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}><Icon name="check-circle" size={36} /></div>
            <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: 10 }}>Thank you!</h2>
            <p className="lead" style={{ marginBottom: 8 }}>Your payment details have been submitted. Our office will confirm receipt.</p>
            <div style={{ marginTop: 28 }}><Btn to="/" variant="outline">Back to home</Btn></div>
          </div>
        ) : (
          <form className="card card-body" style={{ padding: 'clamp(28px,4vw,44px)' }} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: 20 }}>Payment details</h3>
            <div className="form-grid">
              <Field label="Name of payee" name="payee" required value={form.payee} onChange={onCh} placeholder="Your full name" />
              <Field label="Contact number" name="contact" required value={form.contact} onChange={onCh} placeholder="+65" />
              <Field label="Student / participant name" name="student" required full value={form.student} onChange={onCh} placeholder="Name of participant (if different)" />
              <Field label="Email" type="email" name="email" required full value={form.email} onChange={onCh} placeholder="For confirmation email" />
              <Field label="Course / Programme / Event" type="select" name="course" required full value={form.course} onChange={onCh}
                options={FEE_COURSES.map((c) => c.label)} placeholder="Select a course or service…" />
              {selected && selected.price === 0 && (
                <Field label="Amount (SGD)" name="custom" required full value={form.custom} onChange={onCh} placeholder="Enter amount" />
              )}
            </div>
            {total > 0 && (
              <div style={{ margin: '24px 0', padding: '18px 20px', background: 'var(--coral-100)', borderRadius: 'var(--r-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'var(--fw-semibold)' }}>Total due</span>
                <span style={{ fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-h3)', color: 'var(--coral)' }}>${total.toFixed(2)} SGD</span>
              </div>
            )}
            <div className="card card-body" style={{ background: 'var(--bg-alt)', border: 'none', marginBottom: 24 }}>
              <div style={{ fontWeight: 'var(--fw-semibold)', marginBottom: 8 }}>Pay via PayNow</div>
              <div style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)', lineHeight: 1.7 }}>
                UEN: <strong>T13MQ0001J</strong><br />
                Include your <strong>full name and course name</strong> in the PayNow remarks.<br />
                After payment, submit this form — our office will verify and send a confirmation.
              </div>
            </div>
            <Btn type="submit" icon="check">Submit payment confirmation</Btn>
          </form>
        )}
      </div></section>
    </React.Fragment>
  );
}

/* ---------- Donations ---------- */
const DONATION_CAMPAIGNS = [
  {
    id: 'bih',
    title: 'Blessings in Harmony 2026',
    sub: 'Support food packages, weekly lunches & school necessities for 2,000+ families, 250 individuals & 200 students.',
    icon: 'gift',
    color: 'coral',
    presets: [60, 120, 180, 300],
    sponsorNote: '$60 = Full family sponsorship',
  },
  {
    id: 'tahlil',
    title: 'Tahlil & Doa Selamat',
    sub: 'Recitation of Surah Yasin every Thursday for your personal intentions or the souls of your loved ones.',
    icon: 'star',
    color: 'pink',
    presets: [10, 20, 50, 100],
    sponsorNote: 'Select your dedication below',
  },
  {
    id: 'infaq',
    title: 'Infaq Friday',
    sub: 'Weekly donations on Fridays directed to mosque operations — keeping the house of Allah open and welcoming.',
    icon: 'building',
    color: 'mint',
    presets: [5, 10, 25, 50],
    sponsorNote: 'Every Friday contribution counts',
  },
];

function Donations() {
  const [campaign, setCampaign] = React.useState('bih');
  const [amount, setAmount] = React.useState(null);
  const [custom, setCustom] = React.useState('');
  const [intention, setIntention] = React.useState('');
  const [name, setName] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const camp = DONATION_CAMPAIGNS.find((c) => c.id === campaign);
  const finalAmount = custom ? Number(custom) : (amount || 0);
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Donations' }]} eyebrow="Infaq · Sadaqah" tone="coral" title="Support Al-Islah Mosque"
        sub='"Charity does not decrease wealth." — Prophet Muhammad ☷' />
      <section className="section"><div className="container">
        <div className="hero-grid" style={{ alignItems: 'start' }}>
          {/* Left: campaign selector + amount */}
          <div className="card card-body" style={{ padding: 'clamp(28px,4vw,40px)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--coral-100)', color: 'var(--coral)', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}><Icon name="heart" size={34} fill="currentColor" strokeWidth={0} /></div>
                <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: 10 }}>Jazakallah khair!</h2>
                <p className="lead">May Allah accept your {camp.title} contribution of ${finalAmount} and multiply it manifold.</p>
                <div style={{ marginTop: 26 }}><Btn to="/" variant="outline">Back to home</Btn></div>
              </div>
            ) : (
              <React.Fragment>
                <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: 18 }}>Choose a cause</h3>
                {DONATION_CAMPAIGNS.map((c) => (
                  <div key={c.id} onClick={() => { setCampaign(c.id); setAmount(null); setCustom(''); }}
                    style={{ border: '2px solid ' + (campaign === c.id ? 'var(--coral)' : 'var(--border)'), borderRadius: 'var(--r-lg)', padding: '16px 18px', cursor: 'pointer', marginBottom: 12, background: campaign === c.id ? 'var(--coral-100)' : '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                      <span style={{ color: 'var(--coral)' }}><Icon name={c.icon} size={20} /></span>
                      <span style={{ fontWeight: 'var(--fw-bold)' }}>{c.title}</span>
                    </div>
                    <p style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)', margin: 0 }}>{c.sub}</p>
                  </div>
                ))}
                <div style={{ marginTop: 24, marginBottom: 8 }}>
                  <div style={{ fontSize: 'var(--fs-small)', fontWeight: 600, marginBottom: 12, color: 'var(--fg1)' }}>
                    {camp.sponsorNote}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 12 }}>
                    {camp.presets.map((p) => (
                      <button key={p} onClick={() => { setAmount(p); setCustom(''); }}
                        style={{ padding: '14px 0', borderRadius: 'var(--r-md)', border: '1.5px solid ' + (!custom && amount === p ? 'var(--coral)' : 'var(--border)'), background: !custom && amount === p ? 'var(--coral-100)' : '#fff', color: !custom && amount === p ? 'var(--coral-600)' : 'var(--fg1)', fontWeight: 700, cursor: 'pointer' }}>
                        ${p}
                      </button>
                    ))}
                  </div>
                  <div style={{ position: 'relative', marginBottom: 16 }}>
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg3)', fontWeight: 700 }}>$</span>
                    <input type="number" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Custom amount"
                      style={{ width: '100%', padding: '12px 14px 12px 28px', border: '1.5px solid ' + (custom ? 'var(--coral)' : 'var(--border)'), borderRadius: 'var(--r-md)', fontFamily: 'inherit', fontSize: 'var(--fs-body)' }} />
                  </div>
                  {campaign === 'tahlil' && (
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, marginBottom: 6 }}>Dedication / intention (optional)</label>
                      <input value={intention} onChange={(e) => setIntention(e.target.value)} placeholder="e.g. For the soul of Allahyarham Ahmad bin Ali"
                        style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-md)', fontFamily: 'inherit' }} />
                    </div>
                  )}
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, marginBottom: 6 }}>Your name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name"
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-md)', fontFamily: 'inherit' }} />
                  </div>
                </div>
                <div className="card card-body" style={{ background: 'var(--bg-alt)', border: 'none', marginBottom: 20 }}>
                  <div style={{ fontWeight: 'var(--fw-semibold)', marginBottom: 6 }}>Pay via PayNow</div>
                  <div style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)', lineHeight: 1.7 }}>
                    Scan the QR code or use UEN: <strong>T13MQ0001J</strong><br />
                    Include your name + "<strong>{camp.title}</strong>" in the remarks.<br />
                    After payment, click confirm below.
                  </div>
                  {/* PayNow QR placeholder — replace with real QR image from mosque */}
                  <div style={{ margin: '14px auto 0', width: 140, height: 140, background: 'var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--fs-caption)', color: 'var(--fg3)', textAlign: 'center', padding: 8 }}>
                    PayNow QR<br />UEN: T13MQ0001J
                  </div>
                </div>
                <Btn onClick={() => finalAmount > 0 && setSent(true)} size="lg" icon="heart">
                  Confirm donation · ${finalAmount || '—'}
                </Btn>
              </React.Fragment>
            )}
          </div>
          {/* Right: impact */}
          <div>
            <div className="arch-sm" style={{ marginBottom: 28 }}><div className="media-16x9"><Img id="donate-hero" ph="Mosque community" /></div></div>
            <Eyebrow color="pink">Where your gift goes</Eyebrow>
            <div style={{ marginTop: 8 }}>
              {[
                ['gift', 'Blessings in Harmony', 'Food packs, weekly lunches & school supplies for 2,000+ families across Punggol.'],
                ['star', 'Tahlil & Doa Selamat', 'Surah Yasin recited every Thursday for your intentions and loved ones.'],
                ['building', 'Infaq Friday', 'Sustaining mosque operations, maintenance and daily programmes.'],
              ].map(([ic, t, d]) => (
                <div className="info-row" key={t}><div className="info-ico"><Icon name={ic} size={18} /></div><div><div className="val">{t}</div><div style={{ fontSize: 'var(--fs-small)', color: 'var(--fg3)' }}>{d}</div></div></div>
              ))}
            </div>
            <div className="card card-body" style={{ marginTop: 24, background: 'var(--ink)', color: '#fff', border: 'none' }}>
              <span className="quote-mark">"</span>
              <p style={{ color: '#fff', fontStyle: 'italic', marginTop: -10 }}>The believer's shade on the Day of Resurrection will be his charity.</p>
              <p style={{ fontSize: 'var(--fs-small)', marginTop: 10, color: '#b6b6c0' }}>— Hadith, narrated by At-Tirmidhi</p>
            </div>
          </div>
        </div>
      </div></section>
    </React.Fragment>
  );
}

/* ---------- Login ---------- */
function Login() {
  const [mode, setMode] = React.useState('login');
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 460 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <a className="brand" href="#/" style={{ justifyContent: 'center', marginBottom: 18 }}>
            <span className="brand-mark">A</span>
            <span className="brand-text"><span className="brand-top">MASJID</span><span className="brand-bot">AL-ISLAH</span></span>
          </a>
          <h1 style={{ fontSize: 'var(--fs-h2)' }}>{mode === 'login' ? 'Welcome back' : 'Create an account'}</h1>
          <p className="text-muted" style={{ fontSize: 'var(--fs-small)', marginTop: 6 }}>{mode === 'login' ? 'Sign in to manage your registrations and giving.' : 'Join the Al-Islah member community.'}</p>
        </div>
        <div className="card card-body" style={{ padding: 36 }}>
          <div className="tabs" style={{ marginBottom: 24 }}>
            <div className={'tab' + (mode === 'login' ? ' active' : '')} onClick={() => setMode('login')}>Sign in</div>
            <div className={'tab' + (mode === 'register' ? ' active' : '')} onClick={() => setMode('register')}>Register</div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); window.location.hash = '/'; }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {mode === 'register' && <Field label="Full name" name="rname" placeholder="Your name" />}
              <Field label="Email" type="email" name="email" placeholder="you@example.com" />
              <Field label="Password" type="password" name="pw" placeholder="••••••••" />
              {mode === 'register' && <Field label="Confirm password" type="password" name="pw2" placeholder="••••••••" />}
              <Btn type="submit" size="lg">{mode === 'login' ? 'Sign in' : 'Create account'}</Btn>
            </div>
          </form>
          {mode === 'login' && <div style={{ textAlign: 'center', marginTop: 16 }}><a href="#/login" style={{ color: 'var(--link)', fontSize: 'var(--fs-small)' }}>Forgot password?</a></div>}
        </div>
        <p className="text-muted" style={{ textAlign: 'center', fontSize: 'var(--fs-small)', marginTop: 20 }}>
          Need help? <a href="#/contact" style={{ color: 'var(--link)' }}>Contact the office</a>
        </p>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [form, setForm] = React.useState({ name: '', email: '', subject: '', msg: '' });
  const [sent, setSent] = React.useState(false);
  const onCh = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <React.Fragment>
      <PageHero trail={[{ label: 'Contact' }]} eyebrow="Get in touch" title="Contact Al-Islah" sub="We'd love to hear from you. Visit us, call us, or send a message and we'll get back to you." />
      <section className="section">
        <div className="container">
          <div className="hero-grid" style={{ alignItems: 'start' }}>
            <div>
              <div className="card card-body" style={{ marginBottom: 24 }}>
                {[
                  { ic: 'map-pin', l: 'Address', v: '30 Punggol Field, Singapore 828812' },
                  { ic: 'phone', l: 'Telephone', v: '+65 6312 5174' },
                  { ic: 'printer', l: 'Fax', v: '+65 6312 4205' },
                  { ic: 'mail', l: 'Email', v: 'admin@alislah.sg' },
                  { ic: 'clock', l: 'Office hours', v: 'Mon–Sat 9am–7pm · Sun 9am–3pm' },
                ].map((r) => (
                  <div className="info-row" key={r.l}><div className="info-ico"><Icon name={r.ic} size={18} /></div><div><div className="lbl">{r.l}</div><div className="val">{r.v}</div></div></div>
                ))}
              </div>
              <div className="card" style={{ overflow: 'hidden' }}>
                <iframe className="map-embed" title="Map" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.625167843812!2d103.89930031509022!3d1.4012636989780363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da15e2a0beb193%3A0x2ca7aa0600b6f1be!2sMasjid%20Al-Islah!5e0!3m2!1sen!2ssg!4v1674035455814"></iframe>
              </div>
            </div>
            <div className="card card-body" style={{ padding: 'clamp(28px,4vw,40px)' }}>
              {sent ? (
                <div className="success-banner"><Icon name="check-circle" size={22} />Thank you — your message has been sent. We'll reply soon, insha'Allah.</div>
              ) : (
                <React.Fragment>
                  <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: 20 }}>Send a message</h3>
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      <Field label="Full name" name="name" required value={form.name} onChange={onCh} placeholder="Your name" />
                      <Field label="Email" type="email" name="email" required value={form.email} onChange={onCh} placeholder="you@example.com" />
                      <Field label="Subject" type="select" name="subject" value={form.subject} onChange={onCh} options={['General enquiry', 'Programmes & courses', 'Donations', 'Services (nikah, tahnik)', 'Volunteering', 'Feedback']} placeholder="What's this about?" />
                      <Field label="Message" type="textarea" name="msg" rows={5} required value={form.msg} onChange={onCh} placeholder="How can we help?" />
                      <Btn type="submit" icon="arrow-right">Send message</Btn>
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
  '/services/wedding': Wedding,
  '/services/tahnik': Tahnik,
  '/volunteer/be-a-volunteer': BeAVolunteer,
  '/volunteer/events': VolunteeringEvents,
  '/payment': PaymentOverview,
  '/payment/fee-payment': FeePayment,
  '/donations': Donations,
  '/login': Login,
  '/contact': Contact,
});
