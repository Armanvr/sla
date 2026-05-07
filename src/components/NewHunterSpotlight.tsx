import type { HunterData } from './HunterProfile'

interface HunterEntry {
	id: string
	data: HunterData
}

const elementSlug: Record<string, string> = {
	Dark: 'dark',
	Fire: 'fire',
	Water: 'water',
	Light: 'light',
	Wind: 'wind',
}

const rarityClass: Record<string, string> = {
	SSR: 'sla-rarity sla-rarity-ssr',
	SR: 'sla-rarity sla-rarity-sr',
	R: 'sla-rarity sla-rarity-r',
}

export function NewHunterSpotlight({ hunters }: { hunters: HunterEntry[] }) {
	const newHunters = hunters.filter((h) => h.data.newHunter === true)
	if (newHunters.length === 0) return null

	return (
		<div class='sla-container' style={{ padding: '32px 0 0' }}>
			<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
				{newHunters.map((entry) => {
					const primary = entry.data.elements.find((e) => e.primary) ?? entry.data.elements[0]
					const slug = primary ? (elementSlug[primary.name] ?? 'ember') : 'ember'
					return (
						<a
							key={entry.id}
							href={`/hunter/${entry.id}`}
							class='sla-anim-in'
							style={{
								display: 'flex',
								flex: '1 1 340px',
								minWidth: 280,
								maxWidth: 520,
								textDecoration: 'none',
								background: 'linear-gradient(135deg, #1a0f3a 0%, #0d0d1a 40%, #1a0a00 100%)',
								border: '1px solid var(--sla-mana)',
								boxShadow: '0 0 40px rgba(97, 55, 255, 0.5), 0 0 80px rgba(194, 94, 28, 0.15)',
								overflow: 'hidden',
								cursor: 'pointer',
							}}
						>
							{/* Hunter image */}
							<div
								class={`sla-elem-tint-${slug}`}
								style={{
									width: 200,
									minWidth: 200,
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
										zIndex: 1,
									}}
								/>
								<img
									src={entry.data.icon ?? entry.data.image}
									alt={entry.data.name}
									style={{
										width: 220,
										height: 220,
										objectFit: 'contain',
										filter: 'drop-shadow(0 0 20px rgba(97, 55, 255, 0.4))',
									}}
								/>
							</div>

							{/* Info */}
							<div
								style={{
									flex: 1,
									padding: '24px 32px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									gap: 12,
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<span
										style={{
											background: 'var(--sla-mana)',
											color: '#fff',
											fontFamily: 'var(--sla-font-hud)',
											fontSize: 'var(--sla-text-xs)',
											letterSpacing: 'var(--sla-ls-wider)',
											padding: '3px 10px',
											textTransform: 'uppercase',
										}}
									>
										New Hunter
									</span>
									<span class='sla-tag'>Limited Event</span>
								</div>

								<div>
									{entry.data.title && (
										<div
											class='sla-label'
											style={{ marginBottom: 4, color: 'var(--sla-mana-bright)' }}
										>
											{entry.data.title}
										</div>
									)}
									<h2
										style={{
											fontFamily: 'var(--sla-font-hud)',
											fontSize: 'var(--sla-text-lg)',
											fontWeight: 700,
											letterSpacing: 'var(--sla-ls-normal)',
											textTransform: 'uppercase',
											color: 'var(--sla-text-primary)',
											margin: 0,
										}}
									>
										{entry.data.name}
									</h2>
								</div>

								<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
									{entry.data.elements.map((el) => {
										const s = elementSlug[el.name] ?? 'ember'
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
									{entry.data.rarity && rarityClass[entry.data.rarity] && (
										<span class={rarityClass[entry.data.rarity]}>{entry.data.rarity}</span>
									)}
									{entry.data.class && <span class='sla-label'>{entry.data.class}</span>}
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
				})}
			</div>
		</div>
	)
}
