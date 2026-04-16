export interface Stat {
	key: string
	label: string
	description: string
}

export interface Element {
	name: string
	primary: boolean
}

export interface Relative {
	name: string
	relation: string
}

export interface BaseStats {
	hp: number
	attack: number
	defense: number
	totalPower: number
}

export interface SkillStage {
	stage: number
	damage: string
}

export interface BasicSkill {
	name: string
	description: string
	stages?: SkillStage[]
	damage?: string
	cooldown?: number | null
	mpCost?: string
	powerGaugeCost?: number
	effects?: string[]
	element?: string
	icon?: string
}

export interface Passive {
	name: string
	description: string
	icon?: string | null
}

export interface ArtifactSet {
	id: string
	name: string
	icons: Record<string, string | null>
	bonuses: Record<string, string>
}

export interface Build {
	name: string
	armor: (string | null)[]
	jewelry: (string | null)[]
}

export interface CoreBuild {
	mind: string | null
	body: string | null
	spirit: string | null
}

export interface Core {
	id: string
	name: string
	icon: string
	effects: Record<string, string>
}

export interface SlotStats {
	main: string | null
	secondary: string[]
}

export interface EquipmentStats {
	head?: SlotStats
	chest?: SlotStats
	gloves?: SlotStats
	boots?: SlotStats
	necklace?: SlotStats
	ring?: SlotStats
	bracelet?: SlotStats
	earrings?: SlotStats
}

export interface CoreStats {
	mind?: string[]
	body?: string[]
	spirit?: string[]
}

export interface HunterData {
	name: string
	category?: string
	alias?: string | null
	title?: string
	rarity?: string
	rank?: string
	element?: string
	class?: string
	country?: string
	guild?: string | null
	occupation: string[]
	affiliation: string[]
	gender: string
	age: number | null
	species: string
	image: string
	icon?: string | null
	mainAbility?: string
	exclusiveWeapon?: string
	releaseDate?: string
	relatives?: Relative[]
	weapon?: { name: string; icon: string }
	stats: Stat[]
	baseStats?: {
		level1: BaseStats
		maxLevel: BaseStats
		primaryStat?: string
	}
	elements: Element[]
	skills: {
		basic?: BasicSkill[]
		core?: BasicSkill[]
		skill?: BasicSkill[]
		support?: BasicSkill[]
		qte?: BasicSkill[]
		ultimate?: BasicSkill[]
	}
	passive?: Passive
	advancements?: string[]
	builds?: Build[]
	coreBuild?: CoreBuild
	equipmentStats?: EquipmentStats
	coreStats?: CoreStats
	recommendedStats?: string[]
}
