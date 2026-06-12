import { useApp } from '../context/AppContext.jsx'
import BottomNav from '../components/BottomNav.jsx'

const TIPS = [
  {
    category: 'Maternal Health',
    emoji: '🤱',
    color: 'bg-pink-50 border-pink-100',
    titleColor: 'text-pink-700',
    tips: [
      'Register your pregnancy at the nearest Anganwadi centre within 12 weeks to avail JSY and PMMVY benefits.',
      'Attend all 4 ANC (Antenatal Care) checkups at your PHC — they are completely free.',
      'Institutional delivery at a government hospital entitles you to free medicines, diet, and transport under JSSK.',
    ],
  },
  {
    category: 'Child Health',
    emoji: '👶',
    color: 'bg-blue-50 border-blue-100',
    titleColor: 'text-blue-700',
    tips: [
      'All children 0–5 years must complete the National Immunisation Schedule — vaccines are free at PHCs.',
      'RBSK teams visit Anganwadis to screen children for 30+ conditions including heart defects — all treatment is free.',
      'If your child is malnourished, contact your ASHA worker for referral to a Nutrition Rehabilitation Centre.',
    ],
  },
  {
    category: 'TB Awareness',
    emoji: '🫁',
    color: 'bg-teal-50 border-teal-100',
    titleColor: 'text-teal-700',
    tips: [
      'If you have a cough for more than 2 weeks, get a free sputum test at any government hospital.',
      'TB medicines are completely free under the DOTS programme. Never miss a dose.',
      'TB patients get ₹500/month nutritional support under Nikshay Poshan Yojana — register at any DOTS centre.',
    ],
  },
  {
    category: 'Diabetes & BP',
    emoji: '🩺',
    color: 'bg-indigo-50 border-indigo-100',
    titleColor: 'text-indigo-700',
    tips: [
      'Free screening for diabetes and high BP is available for everyone above 30 years at any CHC or District Hospital.',
      'Keep your blood sugar below 126 mg/dL (fasting) and BP below 140/90 mmHg.',
      'Never stop medicines on your own — uncontrolled diabetes leads to kidney and eye complications.',
    ],
  },
  {
    category: 'General Health',
    emoji: '💪',
    color: 'bg-green-50 border-green-100',
    titleColor: 'text-green-700',
    tips: [
      'Drink at least 8 glasses of clean water daily. Boil water if you are unsure of the source.',
      'Wash hands with soap before eating and after using the toilet — it prevents 80% of common illnesses.',
      'Every government PHC and CHC offers free OPD services. You do not need money to get basic healthcare.',
    ],
  },
]

export default function AwarenessScreen() {
  const { t, navigate } = useApp()

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
        <h1 className="screen-title">Health Info</h1>
        <p className="screen-subtitle">Tips and guides to stay healthy</p>
      </div>

      {/* Tips */}
      <div className="px-5 space-y-4">
        {TIPS.map((section) => (
          <div key={section.category} className={`rounded-2xl border-2 p-4 ${section.color}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{section.emoji}</span>
              <p className={`font-display font-bold text-base ${section.titleColor}`}>
                {section.category}
              </p>
            </div>
            <ul className="space-y-2">
              {section.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-50" />
                  <p className="text-brand-text-secondary text-sm leading-relaxed">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Helpline card */}
        <div className="card border border-brand-green-pale bg-brand-green-pale">
          <p className="font-display font-bold text-brand-green text-sm mb-1">📞 Health Helpline — 104</p>
          <p className="text-brand-text-secondary text-xs mb-3">
            Free 24x7 medical advice from trained health workers. Available in Hindi, English, and regional languages.
          </p>
          <a
            href="tel:104"
            className="block w-full py-2.5 rounded-xl bg-brand-green text-white text-sm font-semibold text-center active:scale-95 transition-transform"
          >
            Call 104 — Free Health Advice
          </a>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
