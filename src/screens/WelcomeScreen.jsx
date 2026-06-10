import { useApp } from '../context/AppContext.jsx'

export default function WelcomeScreen() {
  const { t, navigate } = useApp()

  return (
    <div className="screen min-h-screen flex flex-col bg-brand-green relative overflow-hidden">

      {/* Background decorative circles */}
      <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full bg-brand-green-light opacity-40" />
      <div className="absolute top-[80px] right-[-30px] w-36 h-36 rounded-full bg-brand-green-light opacity-30" />
      <div className="absolute bottom-[160px] left-[-40px] w-48 h-48 rounded-full bg-brand-green-light opacity-20" />

      {/* Top section — logo + illustration */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-6 relative z-10">

        {/* Logo mark */}
        <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-card mb-6">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <circle cx="24" cy="24" r="20" fill="#E8F5EE" />
            <path d="M24 14a1.5 1.5 0 011.5 1.5v7h7a1.5 1.5 0 010 3h-7v7a1.5 1.5 0 01-3 0v-7h-7a1.5 1.5 0 010-3h7v-7A1.5 1.5 0 0124 14z" fill="#1B7A48"/>
          </svg>
        </div>

        {/* App name */}
        <h1 className="font-display font-bold text-3xl text-white text-center mb-2">
          {t.appName}
        </h1>
        <p className="text-green-100 text-sm text-center mb-10">
          {t.appTagline}
        </p>

        {/* Illustration card */}
        <div className="w-full bg-white bg-opacity-15 rounded-3xl p-6 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white bg-opacity-90 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1B7A48" strokeWidth="2" className="w-6 h-6">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Ramesh Kumar</p>
              <p className="text-green-100 text-xs">Maharashtra · Family of 4</p>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { name: 'Ayushman Bharat PM-JAY', benefit: '₹5 lakh cover' },
              { name: 'Janani Suraksha Yojana', benefit: '₹1,400 cash benefit' },
            ].map((scheme) => (
              <div key={scheme.name} className="flex items-center justify-between bg-white bg-opacity-20 rounded-xl px-3 py-2">
                <span className="text-white text-xs font-medium">{scheme.name}</span>
                <span className="text-green-100 text-xs">{scheme.benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section — headline + CTA */}
      <div className="bg-brand-cream rounded-t-[2rem] px-6 pt-8 pb-10 relative z-10">
        <h2 className="font-display font-bold text-2xl text-brand-navy text-center mb-2 leading-snug">
          {t.welcome.headline}
        </h2>
        <p className="text-brand-text-secondary text-sm text-center mb-8 leading-relaxed">
          {t.welcome.sub}
        </p>

        <button
          onClick={() => navigate('language')}
          className="btn-primary"
        >
          {t.welcome.cta}
        </button>
      </div>

    </div>
  )
}
