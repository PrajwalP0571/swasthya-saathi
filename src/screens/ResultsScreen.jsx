import { useApp } from '../context/AppContext.jsx'
import SchemeCard from '../components/SchemeCard.jsx'
import BottomNav from '../components/BottomNav.jsx'

export default function ResultsScreen() {
  const { t, schemeResults, selectedNeed, navigate } = useApp()

  return (
    <div className="screen pb-28">

      {/* Header */}
      <div className="bg-brand-green px-5 pt-12 pb-6">
        <button
          onClick={() => navigate('questions')}
          className="flex items-center gap-1 text-green-100 text-sm mb-4"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {t.questions.back}
        </button>

        <h1 className="font-display font-bold text-2xl text-white mb-1">
          {t.results.title}
        </h1>

        <div className="flex items-center gap-2 mt-2">
          <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
            <span className="text-white text-xs font-semibold">
              {schemeResults.length} schemes found
            </span>
          </div>
          {selectedNeed && (
            <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
              <span className="text-white text-xs font-semibold capitalize">
                {selectedNeed.replace(/([A-Z])/g, ' $1')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Foundry IQ badge */}
      <div className="mx-5 mt-4 mb-2 flex items-center gap-2 bg-brand-green-pale rounded-xl px-3 py-2.5">
        <svg viewBox="0 0 24 24" fill="none" stroke="#1B7A48" strokeWidth="2" className="w-4 h-4 flex-shrink-0">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <p className="text-brand-green text-xs font-medium">
          {t.results.poweredBy}
        </p>
      </div>

      {/* Scheme cards */}
      <div className="px-5 mt-2">
        {schemeResults.length > 0 ? (
          <>
            {schemeResults.map((scheme, i) => (
              <SchemeCard key={i} scheme={scheme} index={i} />
            ))}

            {/* Find nearby hospital CTA */}
            <button
              onClick={() => navigate('nearby')}
              className="btn-saffron mt-2"
            >
              🏥 {t.results.findHospital}
            </button>

            {/* Back to home */}
            <button
              onClick={() => navigate('dashboard')}
              className="btn-secondary mt-3"
            >
              {t.results.backToHome}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="#8FA3B1" strokeWidth="2" className="w-8 h-8">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p className="text-brand-text-secondary text-sm px-6">
              {t.results.noResults}
            </p>
            <button
              onClick={() => navigate('schemeFinder')}
              className="mt-6 btn-primary"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
