import type { ComponentChildren } from 'preact'
import { useMemo, useRef, useState } from 'preact/hooks'
import { ARMOR_SLOTS, CORE_SLOTS, JEWELRY_SLOTS } from '../components/hunter/constants'
import type { CoreStats, EquipmentStats } from '../components/hunter/types'
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
	const inputRef = useRef<HTMLInputElement>(null)

	const selected = selectedId ? hunters.find((h) => h.id === selectedId) : null

	const filtered = useMemo(() => {
		if (!query.trim()) return hunters
		const q = query.toLowerCase()
		return hunters.filter((h) => h.data.name.toLowerCase().includes(q))
	}, [hunters, query])

	const handleFocus = () => {
		setQuery('')
		setOpen(true)
	}

	const handleBlur = () => {
		setTimeout(() => setOpen(false), 150)
	}

	const handleSelect = (id: string) => {
		onSelect(id)
		setQuery('')
		setOpen(false)
		inputRef.current?.blur()
	}

	return (
		<div class='relative'>
			<div class='relative'>
				<input
					ref={inputRef}
					type='text'
					value={open ? query : (selected?.data.name ?? '')}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
					placeholder='Rechercher un chasseur…'
					class='w-full bg-zinc-800 border border-zinc-700/60 rounded-xl pl-9 pr-4 py-3 text-zinc-100 placeholder-zinc-500 focus:border-purple-500/60 focus:outline-none transition-colors text-sm'
				/>
			</div>

			{open && (
				<div class='absolute z-30 w-full bg-zinc-800 border border-zinc-700/70 rounded-xl mt-1.5 max-h-64 overflow-y-auto shadow-2xl'>
					{filtered.length === 0 ? (
						<p class='px-4 py-3 text-sm text-zinc-500 italic'>Aucun résultat</p>
					) : (
						filtered.map((h) => (
							<button
								key={h.id}
								type='button'
								onMouseDown={() => handleSelect(h.id)}
								class={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-zinc-700/60 flex items-center justify-between ${
									selectedId === h.id ? 'text-purple-400 bg-purple-900/20' : 'text-zinc-200'
								}`}
							>
								<span>{h.data.name}</span>
								{selectedId === h.id && <span class='text-purple-400 text-xs'>✓</span>}
							</button>
						))
					)}
				</div>
			)}
		</div>
	)
}

// ─── Score ring ───────────────────────────────────────────────────────────────

function ScoreRing({ percent, color }: { percent: number; color: string }) {
	const r = 52
	const circ = 2 * Math.PI * r
	const offset = circ - (percent / 100) * circ

	const strokeColor = percent >= 80 ? '#10b981' : percent >= 50 ? '#f59e0b' : '#ef4444'

	return (
		<svg width='130' height='130' viewBox='0 0 130 130' class='flex-shrink-0' role='img' aria-label='Score ring'>
			<circle cx='65' cy='65' r={r} fill='none' stroke='#3f3f46' stroke-width='10' />
			<circle
				cx='65'
				cy='65'
				r={r}
				fill='none'
				stroke={strokeColor}
				stroke-width='10'
				stroke-dasharray={circ}
				stroke-dashoffset={offset}
				stroke-linecap='round'
				transform='rotate(-90 65 65)'
				style='transition: stroke-dashoffset 0.6s ease'
			/>
			<text
				x='65'
				y='60'
				text-anchor='middle'
				dominant-baseline='middle'
				fill={strokeColor}
				font-size='24'
				font-weight='900'
				font-family='inherit'
			>
				{percent}%
			</text>
			<text
				x='65'
				y='80'
				text-anchor='middle'
				dominant-baseline='middle'
				fill='#71717a'
				font-size='9'
				font-family='inherit'
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
			class={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
				ok
					? 'bg-emerald-900/40 text-emerald-400'
					: partial
						? 'bg-amber-900/40 text-amber-400'
						: 'bg-zinc-800 text-zinc-500'
			}`}
		>
			{matched}/{total}
		</span>
	)
}

// ─── Section title ────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: string }) {
	return (
		<p class='text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2'>
			<span class='h-px flex-1 bg-zinc-800' />
			{children}
			<span class='h-px flex-1 bg-zinc-800' />
		</p>
	)
}

// ─── Column headers ───────────────────────────────────────────────────────────

function ColHeader({ children, accent }: { children: string; accent?: boolean }) {
	return (
		<div
			class={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider text-center mb-4 ${
				accent
					? 'bg-purple-900/30 border border-purple-700/40 text-purple-300'
					: 'bg-zinc-800/60 border border-zinc-700/40 text-zinc-400'
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
		<div class='border border-zinc-800 rounded-xl overflow-hidden'>
			<button
				type='button'
				onClick={() => setOpen((v) => !v)}
				class='w-full flex items-center justify-between px-4 py-3 bg-zinc-800/50 hover:bg-zinc-800/80 transition-colors'
			>
				<span class='text-xs font-bold uppercase tracking-wider text-zinc-300'>{label}</span>
				<div class='flex items-center gap-2'>
					<SlotBadge matched={matched} total={total} />
					<span class='text-zinc-500 text-xs'>{open ? '▲' : '▼'}</span>
				</div>
			</button>
			{open && <div class='divide-y divide-zinc-800'>{children}</div>}
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
		<div class='bg-zinc-800/20'>
			<div class='flex items-center justify-between px-4 py-2 border-b border-zinc-800/60'>
				<p class='text-[10px] font-semibold uppercase tracking-wider text-zinc-500'>{label}</p>
				<SlotBadge matched={score.matched} total={score.total} />
			</div>
			<div class='grid grid-cols-[1fr_1fr] divide-x divide-zinc-800'>
				{/* Recommended */}
				<div class='px-4 py-3 space-y-1.5'>
					{rec ? (
						<>
							{rec.main && <p class='text-xs font-semibold text-purple-300'>{rec.main}</p>}
							<ul class='space-y-0.5'>
								{rec.secondary.map((s) => (
									<li key={s} class='text-[11px] text-zinc-400 flex items-center gap-1'>
										<span class='text-purple-500 text-[8px]'>●</span> {s}
									</li>
								))}
							</ul>
						</>
					) : (
						<p class='text-xs text-zinc-600 italic'>—</p>
					)}
				</div>

				{/* User input */}
				<div class='px-4 py-3 space-y-2'>
					{rec?.main !== undefined && (
						<select
							value={userSlot.main}
							onChange={(e) => onMainChange(iconKey, (e.target as HTMLSelectElement).value)}
							class='w-full bg-zinc-800 border border-zinc-700/50 rounded-lg px-2 py-1 text-xs text-zinc-200 focus:border-purple-500/60 focus:outline-none transition-colors'
						>
							<option value=''>— Principale —</option>
							{MAIN_STATS.map((s) => (
								<option key={s} value={s}>
									{s}
								</option>
							))}
						</select>
					)}
					<div class='grid grid-cols-2 gap-x-2 gap-y-0.5'>
						{SECONDARY_STATS.map((stat) => {
							const checked = userSlot.secondary.includes(stat)
							const disabled = !checked && atMax
							return (
								<label
									key={stat}
									class={`flex items-center gap-1 cursor-pointer ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
								>
									<input
										type='checkbox'
										checked={checked}
										disabled={disabled}
										onChange={() => !disabled && onSecondaryToggle(iconKey, stat)}
										class='accent-purple-500 w-2.5 h-2.5 flex-shrink-0'
									/>
									<span class='text-[10px] text-zinc-300 leading-tight'>{stat}</span>
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
		<div class='space-y-3'>
			{/* Column headers */}
			<div class='grid grid-cols-[1fr_1fr] gap-3'>
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
		<div class='space-y-3'>
			{/* Column headers */}
			<div class='grid grid-cols-[1fr_1fr] gap-3'>
				<ColHeader accent>Build recommandé</ColHeader>
				<ColHeader>Votre build</ColHeader>
			</div>

			{CORE_SLOTS.map(({ key, label, emoji }) => {
				const recStats = coreStats?.[key]
				const userSlot = getCoreSlot(userCore, key)
				const score = computeCoreSlotScore(recStats, userSlot)

				return (
					<CollapsibleGroup key={key} label={`${emoji} ${label}`} matched={score.matched} total={score.total}>
						<div class='grid grid-cols-[1fr_1fr] divide-x divide-zinc-800 bg-zinc-800/20'>
							{/* Recommended */}
							<div class='px-4 py-3'>
								{recStats && recStats.length > 0 ? (
									<ul class='space-y-0.5'>
										{recStats.map((s) => (
											<li key={s} class='text-[11px] text-zinc-400 flex items-center gap-1'>
												<span class='text-purple-500 text-[8px]'>●</span> {s}
											</li>
										))}
									</ul>
								) : (
									<p class='text-xs text-zinc-600 italic'>—</p>
								)}
							</div>

							{/* User input */}
							<div class='px-4 py-3'>
								<div class='space-y-0.5'>
									{CORE_STATS_LIST.map((stat) => {
										const checked = userSlot.stats.includes(stat)
										return (
											<label key={stat} class='flex items-center gap-1 cursor-pointer'>
												<input
													type='checkbox'
													checked={checked}
													onChange={() => onCoreStatToggle(key, stat)}
													class='accent-purple-500 w-2.5 h-2.5 flex-shrink-0'
												/>
												<span class='text-[10px] text-zinc-300 leading-tight'>{stat}</span>
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

export function ComparePage({ hunters, onBack }: { hunters: Hunter[]; onBack: () => void }) {
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
		<div class='min-h-screen bg-zinc-900 text-zinc-100'>
			<header class='sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur px-6 py-4 flex items-center gap-4'>
				<button type='button' onClick={onBack} class='text-zinc-400 hover:text-zinc-100 transition-colors'>
					← Retour
				</button>
				<button
					type='button'
					onClick={onBack}
					class='text-xl font-bold tracking-wide hover:opacity-80 transition-opacity'
				>
					SLA <span class='text-purple-400'>Guide</span>
				</button>
				<span class='text-sm text-zinc-500'>— Compare</span>
			</header>

			<main class='max-w-5xl mx-auto px-4 py-8 space-y-4'>
				{/* ── Selector ── */}
				<div class='relative z-20'>
					<HunterSearchSelect hunters={sortedHunters} selectedId={selectedId} onSelect={handleHunterSelect} />
				</div>

				{/* ── Hunter hero + score ── */}
				{selectedHunter && (
					<div class='bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-5'>
						<div class='flex items-center gap-5'>
							{/* Portrait */}
							<div class='relative flex-shrink-0'>
								<img
									src={selectedHunter.data.image}
									alt={selectedHunter.data.name}
									class='w-20 h-20 rounded-xl object-cover border-2 border-zinc-700/60 shadow-xl'
									onError={(e) => {
										;(e.target as HTMLImageElement).style.display = 'none'
									}}
								/>
								{selectedHunter.data.rarity && (
									<span class='absolute -top-1.5 -right-1.5 text-[9px] font-bold bg-zinc-900 border border-amber-400/40 text-amber-400 px-1.5 py-0.5 rounded-md'>
										{selectedHunter.data.rarity}
									</span>
								)}
							</div>

							{/* Info + progress bar */}
							<div class='flex-1 min-w-0'>
								<h2 class='text-lg font-bold text-zinc-100 truncate'>{selectedHunter.data.name}</h2>
								{selectedHunter.data.element && (
									<p class='text-xs text-zinc-500 mb-3'>
										{selectedHunter.data.element} · {selectedHunter.data.class}
									</p>
								)}
								{hasRecommendedBuild ? (
									<>
										<p class='text-xs text-zinc-500 mb-1.5'>
											{scoreLabel} — {matched} / {total} stats
										</p>
										<div class='h-2 bg-zinc-700/60 rounded-full overflow-hidden'>
											<div
												class={`h-full rounded-full transition-all duration-700 ${
													percent >= 80
														? 'bg-emerald-500'
														: percent >= 50
															? 'bg-amber-500'
															: 'bg-red-500'
												}`}
												style={`width:${percent}%`}
											/>
										</div>
									</>
								) : (
									<p class='text-xs text-zinc-500 italic'>Aucun build recommandé disponible</p>
								)}
							</div>

							{/* Score ring */}
							{hasRecommendedBuild && <ScoreRing percent={percent} color='' />}
						</div>
					</div>
				)}

				{/* ── No build state ── */}
				{selectedHunter && !hasRecommendedBuild && (
					<div class='bg-zinc-800/30 border border-zinc-700/50 rounded-2xl px-6 py-10 text-center'>
						<p class='text-4xl mb-3'>🔍</p>
						<p class='text-zinc-400'>
							Aucun build recommandé disponible pour{' '}
							<span class='text-zinc-200 font-semibold'>{selectedHunter.data.name}</span>.
						</p>
					</div>
				)}

				{/* ── Equipment ── */}
				{selectedHunter && equipmentStats && (
					<section class='space-y-3'>
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
					<section class='space-y-3'>
						<SectionTitle>Cores</SectionTitle>
						<CoreCompare
							coreStats={coreStats}
							userCore={userCore}
							onCoreStatToggle={handleCoreStatToggle}
						/>
					</section>
				)}
			</main>
		</div>
	)
}
