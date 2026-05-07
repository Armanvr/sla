import type { HunterData } from '../components/HunterProfile'
import { NewHunterSpotlight } from '../components/NewHunterSpotlight'
import { Ticker } from '../components/sla/Ticker'

interface HunterCard {
	id: string
	data: HunterData
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
	return (
		<section class='sla-anim-in' style={{ padding: '64px 0 48px', textAlign: 'center' }}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
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
					color: 'var(--sla-text-secondary)',
					maxWidth: 720,
					margin: '20px auto 0',
					fontFamily: 'var(--sla-font-body)',
					fontSize: 'var(--sla-text-md)',
				}}
			>
				Codex tactique des chasseurs, ombres, builds et compositions d'équipe. Mis à jour le{' '}
				<span class='sla-text-ember'>7 mai 2026</span>.
			</p>
		</section>
	)
}

// ─── Feature Card ─────────────────────────────────────────────────────────────

function FeatureCard({
	tag,
	title,
	description,
	href,
	imgSrc,
	fallbackGradient,
}: {
	tag: string
	title: string
	description: string
	href: string
	imgSrc?: string
	fallbackGradient?: string
}) {
	return (
		<a
			href={href}
			class='sla-clickable'
			style={{
				display: 'block',
				position: 'relative',
				height: 300,
				overflow: 'hidden',
				textDecoration: 'none',
				border: '1px solid var(--sla-border)',
			}}
		>
			{/* Background */}
			{imgSrc ? (
				<img
					src={imgSrc}
					alt={title}
					style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
					onError={(e) => {
						;(e.target as HTMLImageElement).style.display = 'none'
					}}
				/>
			) : (
				<div style={{ position: 'absolute', inset: 0, background: fallbackGradient }} />
			)}

			{/* Dark overlay — bottom-heavy for legibility */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 100%)',
					zIndex: 1,
				}}
			/>

			{/* Content */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					zIndex: 2,
					padding: 24,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
				}}
			>
				<div class='sla-tag' style={{ marginBottom: 10, display: 'inline-block', width: 'fit-content' }}>
					{tag}
				</div>
				<h3
					style={{
						fontFamily: 'var(--sla-font-hud)',
						fontSize: 'var(--sla-text-lg)',
						fontWeight: 700,
						textTransform: 'uppercase',
						letterSpacing: 'var(--sla-ls-normal)',
						color: 'var(--sla-text-primary)',
						margin: '0 0 8px',
					}}
				>
					{title}
				</h3>
				<p
					style={{
						color: 'var(--sla-text-secondary)',
						fontSize: 'var(--sla-text-sm)',
						fontFamily: 'var(--sla-font-body)',
						margin: '0 0 14px',
						lineHeight: 1.5,
					}}
				>
					{description}
				</p>
				<div
					style={{
						fontFamily: 'var(--sla-font-mono)',
						fontSize: 'var(--sla-text-xs)',
						letterSpacing: 'var(--sla-ls-wider)',
						color: 'var(--sla-ember)',
						textTransform: 'uppercase',
					}}
				>
					Explorer ▸
				</div>
			</div>
		</a>
	)
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export function HomePage({ hunters }: { hunters: HunterCard[] }) {
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
					'NEW HUNTER // Antoine Martinez',
					'NEW HUNTER // Elena Renault',
					'STATUS // Online',
					'WORKSHOP // 6 raids actifs',
				]}
			/>

			<NewHunterSpotlight hunters={hunters} />

			<div class='sla-container' style={{ padding: '64px 0' }}>
				{/* Section — Fonctionnalités du système */}
				<section>
					<div style={{ marginBottom: 40 }}>
						<div
							class='sla-label'
							style={{
								marginBottom: 8,
								letterSpacing: 'var(--sla-ls-widest)',
								textTransform: 'uppercase',
							}}
						>
							{'// FONCTIONNALITÉS'}
						</div>
						<h2 class='sla-title-section sla-text-glow' style={{ margin: 0 }}>
							Fonctionnalités du système
						</h2>
					</div>

					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(3, 1fr)',
							gap: 16,
						}}
					>
						<div style={{ gridColumn: 'span 2' }}>
							<FeatureCard
								tag='// SYSTÈME 01'
								title='Hunter Guides'
								description='Stats, compétences et builds recommandés pour chaque chasseur indexé dans le réseau.'
								href='/hunters'
								fallbackGradient='linear-gradient(135deg, #0d0d1a 0%, #1a0f3a 50%, #2e009c 100%)'
								imgSrc='/assets/sections/hunters.png'
							/>
						</div>
						<div style={{ gridColumn: 'span 1' }}>
							<FeatureCard
								tag='// SYSTÈME 02'
								title='Power & Destruction'
								description="Compositions d'équipe optimisées pour le contenu Power & Destruction."
								href='/team/power-destruction'
								imgSrc='/assets/sections/power-of-destruction.png'
							/>
						</div>
						<div style={{ gridColumn: 'span 1' }}>
							<FeatureCard
								tag='// SYSTÈME 03'
								title='Guild Boss'
								description='Stratégies et rotations pour éliminer les boss de guilde efficacement.'
								href='/team/guild-boss'
								imgSrc='/assets/sections/guild-boss.png'
							/>
						</div>
						<div style={{ gridColumn: 'span 2' }}>
							<FeatureCard
								tag='// SYSTÈME 04'
								title='Workshop Guides'
								description="Guides de raid pour chaque donjon de l'atelier, floors et compositions."
								href='/workshops'
								fallbackGradient='linear-gradient(135deg, #1a0800 0%, #3d1400 50%, #6b2200 100%)'
								imgSrc='/assets/sections/workshop.png'
							/>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}
