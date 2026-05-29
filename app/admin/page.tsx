'use client';
import Link from 'next/link';
import cookiesData from '../../data/cookies.json';

export default function AdminDashboard() {
  const total = cookiesData.length;
  const vegan = cookiesData.filter((c) => c.vegan).length;

  const cards = [
    { label: 'Toplam Cookie', value: total, icon: '🍪', href: '/admin/cookies', color: '#AF5950' },
    { label: 'Vegan Cookie', value: vegan, icon: '🌱', href: '/admin/cookies', color: '#5C7E4A' },
    { label: 'Sayfalar', value: 6, icon: '📄', href: '/admin/content', color: '#4D7792' },
    { label: 'Diller', value: 2, icon: '🌍', href: '/admin/content', color: '#C79A5B' },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 36, fontWeight: 800, color: '#1F1714', marginBottom: 8, letterSpacing: '-0.02em' }}>
        Dashboard
      </h1>
      <p style={{ color: '#6b5a52', marginBottom: 40 }}>Crunkie yönetim paneline hoş geldiniz.</p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 48 }}>
        {cards.map(c => (
          <Link key={c.label} href={c.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#FFFDF8', borderRadius: 20, padding: 28, boxShadow: '0 4px 14px rgba(31,23,20,0.08)',
              transition: 'transform .3s', cursor: 'pointer',
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = '')}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: 42, fontWeight: 800, color: c.color, lineHeight: 1, letterSpacing: '-0.03em' }}>{c.value}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#6b5a52', marginTop: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{c.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 24, fontWeight: 700, color: '#1F1714', marginBottom: 20 }}>Hızlı Erişim</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {[
          { href: '/admin/cookies/new', label: '+ Yeni Cookie Ekle', color: '#AF5950', light: '#FBF0EF' },
          { href: '/admin/cookies', label: '🍪 Tüm Cookieleri Yönet', color: '#4D7792', light: '#EDF3F7' },
          { href: '/admin/content', label: '✏️ Sayfa Metinlerini Düzenle', color: '#5C7E4A', light: '#EFF3ED' },
          { href: '/', label: '👁 Siteyi Görüntüle', color: '#1B3A52', light: '#EBF0F3' },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{
            display: 'block', padding: '20px 24px', borderRadius: 16,
            background: item.light, color: item.color,
            fontWeight: 600, fontSize: 15, textDecoration: 'none',
            transition: 'opacity .2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Cookie list preview */}
      <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 24, fontWeight: 700, color: '#1F1714', marginTop: 48, marginBottom: 20 }}>Cookie Listesi</h2>
      <div style={{ background: '#FFFDF8', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 14px rgba(31,23,20,0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F7F0E7' }}>
              {['İsim', 'Fiyat', 'Kategoriler', 'Vegan', 'İşlemler'].map(h => (
                <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b5a52' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cookiesData.map((c, i) => (
              <tr key={c.id} style={{ borderTop: '1px solid rgba(31,23,20,0.06)', background: i % 2 === 0 ? '#FFFDF8' : '#FDFAF6' }}>
                <td style={{ padding: '14px 20px', fontWeight: 600, color: '#1F1714' }}>{c.name}</td>
                <td style={{ padding: '14px 20px', color: '#AF5950', fontWeight: 600 }}>{c.price}</td>
                <td style={{ padding: '14px 20px', color: '#6b5a52', fontSize: 13 }}>{c.category.join(', ')}</td>
                <td style={{ padding: '14px 20px' }}>{c.vegan ? <span style={{ color: '#5C7E4A', fontWeight: 700 }}>✓</span> : <span style={{ color: '#ccc' }}>—</span>}</td>
                <td style={{ padding: '14px 20px' }}>
                  <Link href={`/admin/cookies/${c.id}`} style={{ color: '#4D7792', fontWeight: 600, fontSize: 13, textDecoration: 'none', marginRight: 12 }}>Düzenle</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
