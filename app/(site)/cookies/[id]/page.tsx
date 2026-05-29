'use client';
import Link from 'next/link';
import Image from 'next/image';
import { use, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useLang } from '../../../../components/LangContext';
import CookieCard from '../../../../components/CookieCard';
import Reveal from '../../../../components/Reveal';
import type { Cookie } from '../../../../types';

export default function CookieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { lang } = useLang();
  const [cookies, setCookies] = useState<Cookie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cookies').then(r => r.json()).then((data: Cookie[]) => {
      setCookies(data);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  const cookie = cookies.find(c => c.id === id);
  if (!cookie) notFound();

  const t = cookie[lang] ?? cookie.de;

  const related = cookies
    .filter(c => c.id !== cookie.id && c.category.some(cat => cookie.category.includes(cat)))
    .slice(0, 3);

  const ui = {
    de: { back: 'Alle Cookies', price: 'Preis · pro Stück', visit: 'Komm vorbei', bulk: 'Im Großhandel?', pEye: 'Persönlichkeit', pTitle: <>Wenn dieser Cookie ein <em>Mood</em> wäre…</>, relatedTitle: 'Du magst vielleicht auch' },
    en: { back: 'All Cookies', price: 'Price · per piece', visit: 'Visit us', bulk: 'Wholesale?', pEye: 'Personality', pTitle: <>If this cookie were a <em>mood</em>…</>, relatedTitle: 'You might also like' },
  }[lang];

  const discColor = cookie.vegan ? 'var(--crunkie-vegan)' : cookie.category.includes('chocolate') ? 'var(--crunkie-chocolate)' : 'var(--crunkie-blue)';

  return (
    <>
      {/* HERO */}
      <section className="cd-hero">
        <div className="blob cd-hero__blob" />
        <div className="container cd-hero__grid">
          <div className="cd-hero__copy">
            <Link href="/cookies" className="cd-hero__back">← {ui.back}</Link>
            <div className="cd-hero__badges">
              {cookie.vegan && <span className="chip chip--vegan">🌱 Vegan</span>}
              <span className="chip chip--dark">XL · 110g</span>
              {cookie.category.includes('specials') && <span className="chip chip--red">Special</span>}
            </div>
            <h1>{cookie.name}</h1>
            <p className="cd-hero__sub">{t.desc}</p>
            {t.mood && <p className="lead" style={{ marginTop: 12 }}>{t.mood}</p>}
            <div className="cd-hero__row">
              <div className="cd-hero__price">
                <span className="eyebrow">{ui.price}</span>
                <span className="cd-hero__price-num">{cookie.price}</span>
              </div>
              <div className="cd-hero__ctas">
                <Link href="/contact" className="btn btn--primary">{ui.visit}</Link>
                <Link href="/b2b" className="btn btn--ghost">{ui.bulk}</Link>
              </div>
            </div>
          </div>
          <div className="cd-hero__visual">
            <div className="cd-hero__disc" style={{ background: `radial-gradient(circle, ${discColor}55, transparent 70%)` }} />
            <Image src={cookie.image} alt={cookie.name} width={500} height={500} className="float" />
            <span className="cd-hero__sticker cd-hero__sticker--red">★ XL</span>
            <span className="cd-hero__sticker cd-hero__sticker--cream">110g</span>
            <span className="cd-hero__sticker cd-hero__sticker--blue">Warm</span>
          </div>
        </div>
      </section>

      {/* TAGS */}
      <section className="cd-tags-section">
        <div className="container">
          <div className="cd-tags-inner">
            {(t.tags ?? []).map(tag => (
              <span key={tag} className={`cd-tag${/vegan/i.test(tag) ? ' cd-tag--vegan' : ' cd-tag--plain'}`}>
                {tag}
              </span>
            ))}
            {(t.tags ?? []).length > 0 && cookie.category.length > 0 && (
              <span className="cd-tags-sep" />
            )}
            {cookie.category.map(cat => (
              <Link key={cat} href={`/cookies?cat=${cat}`} className="cd-tag cd-tag--cat">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PERSONALITY */}
      <section className="cd-personality">
        <div className="container cd-personality__grid">
          <div>
            <span className="eyebrow">{ui.pEye}</span>
            <h2>{ui.pTitle}</h2>
          </div>
          <div className="cd-personality__items">
            {[
              { icon: '🎯', title: lang === 'de' ? 'Charakter' : 'Character', text: t.mood ?? t.desc },
              { icon: '🎵', title: lang === 'de' ? 'Pairing-Vibe' : 'Pairing Vibe', text: lang === 'de' ? 'Cold brew oder kalte Milch — nichts dazwischen.' : 'Cold brew or cold milk — nothing in between.' },
              { icon: '⏱️', title: lang === 'de' ? 'Perfekter Moment' : 'Perfect moment', text: lang === 'de' ? '15:30 Uhr Energietief oder Sonntag-Abend-Selbstbelohnung.' : '3:30 PM energy dip or Sunday evening self-reward.' },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i} className="cd-person">
                <span className="cd-person__icon">{p.icon}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="cd-related">
          <div className="container">
            <h2 style={{ marginBottom: 40 }}>{ui.relatedTitle}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
              {related.map((c, i) => (
                <CookieCard key={c.id} cookie={c} lang={lang} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .cd-hero { padding: 60px 0 80px; position: relative; overflow: hidden; }
        .cd-hero__blob { width: 700px; height: 700px; background: var(--crunkie-blue); opacity: 0.12; top: -280px; right: -200px; }
        .cd-hero__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; position: relative; z-index: 2; }
        .cd-hero__back { font-weight: 600; font-size: 14px; color: var(--crunkie-blue); display: inline-flex; align-items: center; gap: 6px; margin-bottom: 24px; border-bottom: 1px solid rgba(77,119,146,0.3); padding-bottom: 2px; transition: gap .2s; }
        .cd-hero__back:hover { gap: 10px; }
        .cd-hero__badges { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
        .cd-hero h1 { font-size: clamp(40px, 6vw, 96px); margin-bottom: 16px; }
        .cd-hero__sub { font-size: clamp(16px, 1.3vw, 20px); line-height: 1.5; color: color-mix(in oklab, var(--crunkie-chocolate) 75%, transparent); margin-top: 8px; }
        .cd-hero__row { display: flex; gap: 40px; align-items: center; flex-wrap: wrap; margin-top: 36px; }
        .cd-hero__price { display: flex; flex-direction: column; gap: 4px; }
        .cd-hero__price-num { font-family: var(--ff-display); font-weight: 800; font-size: clamp(36px, 4vw, 56px); color: var(--crunkie-red); letter-spacing: -0.03em; line-height: 1; }
        .cd-hero__ctas { display: flex; flex-wrap: wrap; gap: 12px; }
        .cd-hero__visual { position: relative; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; }
        .cd-hero__disc { position: absolute; inset: 5%; border-radius: 50%; }
        .cd-hero__visual img { position: relative; z-index: 2; width: 90%; height: auto; filter: drop-shadow(0 50px 60px rgba(58,36,29,0.55)); }
        .cd-hero__sticker {
          position: absolute; border-radius: 999px; font-family: var(--ff-display); font-weight: 700; font-size: 13px; padding: 10px 18px; z-index: 3; box-shadow: var(--shadow-sm);
        }
        .cd-hero__sticker--red { background: var(--crunkie-red); color: var(--crunkie-white); top: 10%; right: 5%; transform: rotate(12deg); }
        .cd-hero__sticker--cream { background: var(--crunkie-cream); color: var(--crunkie-dark); bottom: 20%; right: -2%; transform: rotate(-8deg); }
        .cd-hero__sticker--blue { background: var(--crunkie-blue); color: var(--crunkie-white); bottom: 10%; left: 5%; transform: rotate(5deg); }
        .cd-tags-section {
          padding: clamp(14px,2vw,26px) 0;
          border-top: 1px solid rgba(31,23,20,0.07);
          border-bottom: 1px solid rgba(31,23,20,0.07);
          background: rgba(255,253,248,0.6);
        }
        .cd-tags-inner { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
        .cd-tags-sep { display: block; width: 1px; height: 20px; background: rgba(31,23,20,0.15); border-radius: 1px; flex-shrink: 0; }
        .cd-tag {
          display: inline-flex; align-items: center; height: 34px; padding: 0 14px;
          border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; white-space: nowrap;
          transition: transform .2s cubic-bezier(.2,.8,.2,1), box-shadow .2s, background .2s, color .2s, border-color .2s;
        }
        .cd-tag--plain {
          background: var(--crunkie-white); color: var(--crunkie-chocolate);
          border: 1.5px solid rgba(31,23,20,0.1);
        }
        .cd-tag--plain:hover { transform: translateY(-1px); box-shadow: var(--shadow-sm); border-color: rgba(31,23,20,0.22); }
        .cd-tag--vegan {
          background: color-mix(in oklab, var(--crunkie-vegan) 12%, var(--crunkie-white));
          color: var(--crunkie-vegan);
          border: 1.5px solid color-mix(in oklab, var(--crunkie-vegan) 30%, transparent);
        }
        .cd-tag--vegan:hover {
          background: var(--crunkie-vegan); color: var(--crunkie-white);
          transform: translateY(-1px); box-shadow: 0 6px 16px -4px rgba(92,126,74,0.4);
        }
        .cd-tag--cat {
          background: color-mix(in oklab, var(--crunkie-blue) 10%, var(--crunkie-white));
          color: var(--crunkie-blue-deep);
          border: 1.5px solid color-mix(in oklab, var(--crunkie-blue) 22%, transparent);
          gap: 5px;
        }
        .cd-tag--cat::after { content: "→"; font-size: 10px; opacity: 0.55; transition: transform .2s, opacity .2s; }
        .cd-tag--cat:hover {
          background: var(--crunkie-blue); color: var(--crunkie-white); border-color: var(--crunkie-blue);
          transform: translateY(-2px); box-shadow: 0 6px 16px -4px rgba(77,119,146,0.45);
        }
        .cd-tag--cat:hover::after { opacity: 1; transform: translateX(2px); }
        .cd-personality { background: var(--crunkie-soft-cream); }
        .cd-personality__grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 60px; align-items: start; }
        .cd-personality h2 em { font-style: normal; color: var(--crunkie-blue); }
        .cd-personality__items { display: flex; flex-direction: column; gap: 8px; }
        .cd-person { display: flex; gap: 20px; align-items: flex-start; padding: 24px 0; border-bottom: 1px solid rgba(31,23,20,0.1); }
        .cd-person__icon { width: 52px; height: 52px; display: grid; place-items: center; background: var(--crunkie-white); border-radius: 50%; font-size: 22px; flex-shrink: 0; box-shadow: var(--shadow-sm); }
        .cd-person h3 { font-size: 20px; margin-bottom: 4px; }
        .cd-person p { color: color-mix(in oklab, var(--crunkie-chocolate) 75%, transparent); font-size: 15px; }
        .cd-related { padding-bottom: clamp(80px,10vw,140px); }
        @media (max-width: 900px) {
          .cd-hero__grid, .cd-personality__grid { grid-template-columns: 1fr; gap: 40px; }
          .cd-hero__visual { max-width: 420px; margin: 0 auto; }
        }
        @media (max-width: 640px) {
          .cd-related div[style] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
