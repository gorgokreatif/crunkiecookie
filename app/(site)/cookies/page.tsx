'use client';
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLang } from '../../../components/LangContext';
import CookieCard from '../../../components/CookieCard';
import Reveal from '../../../components/Reveal';
import cookiesData from '../../../data/cookies.json';
import type { Cookie } from '../../../types';

const cookies = cookiesData as Cookie[];

function CookiesPageInner() {
  const { lang } = useLang();
  const params = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const cat = params.get('cat');
    if (cat) setActiveFilter(cat);
  }, [params]);

  const t = {
    de: {
      eye: 'Cookies · Cookie-Welt',
      title: <>Unsere <em>Cookie-Welt.</em></>,
      sub: 'Groß, weich, intensiv und voller Charakter. Jeder Crunkie hat seinen eigenen Geschmack, Look und Moment.',
      all: 'Alle', classics: 'Klassiker', chocolate: 'Schokolade', nutty: 'Nussig',
      fruity: 'Fruchtig', specials: 'Specials', vegan: 'Vegan',
      vstTitle: <>Zwei Cookies, <em>kein Kompromiss.</em></>,
      vstText: 'Unsere veganen Cookies sind 100% pflanzlich gebacken — mit demselben großen Genuss, den du von Crunkie kennst.',
    },
    en: {
      eye: 'Cookies · Cookie World',
      title: <>Our <em>Cookie World.</em></>,
      sub: 'Big, soft, rich and full of character. Every Crunkie has its own taste, look and moment.',
      all: 'All', classics: 'Classics', chocolate: 'Chocolate', nutty: 'Nutty',
      fruity: 'Fruity', specials: 'Specials', vegan: 'Vegan',
      vstTitle: <>Two cookies, <em>zero compromise.</em></>,
      vstText: 'Our vegan cookies are baked 100% plant-based — with the same big indulgence you know from Crunkie.',
    },
  }[lang];

  const filters = [
    { key: 'all', label: t.all },
    { key: 'classics', label: t.classics },
    { key: 'chocolate', label: t.chocolate },
    { key: 'nutty', label: t.nutty },
    { key: 'fruity', label: t.fruity },
    { key: 'specials', label: t.specials },
    { key: 'vegan', label: t.vegan, isVegan: true },
  ];

  const filtered = activeFilter === 'all'
    ? cookies
    : cookies.filter(c => c.category.includes(activeFilter));

  const veganCookies = cookies.filter(c => c.vegan);

  return (
    <>
      {/* HERO */}
      <section className="cw-hero">
        <div className="blob cw-hero__blob" />
        <div className="container cw-hero__inner">
          <span className="eyebrow">{t.eye}</span>
          <Reveal tag="h1">{t.title}</Reveal>
          <Reveal delay={1} tag="p" className="lead">{t.sub}</Reveal>
          <Reveal delay={2} className="cw-hero__cookies">
            {['/assets/cookie-oreo.png', '/assets/cookie-pistachio.png', '/assets/cookie-redflag.png',
              '/assets/cookie-walnut.png', '/assets/cookie-matcha-kiss.png', '/assets/cookie-lotus.png'].map((src, i) => (
              <Image key={i} src={src} alt="" width={160} height={160}
                className={['float', 'float-2', 'float-3', 'float', 'float-2', 'float-3'][i]} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* FILTERS + GRID */}
      <section className="cw-grid-wrap section-tight" id="grid">
        <div className="container">
          <Reveal className="filters">
            {filters.map(f => (
              <button
                key={f.key}
                className={`${activeFilter === f.key ? 'is-active' : ''}${f.isVegan ? ' vegan-filter' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </Reveal>
          <div className="cw-grid">
            {filtered.map((c, i) => (
              <CookieCard key={c.id} cookie={c} lang={lang} index={i} delay={(i % 4) + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* VEGAN BANNER */}
      <section className="cw-veganstrip">
        <div className="container">
          <Reveal className="cw-veganstrip__card">
            <div>
              <span className="eyebrow" style={{ color: 'var(--crunkie-vegan-soft)' }}>🌱 Vegan Line</span>
              <h2>{t.vstTitle}</h2>
              <p>{t.vstText}</p>
            </div>
            <div className="cw-veganstrip__row">
              {veganCookies.map((c, i) => (
                <CookieCard key={c.id} cookie={c} lang={lang} index={i} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .cw-hero { padding: 56px 0 60px; position: relative; overflow: hidden; text-align: center; }
        .cw-hero__inner { max-width: 880px; margin: 0 auto; }
        .cw-hero h1 { font-size: clamp(48px, 8vw, 140px); margin: 18px 0; }
        .cw-hero h1 em { font-style: normal; color: var(--crunkie-red); }
        .cw-hero p { margin: 0 auto; }
        .cw-hero__blob { width: 700px; height: 700px; background: var(--crunkie-blue); opacity: 0.12; top: -250px; left: 50%; transform: translateX(-50%); }
        .cw-hero__cookies { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; margin-top: 50px; }
        .cw-hero__cookies img { width: 100%; aspect-ratio: 1; object-fit: contain; filter: drop-shadow(0 18px 18px rgba(58,36,29,0.4)); }
        .cw-hero__cookies img:nth-child(odd) { transform: translateY(-10px); }
        .cw-hero__cookies img:nth-child(even) { transform: translateY(10px); }
        .cw-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .cw-veganstrip { padding-bottom: 0; }
        .cw-veganstrip__card {
          background: linear-gradient(135deg, var(--crunkie-vegan), color-mix(in oklab, var(--crunkie-vegan) 65%, black));
          color: var(--crunkie-white); border-radius: var(--radius-xl);
          padding: clamp(36px, 5vw, 70px); display: grid; grid-template-columns: 1fr 1.2fr;
          gap: 50px; align-items: center; position: relative; overflow: hidden;
        }
        .cw-veganstrip__card::before {
          content: ""; position: absolute; width: 360px; height: 360px; border-radius: 50%;
          background: rgba(255,253,248,0.08); top: -120px; left: -120px;
        }
        .cw-veganstrip h2 { color: var(--crunkie-white); font-size: clamp(30px,4vw,56px); }
        .cw-veganstrip h2 em { font-style: normal; color: var(--crunkie-vegan-soft); }
        .cw-veganstrip p { color: rgba(255,253,248,0.88); margin-top: 18px; max-width: 460px; }
        .cw-veganstrip__row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 1000px) {
          .cw-grid { grid-template-columns: repeat(2, 1fr); }
          .cw-veganstrip__card { grid-template-columns: 1fr; gap: 36px; }
          .cw-hero__cookies { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .cw-grid { grid-template-columns: 1fr; }
          .cw-veganstrip__row { grid-template-columns: 1fr; }
          .cw-hero__cookies { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </>
  );
}

export default function CookiesPage() {
  return (
    <Suspense fallback={<div style={{ padding: 80, textAlign: 'center', color: '#6b5a52' }}>Yükleniyor...</div>}>
      <CookiesPageInner />
    </Suspense>
  );
}
