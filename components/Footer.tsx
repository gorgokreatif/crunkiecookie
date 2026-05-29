'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from './LangContext';

export default function Footer() {
  const { lang } = useLang();

  const t = {
    de: {
      slogan: 'Warme Cookies. Starke Momente. Crunkie.',
      explore: 'Entdecken', business: 'Business', contact: 'Kontakt',
      hours: 'Öffnungszeiten', h1: 'Mo – Fr: 11:00 – 21:00', h2: 'Sa – So: 12:00 – 22:00',
      rights: '© 2026 Crunkie. Alle Rechte vorbeschmeckt.',
      legal1: 'Impressum', legal2: 'Datenschutz', legal3: 'AGB',
      home: 'Startseite', about: 'Über uns', cookieWorld: 'Cookie-Welt',
      b2b: 'B2B', gifts: 'Business Gifts', catering: 'Event & Catering', request: 'Angebot anfragen',
    },
    en: {
      slogan: 'Warm cookies. Bold moments. Crunkie.',
      explore: 'Explore', business: 'Business', contact: 'Contact',
      hours: 'Opening hours', h1: 'Mon – Fri: 11:00 – 21:00', h2: 'Sat – Sun: 12:00 – 22:00',
      rights: '© 2026 Crunkie. All rights pre-tasted.',
      legal1: 'Imprint', legal2: 'Privacy', legal3: 'Terms',
      home: 'Home', about: 'About us', cookieWorld: 'Cookie World',
      b2b: 'B2B', gifts: 'Business Gifts', catering: 'Event & Catering', request: 'Request offer',
    },
  }[lang];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__shout" aria-hidden="true">
          Crunkie · Crunkie · Crunkie · Crunkie · Crunkie
        </div>
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Image src="/assets/logo-crunkie-light.png" alt="Crunkie" width={215} height={50} />
            <p>{t.slogan}</p>
          </div>
          <div>
            <h4>{t.explore}</h4>
            <ul>
              <li><Link href="/">{t.home}</Link></li>
              <li><Link href="/about">{t.about}</Link></li>
              <li><Link href="/cookies">{t.cookieWorld}</Link></li>
              <li><Link href="/contact">{t.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t.business}</h4>
            <ul>
              <li><Link href="/b2b">{t.b2b}</Link></li>
              <li><Link href="/b2b">{t.gifts}</Link></li>
              <li><Link href="/b2b">{t.catering}</Link></li>
              <li><Link href="/b2b#form">{t.request}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t.contact}</h4>
            <ul>
              <li>Am Neutor 6, Bonn / Köln</li>
              <li><a href="mailto:hello@crunkiecookie.com">hello@crunkiecookie.com</a></li>
              <li><a href="mailto:b2b@crunkiecookie.com">b2b@crunkiecookie.com</a></li>
              <li><a href="https://instagram.com/crunkiecookie">@crunkiecookie</a></li>
            </ul>
            <h4 style={{ marginTop: 24 }}>{t.hours}</h4>
            <ul>
              <li>{t.h1}</li>
              <li>{t.h2}</li>
            </ul>
          </div>
        </div>
        <div className="site-footer__base">
          <span>{t.rights}</span>
          <span style={{ display: 'flex', gap: 20 }}>
            <a href="#">{t.legal1}</a>
            <a href="#">{t.legal2}</a>
            <a href="#">{t.legal3}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
