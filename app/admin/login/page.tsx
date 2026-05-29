'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Suspense } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Kullanıcı adı veya şifre hatalı.');
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#F7F0E7', fontFamily: 'var(--ff-body)',
    }}>
      <div style={{ width: '100%', maxWidth: 400, padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Image src="/assets/logo-crunkie.png" alt="Crunkie" width={155} height={36}
            style={{ margin: '0 auto 20px', display: 'block' }} />
          <h1 style={{
            fontFamily: 'var(--ff-display)', fontSize: 28, fontWeight: 800,
            color: '#1F1714', margin: 0, letterSpacing: '-0.02em',
          }}>Admin Girişi</h1>
          <p style={{ color: '#6b5a52', marginTop: 6, fontSize: 14 }}>
            Crunkie yönetim paneline giriş yapın
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{
                display: 'block', fontSize: 12, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#4D7792', marginBottom: 6,
              }}>
                Kullanıcı Adı
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 10,
                  border: error ? '1.5px solid #AF5950' : '1.5px solid rgba(31,23,20,0.12)',
                  background: '#FFFDF8', fontFamily: 'inherit', fontSize: 15,
                  color: '#3A241D', boxSizing: 'border-box', outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block', fontSize: 12, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#4D7792', marginBottom: 6,
              }}>
                Şifre
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 10,
                  border: error ? '1.5px solid #AF5950' : '1.5px solid rgba(31,23,20,0.12)',
                  background: '#FFFDF8', fontFamily: 'inherit', fontSize: 15,
                  color: '#3A241D', boxSizing: 'border-box', outline: 'none',
                }}
              />
            </div>

            {error && (
              <p style={{ color: '#AF5950', fontSize: 13, fontWeight: 600, margin: 0 }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '14px', background: loading ? '#c9908a' : '#AF5950',
                color: '#FFFDF8', borderRadius: 999, fontWeight: 700, fontSize: 15,
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background .2s',
              }}
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
