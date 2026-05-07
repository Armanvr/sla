import { CoresSection } from './hunter/CoresSection'
import { EquipmentSection } from './hunter/EquipmentSection'
import { StatBar } from './hunter/HeroSection'
import type { HunterData } from './hunter/types'
import { BackLink } from './sla/BackLink'
import { SectionHeader } from './sla/SectionHeader'

export type { HunterData }

const elementSlug: Record<string, string> = {
	Dark: 'dark',
	Fire: 'fire',
	Water: 'water',
	Light: 'light',
	Wind: 'wind',
}

const rarityVariant: Record<string, string> = {
	SSR: 'sla-rarity sla-rarity-ssr',
	SR: 'sla-rarity sla-rarity-sr',
	R: 'sla-rarity sla-rarity-r',
}

function InfoRow({ label, value }: { label: string; value: string }) {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				padding: '6px 0',
				borderBottom: '1px solid var(--sla-border)',
				gap: 8,
			}}
		>
			<span class='sla-label'>{label}</span>
			<span
				style={{
					fontFamily: 'var(--sla-font-body)',
					fontSize: 'var(--sla-text-sm)',
					color: 'var(--sla-text-secondary)',
					textAlign: 'right',
				}}
			>
				{value}
			</span>
		</div>
	)
}

export function HunterProfile({ data }: { data: HunterData }) {
	const hasStats = !!data.baseStats
	const maxStat = hasStats
		? Math.max(
				data.baseStats?.maxLevel.hp ?? 0,
				data.baseStats?.maxLevel.attack ?? 0,
				data.baseStats?.maxLevel.defense ?? 0,
			)
		: 0

	return (
		<div class='sla-container' style={{ paddingTop: 32, paddingBottom: 64 }}>
			{/* Header */}
			<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
				<BackLink href='/hunters' />
				{data.rank && <span class='sla-tag'>{data.rank}</span>}
				{data.rarity && rarityVariant[data.rarity] && (
					<span class={rarityVariant[data.rarity]} style={{ marginLeft: 'auto' }}>
						{data.rarity}
					</span>
				)}
			</div>

			{/* ── Section 1: Détails sur le chasseur ── */}
			<SectionHeader tag='// SECTION 01' title='Détails sur le chasseur' />
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gap: 16,
					marginBottom: 48,
				}}
			>
				{/* ── Col 1, rows 1-2: Hunter Image (vertical rectangle) ── */}
				<div style={{ gridColumn: '1', gridRow: '1 / span 2' }}>
					<div
						class='sla-panel'
						style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}
					>
						<div
							style={{
								position: 'relative',
								flex: 1,
								minHeight: 280,
								overflow: 'hidden',
							}}
						>
							<div
								style={{
									position: 'absolute',
									inset: 0,
									background: 'linear-gradient(to bottom, transparent 50%, var(--sla-bg-deep) 100%)',
									zIndex: 1,
								}}
							/>
							<img
								src={data.image}
								alt={data.name}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
									objectPosition: 'top center',
								}}
							/>
						</div>
						<div style={{ padding: '16px 20px' }}>
							{data.title && (
								<div class='sla-label' style={{ marginBottom: 4, color: 'var(--sla-mana-bright)' }}>
									{data.title}
								</div>
							)}
							<h2
								style={{
									fontFamily: 'var(--sla-font-hud)',
									fontSize: 'var(--sla-text-xl)',
									fontWeight: 700,
									textTransform: 'uppercase',
									letterSpacing: 'var(--sla-ls-normal)',
									color: 'var(--sla-text-primary)',
									margin: '0 0 12px',
								}}
							>
								{data.name}
							</h2>
							{data.alias && (
								<p
									style={{
										fontStyle: 'italic',
										color: 'var(--sla-text-muted)',
										fontSize: 'var(--sla-text-sm)',
										margin: '0 0 12px',
									}}
								>
									"{data.alias}"
								</p>
							)}
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
								{data.elements.map((el) => (
									<span
										key={el.name}
										class={`sla-elem-badge sla-elem-badge-${elementSlug[el.name] ?? 'ember'}`}
										style={{ fontSize: 'var(--sla-text-xs)' }}
									>
										{el.name}
									</span>
								))}
								{data.class && <span class='sla-label'>{data.class}</span>}
							</div>
							{data.weapon && (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 10,
										padding: '10px 12px',
										background: 'var(--sla-bg-container)',
										border: '1px solid var(--sla-border)',
									}}
								>
									<img
										src={data.weapon.icon}
										alt={data.weapon.name}
										style={{ width: 32, height: 32, objectFit: 'contain', flexShrink: 0 }}
										onError={(e) => {
											;(e.target as HTMLImageElement).src =
												'/assets/utils/Placeholder_Weapon_Icon.png'
										}}
									/>
									<div>
										<div class='sla-label' style={{ marginBottom: 2 }}>
											Arme exclusive
										</div>
										<div
											style={{
												fontFamily: 'var(--sla-font-hud)',
												fontSize: 'var(--sla-text-xs)',
												color: 'var(--sla-text-primary)',
											}}
										>
											{data.weapon.name}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* ── Col 2, row 1: Base Stats max level (square) ── */}
				<div style={{ gridColumn: '2', gridRow: '1' }}>
					<div class='sla-panel' style={{ padding: 20 }}>
						<div
							class='sla-label'
							style={{
								marginBottom: 16,
								textTransform: 'uppercase',
								letterSpacing: 'var(--sla-ls-wider)',
							}}
						>
							{'// Base Stats'}
						</div>
						{hasStats ? (
							<>
								<div
									class='sla-label'
									style={{
										marginBottom: 12,
										color: 'var(--sla-ember)',
										fontSize: 'var(--sla-text-xs)',
									}}
								>
									Max Level (5★ + 5D)
								</div>
								<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
									<StatBar
										label='HP'
										value={data.baseStats!.maxLevel.hp}
										max={data.baseStats!.maxLevel.hp}
										primary={data.baseStats?.primaryStat === 'HP'}
									/>
									<StatBar
										label='Attack'
										value={data.baseStats!.maxLevel.attack}
										max={maxStat}
										primary={data.baseStats?.primaryStat === 'Attack'}
									/>
									<StatBar
										label='Defense'
										value={data.baseStats!.maxLevel.defense}
										max={maxStat}
										primary={data.baseStats?.primaryStat === 'Defense'}
									/>
								</div>
								<div
									style={{
										marginTop: 20,
										paddingTop: 14,
										borderTop: '1px solid var(--sla-border)',
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<span class='sla-label'>Total Power</span>
									<span
										style={{
											fontFamily: 'var(--sla-font-hud)',
											fontSize: 'var(--sla-text-base)',
											fontWeight: 700,
											color: 'var(--sla-ember)',
										}}
									>
										{data.baseStats!.maxLevel.totalPower.toLocaleString()}
									</span>
								</div>
							</>
						) : (
							<p style={{ color: 'var(--sla-text-muted)', fontSize: 'var(--sla-text-sm)', margin: 0 }}>
								Aucune donnée disponible.
							</p>
						)}
					</div>
				</div>

				{/* ── Col 3, rows 1-2: Advancements (vertical rectangle) ── */}
				<div style={{ gridColumn: '3', gridRow: '1 / span 2' }}>
					<div
						class='sla-panel'
						style={{ padding: 20, height: '100%', display: 'flex', flexDirection: 'column' }}
					>
						<div
							class='sla-label'
							style={{
								marginBottom: 16,
								textTransform: 'uppercase',
								letterSpacing: 'var(--sla-ls-wider)',
							}}
						>
							{'// Advancements'}
						</div>
						{data.advancements && data.advancements.length > 0 ? (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 10,
									flex: 1,
									overflowY: 'auto',
								}}
							>
								{data.advancements.map((adv, i) => (
									<div
										key={i}
										style={{
											display: 'flex',
											gap: 12,
											padding: '12px 14px',
											background: 'var(--sla-bg-container)',
											border: '1px solid var(--sla-border)',
										}}
									>
										<span
											style={{
												fontFamily: 'var(--sla-font-hud)',
												color: 'var(--sla-ember)',
												fontSize: 'var(--sla-text-xs)',
												fontWeight: 700,
												flexShrink: 0,
												minWidth: 24,
												paddingTop: 2,
											}}
										>
											{i + 1}★
										</span>
										<p
											style={{
												color: 'var(--sla-text-secondary)',
												fontSize: 'var(--sla-text-sm)',
												margin: 0,
												lineHeight: 1.6,
												fontFamily: 'var(--sla-font-body)',
											}}
										>
											{adv}
										</p>
									</div>
								))}
							</div>
						) : (
							<p style={{ color: 'var(--sla-text-muted)', fontSize: 'var(--sla-text-sm)', margin: 0 }}>
								Aucun advancement disponible.
							</p>
						)}
					</div>
				</div>

				{/* ── Col 2, row 2: Compact profile + passive ── */}
				<div style={{ gridColumn: '2', gridRow: '2' }}>
					<div class='sla-panel' style={{ padding: 20, height: '100%' }}>
						<div
							class='sla-label'
							style={{
								marginBottom: 12,
								textTransform: 'uppercase',
								letterSpacing: 'var(--sla-ls-wider)',
							}}
						>
							{'// Profil'}
						</div>
						<div style={{ marginBottom: 12 }}>
							{data.country && <InfoRow label='Pays' value={data.country} />}
							{data.guild && <InfoRow label='Guilde' value={data.guild} />}
							{data.mainAbility && <InfoRow label='Capacité' value={data.mainAbility} />}
							{data.releaseDate && <InfoRow label='Sortie' value={data.releaseDate} />}
						</div>
						{data.passive && (
							<div
								style={{
									marginTop: 16,
									paddingTop: 14,
									borderTop: '1px solid var(--sla-border)',
								}}
							>
								<div class='sla-label' style={{ marginBottom: 6, color: 'var(--sla-mana-bright)' }}>
									{data.passive.name}
								</div>
								<p
									style={{
										fontSize: 'var(--sla-text-xs)',
										color: 'var(--sla-text-secondary)',
										margin: 0,
										lineHeight: 1.6,
										fontFamily: 'var(--sla-font-body)',
										display: '-webkit-box',
										WebkitLineClamp: 5,
										WebkitBoxOrient: 'vertical',
										overflow: 'hidden',
									}}
								>
									{data.passive.description}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* ── Section 2: Recommandations ── */}
			<SectionHeader tag='// SECTION 02' title='Recommandations pour le build' />
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gap: 16,
				}}
			>
				{/* ── Cols 1-2: Equipment ── */}
				<div style={{ gridColumn: '1 / span 2' }}>
					<div class='sla-panel' style={{ padding: 20 }}>
						<div
							class='sla-label'
							style={{
								marginBottom: 16,
								textTransform: 'uppercase',
								letterSpacing: 'var(--sla-ls-wider)',
							}}
						>
							{'// Équipements'}
						</div>
						<EquipmentSection builds={data.builds} equipmentStats={data.equipmentStats} />
					</div>
				</div>

				{/* ── Col 3: Cores ── */}
				<div style={{ gridColumn: '3' }}>
					<div class='sla-panel' style={{ padding: 20 }}>
						<div
							class='sla-label'
							style={{
								marginBottom: 16,
								textTransform: 'uppercase',
								letterSpacing: 'var(--sla-ls-wider)',
							}}
						>
							{'// Cores'}
						</div>
						<CoresSection coreBuild={data.coreBuild} coreStats={data.coreStats} />
					</div>
				</div>
			</div>
		</div>
	)
}
