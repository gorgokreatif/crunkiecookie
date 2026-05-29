'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLang } from './LangContext';

const navKeys = [
  { key: 'home', href: '/', i18n: { de: 'Startseite', en: 'Home' } },
  { key: 'about', href: '/about', i18n: { de: 'Über uns', en: 'About' } },
  { key: 'cookies', href: '/cookies', i18n: { de: 'Cookies', en: 'Cookies' } },
  { key: 'b2b', href: '/b2b', i18n: { de: 'B2B', en: 'B2B' } },
  { key: 'contact', href: '/contact', i18n: { de: 'Kontakt', en: 'Contact' } },
];

export default function Header() {
  const { lang, setLang } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const ctaLabel = lang === 'de' ? 'Jetzt vorbeikommen' : 'Visit us today';

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} id="siteHeader">
        <div className="container">
          <div className="site-header__inner">
            <Link href="/" className="site-header__logo" aria-label="Crunkie">
              <Image src="/assets/logo-crunkie.png" alt="Crunkie" width={155} height={36} />
            </Link>

            <nav className="nav">
              {navKeys.map(n => (
                <Link key={n.key} href={n.href} className={isActive(n.href) ? 'is-active' : ''}>
                  {n.i18n[lang]}
                </Link>
              ))}
            </nav>

            <div className="lang-switch lang-switch--desktop" role="tablist">
              <button data-lang="de" className={lang === 'de' ? 'is-active' : ''} onClick={() => setLang('de')}>DE</button>
              <button data-lang="en" className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')}>EN</button>
            </div>

            <Link
              href={pathname === '/b2b' ? '/b2b#form' : '/contact'}
              className="btn btn--primary btn--header"
            >
              {pathname === '/b2b'
                ? (lang === 'de' ? 'B2B Angebot anfragen' : 'Request B2B offer')
                : ctaLabel}
            </Link>

            <button
              className={`hamburger${drawerOpen ? ' is-open' : ''}`}
              onClick={() => setDrawerOpen(o => !o)}
              aria-label="Menu"
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-drawer${drawerOpen ? ' is-open' : ''}`}>
        <div className="mobile-drawer__top">
          <Image src="/assets/logo-crunkie-light.png" alt="Crunkie" width={155} height={36} />
          <div className="lang-switch">
            <button className={lang === 'de' ? 'is-active' : ''} onClick={() => setLang('de')}>DE</button>
            <button className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
        </div>
        <nav>
          {navKeys.map(n => (
            <Link
              key={n.key}
              href={n.href}
              className={isActive(n.href) ? 'is-active' : ''}
              onClick={() => setDrawerOpen(false)}
            >
              {n.i18n[lang]}
            </Link>
          ))}
        </nav>
        <div className="mobile-drawer__footer">Am Neutor 6 · Bonn / Köln · @crunkiecookie</div>
      </div>
    </>
  );
}
