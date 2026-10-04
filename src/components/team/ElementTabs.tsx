import { ELEMENT_ICON } from '../sla/elements'

interface TeamEntry {
	element: string
	status: string
}

export function ElementTabs({
	teams,
	activeElement,
	onSwitch,
	weekWeaknesses = [],
	weekResistances = [],
}: {
	teams: TeamEntry[]
	activeElement: string
	onSwitch: (el: string) => void
	weekWeaknesses?: string[]
	weekResistances?: string[]
}) {
	return (
		<div className='flex flex-wrap gap-2 overflow-x-auto pb-1'>
			{teams.map((team) => {
				const isActive = team.element === activeElement
				const isRandom = team.status !== 'active'
				const isWeak = weekWeaknesses.includes(team.element)
				const isResistant = weekResistances.includes(team.element)
				return (
					<button
						key={team.element}
						type='button'
						onClick={() => onSwitch(team.element)}
						aria-pressed={isActive}
						className={`sla-tap sla-tab sla-tab-primary relative flex items-center gap-2 px-4 py-2 text-sm font-semibold ${
							isActive ? '' : isWeak ? 'sla-tab-weak' : isResistant ? 'sla-tab-resist' : ''
						}`}
					>
						{isWeak && !isActive && (
							<span className='absolute top-0.5 left-0.5 w-3 h-3 bg-weak border border-bg-deep' />
						)}
						{isResistant && !isActive && (
							<span className='absolute top-0.5 left-0.5 w-3 h-3 bg-resist border border-bg-deep' />
						)}
						{ELEMENT_ICON[team.element] ? (
							<img
								src={ELEMENT_ICON[team.element]}
								alt={team.element}
								className='w-4 h-4 object-contain flex-shrink-0'
							/>
						) : (
							<span className='w-2 h-2 flex-shrink-0 bg-text-sla-muted' />
						)}
						{team.element}
						{isRandom && (
							<span className={`text-label font-normal ml-1 ${isActive ? '' : 'text-text-sla-muted'}`}>
								★ aléatoire
							</span>
						)}
						{isWeak && (
							<span className={`text-label font-normal ml-1 ${isActive ? '' : 'text-weak'}`}>
								★ recommandé
							</span>
						)}
						{isResistant && (
							<span className={`text-label font-normal ml-1 ${isActive ? '' : 'text-resist'}`}>
								✗ résistance
							</span>
						)}
					</button>
				)
			})}
		</div>
	)
}
