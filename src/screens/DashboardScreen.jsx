
import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import BottomNav from '../components/BottomNav.jsx'

const STATE_DISTRICTS = {
  'Maharashtra': ['Ahmednagar','Akola','Amravati','Aurangabad','Beed','Bhandara','Buldhana','Chandrapur','Dhule','Gadchiroli','Gondia','Hingoli','Jalgaon','Jalna','Kolhapur','Latur','Mumbai City','Mumbai Suburban','Nagpur','Nanded','Nandurbar','Nashik','Osmanabad','Palghar','Parbhani','Pune','Raigad','Ratnagiri','Sangli','Satara','Sindhudurg','Solapur','Thane','Wardha','Washim','Yavatmal'],
  'Uttar Pradesh': ['Agra','Aligarh','Allahabad','Ambedkar Nagar','Azamgarh','Barabanki','Bareilly','Gorakhpur','Kanpur Nagar','Lucknow','Meerut','Varanasi'],
  'Bihar': ['Araria','Bhagalpur','Darbhanga','Gaya','Muzaffarpur','Nalanda','Patna','Purnia','Saran'],
  'Rajasthan': ['Ajmer','Alwar','Bikaner','Jaipur','Jaisalmer','Jodhpur','Kota','Udaipur'],
  'Madhya Pradesh': ['Bhopal','Gwalior','Indore','Jabalpur','Rewa','Sagar','Ujjain'],
  'Gujarat': ['Ahmedabad','Bharuch','Bhavnagar','Gandhinagar','Jamnagar','Rajkot','Surat','Vadodara'],
  'Karnataka': ['Bengaluru Urban','Belagavi','Dharwad','Kalaburagi','Mangaluru','Mysuru','Shivamogga'],
  'Tamil Nadu': ['Chennai','Coimbatore','Madurai','Salem','Tiruchirappalli','Tirunelveli'],
  'Andhra Pradesh': ['Ananthapuramu','Chittoor','Guntur','Kakinada','Kurnool','Visakhapatnam'],
  'Telangana': ['Hyderabad','Karimnagar','Khammam','Nalgonda','Nizamabad','Warangal Urban'],
  'Kerala': ['Ernakulam','Kannur','Kozhikode','Malappuram','Thiruvananthapuram','Thrissur'],
  'West Bengal': ['Birbhum','Darjeeling','Howrah','Kolkata','Malda','Murshidabad','Nadia'],
  'Punjab': ['Amritsar','Bathinda','Jalandhar','Ludhiana','Patiala'],
  'Haryana': ['Ambala','Faridabad','Gurugram','Hisar','Karnal','Rohtak'],
  'Odisha': ['Bhubaneswar','Cuttack','Ganjam','Khordha','Sambalpur','Sundargarh'],
  'Jharkhand': ['Bokaro','Dhanbad','Giridih','Hazaribagh','Ranchi'],
  'Assam': ['Dibrugarh','Guwahati','Jorhat','Kamrup Metropolitan','Nagaon','Silchar'],
  'Delhi': ['Central Delhi','East Delhi','New Delhi','North Delhi','South Delhi','West Delhi'],
  'Chhattisgarh': ['Bilaspur','Durg','Raipur','Rajnandgaon'],
  'Goa': ['North Goa','South Goa'],
  'Himachal Pradesh': ['Kangra','Kullu','Mandi','Shimla','Solan'],
  'Uttarakhand': ['Dehradun','Haridwar','Nainital','Pauri Garhwal','Tehri Garhwal'],
}

const ALL_STATES     = Object.keys(STATE_DISTRICTS).sort()
const INCOME_RANGES  = ['Below ₹1 lakh','₹1 – 2.5 lakh','₹2.5 – 5 lakh','₹5 – 10 lakh','Above ₹10 lakh']
const OCCUPATIONS    = ['Farmer','Daily Wage Worker','Self Employed','Private Job','Government Job','Homemaker','Student','Other']
const RELATIONS      = ['Wife','Husband','Son','Daughter','Father','Mother','Brother','Sister','Grandfather','Grandmother','Other']

const EMPTY_MEMBER = { name: '', relation: '', age: '', gender: '', state: '', district: '', city: '', income: '', occupation: '', hasAyushman: '' }

function MemberForm({ data, onChange, showRelation = true, error = false }) {
  const districts = data.state ? (STATE_DISTRICTS[data.state] || []) : []
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-brand-text-muted uppercase mb-1">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input className={`input-field ${error && !data.name ? 'border-red-400' : ''}`} placeholder="Full Name"
          value={data.name || ''} onChange={(e) => onChange('name', e.target.value)} />
      </div>
      {showRelation && (
        <select className="input-field" value={data.relation || ''} onChange={(e) => onChange('relation', e.target.value)}>
          <option value="">Select Relation</option>
          {RELATIONS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      )}
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-brand-text-muted uppercase mb-1">
            Age <span className="text-red-400">*</span>
          </label>
          <input className={`input-field ${error && !data.age ? 'border-red-400' : ''}`} placeholder="Age" type="number"
            value={data.age || ''} onChange={(e) => onChange('age', e.target.value)} />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-brand-text-muted uppercase mb-1">
            Gender <span className="text-red-400">*</span>
          </label>
          <select className={`input-field ${error && !data.gender ? 'border-red-400' : ''}`} value={data.gender || ''} onChange={(e) => onChange('gender', e.target.value)}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-brand-text-muted uppercase mb-1">
          State <span className="text-red-400">*</span>
        </label>
        <select className={`input-field ${error && !data.state ? 'border-red-400' : ''}`} value={data.state || ''}
          onChange={(e) => { onChange('state', e.target.value); onChange('district', '') }}>
          <option value="">Select State</option>
          {ALL_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-brand-text-muted uppercase mb-1">District</label>
        <select className="input-field" value={data.district || ''} onChange={(e) => onChange('district', e.target.value)}
          disabled={!data.state}>
          <option value="">{data.state ? 'Select District' : 'Select state first'}</option>
          {districts.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-brand-text-muted uppercase mb-1">City / Village</label>
        <input className="input-field" placeholder="City / Village"
          value={data.city || ''} onChange={(e) => onChange('city', e.target.value)} />
      </div>
      <div>
        <label className="block text-xs font-semibold text-brand-text-muted uppercase mb-1">
          Annual Family Income <span className="text-red-400">*</span>
        </label>
        <select className={`input-field ${error && !data.income ? 'border-red-400' : ''}`} value={data.income || ''} onChange={(e) => onChange('income', e.target.value)}>
          <option value="">Select range</option>
          {INCOME_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-brand-text-muted uppercase mb-1">Occupation</label>
        <select className="input-field" value={data.occupation || ''} onChange={(e) => onChange('occupation', e.target.value)}>
          <option value="">Select Occupation</option>
          {OCCUPATIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <p className="text-xs font-semibold text-brand-text-muted uppercase mb-2">Has Ayushman Card?</p>
        <div className="flex gap-2">
          {['yes','no'].map((v) => (
            <button key={v} onClick={() => onChange('hasAyushman', v)}
              className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all
                ${data.hasAyushman === v ? 'border-brand-green bg-brand-green-pale text-brand-green' : 'border-gray-200 text-brand-text-secondary'}`}>
              {v === 'yes' ? 'Yes' : 'No'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DashboardScreen() {
  const { t, profile, setProfile, family, setFamily, navigate } = useApp()
  const [showAddMember, setShowAddMember]     = useState(false)
  const [showEditMember, setShowEditMember]   = useState(null)
  const [newMember, setNewMember]             = useState({ ...EMPTY_MEMBER })
  const [editData, setEditData]               = useState({})
  const [addError, setAddError]               = useState(false)
  const [editError, setEditError]             = useState(false)

  const updateNew    = (field, val) => { setNewMember((p) => ({ ...p, [field]: val })); setAddError(false) }
  const updateEdit   = (field, val) => { setEditData((p) => ({ ...p, [field]: val })); setEditError(false) }

  const REQUIRED = ['name', 'age', 'gender', 'state', 'income']

  const handleAddMember = () => {
    if (REQUIRED.some((f) => !newMember[f])) { setAddError(true); return }
    setFamily([...family, newMember])
    setNewMember({ ...EMPTY_MEMBER })
    setAddError(false)
    setShowAddMember(false)
  }

  const handleSaveEdit = () => {
    if (REQUIRED.some((f) => !editData[f])) { setEditError(true); return }
    if (showEditMember === 'self') {
      setProfile({ ...profile, ...editData })
    } else {
      setFamily(family.map((m) => m.name === showEditMember.name ? editData : m))
    }
    setEditError(false)
    setShowEditMember(null)
  }

  const handleDelete = () => {
    setFamily(family.filter((m) => m.name !== showEditMember.name))
    setShowEditMember(null)
  }

  const quickActions = [
    { key: 'schemes',  label: t.dashboard.schemes,    desc: t.dashboard.schemesDesc,    screen: 'schemeFinder', bg: 'bg-brand-green-pale', iconBg: 'bg-brand-green',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
    { key: 'nearby',   label: t.dashboard.nearbyCare, desc: t.dashboard.nearbyCareDesc, screen: 'nearby',       bg: 'bg-blue-50',          iconBg: 'bg-blue-500',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> },
    { key: 'medicines',label: t.dashboard.medicines,  desc: t.dashboard.medicinesDesc,  screen: 'medicines',    bg: 'bg-orange-50',        iconBg: 'bg-brand-saffron',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z"/></svg> },
    { key: 'awareness',label: t.dashboard.awareness,  desc: t.dashboard.awarenessDesc,  screen: 'awareness',    bg: 'bg-purple-50',        iconBg: 'bg-purple-500',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg> },
  ]

  const allMembers = [
    { ...profile, name: profile?.name || 'Me', relation: 'Self', isSelf: true },
    ...family.map((m) => ({ ...m, isSelf: false })),
  ]

  const colors = ['bg-brand-green','bg-brand-saffron','bg-blue-500','bg-purple-500','bg-pink-500']

  return (
    <div className="screen pb-24">

      {/* Top bar */}
      <div className="bg-brand-green px-5 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">{t.dashboard.greeting},</p>
            <h1 className="font-display font-bold text-xl text-white">{profile?.name || 'Friend'} 👋</h1>
          </div>
          <button
            onClick={() => { setEditData({ ...profile }); setShowEditMember('self') }}
            className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center"
          >
            <span className="font-display font-bold text-white text-sm">{(profile?.name || 'F')[0].toUpperCase()}</span>
          </button>
        </div>
        <p className="text-green-100 text-xs mt-1">{profile?.state && `${profile.state} · `}{t.dashboard.subtitle}</p>
      </div>

      {/* Family members */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-brand-navy">{t.dashboard.familyTitle}</p>
          <button onClick={() => setShowAddMember(true)} className="text-xs font-semibold text-brand-green">{t.dashboard.addMember}</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {allMembers.map((m, i) => (
            <button key={i} onClick={() => { setEditData({ ...m }); setShowEditMember(m.isSelf ? 'self' : m) }}
              className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm text-white ${colors[i % colors.length]}`}>
                {m.name[0].toUpperCase()}
              </div>
              <span className="text-xs text-brand-text-primary font-medium max-w-[48px] truncate text-center">{m.name}</span>
              <span className="text-xs text-brand-text-muted">{m.relation}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Add member modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-[430px] rounded-t-3xl px-6 pt-6 pb-20 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-brand-navy">Add Family Member</h3>
              <button onClick={() => setShowAddMember(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-brand-text-muted">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <MemberForm data={newMember} onChange={updateNew} showRelation={true} error={addError} />
            {addError && (
              <p className="text-red-500 text-sm mt-3 text-center">Please fill all required fields (Name, Age, Gender, State, Income)</p>
            )}
            <div className="flex gap-3 mt-5">
              <button onClick={() => { setShowAddMember(false); setAddError(false) }} className="btn-secondary">Cancel</button>
              <button onClick={handleAddMember} className="btn-primary">Add Member</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit member modal */}
      {showEditMember && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-[430px] rounded-t-3xl px-6 pt-6 pb-20 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-brand-navy">
                {showEditMember === 'self' ? 'Edit Your Profile' : 'Edit Member'}
              </h3>
              <button onClick={() => setShowEditMember(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-brand-text-muted">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <MemberForm data={editData} onChange={updateEdit} showRelation={showEditMember !== 'self'} error={editError} />
            {editError && (
              <p className="text-red-500 text-sm mt-3 text-center">Please fill all required fields (Name, Age, Gender, State, Income)</p>
            )}
            <div className="flex gap-3 mt-5">
              {showEditMember !== 'self' && (
                <button onClick={handleDelete}
                  className="flex-1 py-4 rounded-2xl border-2 border-red-200 text-red-500 font-semibold text-sm">
                  Remove
                </button>
              )}
              <button onClick={handleSaveEdit} className="btn-primary flex-1">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="px-5 pt-2">
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <button key={action.key} onClick={() => navigate(action.screen)}
              className={`${action.bg} rounded-2xl p-4 text-left active:scale-95 transition-transform duration-150`}>
              <div className={`w-10 h-10 rounded-xl ${action.iconBg} flex items-center justify-center mb-3`}>{action.icon}</div>
              <p className="font-display font-semibold text-brand-navy text-sm leading-tight">{action.label}</p>
              <p className="text-brand-text-secondary text-xs mt-0.5">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div className="px-5 mt-4">
        <div className="bg-brand-navy rounded-2xl p-4 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-transform"
          onClick={() => navigate('schemeFinder')}>
          <div className="flex-1">
            <p className="text-white font-display font-semibold text-sm">Check which schemes you qualify for</p>
            <p className="text-blue-200 text-xs mt-0.5">Powered by AI · Takes 1 min</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-5 h-5"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
