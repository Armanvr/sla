import { useState } from 'preact/hooks'
import type { HunterData } from '../components/HunterProfile'
import workshopConfig from '../data/teams/workshop.json'
import beruData from '../data/shadows/beru.json'
import besteData from '../data/shadows/beste.json'
import bigrockData from '../data/shadows/bigrock.json'
import bladesData from '../data/shadows/blades.json'
import brutData from '../data/shadows/brute.json'
import cerbieData from '../data/shadows/cerbie.json'
import igrisData from '../data/shadows/igris.json'
import ironData from '../data/shadows/iron.json'
import jimaData from '../data/shadows/jima.json'
import kaiselData from '../data/shadows/kaisel.json'
import skullData from '../data/shadows/skull.json'
import tankData from '../data/shadows/tank.json'
import tuskData from '../data/shadows/tusk.json'
import urosData from '../data/shadows/uros.json'

interface HunterCard {
	id: string
	data: HunterData
}

interface ShadowData {
	name: string
	title: string
	shadowAuthority: string
	image: string | null
	render?: string | null
	ranks?: {
		common: string | null
		elite: string | null
		knight: string | null
		eliteKnight: string | null
		general: string | null
	}
	weapon?: { name: string; icon: string } | null
	skills?: { icon: string; name: string | null; description: string | null }[]
}

const SHADOWS: ShadowData[] = [
	beruData,
	besteData,
	bigrockData,
	bladesData,
	brutData,
	cerbieData,
	igrisData,
	ironData,
	jimaData,
	kaiselData,
	skullData,
	tankData,
	tuskData,
	urosData,
]

const elementColors: Record<string, string> = {
	Dark: 'from-purple-900/60 to-zinc-900',
	Water: 'from-blue-900/60 to-zinc-900',
	Fire: 'from-red-900/60 to-zinc-900',
	Light: 'from-yellow-900/60 to-zinc-900',
	Wind: 'from-emerald-900/60 to-zinc-900',
}

const elementAccent: Record<string, string> = {
	Dark: 'border-purple-500/40 hover:border-purple-400/70',
	Water: 'border-blue-500/40 hover:border-blue-400/70',
	Fire: 'border-red-500/40 hover:border-red-400/70',
	Light: 'border-yellow-500/40 hover:border-yellow-400/70',
	Wind: 'border-emerald-500/40 hover:border-emerald-400/70',
}

const elementHeading: Record<string, { label: string; icon: string; bar: string; badge: string }> = {
	Dark: {
		label: 'Ténèbres',
		icon: '/assets/utils/Dark_Element.png',
		bar: 'bg-purple-500',
		badge: 'bg-purple-500/15 border-purple-500/40 text-purple-300',
	},
	Fire: {
		label: 'Feu',
		icon: '/assets/utils/Fire_Element.png',
		bar: 'bg-red-500',
		badge: 'bg-red-500/15 border-red-500/40 text-red-300',
	},
	Water: {
		label: 'Eau',
		icon: '/assets/utils/Water_Element.png',
		bar: 'bg-blue-500',
		badge: 'bg-blue-500/15 border-blue-500/40 text-blue-300',
	},
	Light: {
		label: 'Lumière',
		icon: '/assets/utils/Light_Element.png',
		bar: 'bg-yellow-400',
		badge: 'bg-yellow-400/15 border-yellow-400/40 text-yellow-300',
	},
	Wind: {
		label: 'Vent',
		icon: '/assets/utils/Wind_Element.png',
		bar: 'bg-emerald-500',
		badge: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
	},
}

const ELEMENT_ORDER = ['Dark', 'Fire', 'Water', 'Light', 'Wind']

const CATEGORIES = ['Elemental Stacker', 'Breaker', 'Supporter', 'Striker'] as const
type Category = (typeof CATEGORIES)[number]

const rarityColors: Record<string, string> = {
	SSR: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
	SR: 'text-purple-400 border-purple-400/40 bg-purple-400/10',
	R: 'text-blue-400 border-blue-400/40 bg-blue-400/10',
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ title, description }: { title: string; description: string }) {
	return (
		<div class='flex items-center gap-3 mb-8'>
			<span class='w-1 h-8 bg-purple-500 rounded-full flex-shrink-0' />
			<div>
				<h2 class='text-2xl font-bold'>{title}</h2>
				<p class='text-zinc-400 text-sm mt-0.5'>{description}</p>
			</div>
		</div>
	)
}

// ─── Hunter Card ──────────────────────────────────────────────────────────────

function HunterCard({ hunter, onClick }: { hunter: HunterCard; onClick: () => void }) {
	const primaryElement = hunter.data.elements.find((e) => e.primary) ?? hunter.data.elements[0]
	const gradient = primaryElement
		? (elementColors[primaryElement.name] ?? 'from-zinc-800 to-zinc-900')
		: 'from-zinc-800 to-zinc-900'
	const accent = primaryElement
		? (elementAccent[primaryElement.name] ?? 'border-zinc-600/40 hover:border-zinc-500/70')
		: 'border-zinc-600/40 hover:border-zinc-500/70'

	return (
		<button
			type='button'
			onClick={onClick}
			class={`relative group w-full text-left bg-gradient-to-b ${gradient} border ${accent} rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
		>
			{/* Character image */}
			<div class='relative h-44 flex items-center justify-center overflow-hidden'>
				<div class='absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent z-10' />
				<img
					src={hunter.data.icon ?? hunter.data.image}
					alt={hunter.data.name}
					class='w-64 h-64 object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-xl'
				/>
			</div>

			{/* Info overlay */}
			<div class='relative z-10 -mt-10 px-3 pb-3'>
				<div class='flex items-start justify-between gap-2 mb-1.5'>
					<div class='min-w-0'>
						{hunter.data.title && (
							<p class='text-[10px] text-zinc-400 uppercase tracking-widest mb-0.5 truncate'>
								{hunter.data.title}
							</p>
						)}
						<h2 class='text-base font-bold text-white leading-tight'>{hunter.data.name}</h2>
					</div>
					{hunter.data.rarity && (
						<span
							class={`text-[10px] font-bold border px-1.5 py-0.5 rounded-md flex-shrink-0 mt-0.5 ${rarityColors[hunter.data.rarity] ?? 'text-zinc-400 border-zinc-600 bg-zinc-800'}`}
						>
							{hunter.data.rarity}
						</span>
					)}
				</div>

				{/* Tags */}
				<div class='flex flex-wrap gap-1.5'>
					{hunter.data.elements.map((el) => (
						<span
							key={el.name}
							class='text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/80 font-medium'
						>
							{el.name}
						</span>
					))}
					{hunter.data.class && (
						<span class='text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/80 font-medium'>
							{hunter.data.class}
						</span>
					)}
					{hunter.data.rank && (
						<span class='text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/80 font-medium'>
							{hunter.data.rank}
						</span>
					)}
				</div>

				{/* CTA */}
				<div class='mt-3 flex items-center gap-1 text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors'>
					<span>View guide</span>
					<span class='transition-transform group-hover:translate-x-1'>→</span>
				</div>
			</div>
		</button>
	)
}

// ─── Shadow Card ─────────────────────────────────────────────────────────────

function ShadowCard({ shadow }: { shadow: ShadowData }) {
	const img = shadow.render ?? shadow.image ?? shadow.ranks?.general

	return (
		<div class='relative group bg-gradient-to-b from-purple-950/60 to-zinc-900 border border-purple-900/40 hover:border-purple-600/60 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl'>
			{/* Image */}
			<div class='relative h-44 flex items-center justify-center overflow-hidden'>
				<div class='absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/10 to-transparent z-10' />
				{img ? (
					<img
						src={img}
						alt={shadow.name}
						class='w-48 h-48 object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-xl'
						onError={(e) => {
							;(e.target as HTMLImageElement).style.display = 'none'
						}}
					/>
				) : (
					<img src='/assets/utils/Hunter_Icon.png' alt='' class='w-16 h-16 object-contain opacity-20' />
				)}
			</div>

			{/* Info */}
			<div class='relative z-10 -mt-6 px-3 pb-3'>
				<p class='text-[10px] text-purple-400 uppercase tracking-widest mb-0.5 truncate'>{shadow.title}</p>
				<h2 class='text-base font-bold text-white leading-tight mb-2'>{shadow.name}</h2>

				<p class='text-[11px] text-zinc-400 leading-relaxed line-clamp-2'>{shadow.shadowAuthority}</p>

				{shadow.weapon && (
					<div class='flex items-center gap-1.5 mt-2'>
						<img
							src={shadow.weapon.icon}
							alt={shadow.weapon.name}
							class='w-4 h-4 object-contain flex-shrink-0 opacity-70'
							onError={(e) => {
								;(e.target as HTMLImageElement).style.display = 'none'
							}}
						/>
						<span class='text-[10px] text-zinc-500 truncate'>{shadow.weapon.name}</span>
					</div>
				)}
			</div>
		</div>
	)
}

// ─── Team Guide Card ──────────────────────────────────────────────────────────

function TeamGuideCard({
	title,
	imgSrc,
	imgSize = 'cover',
	onClick,
}: {
	title: string
	imgSrc?: string
	imgSize?: 'cover' | 'contain-md' | 'contain-lg'
	onClick: () => void
}) {
	const imgClass = {
		cover: 'w-full h-full object-cover',
		'contain-md': 'w-28 h-28 object-contain drop-shadow-xl',
		'contain-lg': 'w-42 h-42 object-contain drop-shadow-xl',
	}[imgSize]

	return (
		<button
			type='button'
			onClick={onClick}
			class='text-left bg-zinc-800/50 border border-zinc-700/50 rounded-2xl overflow-hidden hover:border-zinc-600/70 transition-colors cursor-pointer group w-full'
		>
			<div class='h-36 bg-zinc-800/80 flex items-center justify-center overflow-hidden'>
				{imgSrc ? (
					<img
						src={imgSrc}
						alt={title}
						class={`transition-transform duration-300 group-hover:scale-105 ${imgClass}`}
						onError={(e) => {
							;(e.target as HTMLImageElement).style.display = 'none'
						}}
					/>
				) : (
					<div class='w-16 h-16 rounded-xl bg-zinc-700/40 border border-zinc-600/30' />
				)}
			</div>
			<div class='px-4 py-3'>
				<h3 class='font-semibold text-zinc-100'>{title}</h3>
				<div class='mt-2 flex items-center gap-1 text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors'>
					<span>View guide</span>
					<span class='transition-transform group-hover:translate-x-1'>→</span>
				</div>
			</div>
		</button>
	)
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export function HomePage({
	hunters,
	onSelect,
	onSelectTeamGuide,
}: {
	hunters: HunterCard[]
	onSelect: (id: string) => void
	onSelectTeamGuide: (id: string) => void
}) {
	const [activeCategory, setActiveCategory] = useState<Category | null>(null)

	return (
		<div class='min-h-screen bg-zinc-900 text-zinc-100'>
			{/* Header */}
			<header class='border-b border-zinc-800 px-6 py-4 flex items-center gap-3'>
				<h1 class='text-xl font-bold tracking-wide'>
					SLA <span class='text-purple-400'>Guide</span>
				</h1>
				<span class='text-xs font-mono text-zinc-500 border border-zinc-700/60 rounded px-1.5 py-0.5'>
					v2.0.0
				</span>
				<span class='text-xs text-zinc-500 ml-auto'>Mis à jour le 16 avril 2026</span>
			</header>

			<main class='max-w-6xl mx-auto px-4 py-12 space-y-16'>
				{/* ── Team Guides ── */}
				<section>
					<SectionHeader
						title='Team Guides'
						description="Composition d'équipe optimisées par type de contenu."
					/>
					<div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
						<TeamGuideCard
							title='Dungeons'
							imgSrc='/assets/sections/dungeons.png'
							onClick={() => onSelectTeamGuide('team-dungeons')}
						/>
						<TeamGuideCard
							title='Power & Destruction'
							imgSrc='/assets/sections/power-of-destruction.png'
							onClick={() => onSelectTeamGuide('team-power-destruction')}
						/>
						<TeamGuideCard
							title='Guild Boss'
							imgSrc='/assets/sections/guild-boss.png'
							onClick={() => onSelectTeamGuide('team-guild-boss')}
						/>
						<TeamGuideCard
							title='Compare'
							imgSrc='/assets/sections/compare.png'
							onClick={() => onSelectTeamGuide('compare')}
						/>
					</div>
				</section>

				<hr class='border-zinc-800' />

				{/* ── Workshop Guides ── */}
				<section>
					<SectionHeader
						title='Workshop Guides'
						description="Optimise ton atelier et tes améliorations d'équipement."
					/>
					<div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
						{(workshopConfig as { raids: { name: string; icon: string }[] }).raids.map((raid) => {
							const label = raid.name
								.split('-')
								.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
								.join(' ')
							return (
								<TeamGuideCard
									key={raid.name}
									title={label}
									imgSrc={`/assets/workshop/${raid.name}/${raid.icon}.png`}
									imgSize='contain-lg'
									onClick={() => onSelectTeamGuide(`team-workshop:${raid.name}`)}
								/>
							)
						})}
					</div>
				</section>

				<hr class='border-zinc-800' />

				{/* ── Hunter Guides ── */}
				<section>
					<SectionHeader
						title='Hunter Guides'
						description='Retrouve les stats, compétences et builds recommandés pour chaque chasseur.'
					/>

					{/* Category filter buttons */}
					<div class='flex flex-wrap gap-2 mb-10'>
						{CATEGORIES.map((cat) => (
							<button
								key={cat}
								type='button'
								onClick={() => setActiveCategory((prev) => (prev === cat ? null : cat))}
								class={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer select-none ${
									activeCategory === cat
										? 'bg-purple-600 border-purple-500 text-white'
										: 'bg-zinc-800/60 border-zinc-600/60 text-zinc-400 hover:border-zinc-500/60 hover:text-zinc-300'
								}`}
							>
								{cat}
							</button>
						))}
					</div>

					{/* Cards grouped by element */}
					<div class='space-y-10'>
						{/* ── Joueur ── */}
						{(() => {
							const jinwoo = hunters.find((h) => h.id === 'sung-jinwoo')
							if (!jinwoo) return null
							return (
								<div>
									<div class='flex items-center gap-3 mb-4'>
										<span class='w-1 h-6 bg-amber-400 rounded-full flex-shrink-0' />
										<img src='/assets/utils/Player_Icon.png' alt='Joueur' class='w-5 h-5 object-contain' />
										<h3 class='text-base font-bold text-zinc-100'>Joueur</h3>
										<span class='text-[10px] font-bold border px-2 py-0.5 rounded-full bg-amber-400/15 border-amber-400/40 text-amber-300'>
											Unique
										</span>
									</div>
									<div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
										<HunterCard hunter={jinwoo} onClick={() => onSelect(jinwoo.id)} />
									</div>
								</div>
							)
						})()}

						{/* ── Par élément ── */}
						{ELEMENT_ORDER.map((el) => {
							const group = hunters.filter(
								(h) =>
									h.id !== 'sung-jinwoo' &&
									h.data.elements.some((e) => e.name === el) &&
									(activeCategory === null || h.data.category === activeCategory),
							)
							if (group.length === 0) return null
							const meta = elementHeading[el]
							return (
								<div key={el}>
									<div class='flex items-center gap-3 mb-4'>
										<span class={`w-1 h-6 ${meta.bar} rounded-full flex-shrink-0`} />
										<img src={meta.icon} alt={el} class='w-5 h-5 object-contain' />
										<h3 class='text-base font-bold text-zinc-100'>{meta.label}</h3>
										<span
											class={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${meta.badge}`}
										>
											{group.length} chasseur{group.length > 1 ? 's' : ''}
										</span>
									</div>
									<div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
										{group.map((hunter) => (
											<HunterCard
												key={hunter.id}
												hunter={hunter}
												onClick={() => onSelect(hunter.id)}
											/>
										))}
									</div>
								</div>
							)
						})}
					</div>
				</section>

				<hr class='border-zinc-800' />

				{/* ── Shadow Guides ── */}
				<section>
					<SectionHeader
						title='Shadow Guides'
						description='Découvre les ombres disponibles, leurs stats et leur utilité en combat.'
					/>
					<div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
						{SHADOWS.map((shadow) => (
							<ShadowCard key={shadow.name} shadow={shadow} />
						))}
					</div>
				</section>
			</main>
		</div>
	)
}
