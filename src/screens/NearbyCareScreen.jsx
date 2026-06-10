import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import BottomNav from '../components/BottomNav.jsx'

const MOCK_HOSPITALS = [
  {
    name: 'District Government Hospital',
    type: 'Government',
    distance: '1.2',
    address: 'Civil Lines, Near Collector Office',
    tags: ['PMJAY Empanelled', 'Emergency', '24x7'],
    phone: '108',
    pmjay: true,
  },
  {
    name: 'Primary Health Centre (PHC)',
    type: 'PHC',
    distance: '0.6',
    address: 'Gram Panchayat Road, Ward No. 3',
    tags: ['Free OPD', 'Vaccination', 'Maternity'],
    phone: '104',
    pmjay: false,
  },
  {
    name: 'Community Health Centre (CHC)',
    type: 'CHC',
    distance: '3.4',
    address: 'Taluka Headquarters, Main Road',
    tags: ['PMJAY Empanelled', 'Surgery', 'Specialist'],
    phone: '108',
    pmjay: true,
  },
  {
    name: 'Jan Aushadhi Kendra',
    type: 'Pharmacy',
    distance: '0.3',
    address: 'Near Bus Stand, Market Area',
    tags: ['Generic Medicines', '50-90% Cheaper'],
    phone: null,
    pmjay: false,
  },
]

const tagColors = {
  'PMJAY Empanelled': 'bg-brand-green-pale text-brand-green',
  'Emergency':        'bg-red-50 text-red-600',
  '24x7':             'bg-blue-50 text-blue-600',
  'Free OPD':         'bg-purple-50 text-purple-600',
  'Vaccination':      'bg-teal-50 text-teal-600',
  'Maternity':        'bg-pink-50 text-pink-600',
  'Surgery':          'bg-orange-50 text-orange-600',
  'Specialist':       'bg-indigo-50 text-indigo-600',
  'Generic Medicines':'bg-amber-50 text-amber-600',
  '50-90% Cheaper':   'bg-green-50 text-green-600',
}

const typeIcons = {
  Government: '🏥',
  PHC:        '🏠',
  CHC:        '🏨',
  Pharmacy:   '💊',
}

export default function NearbyCareScreen() {
  const { t, navigate } = useApp()
  const [pincode, setPincode] = useState('')
  const [searched, setSearched] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = ['All', 'PMJAY', 'PHC / CHC', 'Pharmacy']

  const filteredHospitals = MOCK_HOSPITALS.filter((h) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'PMJAY') return h.pmjay
    if (activeFilter === 'PHC / CHC') return h.type === 'PHC' || h.type === 'CHC'
    if (activeFilter === 'Pharmacy') return h.type === 'Pharmacy'
    return true
  })

  return (
    <div className="screen pb-28">

      {/* Header */}
      <div className="screen-header">
        <h1 className="screen-title">{t.nearby.title}</h1>
        <p className="screen-subtitle">{t.nearby.subtitle}</p>
      </div>

      {/* Search bar */}
      <div className="px-5 mb-4">
        <div className="flex gap-2">
          <input
            type="number"
            className="input-field flex-1"
            placeholder={t.nearby.searchPlaceholder}
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <button
            onClick={() => setSearched(true)}
            className="px-5 py-3 rounded-xl bg-brand-green text-white text-sm font-semibold active:scale-95 transition-transform"
          >
            {t.nearby.search}
          </button>
        </div>
      </div>

      {/* Emergency banner */}
      <div className="mx-5 mb-4">
        <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚨</span>
            <div>
              <p className="text-red-700 font-semibold text-sm">Emergency?</p>
              <p className="text-red-500 text-xs">Call 108 — Free ambulance</p>
            </div>
          </div>
          <a
            href="tel:108"
            className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-xl active:scale-95 transition-transform"
          >
            Call 108
          </a>
        </div>
      </div>

      {/* Filter chips */}
      <div className="px-5 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-150
                ${activeFilter === f
                  ? 'bg-brand-green text-white border-brand-green'
                  : 'bg-white text-brand-text-secondary border-gray-200'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Hospital list */}
      <div className="px-5 space-y-3">
        {filteredHospitals.map((hospital, i) => (
          <div key={i} className="card border border-gray-100">

            {/* Top row */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-grey-soft flex items-center justify-center text-xl flex-shrink-0">
                {typeIcons[hospital.type] || '🏥'}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-semibold text-brand-navy text-sm leading-snug">
                    {hospital.name}
                  </h3>
                  <span className="text-xs text-brand-text-muted flex-shrink-0">
                    {hospital.distance} {t.nearby.distance}
                  </span>
                </div>
                <p className="text-brand-text-muted text-xs mt-0.5">{hospital.address}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {hospital.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-600'}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              {hospital.phone && (
                <a
                  href={`tel:${hospital.phone}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-brand-green-pale text-brand-green text-xs font-semibold active:scale-95 transition-transform"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  {t.nearby.call}
                </a>
              )}
              <button
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-semibold active:scale-95 transition-transform"
                onClick={() => {
                  window.open(`https://www.google.com/maps/search/${encodeURIComponent(hospital.name)}`, '_blank')
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
                {t.nearby.directions}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 104 Health Helpline banner */}
      <div className="mx-5 mt-4">
        <div className="bg-brand-navy rounded-2xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-white font-semibold text-sm">Health Helpline</p>
            <p className="text-blue-200 text-xs">Free medical advice 24x7</p>
          </div>
          <a
            href="tel:104"
            className="bg-brand-green text-white text-sm font-bold px-4 py-2 rounded-xl active:scale-95 transition-transform"
          >
            Call 104
          </a>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
