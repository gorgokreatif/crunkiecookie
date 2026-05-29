'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '../../../components/LangContext';
import Reveal from '../../../components/Reveal';

export default function B2BPage() {
  const { lang } = useLang();
  const [sent, setSent] = useState(false);

  const t = {
    de: {
      eye: 'Crunkie for Business',
      title: <>Cookies, die Geschäftsbeziehungen <em>versüßen.</em></>,
      sub: 'Premium Cookie-Boxen für Meetings, Events, Kundengeschenke und besondere Momente im Unternehmen.',
      cta1: 'B2B Angebot anfragen', cta2: 'Cookie-Boxen entdecken',
      s1: 'Cookies pro Box', s2: 'Antwort-Zeit', s3: 'Custom Branding',
      sticker: 'Mit deinem Logo möglich',
      ucEye: 'Use Cases', ucTitle: <>Für jeden <em>Business-Moment.</em></>,
      cases: [
        { n: '01', t: 'Meetings & Workshops', d: 'Süße Energie für produktive Runden.' },
        { n: '02', t: 'Kundengeschenke', d: 'Ein Geschenk, das im Kopf bleibt.', blue: true },
        { n: '03', t: 'Events & Catering', d: 'Für Messen, Launches, Feiern und besondere Anlässe.' },
        { n: '04', t: 'Office Treats', d: 'Kleine Pausen, große Wirkung im Team.', red: true },
        { n: '05', t: 'Hotels & Hospitality', d: 'Premium Cookies als Willkommensmoment.' },
        { n: '06', t: 'Cafés & Restaurants', d: 'Crunkie Cookies als besonderes Dessert-Angebot.', blue: true },
      ],
      fEye: 'Angebot anfragen', fTitle: <>Angebot <em>anfragen.</em></>,
      fText: 'Erzähl uns von deinem Projekt — wir melden uns innerhalb von 24 Stunden.',
      company: 'Unternehmen', name: 'Ansprechpartner', email: 'E-Mail', qty: 'Menge / Anlass', msg: 'Weitere Details', send: 'Anfrage absenden',
      success: 'Danke für deine Anfrage! Wir melden uns innerhalb von 24 Stunden.',
    },
    en: {
      eye: 'Crunkie for Business',
      title: <>Cookies that sweeten <em>business relationships.</em></>,
      sub: 'Premium cookie boxes for meetings, events, client gifts and special company moments.',
      cta1: 'Request B2B offer', cta2: 'Explore cookie boxes',
      s1: 'Cookies per box', s2: 'Response time', s3: 'Custom branding',
      sticker: 'Your logo possible',
      ucEye: 'Use Cases', ucTitle: <>For every <em>business moment.</em></>,
      cases: [
        { n: '01', t: 'Meetings & Workshops', d: 'Sweet energy for productive rounds.' },
        { n: '02', t: 'Client Gifts', d: 'A gift that stays in their minds.', blue: true },
        { n: '03', t: 'Events & Catering', d: 'For fairs, launches, celebrations and special occasions.' },
        { n: '04', t: 'Office Treats', d: 'Small breaks, big impact on the team.', red: true },
        { n: '05', t: 'Hotels & Hospitality', d: 'Premium cookies as a welcome moment.' },
        { n: '06', t: 'Cafés & Restaurants', d: 'Crunkie cookies as a special dessert offering.', blue: true },
      ],
      fEye: 'Request an offer', fTitle: <>Request an <em>offer.</em></>,
      fText: 'Tell us about your project — we\'ll get back to you within 24 hours.',
      company: 'Company', name: 'Contact person', email: 'Email', qty: 'Quantity / occasion', msg: 'More details', send: 'Send request',
      success: 'Thank you for your inquiry! We\'ll get back to you within 24 hours.',
    },
  }[lang];

  return (
    <>
      {/* HERO */}
      <section className="b2-hero">
        <div className="container b2-hero__grid">
          <div className="b2-hero__copy">
            <span className="eyebrow eyebrow--cream">{t.eye}</span>
            <Reveal tag="h1">{t.title}</Reveal>
            <Reveal delay={1} tag="p" className="lead">{t.sub}</Reveal>
            <Reveal delay={2} className="b2-hero__ctas">
              <Link href="#form" className="btn btn--primary">{t.cta1}</Link>
              <Link href="#cases" className="btn btn--ghost-light">{t.cta2}</Link>
            </Reveal>
            <Reveal delay={3} className="b2-hero__stats">
              {[{ n: '12+', l: t.s1 }, { n: '24h', l: t.s2 }, { n: '100%', l: t.s3 }].map(s => (
                <div key={s.l}>
                  <span className="b2-hero__num">{s.n}</span>
                  <span className="b2-hero__lbl">{s.l}</span>
                </div>
              ))}
            </Reveal>
          </div>
          <div className="b2-hero__visual">
            <div className="b2-hero__box">
              <span className="b2-hero__tape" />
              <span className="b2-hero__brand">CRUNKIE — Client Gift Box №24</span>
              <div className="b2-hero__cookies">
                {['/assets/cookie-oreo.png', '/assets/cookie-pistachio.png', '/assets/cookie-lotus.png', '/assets/cookie-redflag.png', '/assets/cookie-walnut.png', '/assets/cookie-golden.png', '/assets/cookie-chocolate.png', '/assets/cookie-matcha-kiss.png'].map((src, i) => (
                  <Image key={i} src={src} alt="" width={80} height={80} />
                ))}
              </div>
            </div>
            <span className="b2-hero__sticker">{t.sticker}</span>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="b2-uses" id="cases">
        <div className="container">
          <div className="b2-uses__head">
            <span className="eyebrow eyebrow--blue">{t.ucEye}</span>
            <Reveal tag="h2">{t.ucTitle}</Reveal>
          </div>
          <div className="b2-uses__grid">
            {t.cases.map((c, i) => (
              <Reveal key={c.n} delay={i % 3} className={`b2-use${c.blue ? ' b2-use--blue' : ''}${c.red ? ' b2-use--red' : ''}`}>
                <span className="b2-use__num">{c.n}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="b2-form-section" id="form">
        <div className="container b2-form__grid">
          <div>
            <span className="eyebrow">{t.fEye}</span>
            <h2>{t.fTitle}</h2>
            <p className="lead">{t.fText}</p>
          </div>
          <div className="b2-form__card">
            <form className="b2-form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-field"><label>{t.company}</label><input required type="text" /></div>
                <div className="form-field"><label>{t.name}</label><input required type="text" /></div>
              </div>
              <div className="form-field"><label>{t.email}</label><input required type="email" /></div>
              <div className="form-field"><label>{t.qty}</label><input type="text" /></div>
              <div className="form-field"><label>{t.msg}</label><textarea rows={5} /></div>
              <button className="btn btn--primary" type="submit" style={{ alignSelf: 'flex-start' }}>{t.send}</button>
              {sent && <div className="form-success">{t.success}</div>}
            </form>
          </div>
        </div>
      </section>

      <style>{`
        .b2-hero {
          background: linear-gradient(135deg, var(--crunkie-blue-ink) 0%, var(--crunkie-blue-deep) 100%);
          color: var(--crunkie-cream); padding: clamp(60px,8vw,120px) 0; position: relative; overflow: hidden;
        }
        .b2-hero::before { content: ""; position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(199,154,91,0.20), transparent 65%); top: -200px; right: -100px; }
        .b2-hero__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; position: relative; z-index: 2; }
        .b2-hero h1 { color: var(--crunkie-white); margin: 18px 0; font-size: clamp(36px,5.5vw,80px); }
        .b2-hero h1 em { font-style: normal; color: var(--crunkie-red); }
        .b2-hero .lead { color: rgba(232,225,215,0.88); }
        .b2-hero__ctas { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 32px; }
        .b2-hero__stats { display: flex; gap: 40px; flex-wrap: wrap; margin-top: 36px; padding-top: 36px; border-top: 1px solid rgba(232,225,215,0.2); }
        .b2-hero__stats > div { display: flex; flex-direction: column; gap: 6px; }
        .b2-hero__num { font-family: var(--ff-display); font-weight: 800; font-size: clamp(28px,3.5vw,48px); color: var(--crunkie-white); letter-spacing: -0.04em; line-height: 1; }
        .b2-hero__lbl { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(232,225,215,0.7); }
        .b2-hero__visual { position: relative; }
        .b2-hero__box {
          background: var(--crunkie-soft-cream); border-radius: var(--radius-lg); padding: 28px;
          box-shadow: 0 40px 80px -20px rgba(0,0,0,0.5); position: relative;
          transform: perspective(900px) rotateX(4deg) rotateY(-8deg);
        }
        .b2-hero__tape { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 40%; height: 18px; background: var(--crunkie-red); border-radius: 4px; }
        .b2-hero__brand { display: block; font-family: var(--ff-display); font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--crunkie-chocolate); margin-bottom: 16px; opacity: 0.7; }
        .b2-hero__cookies { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        .b2-hero__cookies img { width: 100%; height: auto; aspect-ratio: 1; object-fit: contain; filter: drop-shadow(0 8px 10px rgba(58,36,29,0.4)); }
        .b2-hero__sticker {
          position: absolute; bottom: -16px; right: 20px;
          background: var(--crunkie-gold); color: var(--crunkie-dark);
          padding: 12px 18px; border-radius: 999px; font-family: var(--ff-display); font-weight: 700; font-size: 13px;
          transform: rotate(-6deg); box-shadow: var(--shadow);
        }
        .b2-uses { background: var(--crunkie-soft-cream); }
        .b2-uses__head { margin-bottom: 48px; }
        .b2-uses h2 em { font-style: normal; color: var(--crunkie-blue); }
        .b2-uses__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .b2-use { background: var(--crunkie-white); border-radius: var(--radius-lg); padding: 32px 28px; display: flex; flex-direction: column; gap: 12px; min-height: 200px; transition: transform .4s; }
        .b2-use:hover { transform: translateY(-4px); }
        .b2-use__num { font-family: var(--ff-display); font-size: 14px; font-weight: 700; letter-spacing: 0.08em; color: var(--crunkie-blue); }
        .b2-use h3 { color: var(--crunkie-dark); font-size: clamp(18px,1.8vw,22px); }
        .b2-use p { font-size: 15px; line-height: 1.5; color: color-mix(in oklab, var(--crunkie-chocolate) 75%, transparent); margin-top: auto; }
        .b2-use--blue { background: var(--crunkie-blue); color: var(--crunkie-cream); }
        .b2-use--blue h3 { color: var(--crunkie-cream); }
        .b2-use--blue p { color: rgba(232,225,215,0.85); }
        .b2-use--blue .b2-use__num { color: rgba(232,225,215,0.7); }
        .b2-use--red { background: var(--crunkie-red); color: var(--crunkie-white); }
        .b2-use--red h3 { color: var(--crunkie-white); }
        .b2-use--red p { color: rgba(255,253,248,0.85); }
        .b2-use--red .b2-use__num { color: rgba(255,253,248,0.7); }
        .b2-form-section { background: var(--crunkie-cream); }
        .b2-form__grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 60px; align-items: start; }
        .b2-form-section h2 em { font-style: normal; color: var(--crunkie-red); }
        .b2-form__card { background: var(--crunkie-white); border-radius: var(--radius-lg); padding: clamp(28px,4vw,48px); box-shadow: var(--shadow); }
        .b2-form { display: flex; flex-direction: column; gap: 16px; }
        @media (max-width: 1000px) {
          .b2-hero__grid, .b2-form__grid { grid-template-columns: 1fr; gap: 48px; }
          .b2-uses__grid { grid-template-columns: 1fr 1fr; }
          .b2-hero__box { transform: none; }
        }
        @media (max-width: 640px) {
          .b2-uses__grid { grid-template-columns: 1fr; }
          .b2-form .b2-form > div[style] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
