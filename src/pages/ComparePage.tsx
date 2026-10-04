import type { ComponentChildren } from 'preact'
import { useEffect, useId, useMemo, useRef, useState } from 'preact/hooks'
import { ARMOR_SLOTS, CORE_SLOTS, JEWELRY_SLOTS } from '../components/hunter/constants'
import type { CoreStats, EquipmentStats } from '../components/hunter/types'
import { BackLink } from '../components/sla/BackLink'
import { SectionHeader } from '../components/sla/SectionHeader'
import type { Hunter } from '../components/team/types'

// ─── Stat pools ───────────────────────────────────────────────────────────────

const MAIN_STATS = [
	'Additional Attack',
	'Additional Defense',
	'Additional HP',
	'Additional MP',
	'Critical Hit Damage',
	'Dark Damage (%)',
	'Fire Damage (%)',
	'Light Damage (%)',
	'Water Damage (%)',
	'Wind Damage (%)',
]

const SECONDARY_STATS = [
	'Additional Attack',
	'Additional Defense',
	'Additional HP',
	'Attack (%)',
	'Critical Hit Damage',
	'Critical Hit Rate',
	'Damage Increase',
	'Defense (%)',
	'Defense Penetration',
	'HP (%)',
]

const CORE_STATS_LIST = [
	'Additional Attack',
	'Additional Defense',
	'Additional HP',
	'Critical Hit Damage',
	'Defense Penetration',
]

const ALL_EQUIP_SLOTS = [...ARMOR_SLOTS, ...JEWELRY_SLOTS]

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserEquipSlot {
	main: string
	secondary: string[]
}

interface UserCoreSlot {
	stats: string[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getEquipSlot(equip: Record<string, UserEquipSlot>, key: string): UserEquipSlot {
	return equip[key] ?? { main: '', secondary: [] }
}

function getCoreSlot(core: Record<string, UserCoreSlot>, key: string): UserCoreSlot {
	return core[key] ?? { stats: [] }
}

function computeSlotScore(
	rec: { main: string | null; secondary: string[] } | undefined,
	userSlot: UserEquipSlot,
): { matched: number; total: number } {
	if (!rec) return { matched: 0, total: 0 }
	let matched = 0
	let total = 0
	if (rec.main !== null) {
		total++
		if (userSlot.main === rec.main) matched++
	}
	for (const stat of rec.secondary) {
		total++
		if (userSlot.secondary.includes(stat)) matched++
	}
	return { matched, total }
}

function computeCoreSlotScore(
	recStats: string[] | undefined,
	userSlot: UserCoreSlot,
): { matched: number; total: number } {
	if (!recStats || recStats.length === 0) return { matched: 0, total: 0 }
	let matched = 0
	for (const stat of recStats) {
		if (userSlot.stats.includes(stat)) matched++
	}
	return { matched, total: recStats.length }
}

// ─── Searchable hunter selector ───────────────────────────────────────────────

function HunterSearchSelect({
	hunters,
	selectedId,
	onSelect,
}: {
	hunters: Hunter[]
	selectedId: string | null
	onSelect: (id: string) => void
}) {
	const [query, setQuery] = useState('')
	const [open, setOpen] = useState(false)
	const [active, setActive] = useState(0)
	const inputRef = useRef<HTMLInputElement>(null)
	const blurTimer = useRef<ReturnType<typeof setTimeout>>()
	const listId = useId()
	const optId = (i: number) => `${listId}-opt-${i}`

	const selected = selectedId ? hunters.find((h) => h.id === selectedId) : null

	const filtered = useMemo(() => {
		if (!query.trim()) return hunters
		const q = query.toLowerCase()
		return hunters.filter((h) => h.data.name.toLowerCase().includes(q))
	}, [hunters, query])

	const handleFocus = () => {
		clearTimeout(blurTimer.current)
		setQuery('')
		setActive(0)
		setOpen(true)
	}

	useEffect(() => {
		if (open) document.getElementById(optId(active))?.scrollIntoView({ block: 'nearest' })
	}, [open, active])

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			setOpen(false)
		} else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault()
			if (!open) setOpen(true)
			else if (filtered.length > 0)
				setActive((i) => (i + (e.key === 'ArrowDown' ? 1 : filtered.length - 1)) % filtered.length)
		} else if (e.key === 'Enter' && open && filtered[active]) {
			e.preventDefault()
			handleSelect(filtered[active].id, true)
		}
	}

	const handleBlur = () => {
		blurTimer.current = setTimeout(() => setOpen(false), 150)
	}

	const handleSelect = (id: string, keepFocus = false) => {
		onSelect(id)
		setQuery('')
		setOpen(false)
		if (!keepFocus) inputRef.current?.blur()
	}

	return (
		<div className='relative'>
			<div className='relative'>
				<input
					ref={inputRef}
					type='text'
					value={open ? query : (selected?.data.name ?? '')}
					role='combobox'
					aria-label='Rechercher un chasseur'
					aria-expanded={open}
					aria-controls={open ? listId : undefined}
					aria-autocomplete='list'
					aria-activedescendant={open && filtered[active] ? optId(active) : undefined}
					onFocus={handleFocus}
					onClick={() => {
						clearTimeout(blurTimer.current)
						if (!open) handleFocus()
					}}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					onInput={(e) => {
						setQuery((e.target as HTMLInputElement).value)
						setActive(0)
						setOpen(true)
					}}
					placeholder='Rechercher un chasseur…'
					className='sla-input w-full pl-9 pr-4 py-3 text-sm'
				/>
			</div>

			{open && (
				<div
					id={listId}
					role='listbox'
					aria-label='Chasseurs'
					className='absolute z-30 w-full bg-bg-elevated border border-border-sla-bright mt-1.5 max-h-64 overflow-y-auto'
				>
					{filtered.length === 0 ? (
						<p role='none' className='px-4 py-3 text-sm text-text-sla-secondary italic'>
							Aucun résultat
						</p>
					) : (
						filtered.map((h, i) => (
							<div
								key={h.id}
								id={optId(i)}
								role='option'
								aria-selected={selectedId === h.id}
								tabIndex={-1}
								onMouseDown={() => handleSelect(h.id)}
								className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-bg-container flex items-center justify-between ${
									selectedId === h.id ? 'text-mana-bright bg-bg-wash' : 'text-text-sla'
								} ${i === active ? 'bg-bg-container' : ''}`}
							>
								<span>{h.data.name}</span>
								{selectedId === h.id && <span className='text-mana-bright text-xs'>✓</span>}
							</div>
						))
					)}
				</div>
			)}
		</div>
	)
}

// ─── Score ring ───────────────────────────────────────────────────────────────

function ScoreRing({ percent }: { percent: number }) {
	const r = 52
	const circ = 2 * Math.PI * r
	const offset = circ - (percent / 100) * circ

	const strokeColor =
		percent >= 80 ? 'var(--sla-weak)' : percent >= 50 ? 'var(--sla-mana-bright)' : 'var(--sla-resist)'

	return (
		<svg
			width='130'
			height='130'
			viewBox='0 0 130 130'
			className='flex-shrink-0'
			role='img'
			aria-label='Score ring'
		>
			<circle cx='65' cy='65' r={r} fill='none' style={{ stroke: 'var(--sla-border)' }} strokeWidth='10' />
			<circle
				cx='65'
				cy='65'
				r={r}
				fill='none'
				strokeWidth='10'
				strokeDasharray={circ}
				strokeDashoffset={offset}
				strokeLinecap='round'
				transform='rotate(-90 65 65)'
				style={{ stroke: strokeColor, transition: 'stroke-dashoffset 0.6s ease' }}
			/>
			<text
				x='65'
				y='60'
				textAnchor='middle'
				dominantBaseline='middle'
				style={{ fill: strokeColor }}
				fontSize='24'
				fontWeight='900'
				fontFamily='inherit'
			>
				{percent}%
			</text>
			<text
				x='65'
				y='80'
				textAnchor='middle'
				dominantBaseline='middle'
				style={{ fill: 'var(--sla-text-muted)' }}
				fontSize='10'
				fontFamily='inherit'
			>
				SCORE
			</text>
		</svg>
	)
}

// ─── Slot feedback badge ──────────────────────────────────────────────────────

function SlotBadge({ matched, total }: { matched: number; total: number }) {
	if (total === 0) return null
	const ok = matched === total
	const partial = matched > 0
	return (
		<span
			className={`text-label font-bold px-1.5 py-0.5 ${
				ok
					? 'bg-weak-bg text-weak'
					: partial
						? 'bg-bg-wash text-mana-bright'
						: 'bg-bg-container text-text-sla-muted'
			}`}
		>
			{matched}/{total}
		</span>
	)
}

// ─── Section title ────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: string }) {
	return (
		<p className='text-xs font-bold text-text-sla-secondary uppercase tracking-widest flex items-center gap-2'>
			<span className='h-px flex-1 bg-border-sla' />
			{children}
			<span className='h-px flex-1 bg-border-sla' />
		</p>
	)
}

// ─── Column headers ───────────────────────────────────────────────────────────

function ColHeader({ children, accent }: { children: string; accent?: boolean }) {
	return (
		<div
			className={`px-4 py-2 text-xs font-bold uppercase tracking-wider text-center mb-4 ${
				accent
					? 'bg-bg-wash border border-mana-dim text-mana-bright'
					: 'bg-bg-surface border border-border-sla text-text-sla-secondary'
			}`}
		>
			{children}
		</div>
	)
}

// ─── Collapsible group ────────────────────────────────────────────────────────

function CollapsibleGroup({
	label,
	matched,
	total,
	children,
}: {
	label: string
	matched: number
	total: number
	children: ComponentChildren
}) {
	const [open, setOpen] = useState(false)
	return (
		<div className='border border-border-sla overflow-hidden'>
			<button
				type='button'
				onClick={() => setOpen((v) => !v)}
				className='w-full flex items-center justify-between px-4 py-3 bg-bg-surface hover:bg-bg-container transition-colors'
			>
				<span className='text-xs font-bold uppercase tracking-wider text-text-sla-secondary'>{label}</span>
				<div className='flex items-center gap-2'>
					<SlotBadge matched={matched} total={total} />
					<span className='text-text-sla-muted text-xs'>{open ? '▲' : '▼'}</span>
				</div>
			</button>
			{open && <div className='divide-y divide-border-sla'>{children}</div>}
		</div>
	)
}

// ─── Single slot row ──────────────────────────────────────────────────────────

function EquipSlotRow({
	label,
	iconKey,
	rec,
	userSlot,
	onMainChange,
	onSecondaryToggle,
}: {
	label: string
	iconKey: string
	rec: { main: string | null; secondary: string[] } | undefined
	userSlot: UserEquipSlot
	onMainChange: (slotKey: string, value: string) => void
	onSecondaryToggle: (slotKey: string, stat: string) => void
}) {
	const score = computeSlotScore(rec, userSlot)
	const atMax = userSlot.secondary.length >= 4

	return (
		<div className='bg-bg-surface'>
			<div className='flex items-center justify-between px-4 py-2 border-b border-border-sla'>
				<p className='text-label font-semibold uppercase tracking-wider text-text-sla-muted'>{label}</p>
				<SlotBadge matched={score.matched} total={score.total} />
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-[1fr_1fr] divide-y sm:divide-y-0 sm:divide-x divide-border-sla'>
				{/* Recommended */}
				<div className='px-4 py-3 space-y-1.5'>
					<p className='sm:hidden text-label uppercase tracking-wider text-text-sla-muted mb-1'>Recommandé</p>
					{rec ? (
						<>
							{rec.main && <p className='text-xs font-semibold text-mana-bright'>{rec.main}</p>}
							<ul className='space-y-0.5'>
								{rec.secondary.map((s) => (
									<li key={s} className='text-meta text-text-sla-secondary flex items-center gap-1'>
										<span className='text-mana-bright text-label'>●</span> {s}
									</li>
								))}
							</ul>
						</>
					) : (
						<p className='text-xs text-text-sla-muted italic'>—</p>
					)}
				</div>

				{/* User input */}
				<div className='px-4 py-3 space-y-2'>
					<p className='sm:hidden text-label uppercase tracking-wider text-text-sla-muted mb-1'>
						Votre build
					</p>
					{rec?.main !== undefined && (
						<select
							value={userSlot.main}
							aria-label={`Stat principale — ${label}`}
							onChange={(e) => onMainChange(iconKey, (e.target as HTMLSelectElement).value)}
							className='sla-input w-full px-2 py-1 text-xs'
						>
							<option value=''>— Principale —</option>
							{MAIN_STATS.map((s) => (
								<option key={s} value={s}>
									{s}
								</option>
							))}
						</select>
					)}
					<div className='grid grid-cols-2 gap-x-2 gap-y-0.5'>
						{SECONDARY_STATS.map((stat) => {
							const checked = userSlot.secondary.includes(stat)
							const disabled = !checked && atMax
							return (
								<label
									key={stat}
									className={`sla-tap-sm flex items-center gap-1 cursor-pointer ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
								>
									<input
										type='checkbox'
										checked={checked}
										disabled={disabled}
										onChange={() => !disabled && onSecondaryToggle(iconKey, stat)}
										className='accent-mana w-2.5 h-2.5 flex-shrink-0'
									/>
									<span className='text-label text-text-sla-secondary leading-tight'>{stat}</span>
								</label>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

// ─── Equipment comparison (slot-by-slot, 2 cols) ──────────────────────────────

function EquipCompare({
	equipmentStats,
	userEquip,
	onMainChange,
	onSecondaryToggle,
}: {
	equipmentStats: EquipmentStats | undefined
	userEquip: Record<string, UserEquipSlot>
	onMainChange: (slotKey: string, value: string) => void
	onSecondaryToggle: (slotKey: string, stat: string) => void
}) {
	const armorScore = ARMOR_SLOTS.reduce(
		(acc, { iconKey }) => {
			const s = computeSlotScore(
				equipmentStats?.[iconKey as keyof EquipmentStats],
				getEquipSlot(userEquip, iconKey),
			)
			return { matched: acc.matched + s.matched, total: acc.total + s.total }
		},
		{ matched: 0, total: 0 },
	)
	const jewelryScore = JEWELRY_SLOTS.reduce(
		(acc, { iconKey }) => {
			const s = computeSlotScore(
				equipmentStats?.[iconKey as keyof EquipmentStats],
				getEquipSlot(userEquip, iconKey),
			)
			return { matched: acc.matched + s.matched, total: acc.total + s.total }
		},
		{ matched: 0, total: 0 },
	)

	return (
		<div className='space-y-3'>
			{/* Column headers */}
			<div className='hidden sm:grid grid-cols-[1fr_1fr] gap-3'>
				<ColHeader accent>Build recommandé</ColHeader>
				<ColHeader>Votre build</ColHeader>
			</div>

			<CollapsibleGroup label='Armures' matched={armorScore.matched} total={armorScore.total}>
				{ARMOR_SLOTS.map(({ label, iconKey }) => (
					<EquipSlotRow
						key={iconKey}
						label={label}
						iconKey={iconKey}
						rec={equipmentStats?.[iconKey as keyof EquipmentStats]}
						userSlot={getEquipSlot(userEquip, iconKey)}
						onMainChange={onMainChange}
						onSecondaryToggle={onSecondaryToggle}
					/>
				))}
			</CollapsibleGroup>

			<CollapsibleGroup label='Bijoux' matched={jewelryScore.matched} total={jewelryScore.total}>
				{JEWELRY_SLOTS.map(({ label, iconKey }) => (
					<EquipSlotRow
						key={iconKey}
						label={label}
						iconKey={iconKey}
						rec={equipmentStats?.[iconKey as keyof EquipmentStats]}
						userSlot={getEquipSlot(userEquip, iconKey)}
						onMainChange={onMainChange}
						onSecondaryToggle={onSecondaryToggle}
					/>
				))}
			</CollapsibleGroup>
		</div>
	)
}

// ─── Core comparison (slot-by-slot, 2 cols) ───────────────────────────────────

function CoreCompare({
	coreStats,
	userCore,
	onCoreStatToggle,
}: {
	coreStats: CoreStats | undefined
	userCore: Record<string, UserCoreSlot>
	onCoreStatToggle: (coreKey: string, stat: string) => void
}) {
	return (
		<div className='space-y-3'>
			{/* Column headers */}
			<div className='hidden sm:grid grid-cols-[1fr_1fr] gap-3'>
				<ColHeader accent>Build recommandé</ColHeader>
				<ColHeader>Votre build</ColHeader>
			</div>

			{CORE_SLOTS.map(({ key, label, emoji }) => {
				const recStats = coreStats?.[key]
				const userSlot = getCoreSlot(userCore, key)
				const score = computeCoreSlotScore(recStats, userSlot)

				return (
					<CollapsibleGroup key={key} label={`${emoji} ${label}`} matched={score.matched} total={score.total}>
						<div className='grid grid-cols-1 sm:grid-cols-[1fr_1fr] divide-y sm:divide-y-0 sm:divide-x divide-border-sla bg-bg-surface'>
							{/* Recommended */}
							<div className='px-4 py-3'>
								<p className='sm:hidden text-label uppercase tracking-wider text-text-sla-muted mb-1'>
									Recommandé
								</p>
								{recStats && recStats.length > 0 ? (
									<ul className='space-y-0.5'>
										{recStats.map((s) => (
											<li
												key={s}
												className='text-meta text-text-sla-secondary flex items-center gap-1'
											>
												<span className='text-mana-bright text-label'>●</span> {s}
											</li>
										))}
									</ul>
								) : (
									<p className='text-xs text-text-sla-muted italic'>—</p>
								)}
							</div>

							{/* User input */}
							<div className='px-4 py-3'>
								<p className='sm:hidden text-label uppercase tracking-wider text-text-sla-muted mb-1'>
									Votre build
								</p>
								<div className='space-y-0.5'>
									{CORE_STATS_LIST.map((stat) => {
										const checked = userSlot.stats.includes(stat)
										return (
											<label
												key={stat}
												className='sla-tap-sm flex items-center gap-1 cursor-pointer'
											>
												<input
													type='checkbox'
													checked={checked}
													onChange={() => onCoreStatToggle(key, stat)}
													className='accent-mana w-2.5 h-2.5 flex-shrink-0'
												/>
												<span className='text-label text-text-sla-secondary leading-tight'>
													{stat}
												</span>
											</label>
										)
									})}
								</div>
							</div>
						</div>
					</CollapsibleGroup>
				)
			})}
		</div>
	)
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function ComparePage({ hunters }: { hunters: Hunter[] }) {
	const [selectedId, setSelectedId] = useState<string | null>(null)
	const [userEquip, setUserEquip] = useState<Record<string, UserEquipSlot>>({})
	const [userCore, setUserCore] = useState<Record<string, UserCoreSlot>>({})

	const sortedHunters = useMemo(() => [...hunters].sort((a, b) => a.data.name.localeCompare(b.data.name)), [hunters])

	const selectedHunter = selectedId ? (hunters.find((h) => h.id === selectedId) ?? null) : null
	const equipmentStats = selectedHunter?.data.equipmentStats
	const coreStats = selectedHunter?.data.coreStats
	const hasRecommendedBuild = !!(equipmentStats || coreStats)

	const handleHunterSelect = (id: string) => {
		setSelectedId(id || null)
		setUserEquip({})
		setUserCore({})
		window.scrollTo(0, 0)
	}

	const handleEquipMainChange = (slotKey: string, value: string) => {
		setUserEquip((prev) => ({
			...prev,
			[slotKey]: { ...getEquipSlot(prev, slotKey), main: value },
		}))
	}

	const handleEquipSecondaryToggle = (slotKey: string, stat: string) => {
		setUserEquip((prev) => {
			const slot = getEquipSlot(prev, slotKey)
			const already = slot.secondary.includes(stat)
			if (!already && slot.secondary.length >= 4) return prev
			return {
				...prev,
				[slotKey]: {
					...slot,
					secondary: already ? slot.secondary.filter((s) => s !== stat) : [...slot.secondary, stat],
				},
			}
		})
	}

	const handleCoreStatToggle = (coreKey: string, stat: string) => {
		setUserCore((prev) => {
			const slot = getCoreSlot(prev, coreKey)
			const already = slot.stats.includes(stat)
			return {
				...prev,
				[coreKey]: {
					stats: already ? slot.stats.filter((s) => s !== stat) : [...slot.stats, stat],
				},
			}
		})
	}

	const { matched, total, percent } = useMemo(() => {
		let matched = 0
		let total = 0

		for (const { iconKey } of ALL_EQUIP_SLOTS) {
			const rec = equipmentStats?.[iconKey as keyof EquipmentStats]
			if (!rec) continue
			const s = computeSlotScore(rec, getEquipSlot(userEquip, iconKey))
			matched += s.matched
			total += s.total
		}

		for (const { key } of CORE_SLOTS) {
			const recStats = coreStats?.[key]
			if (!recStats || recStats.length === 0) continue
			const s = computeCoreSlotScore(recStats, getCoreSlot(userCore, key))
			matched += s.matched
			total += s.total
		}

		const percent = total > 0 ? Math.round((matched / total) * 100) : 0
		return { matched, total, percent }
	}, [equipmentStats, coreStats, userEquip, userCore])

	const scoreLabel =
		percent >= 80
			? 'Build optimisé'
			: percent >= 50
				? "En cours d'optimisation"
				: total === 0
					? 'Aucune stat renseignée'
					: 'Build à améliorer'

	return (
		<div className='sla-container' style={{ paddingTop: 32, paddingBottom: 64, maxWidth: 1024 }}>
			<BackLink />
			<div style={{ marginTop: 24 }}>
				<SectionHeader
					tag='// COMPARE'
					title='Optimiseur de build'
					description='Compare ton équipement à la build recommandée.'
					as='h1'
				/>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
				{/* ── Selector ── */}
				<div className='relative z-20'>
					<HunterSearchSelect hunters={sortedHunters} selectedId={selectedId} onSelect={handleHunterSelect} />
				</div>

				{/* ── Hunter hero + score ── */}
				{selectedHunter && (
					<div className='bg-bg-surface border border-border-sla p-5'>
						<div className='flex items-center gap-5'>
							{/* Portrait */}
							<div className='relative flex-shrink-0'>
								<img
									src={selectedHunter.data.image}
									decoding='async'
									width={80}
									height={80}
									alt={selectedHunter.data.name}
									className='w-20 h-20 object-cover border-2 border-border-sla'
									onError={(e) => {
										;(e.target as HTMLImageElement).style.display = 'none'
									}}
								/>
								{selectedHunter.data.rarity && (
									<span
										className={`absolute -top-1.5 -right-1.5 bg-bg-surface sla-rarity sla-rarity-${selectedHunter.data.rarity.toLowerCase()}`}
									>
										{selectedHunter.data.rarity}
									</span>
								)}
							</div>

							{/* Info + progress bar */}
							<div className='flex-1 min-w-0'>
								<h2 className='text-lg font-bold text-text-sla truncate'>{selectedHunter.data.name}</h2>
								{selectedHunter.data.element && (
									<p className='text-xs text-text-sla-muted mb-3'>
										{selectedHunter.data.element} · {selectedHunter.data.class}
									</p>
								)}
								{hasRecommendedBuild ? (
									<>
										<p className='text-xs text-text-sla-muted mb-1.5'>
											{scoreLabel} — {matched} / {total} stats
										</p>
										<div className='h-2 bg-border-sla overflow-hidden'>
											<div
												className={`h-full transition-all duration-700 ${
													percent >= 80
														? 'bg-weak'
														: percent >= 50
															? 'bg-mana-bright'
															: 'bg-resist'
												}`}
												style={`width:${percent}%`}
											/>
										</div>
									</>
								) : (
									<p className='text-xs text-text-sla-muted italic'>
										Aucun build recommandé disponible
									</p>
								)}
							</div>

							{/* Score ring */}
							{hasRecommendedBuild && <ScoreRing percent={percent} />}
						</div>
					</div>
				)}

				{/* ── No build state ── */}
				{selectedHunter && !hasRecommendedBuild && (
					<div className='bg-bg-surface border border-border-sla px-6 py-10 text-center'>
						<p className='text-4xl mb-3'>🔍</p>
						<p className='text-text-sla-secondary'>
							Aucun build recommandé disponible pour{' '}
							<span className='text-text-sla font-semibold'>{selectedHunter.data.name}</span>.
						</p>
					</div>
				)}

				{/* ── Equipment ── */}
				{selectedHunter && equipmentStats && (
					<section className='space-y-3'>
						<SectionTitle>Équipements</SectionTitle>
						<EquipCompare
							equipmentStats={equipmentStats}
							userEquip={userEquip}
							onMainChange={handleEquipMainChange}
							onSecondaryToggle={handleEquipSecondaryToggle}
						/>
					</section>
				)}

				{/* ── Cores ── */}
				{selectedHunter && coreStats && (
					<section className='space-y-3'>
						<SectionTitle>Cores</SectionTitle>
						<CoreCompare
							coreStats={coreStats}
							userCore={userCore}
							onCoreStatToggle={handleCoreStatToggle}
						/>
					</section>
				)}
			</div>
		</div>
	)
}
