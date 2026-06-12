import { useApp } from '../context/AppContext.jsx'
import BottomNav from '../components/BottomNav.jsx'

const MEDICINES_INFO = [
  { name: 'Jan Aushadhi Kendras', desc: 'Generic medicines at 50-90% lower prices than branded medicines', emoji: '💊', action: 'Find Near Me', query: 'Jan Aushadhi Kendra generic medicine store' },
  { name: 'Free Medicines at PHC', desc: 'Essential medicines available free at all government PHC, CHC, and District Hospitals', emoji: '🏥', action: 'Find PHC Near Me', query: 'primary health centre PHC government hospital' },
  { name: 'ESIC Dispensaries', desc: 'Free medicines for ESIC insured employees and their families', emoji: '🏨', action: 'Find ESIC Near Me', query: 'ESIC dispensary hospital' },
  { name: 'Cancer Medicines — Free', desc: 'Free chemotherapy medicines under NPCDCS at government cancer centres', emoji: '🎗️', action: 'Find Cancer Centre', query: 'government cancer centre hospital' },
  { name: 'TB Medicines — Free', desc: 'All TB medicines free under NTEP / DOTS programme at government centres', emoji: '🫁', action: 'Find DOTS Centre', query: 'DOTS centre TB treatment government' },
]

export default function MedicinesScreen() {
  const { profile, navigate } = useApp()

  const handleFind = (query) => {
    const location = [profile?.district, profile?.state].filter(Boolean).join(', ') || 'India'
    const mapsUrl  = `https://www.google.com/maps/search/${encodeURIComponent(query + ' near ' + location)}`
    window.open(mapsUrl, '_blank')
  }

  return (
    <div className="screen pb-28">

      <div className="screen-header">
        <button
          onClick={() => navigate('dashboard')}
          className="flex items-center gap-1 text-brand-text-muted text-sm mb-4"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        <h1 className="screen-title">Medicines</h1>
        <p className="screen-subtitle">Find affordable and free medicines near you</p>
      </div>

      <div className="px-5 space-y-3">
        {MEDICINES_INFO.map((item) => (
          <div key={item.name} className="card border border-gray-100">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">{item.emoji}</span>
              <div className="flex-1">
                <p className="font-display font-semibold text-brand-navy text-sm">{item.name}</p>
                <p className="text-brand-text-secondary text-xs mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
            <button
              onClick={() => handleFind(item.query)}
              className="w-full py-2.5 rounded-xl bg-brand-green-pale text-brand-green text-sm font-semibold active:scale-95 transition-transform"
            >
              📍 {item.action}
            </button>
          </div>
        ))}

        {/* PMBJK link */}
        <div className="card border border-brand-saffron-light bg-brand-saffron-light">
          <p className="font-display font-semibold text-brand-navy text-sm mb-1">📱 PM Jan Aushadhi App</p>
          <p className="text-brand-text-secondary text-xs mb-3">Find nearest Jan Aushadhi Kendra and check medicine prices officially</p>
          <a
            href="https://janaushadhi.gov.in"
            target="_blank"
            rel="noreferrer"
            className="block w-full py-2.5 rounded-xl bg-brand-saffron text-white text-sm font-semibold text-center active:scale-95 transition-transform"
          >
            Visit janaushadhi.gov.in
          </a>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}