import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
]

const DISTRICTS_BY_STATE = {
  'Maharashtra': ['Buldhana', 'Pune', 'Nagpur', 'Mumbai', 'Thane', 'Aurangabad', 'Nashik'],
  'Delhi': ['Central Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'North Delhi'],
  'Karnataka': ['Bangalore', 'Belgaum', 'Mangalore', 'Mysore', 'Hubli'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Meerut', 'Agra'],
  'Bihar': ['Patna', 'Gaya', 'Darbhanga', 'Bhagalpur'],
}

export default function MemberProfileScreen() {
  const { navigate, family, setFamily, selectedEditMember, setSelectedEditMember } = useApp()
  
  const [member, setMember] = useState(selectedEditMember || {
    name: '',
    relation: '',
    age: '',
    gender: '',
    state: '',
    district: '',
    city: '',
    photo: null
  })
  
  const [photoPreview, setPhotoPreview] = useState(member.photo || null)

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPhotoPreview(event.target.result)
        setMember({ ...member, photo: event.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (!member.name) {
      alert('Please fill required fields')
      return
    }
    
    // Update family member
    const updated = family.map(m => m.name === selectedEditMember?.name ? member : m)
    setFamily(updated)
    
    // Reset and navigate back
    setSelectedEditMember(null)
    navigate('dashboard')
  }

  const handleDelete = () => {
    if (confirm('Delete this member?')) {
      setFamily(family.filter(m => m.name !== member.name))
      setSelectedEditMember(null)
      navigate('dashboard')
    }
  }

  const districtOptions = DISTRICTS_BY_STATE[member.state] || []

  return (
    <div className="screen pb-24">
      
      {/* Header */}
      <div className="bg-brand-green px-5 pt-12 pb-6 flex items-center justify-between">
        <button
          onClick={() => {
            setSelectedEditMember(null)
            navigate('dashboard')
          }}
          className="flex items-center gap-1 text-green-100 text-sm"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        <h1 className="screen-title text-white text-lg">Member Profile</h1>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="px-5 pt-6">
        
        {/* Photo section */}
        <div className="flex justify-center mb-6">
          <label className="cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-brand-green-pale flex items-center justify-center overflow-hidden border-4 border-brand-green-pale">
              {photoPreview ? (
                <img src={photoPreview} alt="Member" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">📷</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-xs text-brand-text-muted text-center mb-6">Tap to upload photo</p>

        {/* Form fields */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-brand-text-muted uppercase mb-1 block">Name *</label>
            <input
              type="text"
              className="input-field"
              placeholder="Full name"
              value={member.name}
              onChange={(e) => setMember({ ...member, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-brand-text-muted uppercase mb-1 block">Relation</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Wife, Son, Father, Mother"
              value={member.relation}
              onChange={(e) => setMember({ ...member, relation: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-brand-text-muted uppercase mb-1 block">Age *</label>
            <input
              type="number"
              className="input-field"
              placeholder="Age in years"
              value={member.age}
              onChange={(e) => setMember({ ...member, age: parseInt(e.target.value) || '' })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-brand-text-muted uppercase mb-1 block">Gender</label>
            <select
              className="input-field"
              value={member.gender}
              onChange={(e) => setMember({ ...member, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-brand-text-muted uppercase mb-1 block">State</label>
            <select
              className="input-field"
              value={member.state}
              onChange={(e) => setMember({ ...member, state: e.target.value, district: '', city: '' })}
            >
              <option value="">Select State</option>
              {STATES.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {member.state && (
            <div>
              <label className="text-xs font-semibold text-brand-text-muted uppercase mb-1 block">District</label>
              <select
                className="input-field"
                value={member.district}
                onChange={(e) => setMember({ ...member, district: e.target.value })}
              >
                <option value="">Select District</option>
                {districtOptions.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-brand-text-muted uppercase mb-1 block">City / Village</label>
            <input
              type="text"
              className="input-field"
              placeholder="City or village name"
              value={member.city}
              onChange={(e) => setMember({ ...member, city: e.target.value })}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          {selectedEditMember && (
            <button
              onClick={handleDelete}
              className="flex-1 py-4 rounded-2xl border-2 border-red-200 text-red-500 font-semibold text-sm"
            >
              Remove Member
            </button>
          )}
          <button
            onClick={handleSave}
            className="btn-primary flex-1"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
