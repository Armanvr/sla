import { useState } from 'preact/hooks'
import { BackLink } from '../components/sla/BackLink'
import { SectionHeader } from '../components/sla/SectionHeader'
import { HunterSlot } from '../components/team/HunterSlot'
import { JinwooPanel } from '../components/team/JinwooPanel'
import { ShadowSlot } from '../components/team/ShadowSlot'
import { SHADOWS } from '../components/team/shadows'
import type { Hunter, ShadowData, WeaponData } from '../components/team/types'

export function TeamGuideDungeons({ hunters }: { hunters: Hunter[] }) {
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
		<div class='sla-container' style={{ paddingTop: 32, paddingBottom: 64 }}>
			<BackLink />
			<div style={{ marginTop: 24 }}>
				<SectionHeader
					tag='// TEAM GUIDE'
					title='Dungeons'
					description='Composition recommandée pour les donjons.'
				/>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
				<JinwooPanel selectedWeapons={selectedWeapons} onWeaponSelect={setWeaponSlot} />

				<hr class='sla-divider' />

				<section>
					<div class='sla-label' style={{ marginBottom: 16 }}>
						{'// Chasseurs'}
					</div>
					<div class='grid grid-cols-1 sm:grid-cols-3 gap-4'>
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

				<hr class='sla-divider' />

				<section>
					<div class='sla-label' style={{ marginBottom: 16 }}>
						{'// Ombres'}
					</div>
					<div class='grid grid-cols-1 sm:grid-cols-3 gap-4'>
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
			</div>
		</div>
	)
}
