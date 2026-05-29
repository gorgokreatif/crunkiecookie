'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '../../../components/LangContext';
import Reveal from '../../../components/Reveal';

export default function AboutPage() {
  const { lang } = useLang();

  const t = {
    de: {
      kicker: 'Über uns · About', title: <>Mehr als nur <em>Cookies.</em></>, sub: 'Die moderne Dessert-Marke für alle, die das Besondere lieben.',
      storyK: 'Unsere Geschichte', storyT: 'Aus einer Idee.',
      quote: <>So loud, it&apos;s<br />so <em>Crunkie proud.</em></>,
      cta1: 'Unsere Cookies', cta2: 'Komm vorbei',
      stEye: 'Unsere Geschichte', stTitle: <>Aus einer <em>Idee.</em> Aus einer Küche. Aus echter Liebe.</>,
      stText: 'Crunkie entstand aus der Idee, Cookies neu zu denken: größer, weicher, intensiver und mit einem Look, den man sofort teilen möchte. Jeder Cookie steht für ehrliches Handwerk, starke Zutaten und einen Moment, der bleibt.',
      stS1: 'pro Cookie', stS2: 'Sorten', stS3: 'handgemacht',
      vlEye: 'Werte', vlTitle: <>Echte Werte. <em>Echter Geschmack.</em></>,
      v1t: 'Handgemacht', v1d: 'Jeder Cookie wird mit Liebe und Sorgfalt gemacht.',
      v2t: 'Beste Zutaten', v2d: 'Für intensiven Geschmack ohne Kompromisse.',
      v3t: 'Visuell stark', v3d: 'Gemacht für Genussmomente, die man teilen will.',
      v4t: 'Modern gedacht', v4d: 'Eine Dessert-Marke für eine neue Generation.',
      exEye: 'Das Erlebnis', exTitle: <>Das Crunkie <em>Erlebnis.</em></>,
      exText: 'Crunkie ist Pause, Belohnung und Erlebnis zugleich. Ob im Store, im Büro oder als Geschenk — ein Crunkie Moment bleibt im Kopf.',
      exCta: 'Vorbeikommen →',
      ex: [{ icon: '📍', t: 'Im Store', d: 'Warm aus dem Ofen. Direkt in deinen Tag.' }, { icon: '💼', t: 'Im Büro', d: 'Crunkie Boxen für Meetings, Teams und Treats.' }, { icon: '🎁', t: 'Als Geschenk', d: 'Premium Verpackung. Ein Moment, der bleibt.' }, { icon: '📸', t: 'Auf Instagram', d: 'Geteilt, gepostet, geliebt — @crunkiecookie.' }],
      vgEye: '🌱 Plant Based', vgTitle: <>Für alle. <em>Auch vegan.</em></>,
      vgText: 'Mit unserer veganen Linie wollen wir, dass jeder Crunkie probieren kann — ohne Kompromiss bei Geschmack, Crunch oder Größe.',
      vgCta: 'Vegane Cookies ansehen →',
      ctaTitle: <>So loud, it&apos;s <em>Crunkie proud.</em></>,
      ctaA: 'Cookies entdecken', ctaB: 'Für Unternehmen',
    },
    en: {
      kicker: 'About us', title: <>More than just <em>cookies.</em></>, sub: 'The modern dessert brand for everyone who loves something special.',
      storyK: 'Our story', storyT: 'From an idea.',
      quote: <>So loud, it&apos;s<br />so <em>Crunkie proud.</em></>,
      cta1: 'Our cookies', cta2: 'Visit us',
      stEye: 'Our story', stTitle: <>From an <em>idea.</em> From a kitchen. From real love.</>,
      stText: 'Crunkie was created from the idea of rethinking cookies: bigger, softer, richer and designed to be shared. Every cookie stands for honest craft, bold ingredients and a moment that stays.',
      stS1: 'per cookie', stS2: 'flavors', stS3: 'handmade',
      vlEye: 'Values', vlTitle: <>Real values. <em>Real taste.</em></>,
      v1t: 'Handmade', v1d: 'Every cookie is made with love and care.',
      v2t: 'Best ingredients', v2d: 'Rich flavor without compromise.',
      v3t: 'Visually bold', v3d: 'Made for moments people want to share.',
      v4t: 'Modern by design', v4d: 'A dessert brand for a new generation.',
      exEye: 'The experience', exTitle: <>The Crunkie <em>experience.</em></>,
      exText: 'Crunkie is a break, a reward and an experience at the same time. In-store, at the office or as a gift — a Crunkie moment stays with you.',
      exCta: 'Visit us →',
      ex: [{ icon: '📍', t: 'In-store', d: 'Warm from the oven. Straight into your day.' }, { icon: '💼', t: 'At the office', d: 'Crunkie boxes for meetings, teams and treats.' }, { icon: '🎁', t: 'As a gift', d: 'Premium packaging. A moment that stays.' }, { icon: '📸', t: 'On Instagram', d: 'Shared, posted, loved — @crunkiecookie.' }],
      vgEye: '🌱 Plant Based', vgTitle: <>For everyone. <em>Vegan too.</em></>,
      vgText: 'With our vegan line we want everyone to taste Crunkie — without compromising on flavor, crunch or size.',
      vgCta: 'See vegan cookies →',
      ctaTitle: <>So loud, it&apos;s <em>Crunkie proud.</em></>,
      ctaA: 'Explore cookies', ctaB: 'For business',
    },
  }[lang];

  return (
    <>
      {/* BENTO HERO */}
      <section className="hero">
        <div className="blob hero__blob-blue" />
        <div className="blob hero__blob-red" />
        <div className="container">
          <Reveal className="hero__topbar">
            <span className="hero__tick">EST. 2026 · NR. 02</span>
            <span className="hero__tick-dot" />
            <span className="hero__tick">Bonn / Köln</span>
            <span className="hero__tick-dot" />
            <span className="hero__tick">Crunkie Story · Brand · Werte</span>
            <span className="hero__tick-spacer" />
            <span className="hero__tick hero__tick--red">● ABOUT</span>
          </Reveal>
          <div className="bento">
            <Reveal className="bt bt-head">
              <span className="bt-head__kicker">{t.kicker}</span>
              <h1 className="bt-head__title">{t.title}</h1>
              <p className="bt-head__sub">{t.sub}</p>
            </Reveal>
            <Reveal delay={1} tag="div" className="bt bt-cook">
              <Link href="/cookies" style={{ all: 'unset', display: 'contents' }}>
                <span className="bt-cook__num">02</span>
                <span className="bt-cook__name">Walnut Riot</span>
                <div className="bt-cook__disc" />
                <Image className="bt-cook__img" src="/assets/cookie-walnut.png" alt="Walnut Riot" width={400} height={400} />
                <span className="bt-cook__badge">{lang === 'de' ? 'Handgemacht' : 'Handmade'}</span>
                <span className="bt-cook__arrow">→</span>
              </Link>
            </Reveal>
            <Reveal delay={2} className="bt bt-stat">
              <span className="bt-stat__num bt-stat__num--small">110<small>g</small></span>
              <span className="bt-stat__lbl">{lang === 'de' ? 'pro Cookie · XL' : 'per cookie · XL'}</span>
            </Reveal>
            <Reveal delay={2} tag="div" className="bt bt-vegan bt-blue-tile">
              <Link href="#story" style={{ all: 'unset', display: 'contents' }}>
                <span className="bt-vegan__leaf">✦</span>
                <div>
                  <span className="bt-vegan__kicker">{t.storyK}</span>
                  <span className="bt-vegan__title">{t.storyT}</span>
                </div>
                <span className="bt-vegan__arrow">→</span>
              </Link>
            </Reveal>
            <Reveal delay={3} className="bt bt-mini">
              <Image src="/assets/cookie-redflag.png" alt="Red Flag" width={160} height={160} />
            </Reveal>
            <Reveal delay={3} className="bt bt-quote">
              <span className="bt-quote__mark">&ldquo;</span>
              <p>{t.quote}</p>
            </Reveal>
            <Reveal delay={4} tag="div" className="bt bt-cta bt-cta--red">
              <Link href="/cookies" style={{ all: 'unset', display: 'contents' }}>
                <span>{t.cta1}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </Link>
            </Reveal>
            <Reveal delay={5} tag="div" className="bt bt-cta bt-cta--dark">
              <Link href="/contact" style={{ all: 'unset', display: 'contents' }}>
                <span>{t.cta2}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="ab-story" id="story">
        <div className="container ab-story__grid">
          <Reveal className="ab-story__media">
            <div className="ab-story__circle" />
            <Image src="/assets/cookie-chocolate.png" alt="" width={420} height={420} className="ab-story__cookie ab-story__cookie--main" />
            <Image src="/assets/cookie-walnut.png" alt="" width={200} height={200} className="ab-story__cookie ab-story__cookie--side float" />
          </Reveal>
          <div>
            <span className="eyebrow">{t.stEye}</span>
            <Reveal tag="h2">{t.stTitle}</Reveal>
            <Reveal delay={1} tag="p" className="lead">{t.stText}</Reveal>
            <Reveal delay={2} className="ab-story__stats">
              {[{ n: '110g', l: t.stS1 }, { n: '20', l: t.stS2 }, { n: '100%', l: t.stS3 }].map(s => (
                <div key={s.l} className="ab-stat">
                  <span className="ab-stat__num">{s.n}</span>
                  <span className="ab-stat__lbl">{s.l}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="ab-values">
        <div className="container">
          <div className="ab-values__head">
            <span className="eyebrow eyebrow--blue">{t.vlEye}</span>
            <Reveal tag="h2">{t.vlTitle}</Reveal>
          </div>
          <div className="ab-values__grid">
            {[
              { n: '01', title: t.v1t, desc: t.v1d, cls: '' },
              { n: '02', title: t.v2t, desc: t.v2d, cls: 'ab-value--blue' },
              { n: '03', title: t.v3t, desc: t.v3d, cls: 'ab-value--red' },
              { n: '04', title: t.v4t, desc: t.v4d, cls: '' },
            ].map((v, i) => (
              <Reveal key={v.n} delay={i} className={`ab-value${v.cls ? ' ' + v.cls : ''}`}>
                <span className="ab-value__num">{v.n}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="ab-exp">
        <div className="container ab-exp__grid">
          <div>
            <span className="eyebrow">{t.exEye}</span>
            <Reveal tag="h2">{t.exTitle}</Reveal>
            <Reveal delay={1} tag="p" className="lead">{t.exText}</Reveal>
            <Reveal delay={2}><Link href="/contact" className="btn btn--primary">{t.exCta}</Link></Reveal>
          </div>
          <div className="ab-exp__list">
            {t.ex.map((e, i) => (
              <Reveal key={e.t} delay={i} className="ab-exp__row">
                <span className="ab-exp__icon">{e.icon}</span>
                <div>
                  <h3>{e.t}</h3>
                  <p>{e.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VEGAN */}
      <section className="ab-vegan">
        <div className="container ab-vegan__card">
          <div className="ab-vegan__copy">
            <span className="eyebrow" style={{ color: 'var(--crunkie-vegan-soft)' }}>{t.vgEye}</span>
            <h2>{t.vgTitle}</h2>
            <p>{t.vgText}</p>
            <Link href="/cookies?cat=vegan" className="btn btn--vegan">{t.vgCta}</Link>
          </div>
          <div className="ab-vegan__cookies">
            <Image src="/assets/cookie-vegan-vice.png" alt="Vegan Vice" width={220} height={238} className="float" />
            <Image src="/assets/cookie-clean-cheat.png" alt="Clean Cheat" width={220} height={226} className="float-2" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ab-cta">
        <div className="container ab-cta__inner">
          <h2>{t.ctaTitle}</h2>
          <div className="ab-cta__ctas">
            <Link href="/cookies" className="btn btn--primary">{t.ctaA}</Link>
            <Link href="/b2b" className="btn btn--blue">{t.ctaB}</Link>
          </div>
        </div>
      </section>

      <style>{`
        .ab-story__grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 80px; align-items: center; }
        .ab-story h2 { margin-bottom: 20px; }
        .ab-story h2 em { font-style: normal; color: var(--crunkie-blue); }
        .ab-story__media { position: relative; aspect-ratio: 1; max-width: 480px; margin: 0 auto; }
        .ab-story__circle { position: absolute; inset: 0; background: var(--crunkie-red); border-radius: 50%; transform: scale(0.85); box-shadow: 0 50px 90px -20px rgba(175,89,80,0.45); }
        .ab-story__cookie--main { width: 80%; height: auto; position: absolute; top: 10%; left: 10%; filter: drop-shadow(0 40px 50px rgba(58,36,29,0.55)); }
        .ab-story__cookie--side { width: 38%; height: auto; position: absolute; bottom: -2%; right: -8%; filter: drop-shadow(0 20px 30px rgba(58,36,29,0.5)); }
        .ab-story__stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }
        .ab-stat { padding: 20px; border-radius: var(--radius); background: var(--crunkie-white); box-shadow: var(--shadow-sm); }
        .ab-stat__num { display: block; font-family: var(--ff-display); font-weight: 800; font-size: clamp(28px,3.2vw,44px); color: var(--crunkie-dark); letter-spacing: -0.03em; line-height: 1; }
        .ab-stat__lbl { display: block; margin-top: 8px; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--crunkie-blue); }
        .ab-values { background: var(--crunkie-cream); }
        .ab-values__head { text-align: center; margin-bottom: 56px; }
        .ab-values h2 em { font-style: normal; color: var(--crunkie-red); }
        .ab-values__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .ab-value { background: var(--crunkie-white); border-radius: var(--radius-lg); padding: 32px 28px; display: flex; flex-direction: column; gap: 14px; min-height: 260px; position: relative; overflow: hidden; transition: transform .4s; }
        .ab-value:hover { transform: translateY(-6px); }
        .ab-value__num { font-family: var(--ff-display); font-size: 14px; font-weight: 700; letter-spacing: 0.08em; color: var(--crunkie-blue); }
        .ab-value h3 { color: var(--crunkie-dark); }
        .ab-value p { font-size: 15px; line-height: 1.5; color: color-mix(in oklab, var(--crunkie-chocolate) 75%, transparent); margin-top: auto; }
        .ab-value--blue { background: var(--crunkie-blue); color: var(--crunkie-cream); }
        .ab-value--blue h3 { color: var(--crunkie-cream); }
        .ab-value--blue p { color: rgba(232,225,215,0.85); }
        .ab-value--blue .ab-value__num { color: var(--crunkie-cream); opacity: .8; }
        .ab-value--red { background: var(--crunkie-red); color: var(--crunkie-white); }
        .ab-value--red h3 { color: var(--crunkie-white); }
        .ab-value--red p { color: rgba(255,253,248,0.85); }
        .ab-value--red .ab-value__num { color: var(--crunkie-cream); opacity: .8; }
        .ab-exp__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .ab-exp h2 em { font-style: normal; color: var(--crunkie-blue); }
        .ab-exp__list { display: flex; flex-direction: column; gap: 4px; }
        .ab-exp__row { display: flex; gap: 20px; align-items: flex-start; padding: 24px 0; border-bottom: 1px solid rgba(31,23,20,0.1); }
        .ab-exp__icon { width: 56px; height: 56px; display: grid; place-items: center; background: var(--crunkie-soft-cream); border-radius: 50%; font-size: 22px; flex-shrink: 0; }
        .ab-exp__row h3 { font-size: clamp(18px,1.8vw,22px); margin-bottom: 4px; }
        .ab-exp__row p { color: color-mix(in oklab, var(--crunkie-chocolate) 75%, transparent); }
        .ab-vegan { background: var(--crunkie-soft-cream); padding: 0 0 80px; }
        .ab-vegan__card { background: linear-gradient(135deg, var(--crunkie-vegan), color-mix(in oklab, var(--crunkie-vegan) 70%, black)); border-radius: var(--radius-xl); padding: clamp(36px, 6vw, 80px); display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px; align-items: center; color: var(--crunkie-white); position: relative; overflow: hidden; }
        .ab-vegan__card::before { content: "🌱"; font-size: 320px; position: absolute; bottom: -100px; right: -40px; opacity: 0.08; }
        .ab-vegan__copy h2 { color: var(--crunkie-white); }
        .ab-vegan__copy h2 em { font-style: normal; color: var(--crunkie-vegan-soft); }
        .ab-vegan__copy p { color: rgba(255,253,248,0.88); margin: 20px 0 28px; max-width: 480px; }
        .ab-vegan__copy .btn--vegan { background: var(--crunkie-white); color: var(--crunkie-vegan); }
        .ab-vegan__copy .btn--vegan:hover { background: var(--crunkie-cream); }
        .ab-vegan__cookies { position: relative; aspect-ratio: 1; display: grid; grid-template-columns: 1fr 1fr; align-items: center; }
        .ab-vegan__cookies img { width: 100%; height: auto; filter: drop-shadow(0 30px 30px rgba(0,0,0,0.4)); }
        .ab-vegan__cookies img:first-child { transform: rotate(-6deg) translateY(-10px); }
        .ab-vegan__cookies img:last-child { transform: rotate(8deg) translateY(20px); }
        .ab-cta { padding: 80px 0 0; }
        .ab-cta__inner { background: var(--crunkie-dark); color: var(--crunkie-cream); border-radius: var(--radius-xl); padding: clamp(36px, 5vw, 70px); display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: center; }
        .ab-cta h2 { color: var(--crunkie-cream); font-size: clamp(36px, 4.5vw, 76px); }
        .ab-cta h2 em { font-style: normal; color: var(--crunkie-red); }
        .ab-cta__ctas { display: flex; flex-wrap: wrap; gap: 12px; justify-content: flex-end; }
        @media (max-width: 1000px) {
          .ab-story__grid, .ab-exp__grid, .ab-vegan__card, .ab-cta__inner { grid-template-columns: 1fr; gap: 48px; }
          .ab-values__grid { grid-template-columns: 1fr 1fr; }
          .ab-cta__ctas { justify-content: flex-start; }
          .ab-story__media { max-width: 400px; }
        }
        @media (max-width: 640px) {
          .ab-values__grid { grid-template-columns: 1fr; }
          .ab-story__stats { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </>
  );
}
