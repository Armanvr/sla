export const elementTabActive: Record<string, string> = {
	Dark: 'bg-mist-600 text-white',
	Water: 'bg-mist-600 text-white',
	Fire: 'bg-mist-600 text-white',
	Light: 'bg-mist-600 text-white',
	Wind: 'bg-mist-600 text-white',
}

const elementIcon: Record<string, string> = {
	Dark: '/assets/utils/Dark_Element.png',
	Water: '/assets/utils/Water_Element.png',
	Fire: '/assets/utils/Fire_Element.png',
	Light: '/assets/utils/Light_Element.png',
	Wind: '/assets/utils/Wind_Element.png',
}

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
		<div class='flex flex-wrap gap-2'>
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
						class={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
							isActive
								? (elementTabActive[team.element] ?? 'bg-zinc-600 text-white')
								: isWeak
									? 'bg-zinc-800 border border-emerald-500/50 text-zinc-200 hover:border-emerald-400/70 hover:text-zinc-100'
									: isResistant
										? 'bg-zinc-800 border border-red-500/40 text-zinc-400 hover:border-red-400/60 hover:text-zinc-300'
										: 'bg-zinc-800 border border-zinc-700/60 text-zinc-300 hover:border-zinc-500/60 hover:text-zinc-100'
						}`}
					>
						{isWeak && !isActive && (
							<span class='absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-emerald-500 border border-zinc-900' />
						)}
						{isResistant && !isActive && (
							<span class='absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-red-500 border border-zinc-900' />
						)}
						{elementIcon[team.element] ? (
							<img
								src={elementIcon[team.element]}
								alt={team.element}
								class='w-4 h-4 object-contain flex-shrink-0'
							/>
						) : (
							<span class='w-2 h-2 rounded-full flex-shrink-0 bg-zinc-400' />
						)}
						{team.element}
						{isRandom && <span class='text-[10px] text-zinc-500 font-normal ml-1'>★ aléatoire</span>}
						{isWeak && <span class='text-[10px] text-emerald-400 font-normal ml-1'>★ recommandé</span>}
						{isResistant && <span class='text-[10px] text-red-400/80 font-normal ml-1'>✗ résistance</span>}
					</button>
				)
			})}
		</div>
	)
}
