import weaponsManifest from '../../assets/weapons/manifest.json'
import jinwooManifest from '../../assets/weapons/sung-jinwoo/manifest.json'
import type { WeaponData } from './types'

const toWeapons = (manifest: Record<string, string>): WeaponData[] =>
	Object.entries(manifest)
		.map(([key, path]) => ({
			name: key
				.replace(/_Icon\.png$/, '')
				.replace(/\.png$/, '')
				.replace(/_/g, ' '),
			icon: `/${path}`,
		}))
		.sort((a, b) => a.name.localeCompare(b.name))

export const WEAPONS: WeaponData[] = toWeapons(weaponsManifest as Record<string, string>)
export const JINWOO_WEAPONS: WeaponData[] = toWeapons(jinwooManifest as Record<string, string>)

export const JINWOO_WEAPONS_BY_NAME = new Map(JINWOO_WEAPONS.map((w) => [w.name, w]))
