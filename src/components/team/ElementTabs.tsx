export const elementTabActive: Record<string, string> = {
	Dark: 'bg-purple-600 text-white',
	Water: 'bg-blue-600 text-white',
	Fire: 'bg-red-600 text-white',
	Light: 'bg-yellow-500 text-zinc-900',
	Wind: 'bg-emerald-600 text-white',
}

const elementDot: Record<string, string> = {
	Dark: 'bg-purple-400',
	Water: 'bg-blue-400',
	Fire: 'bg-red-400',
	Light: 'bg-yellow-400',
	Wind: 'bg-emerald-400',
}

interface TeamEntry {
	element: string
	status: string
}

export function ElementTabs({
	teams,
	activeElement,
	onSwitch,
}: {
	teams: TeamEntry[]
	activeElement: string
	onSwitch: (el: string) => void
}) {
	return (
		<div class='flex flex-wrap gap-2'>
			{teams.map((team) => {
				const isActive = team.element === activeElement
				const isRandom = team.status !== 'active'
				return (
					<button
						key={team.element}
						type='button'
						onClick={() => onSwitch(team.element)}
						class={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
							isActive
								? (elementTabActive[team.element] ?? 'bg-zinc-600 text-white')
								: 'bg-zinc-800 border border-zinc-700/60 text-zinc-300 hover:border-zinc-500/60 hover:text-zinc-100'
						}`}
					>
						<span
							class={`w-2 h-2 rounded-full flex-shrink-0 ${elementDot[team.element] ?? 'bg-zinc-400'}`}
						/>
						{team.element}
						{isRandom && <span class='text-[10px] text-zinc-500 font-normal ml-1'>★ aléatoire</span>}
					</button>
				)
			})}
		</div>
	)
}
