import { Panel } from '../components/sla/Panel'
import { SectionHeader } from '../components/sla/SectionHeader'
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

function ShadowCard({ shadow }: { shadow: ShadowData }) {
	const img = shadow.render ?? shadow.image ?? shadow.ranks?.general
	return (
		<Panel class='sla-elem-tint-dark' style={{ overflow: 'hidden' }}>
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

export function ShadowsPage() {
	return (
		<div class='sla-container' style={{ padding: '64px 0', display: 'flex', flexDirection: 'column', gap: 48 }}>
			<SectionHeader
				tag='// SECTION // SHADOWS'
				title='Shadow Guides'
				description='Ombres invocables par Sung Jinwoo, leurs stats et leur utilité au combat.'
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
		</div>
	)
}
