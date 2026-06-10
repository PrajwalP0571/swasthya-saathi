import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

const STATES = [
  'Andhra Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal',
]

const INCOME_RANGES = [
  'Below ₹1 lakh',
  '₹1 – 2.5 lakh',
  '₹2.5 – 5 lakh',
  '₹5 – 10 lakh',
  'Above ₹10 lakh',
]

const OCCUPATIONS = [
  'Farmer', 'Daily Wage Worker', 'Self Employed', 'Private Job',
  'Government Job', 'Homemaker', 'Student', 'Other',
]

export default function ProfileScreen() {
  const { t, setProfile, navigate } = useApp()

  const [form, setForm] = useState({
    name: '', age: '', gender: '',
    state: '', district: '',
    income: '', occupation: '',
    hasAyushman: '',
  })
  const [error, setError] = useState(false)

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError(false)
  }

  const handleSave = () => {
    const required = ['name', 'age', 'gender', 'state', 'income']
    const missing = required.some((f) => !form[f])
    if (missing) { setError(true); return }
    setProfile(form)
    navigate('dashboard')
  }

  return (
    <div className="screen pb-10">

      {/* Header */}
      <div className="screen-header">
        <div className="w-12 h-12 rounded-2xl bg-brand-green-pale flex items-center justify-center mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="#1B7A48" strokeWidth="2" className="w-6 h-6">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h1 className="screen-title">{t.profile.title}</h1>
        <p className="screen-subtitle">{t.profile.subtitle}</p>
      </div>

      <div className="px-5 space-y-4">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
            {t.profile.name} <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className="input-field"
            placeholder={t.profile.namePlaceholder}
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
          />
        </div>

        {/* Age + Gender row */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
              {t.profile.age} <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              className="input-field"
              placeholder={t.profile.agePlaceholder}
              value={form.age}
              onChange={(e) => update('age', e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
              {t.profile.gender} <span className="text-red-400">*</span>
            </label>
            <select
              className="input-field"
              value={form.gender}
              onChange={(e) => update('gender', e.target.value)}
            >
              <option value="">Select</option>
              <option value="male">{t.profile.male}</option>
              <option value="female">{t.profile.female}</option>
              <option value="other">{t.profile.other}</option>
            </select>
          </div>
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
            {t.profile.state} <span className="text-red-400">*</span>
          </label>
          <select
            className="input-field"
            value={form.state}
            onChange={(e) => update('state', e.target.value)}
          >
            <option value="">{t.profile.statePlaceholder}</option>
            {STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
            {t.profile.district}
          </label>
          <input
            type="text"
            className="input-field"
            placeholder={t.profile.districtPlaceholder}
            value={form.district}
            onChange={(e) => update('district', e.target.value)}
          />
        </div>

        {/* Income */}
        <div>
          <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
            {t.profile.income} <span className="text-red-400">*</span>
          </label>
          <select
            className="input-field"
            value={form.income}
            onChange={(e) => update('income', e.target.value)}
          >
            <option value="">{t.profile.incomePlaceholder}</option>
            {INCOME_RANGES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Occupation */}
        <div>
          <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
            {t.profile.occupation}
          </label>
          <select
            className="input-field"
            value={form.occupation}
            onChange={(e) => update('occupation', e.target.value)}
          >
            <option value="">{t.profile.occupationPlaceholder}</option>
            {OCCUPATIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        {/* Ayushman Card */}
        <div>
          <label className="block text-sm font-medium text-brand-text-primary mb-2">
            {t.profile.hasAyushman}
          </label>
          <div className="flex gap-3">
            {['yes', 'no'].map((val) => (
              <button
                key={val}
                onClick={() => update('hasAyushman', val)}
                className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-150
                  ${form.hasAyushman === val
                    ? 'border-brand-green bg-brand-green-pale text-brand-green'
                    : 'border-gray-200 text-brand-text-secondary'
                  }`}
              >
                {val === 'yes' ? t.profile.yes : t.profile.no}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center">
            {t.profile.required}
          </p>
        )}

        {/* Save button */}
        <div className="pt-2">
          <button onClick={handleSave} className="btn-primary">
            {t.profile.save}
          </button>
        </div>

      </div>
    </div>
  )
}
