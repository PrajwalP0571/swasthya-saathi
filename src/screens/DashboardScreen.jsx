import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import BottomNav from '../components/BottomNav.jsx'

export default function DashboardScreen() {
  const { t, profile, family, setFamily, navigate } = useApp()
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMember, setNewMember] = useState({ name: '', relation: '', age: '' })

  const handleAddMember = () => {
    if (!newMember.name) return
    setFamily([...family, newMember])
    setNewMember({ name: '', relation: '', age: '' })
    setShowAddMember(false)
  }

  const quickActions = [
    {
      key: 'schemes',
      label: t.dashboard.schemes,
      desc: t.dashboard.schemesDesc,
      screen: 'schemeFinder',
      bg: 'bg-brand-green-pale',
      iconBg: 'bg-brand-green',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      key: 'nearby',
      label: t.dashboard.nearbyCare,
      desc: t.dashboard.nearbyCareDesc,
      screen: 'nearby',
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-500',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      key: 'medicines',
      label: t.dashboard.medicines,
      desc: t.dashboard.medicinesDesc,
      screen: 'nearby',
      bg: 'bg-orange-50',
      iconBg: 'bg-brand-saffron',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z" />
        </svg>
      ),
    },
    {
      key: 'awareness',
      label: t.dashboard.awareness,
      desc: t.dashboard.awarenessDesc,
      screen: 'nearby',
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-500',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
        </svg>
      ),
    },
  ]

  const allMembers = [
    { name: profile?.name || 'Me', relation: 'Self', age: profile?.age },
    ...family,
  ]

  return (
    <div className="screen pb-24">

      {/* Top bar */}
      <div className="bg-brand-green px-5 pt-12 pb-6">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-green-100 text-sm">{t.dashboard.greeting},</p>
            <h1 className="font-display font-bold text-xl text-white">
              {profile?.name || 'Friend'} 👋
            </h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
            <span className="font-display font-bold text-white text-sm">
              {(profile?.name || 'F')[0].toUpperCase()}
            </span>
          </div>
        </div>
        <p className="text-green-100 text-xs mt-1">
          {profile?.state && `${profile.state} · `}{t.dashboard.subtitle}
        </p>
      </div>

      {/* Family members strip */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-brand-navy">{t.dashboard.familyTitle}</p>
          <button
            onClick={() => setShowAddMember(true)}
            className="text-xs font-semibold text-brand-green"
          >
            {t.dashboard.addMember}
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {allMembers.map((m, i) => {
            const colors = [
              'bg-brand-green text-white',
              'bg-brand-saffron text-white',
              'bg-blue-500 text-white',
              'bg-purple-500 text-white',
            ]
            return (
              <div key={i} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm ${colors[i % colors.length]}`}>
                  {m.name[0].toUpperCase()}
                </div>
                <span className="text-xs text-brand-text-primary font-medium max-w-[48px] truncate text-center">{m.name}</span>
                <span className="text-xs text-brand-text-muted">{m.relation}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add member modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-[430px] rounded-t-3xl p-6 pb-10">
            <h3 className="font-display font-bold text-lg text-brand-navy mb-4">Add Family Member</h3>
            <div className="space-y-3">
              <input
                className="input-field"
                placeholder="Name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
              <input
                className="input-field"
                placeholder="Relation (e.g. Wife, Son)"
                value={newMember.relation}
                onChange={(e) => setNewMember({ ...newMember, relation: e.target.value })}
              />
              <input
                className="input-field"
                placeholder="Age"
                type="number"
                value={newMember.age}
                onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
              />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAddMember(false)} className="btn-secondary">Cancel</button>
              <button onClick={handleAddMember} className="btn-primary">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Quick actions grid */}
      <div className="px-5 pt-2">
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.key}
              onClick={() => navigate(action.screen)}
              className={`${action.bg} rounded-2xl p-4 text-left active:scale-95 transition-transform duration-150`}
            >
              <div className={`w-10 h-10 rounded-xl ${action.iconBg} flex items-center justify-center mb-3`}>
                {action.icon}
              </div>
              <p className="font-display font-semibold text-brand-navy text-sm leading-tight">
                {action.label}
              </p>
              <p className="text-brand-text-secondary text-xs mt-0.5">
                {action.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Scheme finder CTA banner */}
      <div className="px-5 mt-4">
        <div
          className="bg-brand-navy rounded-2xl p-4 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-transform"
          onClick={() => navigate('schemeFinder')}
        >
          <div className="flex-1">
            <p className="text-white font-display font-semibold text-sm leading-snug">
              Check which schemes you qualify for
            </p>
            <p className="text-blue-200 text-xs mt-0.5">Powered by AI · Takes 1 min</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-5 h-5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
