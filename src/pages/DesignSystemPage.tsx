import { BackLink } from '../components/sla/BackLink'
import { Badge } from '../components/sla/Badge'
import { Button, ButtonLink } from '../components/sla/Button'
import { ELEMENTS, ElementBadge } from '../components/sla/ElementBadge'
import { Panel } from '../components/sla/Panel'
import { Progress } from '../components/sla/Progress'
import { Readout } from '../components/sla/Readout'
import { SectionHeader } from '../components/sla/SectionHeader'
import { Label, Tag } from '../components/sla/Tag'
import { Ticker } from '../components/sla/Ticker'

interface Swatch {
	name: string
	token: string
	value: string
	dark?: boolean
}

const COLOR_GROUPS: Array<{ title: string; swatches: Swatch[] }> = [
	{
		title: 'Backgrounds',
		swatches: [
			{ name: 'Deep', token: '--sla-bg-deep', value: '#070508' },
			{ name: 'Mid', token: '--sla-bg-mid', value: '#0e0b10' },
			{ name: 'Panel', token: '--sla-bg-panel', value: '#120d15' },
		],
	},
	{
		title: 'Ember (Accent)',
		swatches: [
			{ name: 'Ember', token: '--sla-ember', value: '#ff4a1c' },
			{ name: 'Ember Dim', token: '--sla-ember-dim', value: '#b83210' },
			{ name: 'Ember Glow', token: '--sla-ember-glow', value: '#ff6b3d' },
		],
	},
	{
		title: 'Signals',
		swatches: [
			{ name: 'Crimson', token: '--sla-crimson', value: '#c0192a' },
			{ name: 'Amber', token: '--sla-amber', value: '#ffaa44' },
		],
	},
	{
		title: 'Text',
		swatches: [
			{ name: 'Primary', token: '--sla-text-primary', value: '#f0e8dc' },
			{ name: 'Secondary', token: '--sla-text-secondary', value: '#9a8a78' },
			{ name: 'Dim', token: '--sla-text-dim', value: '#4a3f35' },
		],
	},
	{
		title: 'Borders',
		swatches: [
			{ name: 'Border', token: '--sla-border', value: '#2a1f18' },
			{ name: 'Border Bright', token: '--sla-border-bright', value: '#4a2a1a' },
		],
	},
	{
		title: 'Element Hues',
		swatches: [
			{ name: 'Dark', token: '--sla-elem-dark', value: '#8b5cf6' },
			{ name: 'Fire', token: '--sla-elem-fire', value: '#ef4444' },
			{ name: 'Water', token: '--sla-elem-water', value: '#3b82f6' },
			{ name: 'Light', token: '--sla-elem-light', value: '#facc15' },
			{ name: 'Wind', token: '--sla-elem-wind', value: '#10b981' },
		],
	},
]

function Swatch({ s }: { s: Swatch }) {
	return (
		<Panel class='sla-anim-in' style={{ padding: 0, overflow: 'hidden' }}>
			<div style={{ height: 80, background: s.value }} />
			<div style={{ padding: 12 }}>
				<div
					style={{
						fontFamily: 'var(--sla-font-hud)',
						fontWeight: 700,
						textTransform: 'uppercase',
						color: 'var(--sla-text-primary)',
						fontSize: 'var(--sla-text-base)',
					}}
				>
					{s.name}
				</div>
				<div class='sla-label' style={{ marginTop: 4 }}>
					{s.token}
				</div>
				<div
					style={{
						fontFamily: 'var(--sla-font-mono)',
						fontSize: 'var(--sla-text-xs)',
						color: 'var(--sla-ember)',
						marginTop: 2,
					}}
				>
					{s.value}
				</div>
			</div>
		</Panel>
	)
}

function Code({ children }: { children: string }) {
	return (
		<pre
			style={{
				background: 'var(--sla-bg-mid)',
				border: '1px solid var(--sla-border-bright)',
				padding: 12,
				margin: 0,
				fontFamily: 'var(--sla-font-mono)',
				fontSize: 'var(--sla-text-xs)',
				color: 'var(--sla-text-secondary)',
				letterSpacing: '0.02em',
				overflow: 'auto',
				clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
			}}
		>
			<code>{children}</code>
		</pre>
	)
}

function Block({ title, children, code }: { title: string; children: preact.ComponentChildren; code: string }) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
			<div class='sla-label' style={{ color: 'var(--sla-ember)' }}>{`// ${title}`}</div>
			<Panel style={{ padding: 24 }}>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>{children}</div>
			</Panel>
			<Code>{code}</Code>
		</div>
	)
}

export function DesignSystemPage() {
	return (
		<div class='sla-container' style={{ paddingTop: 32, paddingBottom: 96 }}>
			<BackLink />

			<div style={{ marginTop: 32, marginBottom: 48 }}>
				<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
					<Tag>{'// SLA EMBERFALL'}</Tag>
					<Label>v2.0.0</Label>
				</div>
				<h1 class='sla-title-hero sla-text-glow' style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
					DESIGN
					<br />
					<span class='sla-text-ember'>SYSTEM</span>
				</h1>
				<p
					style={{
						color: 'var(--sla-text-secondary)',
						maxWidth: 720,
						marginTop: 16,
						fontSize: 'var(--sla-text-md)',
					}}
				>
					Catalogue des composants, tokens, animations et briques visuelles utilisés dans l'interface SLA.
					Chaque bloc inclut un aperçu et son code source.
				</p>
			</div>

			{/* ── Couleurs ────────────────────────────────────────── */}
			<SectionHeader tag='// 01' title='Couleurs' description='Tokens CSS — palette principale.' />
			<div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 64 }}>
				{COLOR_GROUPS.map((g) => (
					<div key={g.title}>
						<div class='sla-label' style={{ marginBottom: 12 }}>{`// ${g.title}`}</div>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
								gap: 12,
							}}
						>
							{g.swatches.map((s) => (
								<Swatch key={s.token} s={s} />
							))}
						</div>
					</div>
				))}
			</div>

			{/* ── Typographie ──────────────────────────────────────── */}
			<SectionHeader
				tag='// 02'
				title='Typographie'
				description='Trois polices : Orbitron HUD, Share Tech Mono data, Rajdhani body.'
			/>
			<Panel style={{ padding: 32, marginBottom: 64 }}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
					<div>
						<Label>{'--sla-font-hud (Orbitron) // sla-title-hero'}</Label>
						<div class='sla-title-hero sla-text-glow' style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
							EMBER RISES
						</div>
					</div>
					<div>
						<Label>sla-title-section</Label>
						<h2 class='sla-title-section'>Operation Brief</h2>
					</div>
					<div>
						<Label>sla-text-ember (animated flicker)</Label>
						<div
							class='sla-text-ember'
							style={{
								fontFamily: 'var(--sla-font-hud)',
								fontSize: 28,
								fontWeight: 700,
								textTransform: 'uppercase',
							}}
						>
							EMBER PROTOCOL
						</div>
					</div>
					<div>
						<Label>--sla-font-body (Rajdhani)</Label>
						<p style={{ margin: 0, color: 'var(--sla-text-primary)', fontSize: 'var(--sla-text-md)' }}>
							The hunters move through the dungeon, weapons drawn, ready for the next encounter.
						</p>
					</div>
					<div>
						<Label>--sla-font-mono (Share Tech Mono)</Label>
						<p
							style={{
								margin: 0,
								fontFamily: 'var(--sla-font-mono)',
								color: 'var(--sla-ember)',
								fontSize: 'var(--sla-text-base)',
								letterSpacing: 'var(--sla-ls-wide)',
							}}
						>
							{'ID: HUNTER-7C92-A1 // STATUS: ENGAGED // POWER: 142,884'}
						</p>
					</div>
				</div>
			</Panel>

			{/* ── Boutons ──────────────────────────────────────────── */}
			<SectionHeader tag='// 03' title='Boutons' />
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
					gap: 24,
					marginBottom: 64,
				}}
			>
				<Block
					title='Variants'
					code={`<Button>Engage</Button>
<Button variant='ghost'>Standby</Button>`}
				>
					<Button>Engage</Button>
					<Button variant='ghost'>Standby</Button>
				</Block>
				<Block title='ButtonLink (anchor)' code={`<ButtonLink href='/'>Return ◄</ButtonLink>`}>
					<ButtonLink href='/'>Return ◄</ButtonLink>
					<ButtonLink href='/' variant='ghost'>
						Cancel
					</ButtonLink>
				</Block>
			</div>

			{/* ── Tags & Badges ────────────────────────────────────── */}
			<SectionHeader tag='// 04' title='Tags & Badges' />
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
					gap: 24,
					marginBottom: 64,
				}}
			>
				<Block
					title='Tags & Labels'
					code={`<Tag>// SECTION</Tag>
<Label>--field-name</Label>`}
				>
					<Tag>{'// SECTION'}</Tag>
					<Label>--field-name</Label>
				</Block>
				<Block
					title='Badges (status)'
					code={`<Badge variant='active'>Active</Badge>
<Badge variant='pending'>Pending</Badge>
<Badge variant='critical'>Critical</Badge>
<Badge variant='success'>Success</Badge>`}
				>
					<Badge variant='active'>Active</Badge>
					<Badge variant='pending'>Pending</Badge>
					<Badge variant='critical'>Critical</Badge>
					<Badge variant='success'>Success</Badge>
				</Block>
				<Block title='Element Badges' code={`{ELEMENTS.map(e => <ElementBadge element={e} />)}`}>
					{ELEMENTS.map((e) => (
						<ElementBadge key={e} element={e} />
					))}
				</Block>
				<Block
					title='Rarities'
					code={`<span class='sla-rarity sla-rarity-ssr'>SSR</span>
<span class='sla-rarity sla-rarity-sr'>SR</span>
<span class='sla-rarity sla-rarity-r'>R</span>`}
				>
					<span class='sla-rarity sla-rarity-ssr'>SSR</span>
					<span class='sla-rarity sla-rarity-sr'>SR</span>
					<span class='sla-rarity sla-rarity-r'>R</span>
				</Block>
			</div>

			{/* ── Panels ───────────────────────────────────────────── */}
			<SectionHeader tag='// 05' title='Panels' />
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
					gap: 24,
					marginBottom: 64,
				}}
			>
				<div>
					<div class='sla-label' style={{ marginBottom: 12 }}>
						{'// Plain'}
					</div>
					<Panel style={{ padding: 24 }}>
						<div style={{ fontFamily: 'var(--sla-font-hud)', fontWeight: 700, textTransform: 'uppercase' }}>
							Hunter dossier
						</div>
						<p style={{ color: 'var(--sla-text-secondary)', marginTop: 8 }}>
							Default angular panel with clip-path corners.
						</p>
					</Panel>
				</div>
				<div>
					<div class='sla-label' style={{ marginBottom: 12 }}>
						{'// With HUD corners'}
					</div>
					<Panel corners style={{ padding: 24 }}>
						<div style={{ fontFamily: 'var(--sla-font-hud)', fontWeight: 700, textTransform: 'uppercase' }}>
							Tactical readout
						</div>
						<p style={{ color: 'var(--sla-text-secondary)', marginTop: 8 }}>
							Adds 4 ember corner brackets — for hero blocks.
						</p>
					</Panel>
				</div>
			</div>
			<Code>{`<Panel>...</Panel>
<Panel corners>...</Panel>`}</Code>

			{/* ── Readouts & Progress ──────────────────────────────── */}
			<div style={{ marginTop: 64 }}>
				<SectionHeader tag='// 06' title='Readouts & Progress' />
			</div>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
					gap: 16,
					marginBottom: 24,
				}}
			>
				<Readout label='Total Power' value='142,884' />
				<Readout label='Hunter ID' value='SH-AE-04' />
				<Readout label='Element' value='Fire / Wind' />
			</div>
			<Panel style={{ padding: 24, marginBottom: 64 }}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
					<div>
						<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
							<Label>HP</Label>
							<span style={{ fontFamily: 'var(--sla-font-mono)', color: 'var(--sla-ember)' }}>72%</span>
						</div>
						<Progress value={72} />
					</div>
					<div>
						<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
							<Label>Power Gauge</Label>
							<span style={{ fontFamily: 'var(--sla-font-mono)', color: 'var(--sla-ember)' }}>45%</span>
						</div>
						<Progress value={45} />
					</div>
					<div>
						<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
							<Label>Skill Cooldown</Label>
							<span style={{ fontFamily: 'var(--sla-font-mono)', color: 'var(--sla-ember)' }}>92%</span>
						</div>
						<Progress value={92} />
					</div>
				</div>
			</Panel>

			{/* ── Ticker ───────────────────────────────────────────── */}
			<SectionHeader tag='// 07' title='Ticker (live feed)' />
			<div style={{ marginBottom: 16 }}>
				<Ticker
					label='// LIVE'
					items={[
						'PATCH 2.0.0 // Refonte design',
						'NEW HUNTER // Elena Renault',
						'STATUS // Online',
						'WORKSHOP // 6 raids',
					]}
				/>
			</div>
			<Code>{`<Ticker label='// LIVE' items={['PATCH 2.0.0', 'NEW HUNTER']} />`}</Code>

			{/* ── Section Header ───────────────────────────────────── */}
			<div style={{ marginTop: 64 }}>
				<SectionHeader tag='// 08' title='Section Header' description='Combo tag + titre + diviseur.' />
			</div>
			<Panel style={{ padding: 32, marginBottom: 32 }}>
				<SectionHeader
					tag='// EXAMPLE'
					title='Operation Emberfall'
					description='Brief tactique — 3 chasseurs requis.'
				/>
			</Panel>
			<Code>{`<SectionHeader tag='// 01' title='Title' description='Subtitle' />`}</Code>

			{/* ── Animations ───────────────────────────────────────── */}
			<div style={{ marginTop: 64 }}>
				<SectionHeader tag='// 09' title='Animations' description='Keyframes globales (sla-tokens.css).' />
			</div>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
					gap: 16,
					marginBottom: 32,
				}}
			>
				<Panel style={{ padding: 16, textAlign: 'center' }}>
					<div class='sla-label' style={{ marginBottom: 8 }}>
						sla-pulse
					</div>
					<span class='sla-status-dot' />
				</Panel>
				<Panel style={{ padding: 16, textAlign: 'center' }}>
					<div class='sla-label' style={{ marginBottom: 8 }}>
						sla-ember-flicker
					</div>
					<div class='sla-text-ember' style={{ fontFamily: 'var(--sla-font-hud)', fontWeight: 700 }}>
						EMBER
					</div>
				</Panel>
				<Panel style={{ padding: 16, textAlign: 'center' }}>
					<div class='sla-label' style={{ marginBottom: 8 }}>
						sla-anim-in
					</div>
					<div class='sla-anim-in' style={{ color: 'var(--sla-ember)' }}>
						fade in
					</div>
				</Panel>
				<Panel style={{ padding: 16, textAlign: 'center' }}>
					<div class='sla-label' style={{ marginBottom: 8 }}>
						sla-scan-sweep
					</div>
					<span style={{ color: 'var(--sla-text-secondary)', fontSize: 'var(--sla-text-xs)' }}>
						visible globally
					</span>
				</Panel>
			</div>

			{/* ── Element accents ──────────────────────────────────── */}
			<SectionHeader
				tag='// 10'
				title='Élements (game-coded hues)'
				description='Hues conservées pour préserver le code couleur gameplay.'
			/>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
					gap: 16,
					marginBottom: 64,
				}}
			>
				{ELEMENTS.map((el) => (
					<Panel key={el} style={{ padding: 16 }} class={`sla-elem-tint-${el.toLowerCase()}`}>
						<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
							<span class={`sla-elem-bar sla-elem-bar-${el.toLowerCase()}`} style={{ height: 32 }} />
							<div>
								<div
									style={{
										fontFamily: 'var(--sla-font-hud)',
										textTransform: 'uppercase',
										fontWeight: 700,
										color: 'var(--sla-text-primary)',
									}}
								>
									{el}
								</div>
								<ElementBadge element={el} />
							</div>
						</div>
					</Panel>
				))}
			</div>

			<hr class='sla-divider' />
			<p
				style={{
					textAlign: 'center',
					color: 'var(--sla-text-dim)',
					fontFamily: 'var(--sla-font-mono)',
					fontSize: 'var(--sla-text-xs)',
					letterSpacing: 'var(--sla-ls-wider)',
					marginTop: 32,
				}}
			>
				{'// END OF FEED // SLA EMBERFALL DESIGN SYSTEM v2.0.0'}
			</p>
		</div>
	)
}
