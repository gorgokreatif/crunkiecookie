'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '../../components/LangContext';
import CookieCard from '../../components/CookieCard';
import Reveal from '../../components/Reveal';
import type { Cookie } from '../../types';

const FEATURED_IDS = ['crush-the-oreo', 'lotus-affair', 'red-flag', 'barely-legal', 'walnut-riot', 'chocolate-mood'];
const VEGAN_IDS = ['vegan-vice', 'clean-cheat'];

export default function HomePage() {
  const { lang } = useLang();
  const [cookies, setCookies] = useState<Cookie[]>([]);

  useEffect(() => {
    fetch('/api/cookies').then(r => r.json()).then(setCookies);
  }, []);

  const featured = FEATURED_IDS.map(id => cookies.find(c => c.id === id)).filter(Boolean) as Cookie[];
  const veganCookies = VEGAN_IDS.map(id => cookies.find(c => c.id === id)).filter(Boolean) as Cookie[];

  const t = {
    de: {
      kicker: 'Premium Cookies · Made in Germany',
      title: <>Cookies, die man <em>nicht&nbsp;vergisst.</em></>,
      sub: 'Warme Cookies. Moderne Dessertkultur. Echte Momente.',
      cta1: 'Unsere Cookies entdecken',
      cta2: 'Kontakt aufnehmen',
      stat: 'Sorten · und es werden mehr',
      veganK: 'Plant Based',
      veganT: 'Vegane Linie',
      quote: <>So laut im Geschmack.<br />So <em>Crunkie.</em></>,
      apEye: 'Über Crunkie · 2026',
      apTitle: <>Mehr als nur <em>ein Cookie.</em></>,
      apText: 'Eine moderne, energiegeladene Dessert-Marke. Kein Snack — ein Moment zum Teilen, Fotografieren und Genießen.',
      apMore: 'Unsere Geschichte →',
      apS1: 'Sorten', apS2: 'pro Cookie', apS3: 'handgemacht',
      cpEye: 'Unsere Cookies',
      cpTitle: 'Unsere Cookie-Welt',
      cpAll: 'Alle Cookies ansehen →',
      vsEye: '🌱 Plant Based · Vegan Line',
      vsTitle: <>100% pflanzlich. <br /><em>100% Crunkie.</em></>,
      vsText: 'Zwei Cookies, kein Kompromiss. Unsere vegane Linie wird mit denselben großen Portionen, dem gleichen Crunch und derselben Liebe gebacken — nur ganz ohne tierische Zutaten.',
      vsCta: 'Vegane Cookies entdecken →',
      b2bEye: 'Crunkie for Business',
      b2bTitle: <>Crunkie für <em>Unternehmen.</em></>,
      b2bText: 'Ob Meetings, Events, Kundengeschenke oder Office Treats — mit Crunkie Boxen wird jeder Business-Moment süßer.',
      b2bCta1: 'B2B Angebot anfragen',
      b2bCta2: 'Mehr erfahren →',
    },
    en: {
      kicker: 'Premium Cookies · Made in Germany',
      title: <>Cookies you <em>don&apos;t&nbsp;forget.</em></>,
      sub: 'Warm cookies. Modern dessert culture. Real moments.',
      cta1: 'Explore our cookies',
      cta2: 'Contact us',
      stat: 'flavors · and counting',
      veganK: 'Plant Based',
      veganT: 'Vegan line',
      quote: <>So loud in taste.<br />So <em>Crunkie.</em></>,
      apEye: 'About Crunkie · 2026',
      apTitle: <>More than just <em>a cookie.</em></>,
      apText: 'A modern, energetic dessert brand. Not a snack — a moment to share, photograph and enjoy.',
      apMore: 'Our story →',
      apS1: 'flavors', apS2: 'per cookie', apS3: 'handmade',
      cpEye: 'Our cookies',
      cpTitle: 'Our Cookie World',
      cpAll: 'See all cookies →',
      vsEye: '🌱 Plant Based · Vegan Line',
      vsTitle: <>100% plant-based. <br /><em>100% Crunkie.</em></>,
      vsText: 'Two cookies, zero compromise. Our vegan line is baked with the same big portions, the same crunch, and the same love — just without any animal ingredients.',
      vsCta: 'Discover vegan cookies →',
      b2bEye: 'Crunkie for Business',
      b2bTitle: <>Crunkie for <em>Business.</em></>,
      b2bText: 'From meetings and events to client gifts and office treats — Crunkie boxes make every business moment sweeter.',
      b2bCta1: 'Request B2B offer',
      b2bCta2: 'Learn more →',
    },
  }[lang];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="blob hero__blob-blue" />
        <div className="blob hero__blob-red" />
        <div className="container">
          <Reveal className="hero__topbar">
            <span className="hero__tick">№ 01 · 2026</span>
            <span className="hero__tick-dot" />
            <span className="hero__tick">Bonn / Köln</span>
            <span className="hero__tick-dot" />
            <span className="hero__tick">Not just a cookie. It&apos;s Crunkie.</span>
            <span className="hero__tick-spacer" />
            <span className="hero__tick hero__tick--red">● LIVE</span>
          </Reveal>

          <div className="bento">
            <Reveal className="bt bt-head">
              <span className="bt-head__kicker">{t.kicker}</span>
              <h1 className="bt-head__title">{t.title}</h1>
              <p className="bt-head__sub">{t.sub}</p>
            </Reveal>

            <Reveal delay={1} tag="div" className="bt bt-cook">
              <Link href="/cookies" className="bt bt-cook" style={{ all: 'unset', display: 'contents' }}>
                <span className="bt-cook__num">01</span>
                <span className="bt-cook__name">Crush the Oreo</span>
                <div className="bt-cook__disc" />
                <Image className="bt-cook__img" src="/assets/cookie-oreo.png" alt="Crush the Oreo" width={400} height={400} />
                <span className="bt-cook__badge">XL · 110g</span>
                <span className="bt-cook__arrow">→</span>
              </Link>
            </Reveal>

            <Reveal delay={2} className="bt bt-stat">
              <span className="bt-stat__num">20</span>
              <span className="bt-stat__lbl">{t.stat}</span>
            </Reveal>

            <Reveal delay={2} tag="div" className="bt bt-vegan">
              <Link href="/cookies?cat=vegan" className="bt bt-vegan" style={{ all: 'unset', display: 'contents' }}>
                <span className="bt-vegan__leaf">🌱</span>
                <div>
                  <span className="bt-vegan__kicker">{t.veganK}</span>
                  <span className="bt-vegan__title">{t.veganT}</span>
                </div>
                <span className="bt-vegan__arrow">→</span>
              </Link>
            </Reveal>

            <Reveal delay={3} className="bt bt-mini">
              <Image src="/assets/cookie-pistachio.png" alt="Pistachio Dream" width={160} height={160} />
            </Reveal>

            <Reveal delay={3} className="bt bt-quote">
              <span className="bt-quote__mark">&ldquo;</span>
              <p>{t.quote}</p>
            </Reveal>

            <Reveal delay={4} tag="div" className="bt bt-cta bt-cta--red">
              <Link href="/cookies" className="bt bt-cta bt-cta--red" style={{ all: 'unset', display: 'contents' }}>
                <span>{t.cta1}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </Link>
            </Reveal>

            <Reveal delay={5} tag="div" className="bt bt-cta bt-cta--dark">
              <Link href="/contact" className="bt bt-cta bt-cta--dark" style={{ all: 'unset', display: 'contents' }}>
                <span>{t.cta2}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...Array(2)].map((_, r) => (
            <span key={r}>
              <span>So loud, it&apos;s Crunkie proud.<span className="dot" /></span>
              <span>Big cookies, bigger moments.<span className="dot" /></span>
              <span>Bonn · Köln · 2026<span className="dot" /></span>
              <span>Not just a cookie.<span className="dot" /></span>
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT PREVIEW */}
      <section className="about-preview">
        <div className="container">
          <div className="ap2">
            <div className="ap2__panel">
              <span className="ap2__eyebrow">{t.apEye}</span>
              <Reveal tag="h2" className="ap2__title">{t.apTitle}</Reveal>
              <Reveal delay={1} tag="p" className="ap2__text">{t.apText}</Reveal>
              <Reveal delay={2} className="ap2__stats">
                <div className="ap2__stat">
                  <span className="ap2__num">20</span>
                  <span className="ap2__lbl">{t.apS1}</span>
                </div>
                <div className="ap2__stat">
                  <span className="ap2__num">110<small>g</small></span>
                  <span className="ap2__lbl">{t.apS2}</span>
                </div>
                <div className="ap2__stat">
                  <span className="ap2__num">100<small>%</small></span>
                  <span className="ap2__lbl">{t.apS3}</span>
                </div>
              </Reveal>
              <Reveal delay={3}>
                <Link href="/about" className="ap2__cta btn btn--ghost-light">{t.apMore}</Link>
              </Reveal>
              <Image className="ap2__cookie" src="/assets/cookie-walnut.png" alt="Walnut Riot" width={320} height={320} />
              <Reveal delay={2} tag="span" className="ap2__sticker">Bonn · Köln · 2026</Reveal>
              <div className="ap2__strip" aria-hidden="true">
                <span>SO LOUD</span>
                <span className="ap2__strip-dot" />
                <span>SO CRUNKIE</span>
                <span className="ap2__strip-dot" />
                <span>SO PROUD</span>
              </div>
            </div>

            <aside className="ap2__side">
              {[
                { variant: 'blue', img: '/assets/cookie-pistachio.png', name: 'Pistachio Dream', sub: lang === 'de' ? 'Cremig · Grün · Premium' : 'Creamy · Green · Premium' },
                { variant: 'cream', img: '/assets/cookie-redflag.png', name: 'Red Flag', sub: lang === 'de' ? 'Red Velvet · Drama' : 'Red Velvet · Drama' },
                { variant: 'dark', img: '/assets/cookie-matcha-kiss.png', name: 'Matcha Kiss', sub: lang === 'de' ? 'Matcha · Beere · Bold' : 'Matcha · Berry · Bold' },
              ].map((p, i) => (
                <Reveal key={p.name} delay={i + 1} tag="figure" className={`ap2__poly ap2__poly--${p.variant}`}>
                  <Image src={p.img} alt={p.name} width={88} height={88} />
                  <figcaption>
                    <span className="ap2__poly-tag">{p.name}</span>
                    <span className="ap2__poly-sub">{p.sub}</span>
                  </figcaption>
                </Reveal>
              ))}
            </aside>
          </div>
        </div>
      </section>

      {/* COOKIE PREVIEW */}
      <section className="cookie-preview" id="cookies">
        <div className="container">
          <div className="cookie-preview__head">
            <div>
              <span className="eyebrow">{t.cpEye}</span>
              <Reveal tag="h2">{t.cpTitle}</Reveal>
            </div>
            <Link href="/cookies" className="btn btn--ghost">{t.cpAll}</Link>
          </div>
          <div className="cookie-grid">
            {featured.map((c, i) => (
              <CookieCard key={c.id} cookie={c} lang={lang} index={i} delay={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* VEGAN SPOTLIGHT */}
      <section className="vegan-spot" id="vegan">
        <div className="blob vegan-spot__blob" />
        <div className="container vegan-spot__grid">
          <div className="vegan-spot__copy">
            <span className="eyebrow" style={{ color: 'var(--crunkie-vegan)' }}>{t.vsEye}</span>
            <Reveal tag="h2">{t.vsTitle}</Reveal>
            <Reveal delay={1} tag="p" className="lead">{t.vsText}</Reveal>
            <Reveal delay={2}>
              <Link href="/cookies?cat=vegan" className="btn btn--vegan">{t.vsCta}</Link>
            </Reveal>
          </div>
          <div className="vegan-spot__cards">
            {veganCookies.map((c, i) => (
              <CookieCard key={c.id} cookie={c} lang={lang} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* B2B PREVIEW */}
      <section className="b2b-preview">
        <div className="container">
          <Reveal className="b2b-preview__card">
            <div className="b2b-preview__copy">
              <span className="eyebrow eyebrow--cream">{t.b2bEye}</span>
              <h2>{t.b2bTitle}</h2>
              <p>{t.b2bText}</p>
              <div className="b2b-preview__ctas">
                <Link href="/b2b#form" className="btn btn--primary">{t.b2bCta1}</Link>
                <Link href="/b2b" className="btn btn--ghost-light">{t.b2bCta2}</Link>
              </div>
            </div>
            <div className="b2b-preview__box">
              <div className="b2b-box">
                <span className="b2b-box__tape" />
                {['/assets/cookie-chocolate.png', '/assets/cookie-oreo.png', '/assets/cookie-golden.png', '/assets/cookie-pistachio.png'].map((src, i) => (
                  <Image key={i} className={`b2b-box__cookie b2b-box__cookie--${i + 1}`} src={src} alt="" width={120} height={120} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ))}
                <span className="b2b-box__label">Crunkie · Meeting Box</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .about-preview { padding-bottom: clamp(80px, 10vw, 140px); }
        .ap2 {
          display: grid; grid-template-columns: 1.45fr 1fr;
          gap: clamp(24px, 3vw, 48px); align-items: stretch;
        }
        .ap2__panel {
          background: linear-gradient(135deg, var(--crunkie-red) 0%, var(--crunkie-red-deep) 100%);
          color: var(--crunkie-white); border-radius: var(--radius-xl);
          padding: clamp(36px, 5vw, 72px); position: relative; overflow: hidden;
          min-height: 520px; display: flex; flex-direction: column; gap: 24px;
        }
        .ap2__panel::before {
          content: ""; position: absolute; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(199,154,91,0.30), transparent 65%);
          top: -250px; left: -200px; pointer-events: none;
        }
        .ap2__panel::after {
          content: ""; position: absolute; width: 480px; height: 480px; border-radius: 50%;
          background: var(--crunkie-blue); opacity: 0.45; filter: blur(60px);
          bottom: -240px; right: -180px; pointer-events: none;
        }
        .ap2__eyebrow { font-family: var(--ff-body); font-size: 13px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--crunkie-cream); opacity: 0.85; position: relative; z-index: 2; }
        .ap2__title { font-size: clamp(36px, 5vw, 76px); color: var(--crunkie-white); line-height: 0.98; position: relative; z-index: 2; max-width: 14ch; }
        .ap2__title em { font-style: normal; color: var(--crunkie-cream); position: relative; display: inline-block; }
        .ap2__title em::before { content: ""; position: absolute; inset: auto -6px 4px -6px; height: 18px; background: var(--crunkie-blue); z-index: -1; border-radius: 6px; }
        .ap2__text { color: rgba(255,253,248,0.88); font-size: clamp(15px, 1.1vw, 18px); max-width: 36ch; line-height: 1.5; position: relative; z-index: 2; }
        .ap2__stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 22px 0; border-top: 1px solid rgba(255,253,248,0.22); border-bottom: 1px solid rgba(255,253,248,0.22); position: relative; z-index: 2; }
        .ap2__stat { display: flex; flex-direction: column; gap: 4px; }
        .ap2__num { font-family: var(--ff-display); font-weight: 800; font-size: clamp(36px, 4.5vw, 64px); line-height: 0.95; letter-spacing: -0.04em; color: var(--crunkie-white); }
        .ap2__num small { font-size: 0.45em; font-weight: 700; margin-left: 4px; vertical-align: top; position: relative; top: 0.4em; }
        .ap2__lbl { font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--crunkie-cream); opacity: 0.85; }
        .ap2__cta { align-self: flex-start; position: relative; z-index: 2; }
        .ap2__cookie {
          position: absolute; width: clamp(200px, 28%, 300px); height: auto;
          bottom: -60px; right: -30px;
          filter: drop-shadow(0 50px 60px rgba(58,36,29,0.55));
          transform: rotate(20deg); animation: float 11s ease-in-out infinite; z-index: 3; pointer-events: none;
        }
        .ap2__sticker {
          position: absolute; top: 28px; right: 28px;
          background: var(--crunkie-dark); color: var(--crunkie-cream);
          padding: 10px 16px; border-radius: 999px;
          font-family: var(--ff-display); font-weight: 700; font-size: 12px; letter-spacing: 0.06em;
          transform: rotate(8deg); box-shadow: var(--shadow); z-index: 4;
        }
        .ap2__strip {
          position: absolute; left: 0; right: 0; bottom: 0; padding: 14px 0;
          background: rgba(0,0,0,0.18); display: flex; gap: 24px; justify-content: center; align-items: center;
          font-family: var(--ff-display); font-weight: 700; font-size: 13px; letter-spacing: 0.18em; color: var(--crunkie-cream); z-index: 4;
        }
        .ap2__strip-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--crunkie-cream); opacity: 0.65; }
        .ap2__side { display: flex; flex-direction: column; gap: 14px; margin: 0; padding: 0; }
        .ap2__poly {
          margin: 0; flex: 1; border-radius: var(--radius-lg); padding: 18px 20px;
          display: grid; grid-template-columns: 80px 1fr; gap: 18px; align-items: center;
          position: relative; overflow: hidden; box-shadow: var(--shadow-sm); transition: transform .35s cubic-bezier(.2,.8,.2,1);
        }
        .ap2__poly:hover { transform: translateY(-4px) rotate(-1deg); }
        .ap2__poly img { width: 80px; height: auto; object-fit: contain; filter: drop-shadow(0 14px 16px rgba(58,36,29,0.45)); transition: transform .5s; }
        .ap2__poly:hover img { transform: rotate(-12deg) scale(1.06); }
        .ap2__poly figcaption { display: flex; flex-direction: column; gap: 6px; }
        .ap2__poly-tag { font-family: var(--ff-display); font-size: clamp(18px, 1.8vw, 26px); font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; }
        .ap2__poly-sub { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.8; }
        .ap2__poly--blue { background: linear-gradient(140deg, var(--crunkie-blue), var(--crunkie-blue-deep)); color: var(--crunkie-cream); }
        .ap2__poly--cream { background: var(--crunkie-cream); color: var(--crunkie-dark); }
        .ap2__poly--dark { background: var(--crunkie-dark); color: var(--crunkie-cream); }

        .cookie-preview__head { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin-bottom: 56px; flex-wrap: wrap; }
        .cookie-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

        .vegan-spot { background: linear-gradient(180deg, var(--crunkie-soft-cream) 0%, color-mix(in oklab, var(--crunkie-vegan) 12%, var(--crunkie-soft-cream)) 100%); position: relative; overflow: hidden; }
        .vegan-spot__blob { width: 600px; height: 600px; background: var(--crunkie-vegan); opacity: 0.15; top: -200px; right: -150px; }
        .vegan-spot__grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 70px; align-items: center; position: relative; z-index: 2; }
        .vegan-spot h2 em { font-style: normal; color: var(--crunkie-vegan); }
        .vegan-spot__cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        .b2b-preview__card {
          background: var(--crunkie-blue-ink); color: var(--crunkie-cream); border-radius: var(--radius-xl);
          padding: clamp(36px, 6vw, 80px); display: grid; grid-template-columns: 1.1fr 0.9fr;
          gap: 60px; align-items: center; position: relative; overflow: hidden;
        }
        .b2b-preview__card::before {
          content: ""; position: absolute; width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle, rgba(199,154,91,0.25), transparent 70%); top: -180px; right: -180px;
        }
        .b2b-preview__card h2 { color: var(--crunkie-cream); }
        .b2b-preview__card h2 em { font-style: normal; color: var(--crunkie-red); }
        .b2b-preview__card p { color: rgba(232,225,215,0.8); margin: 20px 0 28px; max-width: 480px; }
        .b2b-preview__ctas { display: flex; flex-wrap: wrap; gap: 14px; }
        .b2b-preview__box { position: relative; aspect-ratio: 1.1; }
        .b2b-box {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--crunkie-cream), var(--crunkie-soft-cream));
          border-radius: var(--radius-lg); box-shadow: 0 40px 80px -20px rgba(0,0,0,0.35);
          display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
          gap: 8px; padding: 24px;
          transform: perspective(900px) rotateX(8deg) rotateY(-10deg);
        }
        .b2b-box__tape {
          position: absolute; top: -8px; left: 50%; transform: translateX(-50%);
          width: 50%; height: 16px; background: var(--crunkie-red); border-radius: 4px;
          box-shadow: 0 6px 12px rgba(175,89,80,0.4);
        }
        .b2b-box__label {
          position: absolute; bottom: -28px; left: 8px;
          font-family: var(--ff-display); font-weight: 700; font-size: 14px; color: var(--crunkie-cream);
        }

        @media (max-width: 1100px) {
          .ap2 { grid-template-columns: 1fr; }
          .ap2__panel { min-height: 0; }
          .ap2__cookie { width: clamp(160px, 22%, 220px); right: -20px; bottom: -40px; }
          .ap2__side { flex-direction: row; }
          .b2b-preview__card { grid-template-columns: 1fr; }
          .vegan-spot__grid { grid-template-columns: 1fr; }
          .cookie-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 720px) {
          .ap2__side { flex-direction: column; }
          .ap2__poly { grid-template-columns: 72px 1fr; }
          .ap2__poly img { width: 72px; height: auto; }
          .ap2__sticker { display: none; }
          .b2b-box { transform: none; }
        }
        @media (max-width: 640px) {
          .cookie-grid { grid-template-columns: 1fr; }
          .vegan-spot__cards { grid-template-columns: 1fr; }
          .ap2__stats { grid-template-columns: 1fr 1fr; }
          .ap2__stats .ap2__stat:last-child { grid-column: 1 / -1; }
          .ap2__strip { font-size: 11px; gap: 14px; }
        }
      `}</style>
    </>
  );
}
