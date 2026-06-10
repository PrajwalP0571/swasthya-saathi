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

// ─── Foundry Agent API ────────────────────────────────────────────────────────


const ENDPOINT = import.meta.env.VITE_AGENT_ENDPOINT
const API_KEY  = import.meta.env.VITE_AGENT_KEY
const AGENT_ID = import.meta.env.VITE_AGENT_ID
const API_VER  = '2025-01-01-preview'

/*
const ENDPOINT = "https://swasthya-saathi-foundry-resource.services.ai.azure.com/api/projects/swasthya-saathi-foundry-sw"
const API_KEY  = "2RUVBMKVBqJiIl79nXMst1wbPMyA48Ez4DSjvqcdpbsDrUZnDhNpJQQJ99CFACfhMk5XJ3w3AAAAACOGFbEl"
const AGENT_ID = "3f9ce162-344c-482b-abe8-d4bcfa26d078"
const API_VER  = '2025-01-01-preview'
*/

const headers = {
  'Content-Type': 'application/json',
  'api-key': API_KEY,
}

async function createThread() {
  const res = await fetch(`${ENDPOINT}/threads?api-version=${API_VER}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({}),
  })
  if (!res.ok) throw new Error(`Thread creation failed: ${res.status}`)
  const data = await res.json()
  return data.id
}

async function addMessage(threadId, content) {
  const res = await fetch(`${ENDPOINT}/threads/${threadId}/messages?api-version=${API_VER}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ role: 'user', content }),
  })
  if (!res.ok) throw new Error(`Message creation failed: ${res.status}`)
}

async function createRun(threadId) {
  const res = await fetch(`${ENDPOINT}/threads/${threadId}/runs?api-version=${API_VER}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ assistant_id: AGENT_ID }),
  })
  if (!res.ok) throw new Error(`Run creation failed: ${res.status}`)
  const data = await res.json()
  return data.id
}

async function pollRun(threadId, runId) {
  const maxAttempts = 30
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, 2000))
    const res = await fetch(
      `${ENDPOINT}/threads/${threadId}/runs/${runId}?api-version=${API_VER}`,
      { headers }
    )
    if (!res.ok) throw new Error(`Poll failed: ${res.status}`)
    const data = await res.json()
    if (data.status === 'completed') return true
    if (['failed', 'cancelled', 'expired'].includes(data.status)) {
      throw new Error(`Run ended with status: ${data.status}`)
    }
  }
  throw new Error('Agent timed out')
}

async function getMessages(threadId) {
  const res = await fetch(
    `${ENDPOINT}/threads/${threadId}/messages?api-version=${API_VER}`,
    { headers }
  )
  if (!res.ok) throw new Error(`Get messages failed: ${res.status}`)
  const data = await res.json()
  // Return the latest assistant message
  const assistantMsgs = data.data.filter((m) => m.role === 'assistant')
  if (!assistantMsgs.length) return ''
  const latest = assistantMsgs[0]
  return latest.content
    .filter((c) => c.type === 'text')
    .map((c) => c.text.value)
    .join('\n')
}

// ─── Parse agent response into scheme cards ──────────────────────────────────

function parseAgentResponse(rawText) {
  // Try to extract structured scheme blocks from agent response
  // Agent is instructed to return schemes in a parseable format
  // Fallback: return single card with full response
  const schemes = []

  // Split by common scheme separators
  const blocks = rawText.split(/\n(?=#{1,3}\s|\d+\.\s|\*\*[A-Z])/).filter(Boolean)

  if (blocks.length > 1) {
    blocks.forEach((block) => {
      const lines = block.trim().split('\n').filter(Boolean)
      const name = lines[0].replace(/^[#*\d.\s]+/, '').trim()
      const rest = lines.slice(1).join(' ')

      const benefitMatch = rest.match(/benefit[:\-]?\s*([^.]+\.)/i)
      const applyMatch   = rest.match(/apply[:\-]?\s*([^.]+\.)/i)
      const sourceMatch  = rest.match(/source[:\-]?\s*(\S+)/i)

      if (name.length > 5) {
        schemes.push({
          name,
          shortDesc: rest.slice(0, 80).replace(/\*\*/g, '').trim() + '…',
          benefit:   benefitMatch ? benefitMatch[1].trim() : rest.slice(0, 120).trim(),
          howToApply: applyMatch  ? applyMatch[1].trim()  : 'Visit your nearest government health centre or Common Service Centre.',
          source:    sourceMatch  ? sourceMatch[1].trim() : 'nhm.gov.in',
        })
      }
    })
  }

  // Fallback — wrap entire response in one card
  if (!schemes.length) {
    schemes.push({
      name: 'Schemes Found',
      shortDesc: 'Based on your profile and health need',
      benefit: rawText.slice(0, 300).replace(/\*\*/g, '').trim(),
      howToApply: 'Visit your nearest government health centre or Common Service Centre with Aadhaar card.',
      source: 'Swasthya Saathi · Foundry IQ',
    })
  }

  return schemes
}

// ─── Build the prompt for the agent ──────────────────────────────────────────

function buildPrompt(profile, selectedMember, selectedNeed, answers, lang) {
  const langInstruction =
    lang === 'hi' ? 'Please respond in Hindi.' :
    lang === 'mr' ? 'Please respond in Marathi.' :
    'Please respond in English.'

  const answerSummary = Object.entries(answers)
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ')

  return `${langInstruction}

A citizen in India needs help finding government health schemes they qualify for.

CITIZEN PROFILE:
- Name: ${selectedMember?.name || profile?.name || 'Unknown'}
- Age: ${selectedMember?.age || profile?.age || 'Unknown'}
- Gender: ${profile?.gender || 'Unknown'}
- State: ${profile?.state || 'Unknown'}
- District: ${profile?.district || 'Unknown'}
- Annual Income: ${profile?.income || 'Unknown'}
- Occupation: ${profile?.occupation || 'Unknown'}
- Has Ayushman Card: ${profile?.hasAyushman || 'Unknown'}

HEALTH NEED: ${selectedNeed}
ADDITIONAL DETAILS: ${answerSummary}

Please list ALL government health schemes this person is likely eligible for.
For each scheme include:
1. Scheme name
2. Key benefit (cash amount or coverage)
3. How to apply
4. Official source URL

Focus on central government schemes like PM-JAY, JSY, JSSK, PMSBY, NIKSHAY POSHAN, and any relevant state schemes for ${profile?.state || 'India'}.`
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function QuestionsScreen() {
  const { t, lang, profile, family, selectedNeed, setSchemeResults, navigate } = useApp()
  const [step, setStep] = useState(0)
  const [selectedMember, setSelectedMember] = useState(null)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const questions   = QUESTIONS[selectedNeed] || []
  const totalSteps  = 1 + questions.length
  const currentQuestion = questions[step - 1]

  const allMembers = [
    { name: profile?.name || 'Myself', relation: 'Self', age: profile?.age },
    ...family,
  ]

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const prompt   = buildPrompt(profile, selectedMember, selectedNeed, answers, lang)
      const threadId = await createThread()
      await addMessage(threadId, prompt)
      const runId    = await createRun(threadId)
      await pollRun(threadId, runId)
      const rawText  = await getMessages(threadId)
      const schemes  = parseAgentResponse(rawText)
      setSchemeResults(schemes)
      navigate('results')
    } catch (err) {
      console.error('Agent error:', err)
      setError('Could not reach the agent. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const canProceed = step === 0 ? !!selectedMember : !!answers[currentQuestion?.id]

  return (
    <div className="screen px-5 pt-12 pb-10">

      {/* Back button */}
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
            ${i <= step ? 'bg-brand-green' : 'bg-gray-200'}`}
          />
        ))}
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="screen-title">{t.questions.title}</h1>
        <p className="screen-subtitle">{t.questions.subtitle}</p>
      </div>

      {/* Step 0 — Member selection */}
      {step === 0 && (
        <div>
          <p className="text-sm font-semibold text-brand-navy mb-4">
            {t.questions.whichMember}
          </p>
          <div className="flex flex-wrap gap-3">
            {allMembers.map((m, i) => (
              <FamilyMemberChip
                key={i}
                member={m}
                index={i}
                selected={selectedMember?.name === m.name}
                onSelect={setSelectedMember}
              />
            ))}
          </div>
        </div>
      )}

      {/* Steps 1+ — Questions */}
      {step > 0 && currentQuestion && (
        <div>
          <p className="text-sm font-semibold text-brand-navy mb-4">
            {currentQuestion.question}
          </p>
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

      {/* Error message */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col items-center justify-center gap-4 px-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-green-pale flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="#1B7A48" strokeWidth="2" className="w-8 h-8 animate-spin">
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
          </div>
          <p className="font-display font-semibold text-brand-navy text-center text-lg">
            {t.questions.agentThinking}
          </p>
          <p className="text-brand-text-muted text-sm text-center">
            Searching Foundry IQ knowledge base…
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-brand-green animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-brand-green animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-brand-green animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}

      {/* Next / Submit button */}
      <div className="mt-10">
        <button
          onClick={handleNext}
          disabled={!canProceed || loading}
          className={`btn-primary transition-opacity duration-150
            ${canProceed ? 'opacity-100' : 'opacity-40 cursor-not-allowed'}`}
        >
          {step === totalSteps - 1 ? t.questions.submit : t.questions.next}
        </button>
      </div>

    </div>
  )
}