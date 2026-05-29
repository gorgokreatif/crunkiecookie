'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Cookie } from '../../../types';

export default function AdminCookiesPage() {
  const [cookies, setCookies] = useState<Cookie[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    const res = await fetch('/api/admin/cookies');
    setCookies(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" cookie'sini silmek istediğinize emin misiniz?`)) return;
    setDeleting(id);
    await fetch('/api/admin/cookies', { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Content-Type': 'application/json' } });
    await load();
    setDeleting(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 36, fontWeight: 800, color: '#1F1714', margin: 0, letterSpacing: '-0.02em' }}>Cookie Yönetimi</h1>
          <p style={{ color: '#6b5a52', marginTop: 4 }}>{cookies.length} cookie mevcut</p>
        </div>
        <Link href="/admin/cookies/new" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px',
          background: '#AF5950', color: '#FFFDF8', borderRadius: 999,
          fontWeight: 600, fontSize: 15, textDecoration: 'none',
        }}>
          + Yeni Cookie Ekle
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 80, color: '#6b5a52' }}>Yükleniyor...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {cookies.map(c => (
            <div key={c.id} style={{
              background: '#FFFDF8', borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 4px 14px rgba(31,23,20,0.08)', display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ background: '#F7F0E7', padding: 20, display: 'flex', justifyContent: 'center' }}>
                <Image src={c.image} alt={c.name} width={120} height={120} style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 18, color: '#1F1714' }}>{c.name}</span>
                  <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, color: '#AF5950' }}>{c.price}</span>
                </div>
                <p style={{ fontSize: 13, color: '#6b5a52', lineHeight: 1.4 }}>{c.de.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {c.category.map(cat => (
                    <span key={cat} style={{ fontSize: 11, fontWeight: 600, padding: '4px 8px', background: '#F7F0E7', borderRadius: 999, color: '#3A241D', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{cat}</span>
                  ))}
                  {c.vegan && <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', background: '#5C7E4A', color: 'white', borderRadius: 999 }}>VEGAN</span>}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <Link href={`/admin/cookies/${c.id}`} style={{
                    flex: 1, textAlign: 'center', padding: '10px', background: '#EDF3F7',
                    color: '#4D7792', borderRadius: 10, fontWeight: 600, fontSize: 13, textDecoration: 'none',
                  }}>
                    Düzenle
                  </Link>
                  <button
                    onClick={() => handleDelete(c.id, c.name)}
                    disabled={deleting === c.id}
                    style={{
                      flex: 1, padding: '10px', background: '#FBF0EF',
                      color: '#AF5950', borderRadius: 10, fontWeight: 600, fontSize: 13,
                      border: 'none', cursor: 'pointer', opacity: deleting === c.id ? 0.5 : 1,
                    }}
                  >
                    {deleting === c.id ? '...' : 'Sil'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
