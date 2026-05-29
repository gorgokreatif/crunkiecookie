'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', label: '🏠 Dashboard' },
  { href: '/admin/cookies', label: '🍪 Cookies' },
  { href: '/admin/content', label: '✏️ Sayfa İçerikleri' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
      {navItems.map(item => {
        const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} style={{
            display: 'block', padding: '10px 12px', borderRadius: 10,
            color: '#E8E1D7', fontSize: 14, fontWeight: isActive ? 700 : 500,
            textDecoration: 'none',
            background: isActive ? 'rgba(232,225,215,0.12)' : 'transparent',
          }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(232,225,215,0.08)'; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
