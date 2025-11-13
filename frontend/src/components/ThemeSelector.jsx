import React from 'react'

const themes = [
  { id: 'vibrant', name: 'Vibrant', bg: '#0ea5e9', color: '#ffffff' },
  { id: 'minimal', name: 'Minimal', bg: '#111827', color: '#e5e7eb' },
  { id: 'elegant', name: 'Elegant', bg: '#1f2937', color: '#f59e0b' },
  { id: 'playful', name: 'Playful', bg: '#a78bfa', color: '#111827' },
]

export default function ThemeSelector({ value, onChange }){
  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
      <h3 className="font-semibold mb-3">Theme</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {themes.map(t => (
          <button key={t.id} onClick={() => onChange(t)} className={`rounded-lg p-4 border ${value?.id===t.id?'border-white':'border-white/10'}`} style={{ background: t.bg, color: t.color }}>
            {t.name}
          </button>
        ))}
      </div>
    </div>
  )
}
