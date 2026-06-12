import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import BottomNav from '../components/BottomNav.jsx'
import hospitalsData from '../data/hospitals.json'

const CARE_TYPES = [
  {
    key: 'hospital',
    label: 'Government Hospital',
    emoji: '🏥',
    type: 'government',
    color: 'bg-brand-green-pale border-brand-green',
    textColor: 'text-brand-green',
  },
  {
    key: 'pmjay',
    label: 'PMJAY Empanelled',
    emoji: '🛡️',
    type: 'pmjay',
    color: 'bg-blue-50 border-blue-200',
    textColor: 'text-blue-600',
  },
  {
    key: 'phc',
    label: 'PHC / CHC',
    emoji: '🏠',
    type: 'phc',
    color: 'bg-teal-50 border-teal-200',
    textColor: 'text-teal-600',
  },
  {
    key: 'medicine',
    label: 'Jan Aushadhi',
    emoji: '💊',
    type: 'medicine',
    color: 'bg-orange-50 border-orange-200',
    textColor: 'text-orange-600',
  },
  {
    key: 'diagnostic',
    label: 'Diagnostic Centre',
    emoji: '🔬',
    type: 'diagnostic',
    color: 'bg-purple-50 border-purple-200',
    textColor: 'text-purple-600',
  },
]

export default function NearbyCareScreen() {
  const { t, profile, navigate } = useApp()
  const [selectedState, setSelectedState] = useState(profile?.state || '')
  const [selectedDistrict, setSelectedDistrict] = useState(profile?.district || '')
  const [selectedType, setSelectedType] = useState(null)
  const [showHospitalList, setShowHospitalList] = useState(false)

  // Get available states
  const states = Object.keys(hospitalsData)
  
  // Get available districts for selected state
  const districts = selectedState ? Object.keys(hospitalsData[selectedState] || {}) : []

  // Get hospitals for selected district and type
  const getHospitals = () => {
    if (!selectedState || !selectedDistrict || !selectedType) return []
    
    const hospitalList = hospitalsData[selectedState]?.[selectedDistrict] || []
    return hospitalList.filter(h => h.type === selectedType.type)
  }

  const hospitals = getHospitals()

  const handleCareTypeSelect = (careType) => {
    if (!selectedState || !selectedDistrict) {
      alert('Please select State and District first')
      return
    }
    setSelectedType(careType)
    setShowHospitalList(true)
  }

  const handleHospitalClick = (hospital) => {
    const query = `${hospital.name}, ${hospital.city}, ${hospital.state}`
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}`
    window.open(mapsUrl, '_blank')
  }

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
        <h1 className="screen-title">{t.nearby.title}</h1>
        <p className="screen-subtitle">{t.nearby.subtitle}</p>
      </div>

      {/* Hospital list view */}
      {showHospitalList ? (
        <>
          <div className="px-5 mb-4">
            <button
              onClick={() => setShowHospitalList(false)}
              className="flex items-center gap-2 text-brand-green text-sm font-semibold mb-4"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </button>

            <div className="card border border-brand-green-pale mb-4">
              <p className="text-sm font-semibold text-brand-navy mb-2">📍 Searching near</p>
              <p className="text-xs text-brand-green font-medium">{selectedDistrict}, {selectedState}</p>
            </div>
          </div>

          <div className="px-5">
            {hospitals.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-brand-navy mb-3">
                  {hospitals.length} {selectedType?.label} Found
                </p>
                {hospitals.map((hospital) => (
                  <button
                    key={hospital.id}
                    onClick={() => handleHospitalClick(hospital)}
                    className="w-full text-left card border border-gray-100 hover:border-brand-green hover:bg-brand-green-pale transition-all duration-150 active:scale-95"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-brand-navy text-sm">{hospital.name}</p>
                        <p className="text-xs text-brand-text-muted mt-1">{hospital.address}</p>
                      </div>
                      <span className="text-2xl ml-2">{selectedType?.emoji}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                      <a href={`tel:${hospital.phone}`} className="text-xs text-brand-green font-semibold flex items-center gap-1">
                        📞 {hospital.phone}
                      </a>
                      <span className="text-xs text-brand-text-muted">•</span>
                      <span className="text-xs text-brand-text-muted">Tap for directions →</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                  <span className="text-2xl">🏥</span>
                </div>
                <p className="font-semibold text-brand-navy mb-1">No hospitals found</p>
                <p className="text-xs text-brand-text-muted">Try searching in a different district or state</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Location selection view */}
          <div className="px-5 mb-5">
            <div className="card border border-gray-100">
              <p className="text-xs font-semibold text-brand-text-muted uppercase tracking-wide mb-4">Your Location</p>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-brand-text-muted uppercase mb-1 block">State</label>
                  <select
                    className="input-field"
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value)
                      setSelectedDistrict('')
                    }}
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {selectedState && (
                  <div>
                    <label className="text-xs font-semibold text-brand-text-muted uppercase mb-1 block">District</label>
                    <select
                      className="input-field"
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                    >
                      <option value="">Select District</option>
                      {districts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {selectedState && selectedDistrict && (
                <p className="text-xs text-brand-green font-medium mt-3">
                  📍 Searching near: {selectedDistrict}, {selectedState}
                </p>
              )}
            </div>
          </div>

          {/* Emergency banner */}
          <div className="mx-5 mb-5">
            <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚨</span>
                <div>
                  <p className="text-red-700 font-semibold text-sm">Emergency?</p>
                  <p className="text-red-500 text-xs">Call 108 — Free ambulance anywhere in India</p>
                </div>
              </div>
              <a href="tel:108" className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-xl active:scale-95 transition-transform">
                Call 108
              </a>
            </div>
          </div>

          {/* Care type grid */}
          {selectedState && selectedDistrict && (
            <div className="px-5 mb-5">
              <p className="text-sm font-semibold text-brand-navy mb-3">What are you looking for?</p>
              <div className="grid grid-cols-2 gap-3">
                {CARE_TYPES.map((type) => (
                  <button
                    key={type.key}
                    onClick={() => handleCareTypeSelect(type)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left active:scale-95 transition-all duration-150 ${type.color}`}
                  >
                    <span className="text-2xl">{type.emoji}</span>
                    <span className={`text-sm font-semibold leading-tight ${type.textColor}`}>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Info banner */}
          <div className="mx-5 mb-4">
            <div className="bg-brand-green-pale rounded-2xl px-4 py-3">
              <p className="text-brand-green text-xs font-semibold mb-1">ℹ️ How this works</p>
              <p className="text-brand-text-secondary text-xs leading-relaxed">
                Select your location to find real hospitals, clinics, and medical facilities near you. Tap on any facility to get directions and contact information.
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="px-5">
            <p className="text-sm font-semibold text-brand-navy mb-3">Quick Helplines</p>
            <div className="space-y-2">
              {[
                { label: 'Health Helpline', number: '104', desc: 'Free medical advice 24x7', color: 'bg-brand-green' },
                { label: 'Women Helpline', number: '181', desc: 'Women in distress', color: 'bg-pink-500' },
                { label: 'Child Helpline', number: '1098', desc: 'Children in need', color: 'bg-blue-500' },
                { label: 'Mental Health', number: 'iCall: 9152987821', desc: 'Psychological support', color: 'bg-purple-500' },
              ].map((h) => (
                <div key={h.number} className="bg-white rounded-2xl border border-gray-100 px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-brand-navy font-semibold text-sm">{h.label}</p>
                    <p className="text-brand-text-muted text-xs">{h.desc}</p>
                  </div>
                  <a href={`tel:${h.number}`}
                    className={`${h.color} text-white text-xs font-bold px-3 py-2 rounded-xl active:scale-95 transition-transform`}>
                    {h.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <BottomNav />
    </div>
  )
}