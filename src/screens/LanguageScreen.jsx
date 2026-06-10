import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

const languages = [
  {
    code: 'en',
    name: 'English',
    native: 'English',
    script: 'A',
    desc: 'Continue in English',
  },
  {
    code: 'hi',
    name: 'Hindi',
    native: 'हिंदी',
    script: 'अ',
    desc: 'हिंदी में जारी रखें',
  },
  {
    code: 'mr',
    name: 'Marathi',
    native: 'मराठी',
    script: 'अ',
    desc: 'मराठीत सुरू ठेवा',
  },
]

export default function LanguageScreen() {
  const { t, setLang, lang, navigate } = useApp()
  const [selected, setSelected] = useState(lang)

  const handleContinue = () => {
    setLang(selected)
    navigate('profile')
  }

  return (
    <div className="screen px-5 pt-14 pb-10">

      {/* Header */}
      <div className="mb-8">
        <div className="w-12 h-12 rounded-2xl bg-brand-green-pale flex items-center justify-center mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="#1B7A48" strokeWidth="2" className="w-6 h-6">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>
        </div>
        <h1 className="screen-title">{t.language.title}</h1>
        <p className="screen-subtitle">{t.language.subtitle}</p>
      </div>

      {/* Language options */}
      <div className="space-y-3 mb-10">
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setSelected(l.code)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-150 active:scale-[0.98]
              ${selected === l.code
                ? 'border-brand-green bg-brand-green-pale'
                : 'border-gray-100 bg-white'
              }`}
          >
            {/* Script avatar */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-xl flex-shrink-0
              ${selected === l.code
                ? 'bg-brand-green text-white'
                : 'bg-brand-grey-soft text-brand-text-secondary'
              }`}>
              {l.script}
            </div>

            {/* Labels */}
            <div className="flex-1 text-left">
              <p className={`font-display font-semibold text-base
                ${selected === l.code ? 'text-brand-green' : 'text-brand-navy'}`}>
                {l.native}
              </p>
              <p className="text-brand-text-muted text-sm">{l.desc}</p>
            </div>

            {/* Check */}
            {selected === l.code && (
              <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3.5 h-3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Continue button */}
      <button onClick={handleContinue} className="btn-primary">
        {t.language.continue}
      </button>

    </div>
  )
}
