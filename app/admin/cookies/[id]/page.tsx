'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Cookie } from '../../../../types';

const EMPTY_COOKIE: Cookie = {
  id: '', name: '', image: '/assets/cookie-oreo.png', category: [], price: '5,00 €', vegan: false,
  de: { desc: '', tags: [], mood: '' },
  en: { desc: '', tags: [], mood: '' },
};

const ALL_CATEGORIES = ['chocolate', 'classics', 'nutty', 'fruity', 'specials', 'vegan'];

type UploadState = 'idle' | 'uploading' | 'done' | 'error';

export default function CookieEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === 'new';
  const [cookie, setCookie] = useState<Cookie>(EMPTY_COOKIE);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageFile = async (file: File) => {
    setPreview(URL.createObjectURL(file));
    setUploadState('uploading');
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();
      setCookie(prev => ({ ...prev, image: url }));
      setUploadState('done');
    } catch {
      setUploadState('error');
    }
  };

  useEffect(() => {
    if (isNew) return;
    fetch('/api/admin/cookies')
      .then(r => r.json())
      .then((list: Cookie[]) => {
        const found = list.find(c => c.id === id);
        if (found) setCookie(found);
        setLoading(false);
      });
  }, [id, isNew]);

  const update = (field: string, value: unknown) => {
    setCookie(prev => ({ ...prev, [field]: value }));
  };

  const updateLang = (lang: 'de' | 'en', field: string, value: string) => {
    setCookie(prev => ({ ...prev, [lang]: { ...prev[lang], [field]: value } }));
  };

  const updateTags = (lang: 'de' | 'en', raw: string) => {
    const tags = raw.split(',').map(t => t.trim()).filter(Boolean);
    setCookie(prev => ({ ...prev, [lang]: { ...prev[lang], tags } }));
  };

  const toggleCategory = (cat: string) => {
    setCookie(prev => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter(c => c !== cat)
        : [...prev.category, cat],
    }));
  };

  const handleSave = async () => {
    if (!cookie.id || !cookie.name) { alert('ID ve İsim zorunludur.'); return; }
    setSaving(true);
    await fetch('/api/admin/cookies', {
      method: 'POST',
      body: JSON.stringify(cookie),
      headers: { 'Content-Type': 'application/json' },
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    if (isNew) router.push(`/admin/cookies/${cookie.id}`);
  };

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: '#6b5a52' }}>Yükleniyor...</div>;

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 10,
    border: '1.5px solid rgba(31,23,20,0.12)', background: '#FFFDF8',
    fontFamily: 'inherit', fontSize: 15, color: '#3A241D',
    boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: '#4D7792', marginBottom: 6,
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Link href="/admin/cookies" style={{ fontSize: 13, color: '#4D7792', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>← Geri dön</Link>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 32, fontWeight: 800, color: '#1F1714', margin: 0 }}>
            {isNew ? 'Yeni Cookie Ekle' : `Düzenle: ${cookie.name}`}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {saved && <span style={{ color: '#5C7E4A', fontWeight: 600 }}>✓ Kaydedildi!</span>}
          <button onClick={handleSave} disabled={saving} style={{
            padding: '12px 28px', background: '#AF5950', color: '#FFFDF8',
            borderRadius: 999, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer',
            opacity: saving ? 0.7 : 1,
          }}>
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Sol: Temel bilgiler */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: '#FFFDF8', borderRadius: 20, padding: 28, boxShadow: '0 4px 14px rgba(31,23,20,0.08)' }}>
            <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: 20, fontWeight: 700, color: '#1F1714', marginBottom: 20 }}>Temel Bilgiler</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>ID (URL-slug)</label>
                <input style={inputStyle} value={cookie.id} onChange={e => update('id', e.target.value.toLowerCase().replace(/\s+/g, '-'))} disabled={!isNew} placeholder="crush-the-oreo" />
              </div>
              <div>
                <label style={labelStyle}>İsim</label>
                <input style={inputStyle} value={cookie.name} onChange={e => update('name', e.target.value)} placeholder="Crush the Oreo" />
              </div>
              <div>
                <label style={labelStyle}>Fiyat</label>
                <input style={inputStyle} value={cookie.price} onChange={e => update('price', e.target.value)} placeholder="5,00 €" />
              </div>
              <div>
                <label style={labelStyle}>Görsel</label>
                <label style={{
                  display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                  padding: '10px 14px', borderRadius: 10,
                  border: '1.5px dashed rgba(77,119,146,0.4)',
                  background: 'rgba(77,119,146,0.04)',
                  fontSize: 14, fontWeight: 600, color: '#4D7792',
                  transition: 'border-color .2s',
                }}>
                  <span style={{ fontSize: 20 }}>🖼️</span>
                  {uploadState === 'uploading' ? 'Yükleniyor...' : uploadState === 'done' ? '✓ Yüklendi' : uploadState === 'error' ? '⚠ Hata — tekrar dene' : 'Resim seç (PNG / JPG / WebP)'}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    style={{ display: 'none' }}
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleImageFile(f); }}
                  />
                </label>
                {(preview || cookie.image) && (
                  <Image
                    src={preview ?? cookie.image}
                    alt=""
                    width={100} height={100}
                    style={{ objectFit: 'contain', marginTop: 10, background: '#F7F0E7', borderRadius: 12, padding: 6 }}
                  />
                )}
                <label style={{ ...labelStyle, marginTop: 12 }}>veya URL gir</label>
                <input
                  style={inputStyle}
                  value={cookie.image}
                  onChange={e => { update('image', e.target.value); setPreview(null); }}
                  placeholder="https://... veya /assets/cookie-oreo.png"
                />
              </div>
              <div>
                <label style={labelStyle}>Kategoriler</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {ALL_CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => toggleCategory(cat)} style={{
                      padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                      border: '1.5px solid', cursor: 'pointer',
                      background: cookie.category.includes(cat) ? '#1F1714' : 'transparent',
                      color: cookie.category.includes(cat) ? '#E8E1D7' : '#3A241D',
                      borderColor: cookie.category.includes(cat) ? '#1F1714' : 'rgba(31,23,20,0.2)',
                    }}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Vegan</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input type="checkbox" checked={cookie.vegan} onChange={e => update('vegan', e.target.checked)} style={{ width: 18, height: 18 }} />
                  <span style={{ fontWeight: 600, color: cookie.vegan ? '#5C7E4A' : '#6b5a52' }}>
                    {cookie.vegan ? '🌱 Vegan ürün' : 'Vegan değil'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ: Dil içerikleri */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {(['de', 'en'] as const).map(lang => (
            <div key={lang} style={{ background: '#FFFDF8', borderRadius: 20, padding: 28, boxShadow: '0 4px 14px rgba(31,23,20,0.08)' }}>
              <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: 20, fontWeight: 700, color: '#1F1714', marginBottom: 20 }}>
                {lang === 'de' ? '🇩🇪 Almanca' : '🇬🇧 İngilizce'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Açıklama</label>
                  <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} value={cookie[lang].desc}
                    onChange={e => updateLang(lang, 'desc', e.target.value)} placeholder="Cookie açıklaması..." />
                </div>
                <div>
                  <label style={labelStyle}>Mood / Karakter</label>
                  <input style={inputStyle} value={cookie[lang].mood ?? ''} onChange={e => updateLang(lang, 'mood', e.target.value)} placeholder="Bold. Schokoladig. Selbstbewusst." />
                </div>
                <div>
                  <label style={labelStyle}>Etiketler (virgülle ayır)</label>
                  <input style={inputStyle} value={(cookie[lang].tags ?? []).join(', ')} onChange={e => updateTags(lang, e.target.value)} placeholder="Schoko, Oreo, Cremig" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div style={{ background: '#FFFDF8', borderRadius: 20, padding: 28, marginTop: 24, boxShadow: '0 4px 14px rgba(31,23,20,0.08)' }}>
        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: 20, fontWeight: 700, color: '#1F1714', marginBottom: 20 }}>Önizleme</h3>
        <div style={{ maxWidth: 300 }}>
          <Link href={`/cookies/${cookie.id}`} target="_blank" className="cookie-card cookie-card--cream" style={{ display: 'block' }}>
            <div className="cookie-card__media">
              {cookie.image && <Image src={cookie.image} alt={cookie.name} width={280} height={280} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
            </div>
            <div className="cookie-card__head">
              <div className="cookie-card__name">{cookie.name || 'Cookie İsmi'}</div>
              <div className="cookie-card__price">{cookie.price}</div>
            </div>
            <div className="cookie-card__desc">{cookie.de.desc || 'Açıklama burada görünecek.'}</div>
            <div className="cookie-card__tags">
              {(cookie.de.tags ?? []).map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
