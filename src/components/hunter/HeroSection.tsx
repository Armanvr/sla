import { classColors, elementColors, statIcons } from './constants'
import type { HunterData } from './types'

function ElementBadge({ element }: { element: { name: string; primary: boolean } }) {
	const color = elementColors[element.name] ?? 'bg-zinc-600'
	return (
		<span
			class={`${color} px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${element.primary ? 'ring-2 ring-white/30' : ''}`}
		>
			{element.name}
			{element.primary && <span class='ml-1 text-[10px] opacity-70'>★</span>}
		</span>
	)
}

function InfoRow({ label, value }: { label: string; value: string }) {
	return (
		<div class='flex justify-between items-center py-2 border-b border-zinc-800 last:border-0'>
			<span class='text-sm text-zinc-400'>{label}</span>
			<span class='text-sm text-zinc-200'>{value}</span>
		</div>
	)
}

function StatCard({ stat, primary }: { stat: { key: string; label: string; description: string }; primary: boolean }) {
	const icon = statIcons[stat.key] ?? '✦'
	return (
		<div
			class={`bg-zinc-800/50 border rounded-lg p-4 transition-colors ${primary ? 'border-amber-500/40 hover:border-amber-400/60' : 'border-zinc-700/50 hover:border-purple-500/30'}`}
		>
			<div class='flex items-center gap-2 mb-1'>
				<span class='text-lg'>{icon}</span>
				<span class={`font-semibold ${primary ? 'text-amber-400' : 'text-zinc-100'}`}>{stat.label}</span>
			</div>
			<p class={`text-sm ${primary ? 'text-amber-300/70' : 'text-zinc-400'}`}>{stat.description}</p>
		</div>
	)
}

export function StatBar({
	label,
	value,
	max,
	primary,
}: {
	label: string
	value: number
	max: number
	primary: boolean
}) {
	const pct = Math.round((value / max) * 100)
	return (
		<div>
			<div class='flex justify-between text-sm mb-1'>
				<span class={`${primary ? 'text-amber-400' : 'text-zinc-400'}`}>{label}</span>
				<span class='text-zinc-200 font-mono'>{value.toLocaleString()}</span>
			</div>
			<div class='h-1.5 bg-zinc-700 rounded-full overflow-hidden'>
				<div class='h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full' style={`width:${pct}%`} />
			</div>
		</div>
	)
}

export function HeroSection({ data }: { data: HunterData }) {
	return (
		<div class='flex flex-col lg:flex-row gap-8'>
			<div class='lg:w-1/3 flex justify-center'>
				<div class='relative'>
					<div class='absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl blur-3xl' />
					<img
						src={data.image}
						alt={data.name}
						class='relative w-72 lg:w-full max-w-sm rounded-2xl border border-zinc-700/50 object-cover'
					/>
				</div>
			</div>

			<div class='lg:w-2/3 space-y-6'>
				<div>
					{data.title && (
						<p class='text-sm text-purple-400 font-medium uppercase tracking-widest mb-1'>{data.title}</p>
					)}
					<h2 class='text-4xl font-bold mb-2'>{data.name}</h2>
					{data.alias && <p class='text-zinc-400 italic'>"{data.alias}"</p>}
				</div>

				<div class='flex flex-wrap gap-2'>
					{data.elements.map((el) => (
						<ElementBadge key={el.name} element={el} />
					))}
					{data.class && (
						<span
							class={`${classColors[data.class] ?? 'bg-zinc-700'} px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider`}
						>
							{data.class}
						</span>
					)}
					{data.rank && (
						<span class='bg-zinc-800 border border-zinc-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-zinc-300'>
							{data.rank}
						</span>
					)}
				</div>

				<div class='bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-4 max-w-md'>
					<InfoRow label='Age' value={String(data.age)} />
					<InfoRow label='Gender' value={data.gender} />
					<InfoRow label='Species' value={data.species} />
					{data.country && <InfoRow label='Country' value={data.country} />}
					{data.guild && <InfoRow label='Guild' value={data.guild} />}
					{data.mainAbility && <InfoRow label='Ability' value={data.mainAbility} />}
					{data.exclusiveWeapon && <InfoRow label='Weapon' value={data.exclusiveWeapon} />}
					{data.releaseDate && <InfoRow label='Release' value={data.releaseDate} />}
				</div>

				{data.relatives.length > 0 && (
					<div>
						<h3 class='text-lg font-semibold mb-3'>Relatives</h3>
						<div class='flex flex-wrap gap-2'>
							{data.relatives.map((rel) => (
								<span
									key={rel.name}
									class='bg-zinc-800 border border-zinc-700/50 rounded-lg px-3 py-1.5 text-sm'
								>
									<span class='text-zinc-400'>{rel.relation}:</span>{' '}
									<span class='text-zinc-200'>{rel.name}</span>
								</span>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
