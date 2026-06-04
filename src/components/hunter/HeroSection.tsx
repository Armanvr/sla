import { classColors, elementColors } from './constants'
import type { HunterData } from './types'

function ElementBadge({ element }: { element: { name: string; primary: boolean } }) {
	const color = elementColors[element.name] ?? 'bg-zinc-600'
	return (
		<span
			className={`${color} px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${element.primary ? 'ring-2 ring-white/30' : ''}`}
		>
			{element.name}
			{element.primary && <span className='ml-1 text-[10px] opacity-70'>★</span>}
		</span>
	)
}

function InfoRow({ label, value }: { label: string; value: string }) {
	return (
		<div className='flex justify-between items-center py-2 border-b border-zinc-800 last:border-0'>
			<span className='text-sm text-zinc-400'>{label}</span>
			<span className='text-sm text-zinc-200'>{value}</span>
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
			<div className='flex justify-between text-sm mb-1'>
				<span className={`${primary ? 'text-amber-400' : 'text-zinc-400'}`}>{label}</span>
				<span className='text-zinc-200 font-mono'>{value.toLocaleString()}</span>
			</div>
			<div className='h-1.5 bg-zinc-700 rounded-full overflow-hidden'>
				<div className='h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full' style={`width:${pct}%`} />
			</div>
		</div>
	)
}

export function HeroSection({ data }: { data: HunterData }) {
	return (
		<div className='flex flex-col lg:flex-row gap-8'>
			<div className='lg:w-1/3 flex flex-col items-center gap-4'>
				<div className='relative'>
					<div className='absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl blur-3xl' />
					<img
						src={data.image}
						alt={data.name}
						className='relative w-72 lg:w-full max-w-sm rounded-2xl border border-zinc-700/50 object-cover'
					/>
				</div>
				{data.weapon && (
					<div className='flex items-center gap-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-3 w-full max-w-sm'>
						<img
							src={data.weapon.icon}
							alt={data.weapon.name}
							className='w-12 h-12 rounded-lg border border-zinc-700/50 object-contain flex-shrink-0'
						/>
						<div>
							<p className='text-[10px] text-zinc-500 uppercase tracking-widest mb-0.5'>Weapon</p>
							<p className='text-sm text-zinc-200 font-medium leading-tight'>{data.weapon.name}</p>
						</div>
					</div>
				)}
			</div>

			<div className='lg:w-2/3 space-y-6'>
				<div>
					{data.title && (
						<p className='text-sm text-purple-400 font-medium uppercase tracking-widest mb-1'>{data.title}</p>
					)}
					<h2 className='text-4xl font-bold mb-2'>{data.name}</h2>
					{data.alias && <p className='text-zinc-400 italic'>"{data.alias}"</p>}
				</div>

				<div className='flex flex-wrap gap-2'>
					{data.elements.map((el) => (
						<ElementBadge key={el.name} element={el} />
					))}
					{data.class && (
						<span
							className={`${classColors[data.class] ?? 'bg-zinc-700'} px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider`}
						>
							{data.class}
						</span>
					)}
					{data.rank && (
						<span className='bg-zinc-800 border border-zinc-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-zinc-300'>
							{data.rank}
						</span>
					)}
				</div>

				<div className='bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-4 max-w-md'>
					<InfoRow label='Age' value={String(data.age)} />
					<InfoRow label='Gender' value={data.gender} />
					<InfoRow label='Species' value={data.species} />
					{data.country && <InfoRow label='Country' value={data.country} />}
					{data.guild && <InfoRow label='Guild' value={data.guild} />}
					{data.mainAbility && <InfoRow label='Ability' value={data.mainAbility} />}
					{data.exclusiveWeapon && <InfoRow label='Weapon' value={data.exclusiveWeapon} />}
					{data.releaseDate && <InfoRow label='Release' value={data.releaseDate} />}
				</div>
			</div>
		</div>
	)
}
