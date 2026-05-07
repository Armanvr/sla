import { useState } from 'preact/hooks'
import type { HunterData } from '../components/HunterProfile'
import { Badge } from '../components/sla/Badge'
import { ELEMENTS, ElementBar } from '../components/sla/ElementBadge'
import { SectionHeader } from '../components/sla/SectionHeader'

interface HunterCard {
	id: string
	data: HunterData
}

const CATEGORIES = ['Elemental Stacker', 'Breaker', 'Supporter', 'Striker'] as const
type Category = (typeof CATEGORIES)[number]

const elementMeta: Record<string, { label: string; icon: string; slug: string }> = {
	Dark: { label: 'Ténèbres', icon: '/assets/utils/Dark_Element.png', slug: 'dark' },
	Fire: { label: 'Feu', icon: '/assets/utils/Fire_Element.png', slug: 'fire' },
	Water: { label: 'Eau', icon: '/assets/utils/Water_Element.png', slug: 'water' },
	Light: { label: 'Lumière', icon: '/assets/utils/Light_Element.png', slug: 'light' },
	Wind: { label: 'Vent', icon: '/assets/utils/Wind_Element.png', slug: 'wind' },
}

const rarityClass: Record<string, string> = {
	SSR: 'sla-rarity sla-rarity-ssr',
	SR: 'sla-rarity sla-rarity-sr',
	R: 'sla-rarity sla-rarity-r',
}

function HunterCardItem({ hunter }: { hunter: HunterCard }) {
	const primary = hunter.data.elements.find((e) => e.primary) ?? hunter.data.elements[0]
	const slug = primary ? (elementMeta[primary.name]?.slug ?? 'ember') : 'ember'
	const isNew = hunter.data.newHunter === true

	return (
		<a
			href={`/hunter/${hunter.id}`}
			class='sla-panel sla-clickable'
			style={{
				display: 'flex',
				textDecoration: 'none',
				overflow: 'hidden',
				position: 'relative',
				boxShadow: isNew ? '0 0 16px rgba(97, 55, 255, 0.4), inset 0 0 0 1px var(--sla-mana)' : undefined,
			}}
		>
			{/* Left: Hunter image */}
			<div
				class={`sla-elem-tint-${slug}`}
				style={{
					width: 140,
					minWidth: 140,
					position: 'relative',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: 'linear-gradient(to right, transparent 50%, var(--sla-bg-surface) 100%)',
						zIndex: 1,
					}}
				/>
				<img
					src={hunter.data.icon ?? hunter.data.image}
					alt={hunter.data.name}
					style={{
						width: 160,
						height: 160,
						objectFit: 'contain',
						filter: 'drop-shadow(0 0 12px rgba(255,74,28,0.15))',
					}}
				/>
			</div>

			{/* Right: Info */}
			<div
				style={{
					flex: 1,
					padding: '16px 20px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					gap: 8,
					minWidth: 0,
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'flex-start',
						justifyContent: 'space-between',
						gap: 8,
					}}
				>
					<div style={{ minWidth: 0 }}>
						{hunter.data.title && (
							<div class='sla-label' style={{ marginBottom: 2 }}>
								{hunter.data.title}
							</div>
						)}
						<h3
							style={{
								fontFamily: 'var(--sla-font-hud)',
								fontSize: 'var(--sla-text-sm)',
								fontWeight: 700,
								letterSpacing: 'var(--sla-ls-normal)',
								textTransform: 'uppercase',
								color: 'var(--sla-text-primary)',
								margin: 0,
								lineHeight: 1.2,
							}}
						>
							{hunter.data.name}
						</h3>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-end',
							gap: 4,
							flexShrink: 0,
						}}
					>
						{isNew && (
							<span
								style={{
									background: 'var(--sla-mana)',
									color: '#fff',
									fontFamily: 'var(--sla-font-hud)',
									fontSize: 'var(--sla-text-xs)',
									letterSpacing: 'var(--sla-ls-wider)',
									padding: '2px 8px',
									textTransform: 'uppercase',
								}}
							>
								NEW
							</span>
						)}
						{hunter.data.rarity && rarityClass[hunter.data.rarity] && (
							<span class={rarityClass[hunter.data.rarity]}>{hunter.data.rarity}</span>
						)}
					</div>
				</div>

				<div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
					{hunter.data.elements.map((el) => {
						const s = elementMeta[el.name]?.slug ?? 'ember'
						return (
							<span
								key={el.name}
								class={`sla-elem-badge sla-elem-badge-${s}`}
								style={{ fontSize: 'var(--sla-text-xs)' }}
							>
								{el.name}
							</span>
						)
					})}
					{hunter.data.class && (
						<span class='sla-label' style={{ alignSelf: 'center' }}>
							{hunter.data.class}
						</span>
					)}
				</div>

				<div
					style={{
						fontFamily: 'var(--sla-font-mono)',
						fontSize: 'var(--sla-text-xs)',
						letterSpacing: 'var(--sla-ls-wider)',
						color: 'var(--sla-ember)',
						textTransform: 'uppercase',
					}}
				>
					Open dossier ▸
				</div>
			</div>
		</a>
	)
}

export function HuntersPage({ hunters }: { hunters: HunterCard[] }) {
	const [activeCategory, setActiveCategory] = useState<Category | null>(null)

	return (
		<div class='sla-container' style={{ padding: '64px 0', display: 'flex', flexDirection: 'column', gap: 48 }}>
			<SectionHeader
				tag='// SECTION // HUNTERS'
				title='Hunter Guides'
				description='Stats, compétences et builds recommandés pour chaque chasseur.'
				right={<Badge variant='active'>{hunters.length} indexés</Badge>}
			/>

			<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
				{CATEGORIES.map((cat) => {
					const active = activeCategory === cat
					return (
						<button
							key={cat}
							type='button'
							onClick={() => setActiveCategory((prev) => (prev === cat ? null : cat))}
							class={`sla-btn ${active ? 'sla-btn-primary' : 'sla-btn-ghost'}`}
							style={{ padding: '8px 18px', fontSize: 'var(--sla-text-xs)' }}
						>
							{cat}
						</button>
					)
				})}
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
				{(() => {
					const jinwoo = hunters.find((h) => h.id === 'sung-jinwoo')
					if (!jinwoo) return null
					return (
						<div>
							<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
								<span class='sla-elem-bar sla-elem-bar-ember' style={{ height: 24 }} />
								<img
									src='/assets/utils/Player_Icon.png'
									alt='Joueur'
									style={{ width: 20, height: 20 }}
								/>
								<h3
									style={{
										fontFamily: 'var(--sla-font-hud)',
										textTransform: 'uppercase',
										margin: 0,
										color: 'var(--sla-text-primary)',
									}}
								>
									Joueur
								</h3>
								<span class='sla-elem-badge sla-elem-badge-ember'>Unique</span>
							</div>
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
									gap: 12,
								}}
							>
								<HunterCardItem hunter={jinwoo} />
							</div>
						</div>
					)
				})()}

				{ELEMENTS.map((el) => {
					const group = hunters
						.filter(
							(h) =>
								h.id !== 'sung-jinwoo' &&
								h.data.elements.some((e) => e.name === el) &&
								(activeCategory === null || h.data.category === activeCategory),
						)
						.sort((a, b) => {
							if (a.data.newHunter && !b.data.newHunter) return -1
							if (!a.data.newHunter && b.data.newHunter) return 1
							return 0
						})
					if (group.length === 0) return null
					const meta = elementMeta[el]
					return (
						<div key={el}>
							<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
								<ElementBar element={el} />
								<img src={meta.icon} alt={el} style={{ width: 20, height: 20 }} />
								<h3
									style={{
										fontFamily: 'var(--sla-font-hud)',
										textTransform: 'uppercase',
										margin: 0,
										color: 'var(--sla-text-primary)',
									}}
								>
									{meta.label}
								</h3>
								<span class={`sla-elem-badge sla-elem-badge-${meta.slug}`}>
									{group.length} chasseur{group.length > 1 ? 's' : ''}
								</span>
							</div>
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
									gap: 12,
								}}
							>
								{group.map((h) => (
									<HunterCardItem key={h.id} hunter={h} />
								))}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
