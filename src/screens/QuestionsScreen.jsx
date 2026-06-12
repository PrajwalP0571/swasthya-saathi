import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import FamilyMemberChip from '../components/FamilyMemberChip.jsx'

const QUESTIONS = {
  pregnancy: [
    { id: 'weeks',    question: 'How many months pregnant?', options: ['1-3 months', '4-6 months', '7-9 months', 'Just delivered'] },
    { id: 'facility', question: 'Where do you plan to deliver?', options: ['Government hospital', 'Private hospital', 'Home / Not decided'] },
  ],
  child: [
    { id: 'childAge', question: "Child's age?", options: ['Newborn (0-1 month)', '1-12 months', '1-5 years', '5+ years'] },
    { id: 'issue',    question: 'What kind of care is needed?', options: ['Vaccination', 'Nutrition', 'Treatment', 'General checkup'] },
  ],
  accident: [
    { id: 'severity', question: 'How serious is the situation?', options: ['Emergency right now', 'Non-emergency', 'Follow-up care'] },
    { id: 'coverage', question: 'Do you have any insurance?', options: ['Yes', 'No', "Don't know"] },
  ],
  surgery: [
    { id: 'urgency',  question: 'How urgent is the surgery?', options: ['Immediate', 'Within a month', 'Planned / Elective'] },
    { id: 'hospital', question: 'Preferred hospital type?', options: ['Government', 'Private', 'No preference'] },
  ],
  cancer: [
    { id: 'stage',   question: 'Stage of cancer (if known)?', options: ['Early stage', 'Advanced', 'Not diagnosed yet', "Don't know"] },
    { id: 'support', question: 'What support do you need?', options: ['Treatment cost', 'Medicines', 'Palliative care', 'All of the above'] },
  ],
  tb: [
    { id: 'diagnosed', question: 'Has TB been diagnosed?', options: ['Yes, recently', 'Yes, ongoing treatment', 'Suspected, not confirmed'] },
    { id: 'support',   question: 'What support do you need?', options: ['Free medicines', 'Nutritional support', 'Financial aid'] },
  ],
  diabetes: [
    { id: 'condition', question: 'Which condition?', options: ['Diabetes', 'High BP', 'Both', 'Not sure'] },
    { id: 'duration',  question: 'How long have you had it?', options: ['Newly diagnosed', '1-5 years', 'More than 5 years'] },
  ],
  chronic: [
    { id: 'disease',  question: 'What is the condition?', options: ['Heart disease', 'Kidney disease', 'Liver disease', 'Other'] },
    { id: 'support',  question: 'What support do you need?', options: ['Treatment cost', 'Medicines', 'Hospitalization'] },
  ],
  elder: [
    { id: 'age',     question: "Elder's age?", options: ['60-70 years', '70-80 years', '80+ years'] },
    { id: 'support', question: 'Type of support needed?', options: ['Medical care', 'Medicine subsidy', 'Pension / Financial'] },
  ],
  insurance: [
    { id: 'existing', question: 'Do you have any health insurance?', options: ['No insurance at all', 'Only Ayushman Card', 'Private insurance'] },
    { id: 'need',     question: 'What are you looking for?', options: ['Free government cover', 'Affordable premium plan', 'Cashless hospitalisation'] },
  ],
  general: [
    { id: 'topic', question: 'What health topic interests you?', options: ['Preventive health', 'Free checkups', 'Medicine subsidy', 'All schemes'] },
  ],
}

// ─── Eligibility rules per need ───────────────────────────────────────────────
function isMemberEligible(member, selectedNeed) {
  const age    = parseInt(member.age) || 0
  const gender = (member.gender || '').toLowerCase()

  if (selectedNeed === 'pregnancy') {
    if (gender !== 'female') return { eligible: false, reason: 'Pregnancy schemes are only for female members' }
    if (age < 14)            return { eligible: false, reason: 'Member must be at least 14 years old' }
    return { eligible: true }
  }

  if (selectedNeed === 'child') {
    if (age > 12) return { eligible: false, reason: 'Child schemes are for members aged 12 or below' }
    return { eligible: true }
  }

  if (selectedNeed === 'elder') {
    if (age < 65) return { eligible: false, reason: 'Elder care schemes are for members aged 65 or above' }
    return { eligible: true }
  }

  return { eligible: true }
}

// ─── Foundry Agent — Responses API ───────────────────────────────────────────
const FOUNDRY_ENDPOINT = import.meta.env.VITE_FOUNDRY_ENDPOINT;
const FOUNDRY_KEY      = import.meta.env.VITE_FOUNDRY_KEY;

async function callAzureOpenAI(systemPrompt, userPrompt) {
  const res = await fetch(`${FOUNDRY_ENDPOINT}?api-version=2025-11-15-preview`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': FOUNDRY_KEY,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      input: `${systemPrompt}\n\n${userPrompt}`,
      max_output_tokens: 2000,
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`Foundry Agent error ${res.status}: ${err?.error?.message || res.statusText}`)
  }
  const data = await res.json()
  // Responses API returns output as array of content blocks
  const content = data.output
    ?.find(b => b.type === 'message')
    ?.content
    ?.find(c => c.type === 'output_text')
    ?.text
  if (!content) throw new Error('Empty response from Foundry agent')
  return content
}

function getSystemPrompt(lang) {
  const langInstruction =
    lang === 'hi' ? 'Respond entirely in Hindi language.' :
    lang === 'mr' ? 'Respond entirely in Marathi language.' :
    'Respond in English.'

  return `You are Swasthya Saathi, an expert advisor on Indian government health schemes for rural citizens.

${langInstruction}

Your knowledge base contains these 9 official government health schemes:

SCHEME 1: AYUSHMAN BHARAT PM-JAY
- Benefit: Rs.5 lakh per family per year cashless hospitalisation cover
- Eligibility: BPL families, SECC beneficiaries, unorganised workers
- Apply: Go to any empanelled hospital with Aadhaar card OR visit Common Service Centre
- Source: pmjay.gov.in

SCHEME 2: JSY - Janani Suraksha Yojana
- Benefit: Rs.1400 cash for delivery in Low Performing States, Rs.700 in others
- Eligibility: Pregnant women from BPL families, all SC/ST women, age 19+
- Apply: Register at PHC or CHC. ASHA worker assists with documents and cash transfer
- Source: nhm.gov.in

SCHEME 3: PMMVY - Pradhan Mantri Matru Vandana Yojana
- Benefit: Rs.5000 cash in 3 instalments for first live birth
- Eligibility: Pregnant and lactating women aged 19+ for first child
- Apply: Register at Anganwadi Centre within 150 days of pregnancy
- Source: wcd.nic.in

SCHEME 4: JSSK - Janani Shishu Suraksha Karyakram
- Benefit: Free delivery, free medicines, diagnostics, blood, diet, transport at government facilities
- Eligibility: Every pregnant woman at a government health facility
- Apply: Walk into any government hospital. All entitlements are automatic
- Source: nhm.gov.in

SCHEME 5: RBSK - Rashtriya Bal Swasthya Karyakram
- Benefit: Free screening and treatment for children 0-18 years for 30+ conditions including heart surgery
- Eligibility: All children aged 0-18 years
- Apply: Mobile health teams visit Anganwadis and schools. Visit District Early Intervention Centre directly
- Source: nhm.gov.in

SCHEME 6: NTEP / NIKSHAY POSHAN YOJANA
- Benefit: Rs.500 per month nutritional support during TB treatment. Free medicines under DOTS
- Eligibility: All TB patients registered under NTEP
- Apply: Visit nearest government hospital or DOTS centre. Register on Nikshay portal
- Source: nikshay.in

SCHEME 7: NPCDCS
- Benefit: Free screening and treatment for diabetes, hypertension, cancer at CHCs and District Hospitals
- Eligibility: All citizens above 30 years
- Apply: Visit NCD clinic at nearest CHC or District Hospital
- Source: mohfw.gov.in

SCHEME 8: ESIC
- Benefit: Free medical care, sickness benefit 70% wages, maternity benefit full wages 26 weeks
- Eligibility: Employees earning up to Rs.21000/month in registered establishments with 10+ workers
- Apply: Employer registers employee. Worker gets ESIC card. Visit ESIC hospital with card
- Source: esic.in

SCHEME 9: NHM FREE MEDICINES AND DIAGNOSTICS
- Benefit: Free essential medicines and free diagnostic tests at all government facilities
- Eligibility: Every citizen visiting a government health facility
- Apply: Visit any government PHC, CHC, or District Hospital
- Source: nhm.gov.in

Return ONLY valid JSON: {"schemes": [{"name": "...", "shortDesc": "...", "benefit": "...", "howToApply": "...", "source": "..."}]}`
}

function buildUserPrompt(profile, selectedMember, selectedNeed, answers) {
  const answerSummary = Object.entries(answers).map(([k, v]) => `${k}: ${v}`).join(', ')
  return `Find all government health schemes this person qualifies for:

Name: ${selectedMember?.name || profile?.name || 'Unknown'}
Age: ${selectedMember?.age || profile?.age || 'Unknown'}
Gender: ${selectedMember?.gender || profile?.gender || 'Unknown'}
State: ${profile?.state || 'Unknown'}
Annual Income: ${profile?.income || 'Unknown'}
Occupation: ${profile?.occupation || 'Unknown'}
Has Ayushman Card: ${profile?.hasAyushman || 'Unknown'}
Health Need: ${selectedNeed}
Details: ${answerSummary || 'None'}

Return ONLY a JSON object with schemes array.`
}

function parseSchemes(rawText) {
  try {
    //const parsed = JSON.parse(rawText)
    const clean = rawText.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)
    const schemes = parsed.schemes || parsed
    if (Array.isArray(schemes) && schemes.length > 0) return schemes
  } catch (e) { console.warn('Parse error:', e) }
  return [{
    name: 'Health Schemes Available',
    shortDesc: 'Government schemes based on your profile',
    benefit: rawText.slice(0, 300).replace(/[{}"]/g, '').trim(),
    howToApply: 'Visit your nearest government PHC or Common Service Centre with Aadhaar card.',
    source: 'nhm.gov.in',
  }]
}

export default function QuestionsScreen() {
  const { t, lang, profile, family, selectedNeed, setSchemeResults, navigate } = useApp()
  const [step, setStep]                     = useState(0)
  const [selectedMember, setSelectedMember] = useState(null)
  const [answers, setAnswers]               = useState({})
  const [loading, setLoading]               = useState(false)
  const [error, setError]                   = useState(null)

  const questions       = QUESTIONS[selectedNeed] || []
  const totalSteps      = 1 + questions.length
  const currentQuestion = questions[step - 1]

  const allMembers = [
    { name: profile?.name || 'Myself', relation: 'Self', age: profile?.age, gender: profile?.gender },
    ...family,
  ]

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (step < totalSteps - 1) setStep(step + 1)
    else handleSubmit()
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const systemPrompt = getSystemPrompt(lang)
      const userPrompt   = buildUserPrompt(profile, selectedMember, selectedNeed, answers)
      const rawText      = await callAzureOpenAI(systemPrompt, userPrompt)
      const schemes      = parseSchemes(rawText)
      setSchemeResults(schemes)
      navigate('results')
    } catch (err) {
      console.error('Agent error:', err)
      setError(`Could not reach the AI. ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const canProceed = step === 0 ? !!selectedMember : !!answers[currentQuestion?.id]

  return (
    <div className="screen px-5 pt-12 pb-10">

      {/* Back */}
      <button
        onClick={() => step === 0 ? navigate('schemeFinder') : setStep(step - 1)}
        className="flex items-center gap-1 text-brand-text-muted text-sm mb-6"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        {t.questions.back}
      </button>

      {/* Progress bar */}
      <div className="flex gap-1.5 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300
            ${i <= step ? 'bg-brand-green' : 'bg-gray-200'}`} />
        ))}
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="screen-title">{t.questions.title}</h1>
        <p className="screen-subtitle">{t.questions.subtitle}</p>
      </div>

      {/* Step 0 — member selection with eligibility */}
      {step === 0 && (
        <div>
          <p className="text-sm font-semibold text-brand-navy mb-4">{t.questions.whichMember}</p>
          <div className="flex flex-wrap gap-3">
            {allMembers.map((m, i) => {
              const { eligible, reason } = isMemberEligible(m, selectedNeed)
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className={`relative ${!eligible ? 'opacity-40' : ''}`}>
                    <FamilyMemberChip
                      member={m}
                      index={i}
                      selected={selectedMember?.name === m.name}
                      onSelect={eligible ? setSelectedMember : () => {}}
                    />
                    {!eligible && (
                      <div className="absolute inset-0 rounded-2xl cursor-not-allowed" />
                    )}
                  </div>
                  {!eligible && (
                    <p className="text-xs text-red-400 text-center max-w-[80px] leading-tight">
                      {reason}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Steps 1+ — questions */}
      {step > 0 && currentQuestion && (
        <div>
          <p className="text-sm font-semibold text-brand-navy mb-4">{currentQuestion.question}</p>
          <div className="space-y-3">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(currentQuestion.id, opt)}
                className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 text-sm font-medium transition-all duration-150 active:scale-[0.98]
                  ${answers[currentQuestion.id] === opt
                    ? 'border-brand-green bg-brand-green-pale text-brand-green'
                    : 'border-gray-100 bg-white text-brand-text-primary'
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col items-center justify-center gap-4 px-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-green-pale flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="#1B7A48" strokeWidth="2" className="w-8 h-8 animate-spin">
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
          </div>
          <p className="font-display font-semibold text-brand-navy text-center text-lg">{t.questions.agentThinking}</p>
          <p className="text-brand-text-muted text-sm text-center">Searching health scheme knowledge base…</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-brand-green animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-brand-green animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-brand-green animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}

      {/* Next / Submit */}
      <div className="mt-10">
        <button
          onClick={handleNext}
          disabled={!canProceed || loading}
          className={`btn-primary transition-opacity duration-150 ${canProceed ? 'opacity-100' : 'opacity-40 cursor-not-allowed'}`}
        >
          {step === totalSteps - 1 ? t.questions.submit : t.questions.next}
        </button>
      </div>

    </div>
  )
}
