import { useState } from 'preact/hooks'
import { HunterSlot } from '../components/team/HunterSlot'
import { JinwooPanel } from '../components/team/JinwooPanel'
import { ShadowSlot } from '../components/team/ShadowSlot'
import { SHADOWS } from '../components/team/shadows'
import type { Hunter, ShadowData, WeaponData } from '../components/team/types'

export function TeamGuideDungeons({ hunters, onBack }: { hunters: Hunter[]; onBack: () => void }) {
	const otherHunters = hunters.filter((h) => h.id !== 'sung-jinwoo')

	const [selectedHunters, setSelectedHunters] = useState<[Hunter | null, Hunter | null, Hunter | null]>([
		null,
		null,
		null,
	])
	const [selectedShadows, setSelectedShadows] = useState<[ShadowData | null, ShadowData | null, ShadowData | null]>([
		null,
		null,
		null,
	])
	const [selectedWeapons, setSelectedWeapons] = useState<[WeaponData | null, WeaponData | null]>([null, null])

	const setHunterSlot = (i: 0 | 1 | 2, h: Hunter | null) =>
		setSelectedHunters((prev) => {
			const next = [...prev] as typeof prev
			next[i] = h
			return next
		})

	const setShadowSlot = (i: 0 | 1 | 2, s: ShadowData | null) =>
		setSelectedShadows((prev) => {
			const next = [...prev] as typeof prev
			next[i] = s
			return next
		})

	const setWeaponSlot = (i: 0 | 1, w: WeaponData | null) =>
		setSelectedWeapons((prev) => {
			const next = [...prev] as typeof prev
			next[i] = w
			return next
		})

	const takenHunterIds = new Set(selectedHunters.filter(Boolean).map((h) => h!.id))
	const takenShadowNames = new Set(selectedShadows.filter(Boolean).map((s) => s!.name))

	const availableHunters = (i: 0 | 1 | 2) =>
		otherHunters.filter((h) => h.id !== selectedHunters[i]?.id && !takenHunterIds.has(h.id))

	const availableShadows = (i: 0 | 1 | 2) =>
		SHADOWS.filter((s) => s.name !== selectedShadows[i]?.name && !takenShadowNames.has(s.name))

	return (
		<div class='min-h-screen bg-zinc-900 text-zinc-100'>
			<header class='sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur px-6 py-4 flex items-center gap-4'>
				<button type='button' onClick={onBack} class='text-zinc-400 hover:text-zinc-100 transition-colors'>
					← Retour
				</button>
				<h1 class='text-lg font-bold'>
					Team Guides — <span class='text-purple-400'>Dungeons</span>
				</h1>
			</header>

			<main class='max-w-6xl mx-auto px-4 py-6 space-y-6'>
				<JinwooPanel selectedWeapons={selectedWeapons} onWeaponSelect={setWeaponSlot} />

				<hr class='border-zinc-800' />

				<section>
					<p class='text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4'>Chasseurs</p>
					<div class='grid grid-cols-3 gap-4'>
						{([0, 1, 2] as const).map((i) => (
							<HunterSlot
								key={i}
								slot={i + 1}
								selected={selectedHunters[i]}
								hunters={availableHunters(i)}
								onSelect={(h) => setHunterSlot(i, h)}
							/>
						))}
					</div>
				</section>

				<hr class='border-zinc-800' />

				<section>
					<p class='text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4'>Ombres</p>
					<div class='grid grid-cols-3 gap-4'>
						{([0, 1, 2] as const).map((i) => (
							<ShadowSlot
								key={i}
								slot={i + 1}
								selected={selectedShadows[i]}
								shadows={availableShadows(i)}
								onSelect={(s) => setShadowSlot(i, s)}
							/>
						))}
					</div>
				</section>
			</main>
		</div>
	)
}
