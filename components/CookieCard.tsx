'use client';
import Link from 'next/link';
import Image from 'next/image';
import type { Cookie, Lang } from '../types';

const VARIANTS = ['cream', 'blue', 'red', 'dark', 'cream', 'gold'] as const;

interface Props {
  cookie: Cookie;
  lang: Lang;
  index?: number;
  delay?: number;
}

export default function CookieCard({ cookie, lang, index = 0, delay }: Props) {
  const t = cookie[lang] ?? cookie.de;
  const variant = cookie.vegan ? 'vegan' : VARIANTS[index % VARIANTS.length];
  const categories = [...cookie.category, ...(cookie.vegan ? ['vegan'] : [])].join(' ');

  const learnMore = lang === 'en' ? 'Learn more' : 'Mehr erfahren';

  return (
    <Link
      href={`/cookies/${cookie.id}`}
      className={`cookie-card cookie-card--${variant}${cookie.vegan ? ' is-vegan' : ''}`}
      data-categories={categories}
      style={delay ? { transitionDelay: `${delay * 0.08}s` } : undefined}
    >
      <div className="cookie-card__media">
        <Image
          src={cookie.image}
          alt={cookie.name}
          width={280}
          height={280}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      <div className="cookie-card__head">
        <div className="cookie-card__name">{cookie.name}</div>
        <div className="cookie-card__price">{cookie.price}</div>
      </div>
      <div className="cookie-card__desc">{t.desc}</div>
      <div className="cookie-card__tags">
        {(t.tags ?? []).map(tag => (
          <span key={tag} className={`tag${/vegan/i.test(tag) ? ' tag--vegan' : ''}`}>{tag}</span>
        ))}
      </div>
      <span className="cookie-card__cta">{learnMore}</span>
    </Link>
  );
}
