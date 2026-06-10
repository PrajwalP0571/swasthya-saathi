import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

export default function SchemeCard({ scheme, index }) {
  const { t } = useApp()
  const [expanded, setExpanded] = useState(index === 0)
  const [saved, setSaved] = useState(false)

  return (
    <div className="card mb-3 border border-gray-100">

      {/* Header */}
      <div
        className="flex items-start justify-between gap-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-green-pale text-brand-green">
              {t.results.eligible}
            </span>
          </div>
          <h3 className="font-display font-semibold text-brand-navy text-base leading-snug">
            {scheme.name}
          </h3>
          <p className="text-brand-text-secondary text-sm mt-0.5">
            {scheme.shortDesc}
          </p>
        </div>

        {/* Expand chevron */}
        <div className={`mt-1 text-brand-text-muted transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">

          {/* Benefit */}
          <div className="bg-brand-saffron-light rounded-xl p-3">
            <p className="text-xs font-semibold text-brand-saffron uppercase tracking-wide mb-1">
              {t.results.benefit}
            </p>
            <p className="text-brand-text-primary text-sm font-medium">
              {scheme.benefit}
            </p>
          </div>

          {/* How to apply */}
          <div>
            <p className="text-xs font-semibold text-brand-text-muted uppercase tracking-wide mb-1">
              {t.results.howToApply}
            </p>
            <p className="text-brand-text-secondary text-sm">
              {scheme.howToApply}
            </p>
          </div>

          {/* Source citation */}
          {scheme.source && (
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-brand-green flex-shrink-0">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              </svg>
              <span className="text-xs text-brand-green font-medium truncate">
                {scheme.source}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setSaved(!saved)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors duration-150
                ${saved
                  ? 'border-brand-green bg-brand-green text-white'
                  : 'border-brand-green text-brand-green'
                }`}
            >
              {saved ? '✓ Saved' : t.results.save}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
