import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import BottomNav from '../components/BottomNav.jsx'

const needsConfig = [
  { key: 'pregnancy',  emoji: '🤱', color: 'bg-pink-50   border-pink-100' },
  { key: 'child',      emoji: '👶', color: 'bg-blue-50   border-blue-100' },
  { key: 'accident',   emoji: '🚑', color: 'bg-red-50    border-red-100'  },
  { key: 'chronic',    emoji: '💊', color: 'bg-purple-50 border-purple-100'},
  { key: 'surgery',    emoji: '🏥', color: 'bg-orange-50 border-orange-100'},
  { key: 'cancer',     emoji: '🎗️', color: 'bg-rose-50   border-rose-100' },
  { key: 'tb',         emoji: '🫁', color: 'bg-teal-50   border-teal-100' },
  { key: 'diabetes',   emoji: '🩺', color: 'bg-indigo-50 border-indigo-100'},
  { key: 'elder',      emoji: '👴', color: 'bg-amber-50  border-amber-100'},
  { key: 'insurance',  emoji: '🛡️', color: 'bg-green-50  border-green-100'},
  { key: 'general',    emoji: '📋', color: 'bg-gray-50   border-gray-100' },
]

export default function SchemeFinderScreen() {
  const { t, setSelectedNeed, navigate } = useApp()
  const [selected, setSelected] = useState(null)

  const handleContinue = () => {
    if (!selected) return
    setSelectedNeed(selected)
    navigate('questions')
  }

  return (
    <div className="screen pb-28">

      {/* Header */}
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
        <h1 className="screen-title">{t.schemeFinder.title}</h1>
        <p className="screen-subtitle">{t.schemeFinder.subtitle}</p>
      </div>

      {/* Needs grid */}
      <div className="px-5">
        <div className="grid grid-cols-3 gap-3">
          {needsConfig.map((need) => {
            const isSelected = selected === need.key
            return (
              <button
                key={need.key}
                onClick={() => setSelected(need.key)}
                className={`chip-need ${isSelected ? 'selected' : ''} ${!isSelected ? need.color : ''}`}
              >
                <span className="text-2xl">{need.emoji}</span>
                <span className={`text-xs font-medium leading-tight text-center
                  ${isSelected ? 'text-brand-green' : 'text-brand-text-primary'}`}>
                  {t.schemeFinder[need.key]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Continue button — sticky at bottom */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pb-3 pt-3 bg-gradient-to-t from-brand-cream via-brand-cream to-transparent">
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`btn-primary transition-opacity duration-150
            ${selected ? 'opacity-100' : 'opacity-40 cursor-not-allowed'}`}
        >
          {t.questions.next}
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
