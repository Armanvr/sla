import type { HunterData } from '../hunter/types'

export interface Hunter {
	id: string
	data: HunterData
}

export interface ShadowData {
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

export interface WeaponData {
	name: string
	icon: string
}
