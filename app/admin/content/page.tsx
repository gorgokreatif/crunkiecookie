'use client';
import { useState, useEffect } from 'react';
import type { SiteContent } from '../../../types';

const SECTION_LABELS: Record<string, string> = {
  home: '🏠 Anasayfa',
  about: 'ℹ️ Hakkımızda',
  cookies: '🍪 Cookies',
  contact: '📬 İletişim',
  b2b: '💼 B2B',
  nav: '🔗 Navigasyon',
  footer: '📄 Footer',
};

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => r.json())
      .then(data => { setContent(data); setLoading(false); });
  }, []);

  const updateField = (section: string, lang: 'de' | 'en', key: string, value: string) => {
    setContent(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: {
          ...prev[section as keyof SiteContent],
          [lang]: {
            ...(prev[section as keyof SiteContent] as unknown as Record<string, Record<string, string>>)[lang],
            [key]: value,
          },
        },
      };
    });
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: '#6b5a52' }}>Yükleniyor...</div>;
  if (!content) return <div style={{ padding: 60, textAlign: 'center', color: '#AF5950' }}>İçerik yüklenemedi.</div>;

  const section = content[activeSection as keyof SiteContent];
  const deKeys = Object.keys((section as { de: Record<string, string> }).de);

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', borderRadius: 8,
    border: '1.5px solid rgba(31,23,20,0.12)', background: '#FFFDF8',
    fontFamily: 'inherit', fontSize: 14, color: '#3A241D',
    boxSizing: 'border-box', resize: 'vertical' as const,
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 32, fontWeight: 800, color: '#1F1714', margin: 0 }}>
            Sayfa İçerikleri
          </h1>
          <p style={{ color: '#6b5a52', marginTop: 4, marginBottom: 0 }}>Almanca ve İngilizce metinleri düzenleyin</p>
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

      <div style={{ display: 'flex', gap: 24 }}>
        {/* Section tabs sidebar */}
        <div style={{ width: 200, flexShrink: 0 }}>
          <div style={{ background: '#FFFDF8', borderRadius: 16, padding: 8, boxShadow: '0 4px 14px rgba(31,23,20,0.08)' }}>
            {Object.entries(SECTION_LABELS).map(([key, label]) => (
              <button key={key} onClick={() => setActiveSection(key)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '10px 14px', borderRadius: 10, border: 'none',
                background: activeSection === key ? '#1F1714' : 'transparent',
                color: activeSection === key ? '#FFFDF8' : '#3A241D',
                fontWeight: activeSection === key ? 700 : 500,
                fontSize: 14, cursor: 'pointer', marginBottom: 2,
              }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Fields editor */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ background: '#FFFDF8', borderRadius: 20, padding: 28, boxShadow: '0 4px 14px rgba(31,23,20,0.08)' }}>
            <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 22, fontWeight: 700, color: '#1F1714', marginBottom: 24 }}>
              {SECTION_LABELS[activeSection]}
            </h2>

            {/* Column headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', gap: 12, marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4D7792' }}>Alan</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4D7792' }}>🇩🇪 Almanca</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4D7792' }}>🇬🇧 İngilizce</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {deKeys.map(key => {
                const deVal = ((section as { de: Record<string, string> }).de)[key] ?? '';
                const enVal = ((section as { en: Record<string, string> }).en)[key] ?? '';
                const isLong = deVal.length > 80 || enVal.length > 80;

                return (
                  <div key={key} style={{
                    display: 'grid',
                    gridTemplateColumns: '180px 1fr 1fr',
                    gap: 12,
                    alignItems: 'start',
                    paddingBottom: 12,
                    borderBottom: '1px solid rgba(31,23,20,0.06)',
                  }}>
                    <div style={{
                      fontSize: 12, fontWeight: 600, color: '#6b5a52',
                      fontFamily: 'monospace', paddingTop: 12, wordBreak: 'break-all',
                    }}>
                      {key}
                    </div>
                    <textarea
                      rows={isLong ? 3 : 1}
                      style={inputStyle}
                      value={deVal}
                      onChange={e => updateField(activeSection, 'de', key, e.target.value)}
                    />
                    <textarea
                      rows={isLong ? 3 : 1}
                      style={inputStyle}
                      value={enVal}
                      onChange={e => updateField(activeSection, 'en', key, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* HTML tip */}
          <div style={{ marginTop: 16, padding: '12px 16px', background: '#EDF3F7', borderRadius: 12, fontSize: 13, color: '#4D7792' }}>
            <strong>Not:</strong> Bazı alanlar HTML içerebilir (<code>&lt;em&gt;</code>, <code>&lt;strong&gt;</code>, <code>&lt;br&gt;</code>). HTML etiketleri sitede olduğu gibi render edilir.
          </div>
        </div>
      </div>
    </div>
  );
}
