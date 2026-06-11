import { useApp } from '../context/AppContext.jsx'

const avatarColors = [
  'bg-brand-green-pale text-brand-green',
  'bg-brand-saffron-light text-brand-saffron',
  'bg-blue-50 text-blue-600',
  'bg-purple-50 text-purple-600',
  'bg-pink-50 text-pink-600',
]

function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function FamilyMemberChip({ member, index, selected, onSelect, eligible = true, ineligibilityReason = null }) {
  const colorClass = avatarColors[index % avatarColors.length]

  return (
    <button
      onClick={() => eligible && onSelect(member)}
      disabled={!eligible}
      title={ineligibilityReason || ''}
      className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all duration-150 active:scale-95 min-w-[72px]
        ${!eligible
          ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
          : selected
            ? 'border-brand-green bg-brand-green-pale'
            : 'border-gray-100 bg-white'
        }`}
    >
      {/* Avatar circle */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm ${colorClass}`}>
        {getInitials(member.name)}
      </div>

      {/* Name */}
      <span className={`text-xs font-medium text-center leading-tight max-w-[64px] truncate
        ${!eligible 
          ? 'text-gray-400' 
          : selected ? 'text-brand-green' : 'text-brand-text-primary'}`}>
        {member.name}
      </span>

      {/* Relation badge or ineligibility reason */}
      {ineligibilityReason ? (
        <span className="text-xs text-red-500 leading-none font-medium">
          {ineligibilityReason}
        </span>
      ) : member.relation && (
        <span className="text-xs text-brand-text-muted leading-none">
          {member.relation}
        </span>
      )}
    </button>
  )
}
