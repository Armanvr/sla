import { useState } from 'preact/hooks'
import type { HunterData } from '../components/HunterProfile'
import { Badge } from '../components/sla/Badge'
import { ELEMENTS, ElementBar } from '../components/sla/ElementBadge'
import { Panel } from '../components/sla/Panel'
import { SectionHeader } from '../components/sla/SectionHeader'
import { Ticker } from '../components/sla/Ticker'
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
import workshopConfig from '../data/teams/workshop.json'

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

const elementMeta: Record<string, { label: string; icon: string; slug: string }> = {
	Dark: { label: 'Ténèbres', icon: '/assets/utils/Dark_Element.png', slug: 'dark' },
	Fire: { label: 'Feu', icon: '/assets/utils/Fire_Element.png', slug: 'fire' },
	Water: { label: 'Eau', icon: '/assets/utils/Water_Element.png', slug: 'water' },
	Light: { label: 'Lumière', icon: '/assets/utils/Light_Element.png', slug: 'light' },
	Wind: { label: 'Vent', icon: '/assets/utils/Wind_Element.png', slug: 'wind' },
}

const CATEGORIES = ['Elemental Stacker', 'Breaker', 'Supporter', 'Striker'] as const
type Category = (typeof CATEGORIES)[number]

const rarityClass: Record<string, string> = {
	SSR: 'sla-rarity sla-rarity-ssr',
	SR: 'sla-rarity sla-rarity-sr',
	R: 'sla-rarity sla-rarity-r',
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
	return (
		<section class='sla-anim-in' style={{ padding: '64px 0 48px' }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
				<span class='sla-tag'>{'SLA // Network'}</span>
				<span class='sla-label'>{'// Solo Leveling: ARISE Codex'}</span>
			</div>
			<h1 class='sla-title-hero sla-text-glow'>
				ARISE
				<br />
				<span class='sla-text-ember'>EMBERFALL</span>
			</h1>
			<p
				style={{
					marginTop: 20,
					color: 'var(--sla-text-secondary)',
					maxWidth: 720,
					fontFamily: 'var(--sla-font-body)',
					fontSize: 'var(--sla-text-md)',
				}}
			>
				Codex tactique des chasseurs, ombres, builds et compositions d'équipe. Mis à jour le{' '}
				<span class='sla-text-ember'>30 avril 2026</span>.
			</p>
		</section>
	)
}

// ─── Hunter Card ──────────────────────────────────────────────────────────────

function HunterCardItem({ hunter }: { hunter: HunterCard }) {
	const primary = hunter.data.elements.find((e) => e.primary) ?? hunter.data.elements[0]
	const slug = primary ? (elementMeta[primary.name]?.slug ?? 'ember') : 'ember'

	return (
		<a
			href={`/hunter/${hunter.id}`}
			class='sla-panel sla-clickable'
			style={{ display: 'block', textDecoration: 'none', overflow: 'hidden' }}
		>
			<div
				class={`sla-elem-tint-${slug}`}
				style={{
					position: 'relative',
					height: 200,
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
						background: 'linear-gradient(to top, var(--sla-bg-deep), transparent 70%)',
						zIndex: 1,
					}}
				/>
				<img
					src={hunter.data.icon ?? hunter.data.image}
					alt={hunter.data.name}
					style={{
						width: 240,
						height: 240,
						objectFit: 'contain',
						filter: 'drop-shadow(0 0 20px rgba(255,74,28,0.2))',
					}}
				/>
			</div>
			<div style={{ padding: 16, position: 'relative', zIndex: 2 }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 8 }}>
					<div style={{ minWidth: 0 }}>
						{hunter.data.title && (
							<div class='sla-label' style={{ marginBottom: 4 }}>
								{hunter.data.title}
							</div>
						)}
						<h3
							style={{
								fontFamily: 'var(--sla-font-hud)',
								fontSize: 'var(--sla-text-md)',
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
					{hunter.data.rarity && rarityClass[hunter.data.rarity] && (
						<span class={rarityClass[hunter.data.rarity]}>{hunter.data.rarity}</span>
					)}
				</div>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
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
						marginTop: 12,
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

// ─── Shadow Card ─────────────────────────────────────────────────────────────

function ShadowCard({ shadow }: { shadow: ShadowData }) {
	const img = shadow.render ?? shadow.image ?? shadow.ranks?.general
	return (
		<Panel class='sla-clickable sla-elem-tint-dark' style={{ overflow: 'hidden' }}>
			<div
				style={{
					position: 'relative',
					height: 180,
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
						background: 'linear-gradient(to top, var(--sla-bg-deep), transparent 70%)',
						zIndex: 1,
					}}
				/>
				{img ? (
					<img
						src={img}
						alt={shadow.name}
						style={{ width: 200, height: 200, objectFit: 'contain' }}
						onError={(e) => {
							;(e.target as HTMLImageElement).style.display = 'none'
						}}
					/>
				) : (
					<img src='/assets/utils/Hunter_Icon.png' alt='' style={{ width: 64, height: 64, opacity: 0.2 }} />
				)}
			</div>
			<div style={{ padding: 16 }}>
				<div class='sla-label' style={{ color: 'var(--sla-elem-dark)' }}>
					{shadow.title}
				</div>
				<h3
					style={{
						fontFamily: 'var(--sla-font-hud)',
						fontSize: 'var(--sla-text-md)',
						fontWeight: 700,
						textTransform: 'uppercase',
						color: 'var(--sla-text-primary)',
						margin: '4px 0 8px',
					}}
				>
					{shadow.name}
				</h3>
				<p
					style={{
						fontSize: 'var(--sla-text-sm)',
						color: 'var(--sla-text-secondary)',
						margin: 0,
						lineHeight: 1.5,
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
					}}
				>
					{shadow.shadowAuthority}
				</p>
				{shadow.weapon && (
					<div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
						<img
							src={shadow.weapon.icon}
							alt={shadow.weapon.name}
							style={{ width: 16, height: 16, opacity: 0.7 }}
							onError={(e) => {
								;(e.target as HTMLImageElement).style.display = 'none'
							}}
						/>
						<span class='sla-label'>{shadow.weapon.name}</span>
					</div>
				)}
			</div>
		</Panel>
	)
}

// ─── Team Guide Card ──────────────────────────────────────────────────────────

function TeamGuideCard({
	title,
	href,
	imgSrc,
	imgSize = 'cover',
}: {
	title: string
	href: string
	imgSrc?: string
	imgSize?: 'cover' | 'contain-md' | 'contain-lg'
}) {
	const imgStyle: Record<string, preact.JSX.CSSProperties> = {
		cover: { width: '100%', height: '100%', objectFit: 'cover' },
		'contain-md': { width: 112, height: 112, objectFit: 'contain' },
		'contain-lg': { width: 168, height: 168, objectFit: 'contain' },
	}
	return (
		<a href={href} class='sla-panel sla-clickable' style={{ display: 'block', textDecoration: 'none' }}>
			<div
				style={{
					height: 144,
					background: 'var(--sla-bg-mid)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					overflow: 'hidden',
				}}
			>
				{imgSrc && (
					<img
						src={imgSrc}
						alt={title}
						style={imgStyle[imgSize]}
						onError={(e) => {
							;(e.target as HTMLImageElement).style.display = 'none'
						}}
					/>
				)}
			</div>
			<div style={{ padding: '14px 16px' }}>
				<h3
					style={{
						fontFamily: 'var(--sla-font-hud)',
						fontSize: 'var(--sla-text-base)',
						fontWeight: 700,
						textTransform: 'uppercase',
						letterSpacing: 'var(--sla-ls-normal)',
						color: 'var(--sla-text-primary)',
						margin: 0,
					}}
				>
					{title}
				</h3>
				<div
					style={{
						marginTop: 8,
						fontFamily: 'var(--sla-font-mono)',
						fontSize: 'var(--sla-text-xs)',
						letterSpacing: 'var(--sla-ls-wider)',
						color: 'var(--sla-ember)',
						textTransform: 'uppercase',
					}}
				>
					Open ▸
				</div>
			</div>
		</a>
	)
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export function HomePage({ hunters }: { hunters: HunterCard[] }) {
	const [activeCategory, setActiveCategory] = useState<Category | null>(null)

	return (
		<>
			<div class='sla-container'>
				<Hero />
			</div>

			<Ticker
				label='// LIVE FEED"'
				items={[
					'PATCH 2.0.0 // Refonte design Emberfall',
					`HUNTERS INDEXED // ${hunters.length}`,
					'NEW HUNTER // Elena Renault',
					'STATUS // Online',
					'WORKSHOP // 6 raids actifs',
				]}
			/>

			<div class='sla-container' style={{ padding: '64px 0', display: 'flex', flexDirection: 'column', gap: 80 }}>
				{/* Team Guides */}
				<section>
					<SectionHeader
						tag='// SECTION 01'
						title='Team Guides'
						description="Compositions d'équipe optimisées par type de contenu."
					/>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
							gap: 16,
						}}
					>
						<TeamGuideCard title='Dungeons' href='/team/dungeons' imgSrc='/assets/sections/dungeons.png' />
						<TeamGuideCard
							title='Power & Destruction'
							href='/team/power-destruction'
							imgSrc='/assets/sections/power-of-destruction.png'
						/>
						<TeamGuideCard
							title='Guild Boss'
							href='/team/guild-boss'
							imgSrc='/assets/sections/guild-boss.png'
						/>
						<TeamGuideCard title='Compare' href='/compare' imgSrc='/assets/sections/compare.png' />
					</div>
				</section>

				{/* Workshop Guides */}
				<section>
					<SectionHeader
						tag='// SECTION 02'
						title='Workshop Guides'
						description="Optimise ton atelier et tes améliorations d'équipement."
					/>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
							gap: 16,
						}}
					>
						{(workshopConfig as { raids: { name: string; icon: string }[] }).raids.map((raid) => {
							const label = raid.name
								.split('-')
								.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
								.join(' ')
							return (
								<TeamGuideCard
									key={raid.name}
									title={label}
									href={`/team/workshop/${raid.name}`}
									imgSrc={`/assets/workshop/${raid.name}/${raid.icon}.png`}
									imgSize='contain-lg'
								/>
							)
						})}
					</div>
				</section>

				{/* Hunter Guides */}
				<section>
					<SectionHeader
						tag='// SECTION 03'
						title='Hunter Guides'
						description='Stats, compétences et builds recommandés pour chaque chasseur.'
						right={<Badge variant='active'>{hunters.length} indexés</Badge>}
					/>

					<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
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
											gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
											gap: 16,
										}}
									>
										<HunterCardItem hunter={jinwoo} />
									</div>
								</div>
							)
						})()}

						{ELEMENTS.map((el) => {
							const group = hunters.filter(
								(h) =>
									h.id !== 'sung-jinwoo' &&
									h.data.elements.some((e) => e.name === el) &&
									(activeCategory === null || h.data.category === activeCategory),
							)
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
											gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
											gap: 16,
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
				</section>

				{/* Shadow Guides */}
				<section>
					<SectionHeader
						tag='// SECTION 04'
						title='Shadow Guides'
						description='Ombres invocables, leurs stats et leur utilité au combat.'
					/>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
							gap: 16,
						}}
					>
						{SHADOWS.map((shadow) => (
							<ShadowCard key={shadow.name} shadow={shadow} />
						))}
					</div>
				</section>
			</div>
		</>
	)
}
