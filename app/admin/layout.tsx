import Link from 'next/link';
import { auth, signOut } from '../../auth';
import AdminNav from './AdminNav';

export const metadata = { title: 'Crunkie Admin' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F0E7', fontFamily: 'var(--ff-body)' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, background: '#1B3A52', color: '#E8E1D7', flexShrink: 0,
        display: 'flex', flexDirection: 'column', padding: '24px 0',
      }}>
        <div style={{ padding: '0 24px 24px', borderBottom: '1px solid rgba(232,225,215,0.12)' }}>
          <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 800, fontSize: 22, color: '#FFFDF8', letterSpacing: '-0.02em' }}>
            Crunkie
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.6, marginTop: 2 }}>
            Admin Panel
          </div>
        </div>

        <AdminNav />

        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(232,225,215,0.12)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'rgba(232,225,215,0.5)' }}>
            {session.user?.name ?? 'Admin'}
          </div>
          <Link href="/" style={{ fontSize: 13, color: 'rgba(232,225,215,0.6)', textDecoration: 'none' }}>
            ← Siteye dön
          </Link>
          <form action={async () => {
            'use server';
            await signOut({ redirectTo: '/admin/login' });
          }}>
            <button type="submit" style={{
              background: 'none', border: '1px solid rgba(232,225,215,0.2)',
              color: 'rgba(232,225,215,0.6)', borderRadius: 8, padding: '6px 12px',
              fontSize: 12, cursor: 'pointer', width: '100%', textAlign: 'left',
            }}>
              Çıkış Yap
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ flex: 1, padding: 32, maxWidth: 1200 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
