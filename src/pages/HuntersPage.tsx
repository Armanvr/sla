import type { JSX } from 'preact'
import { useState } from 'preact/hooks'
import type { HunterData } from '../components/HunterProfile'
import { Badge } from '../components/sla/Badge'
import { ELEMENT_LABEL_FR, ELEMENT_SLUG, ELEMENTS, ElementBar } from '../components/sla/ElementBadge'
import { ELEMENT_ICON } from '../components/sla/elements'
import { SectionHeader } from '../components/sla/SectionHeader'

interface HunterCard {
	id: string
	data: HunterData
}

const CATEGORIES = ['Elemental Stacker', 'Elemental Buster', 'Breaker', 'Supporter', 'Striker'] as const
type Category = (typeof CATEGORIES)[number]

const rarityClass: Record<string, string> = {
	SSR: 'sla-rarity sla-rarity-ssr',
	SR: 'sla-rarity sla-rarity-sr',
	R: 'sla-rarity sla-rarity-r',
}

const hunterCardTitleStyle: JSX.CSSProperties = {
	fontFamily: 'var(--sla-font-hud)',
	fontSize: 'var(--sla-text-sm)',
	fontWeight: 700,
	letterSpacing: 'var(--sla-ls-normal)',
	textTransform: 'uppercase',
	color: 'var(--sla-text-primary)',
	margin: 0,
	lineHeight: 1.2,
}

function HunterCardItem({ hunter }: { hunter: HunterCard }) {
	const primary = hunter.data.elements.find((e) => e.primary) ?? hunter.data.elements[0]
	const slug = primary ? (ELEMENT_SLUG[primary.name] ?? 'ember') : 'ember'
	const isNew = hunter.data.newHunter === true

	return (
		<a
			href={`/hunter/${hunter.id}`}
			className='sla-panel sla-clickable'
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
				className={`sla-elem-tint-${slug} sla-hunter-card-img`}
				style={{
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
					loading='lazy'
					decoding='async'
					width={160}
					height={160}
					alt={hunter.data.name}
					style={{
						width: 160,
						height: 160,
						objectFit: 'contain',
						filter: 'drop-shadow(0 0 12px rgba(97, 55, 255, 0.18))',
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
							<div className='sla-label' style={{ marginBottom: 2 }}>
								{hunter.data.title}
							</div>
						)}
						<h3 style={hunterCardTitleStyle}>{hunter.data.name}</h3>
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
							<span className={rarityClass[hunter.data.rarity]}>{hunter.data.rarity}</span>
						)}
					</div>
				</div>

				<div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
					{hunter.data.elements.map((el) => {
						const s = ELEMENT_SLUG[el.name] ?? 'ember'
						return (
							<span
								key={el.name}
								className={`sla-elem-badge sla-elem-badge-${s}`}
								style={{ fontSize: 'var(--sla-text-xs)' }}
							>
								{el.name}
							</span>
						)
					})}
					{hunter.data.class && (
						<span className='sla-label' style={{ alignSelf: 'center' }}>
							{hunter.data.class}
						</span>
					)}
				</div>

				<div
					style={{
						fontFamily: 'var(--sla-font-mono)',
						fontSize: 'var(--sla-text-xs)',
						letterSpacing: 'var(--sla-ls-wider)',
						color: 'var(--sla-mana-bright)',
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
		<div className='sla-container' style={{ padding: '64px 0', display: 'flex', flexDirection: 'column', gap: 48 }}>
			<SectionHeader
				tag='// SECTION // HUNTERS'
				title='Hunter Guides'
				as='h1'
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
							className={`sla-btn sla-tap ${active ? 'sla-btn-primary' : 'sla-btn-ghost'}`}
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
								<span className='sla-elem-bar sla-elem-bar-ember' style={{ height: 24 }} />
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
								<span className='sla-elem-badge sla-elem-badge-ember'>Unique</span>
							</div>
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fill, minmax(min(360px, 100%), 1fr))',
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
					return (
						<div key={el}>
							<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
								<ElementBar element={el} />
								<img src={ELEMENT_ICON[el]} alt={el} style={{ width: 20, height: 20 }} />
								<h3
									style={{
										fontFamily: 'var(--sla-font-hud)',
										textTransform: 'uppercase',
										margin: 0,
										color: 'var(--sla-text-primary)',
									}}
								>
									{ELEMENT_LABEL_FR[el]}
								</h3>
								<span className={`sla-elem-badge sla-elem-badge-${ELEMENT_SLUG[el]}`}>
									{group.length} chasseur{group.length > 1 ? 's' : ''}
								</span>
							</div>
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fill, minmax(min(360px, 100%), 1fr))',
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
