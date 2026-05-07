import { SectionHeader } from '../components/sla/SectionHeader'
import workshopConfig from '../data/teams/workshop.json'

function WorkshopCard({ title, href, imgSrc }: { title: string; href: string; imgSrc: string }) {
	return (
		<a href={href} class='sla-panel sla-clickable' style={{ display: 'block', textDecoration: 'none' }}>
			<div
				style={{
					height: 144,
					background: 'var(--sla-bg-container)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					overflow: 'hidden',
				}}
			>
				<img
					src={imgSrc}
					alt={title}
					style={{ width: 168, height: 168, objectFit: 'contain' }}
					onError={(e) => {
						;(e.target as HTMLImageElement).style.display = 'none'
					}}
				/>
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

export function WorkshopsPage() {
	return (
		<div class='sla-container' style={{ padding: '64px 0', display: 'flex', flexDirection: 'column', gap: 48 }}>
			<SectionHeader
				tag='// SECTION // WORKSHOP'
				title='Workshop Guides'
				description="Compositions et stratégies optimisées pour chaque raid de l'atelier."
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
						<WorkshopCard
							key={raid.name}
							title={label}
							href={`/team/workshop/${raid.name}`}
							imgSrc={`/assets/workshop/${raid.name}/${raid.icon}.png`}
						/>
					)
				})}
			</div>
		</div>
	)
}
