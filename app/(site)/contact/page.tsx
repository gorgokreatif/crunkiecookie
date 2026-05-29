'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '../../../components/LangContext';
import Reveal from '../../../components/Reveal';

export default function ContactPage() {
  const { lang } = useLang();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const t = {
    de: {
      eye: 'Kontakt · Visit us', title: <>Lust auf <em>Crunkie?</em></>,
      sub: 'Besuche uns, entdecke unsere Cookies oder kontaktiere uns für Anfragen, Kooperationen und Events.',
      addr: 'Adresse', hours: 'Öffnungszeiten', email: 'E-Mail', social: 'Social',
      mf: 'Mo – Fr', ss: 'Sa – So',
      fEye: 'Schreib uns', fTitle: <>Eine Nachricht <em>genügt.</em></>,
      fText: 'Fragen, Wünsche, Kooperationen — wir antworten meist innerhalb von 24 Stunden.',
      name: 'Name', emailL: 'E-Mail', msg: 'Nachricht', send: 'Absenden',
      success: 'Danke! Deine Nachricht wurde vorbereitet. Wir melden uns bald.',
      mapOpen: 'In Karten öffnen →',
      vEye: '🌱 Vegan?', vTitle: <>Auch <em>vegan</em> erhältlich.</>,
      vText: 'Frag uns einfach nach unserer veganen Linie — auch vor Ort.',
      vCta: 'Vegane Cookies →',
    },
    en: {
      eye: 'Contact · Visit us', title: <>Ready for <em>Crunkie?</em></>,
      sub: 'Visit us, explore our cookies or contact us for inquiries, collaborations and events.',
      addr: 'Address', hours: 'Opening hours', email: 'Email', social: 'Social',
      mf: 'Mon – Fri', ss: 'Sat – Sun',
      fEye: 'Write to us', fTitle: <>One message is <em>enough.</em></>,
      fText: 'Questions, ideas, collaborations — we usually reply within 24 hours.',
      name: 'Name', emailL: 'Email', msg: 'Message', send: 'Send',
      success: 'Thank you! Your message has been prepared. We\'ll get back to you soon.',
      mapOpen: 'Open in maps →',
      vEye: '🌱 Vegan?', vTitle: <><em>Vegan</em> options too.</>,
      vText: 'Just ask for our vegan line — also on-site.',
      vCta: 'Vegan cookies →',
    },
  }[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      {/* HERO */}
      <section className="ct-hero">
        <div className="blob ct-hero__blob" />
        <div className="container ct-hero__grid">
          <div>
            <span className="eyebrow">{t.eye}</span>
            <Reveal tag="h1">{t.title}</Reveal>
            <Reveal delay={1} tag="p" className="lead">{t.sub}</Reveal>
            <Reveal delay={2} className="ct-hero__cookies">
              <Image src="/assets/cookie-oreo.png" alt="" width={140} height={140} className="float" />
              <Image src="/assets/cookie-pistachio.png" alt="" width={140} height={140} className="float-2" />
              <Image src="/assets/cookie-redflag.png" alt="" width={140} height={140} className="float-3" />
            </Reveal>
          </div>
          <Reveal delay={2} className="ct-info">
            <div className="ct-info__row">
              <span className="eyebrow eyebrow--cream">{t.addr}</span>
              <p>Am Neutor 6<br />Bonn / Köln<br />Germany</p>
            </div>
            <div className="ct-info__row">
              <span className="eyebrow eyebrow--cream">{t.hours}</span>
              <p>
                <strong>{t.mf}</strong> · 11:00 – 21:00<br />
                <strong>{t.ss}</strong> · 12:00 – 22:00
              </p>
            </div>
            <div className="ct-info__row ct-info__row--split">
              <div>
                <span className="eyebrow eyebrow--cream">{t.email}</span>
                <p>
                  <a href="mailto:hello@crunkiecookie.com">hello@crunkiecookie.com</a><br />
                  <a href="mailto:b2b@crunkiecookie.com">b2b@crunkiecookie.com</a>
                </p>
              </div>
              <div>
                <span className="eyebrow eyebrow--cream">{t.social}</span>
                <p><a href="https://instagram.com/crunkiecookie">@crunkiecookie</a></p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="ct-body">
        <div className="container ct-body__grid">
          <div>
            <span className="eyebrow">{t.fEye}</span>
            <h2>{t.fTitle}</h2>
            <p className="lead">{t.fText}</p>
            <form className="ct-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label>{t.name}</label>
                <input required type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="form-field">
                <label>{t.emailL}</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div className="form-field">
                <label>{t.msg}</label>
                <textarea required rows={6} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              <button className="btn btn--primary" type="submit">{t.send}</button>
              {sent && <div className="form-success" style={{ animation: 'pop .35s' }}>{t.success}</div>}
            </form>
          </div>

          <Reveal className="ct-map">
            <div className="ct-map__chrome">
              <span className="ct-map__chrome-dot" style={{ background: '#ff5f57' }} />
              <span className="ct-map__chrome-dot" style={{ background: '#febc2e' }} />
              <span className="ct-map__chrome-dot" style={{ background: '#28c840' }} />
              <span className="ct-map__title">Crunkie · Bonn / Köln</span>
            </div>
            <div className="ct-map__canvas">
              <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: '100%', height: '100%', display: 'block' }}>
                <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(31,23,20,0.06)" strokeWidth="1" /></pattern></defs>
                <rect width="400" height="400" fill="#F7F0E7" />
                <rect width="400" height="400" fill="url(#grid)" />
                <path d="M -20 260 Q 80 220, 160 240 T 420 200" stroke="#4D7792" strokeWidth="22" fill="none" opacity="0.5" strokeLinecap="round" />
                <path d="M 60 -20 L 200 200 L 220 420" stroke="#E8E1D7" strokeWidth="14" fill="none" />
                <path d="M 360 60 L 200 200 L 40 360" stroke="#E8E1D7" strokeWidth="10" fill="none" />
                <rect x="120" y="100" width="60" height="40" rx="6" fill="#E8E1D7" />
                <rect x="240" y="110" width="50" height="50" rx="6" fill="#E8E1D7" />
                <rect x="80" y="300" width="70" height="40" rx="6" fill="#E8E1D7" />
                <rect x="280" y="290" width="50" height="50" rx="6" fill="#E8E1D7" />
              </svg>
              <div className="ct-pin">
                <div className="ct-pin__pulse" />
                <div className="ct-pin__body">
                  <span>Crunkie</span>
                  <small>Am Neutor 6</small>
                </div>
                <div className="ct-pin__needle" />
              </div>
            </div>
            <div className="ct-map__base">
              <div>
                <span className="eyebrow">Am Neutor 6</span>
                <p>Bonn / Köln, Germany</p>
              </div>
              <a href="https://maps.google.com/?q=Am+Neutor+6+Bonn" target="_blank" rel="noopener noreferrer" className="ulink">{t.mapOpen}</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VEGAN */}
      <section className="ct-vegan">
        <div className="container ct-vegan__inner">
          <div>
            <span className="eyebrow" style={{ color: 'var(--crunkie-vegan)' }}>{t.vEye}</span>
            <h2>{t.vTitle}</h2>
            <p>{t.vText}</p>
          </div>
          <Link href="/cookies?cat=vegan" className="btn btn--vegan">{t.vCta}</Link>
        </div>
      </section>

      <style>{`
        .ct-hero { padding: 60px 0 80px; position: relative; overflow: hidden; }
        .ct-hero__blob { width: 600px; height: 600px; background: var(--crunkie-blue); opacity: 0.13; top: -220px; left: -150px; }
        .ct-hero__grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 60px; align-items: center; position: relative; z-index: 2; }
        .ct-hero h1 { margin: 18px 0; }
        .ct-hero h1 em { font-style: normal; color: var(--crunkie-red); }
        .ct-hero__cookies { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; max-width: 400px; margin-top: 40px; }
        .ct-hero__cookies img { width: 100%; aspect-ratio: 1; object-fit: contain; filter: drop-shadow(0 18px 22px rgba(58,36,29,0.4)); }
        .ct-info { background: var(--crunkie-blue-ink); color: var(--crunkie-cream); border-radius: var(--radius-lg); padding: 40px; display: flex; flex-direction: column; gap: 28px; position: relative; overflow: hidden; }
        .ct-info::before { content: ""; position: absolute; width: 280px; height: 280px; border-radius: 50%; background: rgba(175,89,80,0.25); top: -120px; right: -100px; filter: blur(40px); }
        .ct-info__row { display: flex; flex-direction: column; gap: 8px; position: relative; z-index: 1; }
        .ct-info__row p { color: rgba(232,225,215,0.92); font-size: 18px; line-height: 1.5; }
        .ct-info__row a { color: var(--crunkie-cream); border-bottom: 1px solid rgba(232,225,215,0.4); }
        .ct-info__row a:hover { color: var(--crunkie-white); }
        .ct-info__row--split { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
        .ct-body__grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 60px; align-items: start; }
        .ct-body h2 em { font-style: normal; color: var(--crunkie-red); }
        .ct-form { margin-top: 36px; display: flex; flex-direction: column; gap: 16px; }
        .ct-map { background: var(--crunkie-white); border-radius: var(--radius-lg); box-shadow: var(--shadow); overflow: hidden; position: sticky; top: 110px; }
        .ct-map__chrome { display: flex; align-items: center; gap: 8px; padding: 14px 18px; background: var(--crunkie-soft-cream); border-bottom: 1px solid rgba(31,23,20,0.06); }
        .ct-map__chrome-dot { width: 10px; height: 10px; border-radius: 50%; }
        .ct-map__title { margin-left: 12px; font-size: 13px; font-weight: 600; color: var(--crunkie-chocolate); }
        .ct-map__canvas { position: relative; aspect-ratio: 1.2; }
        .ct-pin { position: absolute; top: 45%; left: 50%; transform: translate(-50%, -100%); display: flex; flex-direction: column; align-items: center; z-index: 2; }
        .ct-pin__body { background: var(--crunkie-red); color: var(--crunkie-white); padding: 12px 18px; border-radius: 999px; box-shadow: 0 14px 30px -6px rgba(175,89,80,0.55); display: flex; flex-direction: column; align-items: center; }
        .ct-pin__body span { font-family: var(--ff-display); font-weight: 700; font-size: 18px; }
        .ct-pin__body small { font-size: 11px; opacity: .85; font-weight: 500; }
        .ct-pin__needle { width: 16px; height: 16px; background: var(--crunkie-red); transform: rotate(45deg); margin-top: -6px; }
        .ct-pin__pulse { position: absolute; bottom: -28px; left: 50%; transform: translateX(-50%); width: 30px; height: 30px; border-radius: 50%; background: var(--crunkie-red); opacity: .4; animation: pinPulse 2.2s ease-out infinite; }
        @keyframes pinPulse { 0% { transform: translateX(-50%) scale(0.6); opacity: .55; } 100% { transform: translateX(-50%) scale(3); opacity: 0; } }
        .ct-map__base { padding: 22px 24px; display: flex; align-items: center; justify-content: space-between; gap: 12px; border-top: 1px solid rgba(31,23,20,0.06); flex-wrap: wrap; }
        .ct-map__base p { font-size: 14px; font-weight: 600; color: var(--crunkie-dark); margin-top: 4px; }
        .ct-vegan { padding-bottom: 0; }
        .ct-vegan__inner { background: var(--crunkie-cream); border-radius: var(--radius-xl); padding: clamp(32px, 5vw, 60px); display: flex; justify-content: space-between; align-items: center; gap: 30px; flex-wrap: wrap; }
        .ct-vegan h2 { font-size: clamp(26px, 3.2vw, 46px); margin-top: 8px; }
        .ct-vegan h2 em { font-style: normal; color: var(--crunkie-vegan); }
        .ct-vegan p { color: color-mix(in oklab, var(--crunkie-chocolate) 80%, transparent); margin-top: 6px; }
        @media (max-width: 1000px) {
          .ct-hero__grid, .ct-body__grid { grid-template-columns: 1fr; gap: 48px; }
          .ct-map { position: static; }
        }
        @media (max-width: 640px) {
          .ct-info { padding: 28px; }
          .ct-info__row--split { grid-template-columns: 1fr; }
          .ct-hero__cookies { gap: 8px; }
        }
      `}</style>
    </>
  );
}
