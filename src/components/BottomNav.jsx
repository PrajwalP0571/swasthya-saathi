import { useApp } from '../context/AppContext.jsx'

const navItems = [
  {
    screen: 'dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    labelEn: 'Home', labelHi: 'होम', labelMr: 'होम',
  },
  {
    screen: 'schemeFinder',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    labelEn: 'Schemes', labelHi: 'योजनाएं', labelMr: 'योजना',
  },
  {
    screen: 'nearby',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    labelEn: 'Nearby', labelHi: 'नज़दीकी', labelMr: 'जवळचे',
  },
]

export default function BottomNav() {
  const { screen, navigate, lang } = useApp()

  const getLabel = (item) => {
    if (lang === 'hi') return item.labelHi
    if (lang === 'mr') return item.labelMr
    return item.labelEn
  }

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white shadow-bottom-nav safe-bottom z-50">
      <div className="flex items-center justify-around px-4 pt-2 pb-3">
        {navItems.map((item) => {
          const active = screen === item.screen
          return (
            <button
              key={item.screen}
              onClick={() => navigate(item.screen)}
              className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-colors duration-150
                ${active
                  ? 'text-brand-green'
                  : 'text-brand-text-muted'
                }`}
            >
              {item.icon}
              <span className={`text-xs font-sans font-medium ${active ? 'text-brand-green' : 'text-brand-text-muted'}`}>
                {getLabel(item)}
              </span>
              {active && (
                <span className="w-1 h-1 rounded-full bg-brand-green" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
