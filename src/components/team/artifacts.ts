import artifactsData from '../../data/artifacts/artifacts.json'
import coresData from '../../data/cores/cores.json'
import type { ArtifactSet } from '../hunter/types'

export const EQUIPMENT_SLOTS = [
	{ label: 'Tête', iconKey: 'head', source: 'armor', idx: 0 },
	{ label: 'Torse', iconKey: 'chest', source: 'armor', idx: 1 },
	{ label: 'Gants', iconKey: 'gloves', source: 'armor', idx: 2 },
	{ label: 'Bottes', iconKey: 'boots', source: 'armor', idx: 3 },
	{ label: 'Collier', iconKey: 'necklace', source: 'jewelry', idx: 0 },
	{ label: 'Bague', iconKey: 'ring', source: 'jewelry', idx: 1 },
	{ label: 'Bracelet', iconKey: 'bracelet', source: 'jewelry', idx: 2 },
	{ label: 'Boucles', iconKey: 'earrings', source: 'jewelry', idx: 3 },
] as const

export const CORE_SLOTS_CONFIG = [
	{ key: 'mind' as const, label: 'Mind' },
	{ key: 'body' as const, label: 'Body' },
	{ key: 'spirit' as const, label: 'Spirit' },
]

const ALL_SETS: ArtifactSet[] = [
	...(artifactsData.armor as ArtifactSet[]),
	...(artifactsData.jewelry as ArtifactSet[]),
	...(artifactsData as unknown as { complete: ArtifactSet[] }).complete,
]
export const SET_BY_ID = new Map(ALL_SETS.map((s) => [s.id, s]))

interface CoreEntry {
	id: string
	name: string
	icon: string
}
const ALL_CORES: CoreEntry[] = [
	...(coresData.mind as CoreEntry[]),
	...(coresData.body as CoreEntry[]),
	...(coresData.spirit as CoreEntry[]),
]
export const CORE_BY_ID = new Map(ALL_CORES.map((c) => [c.id, c]))
