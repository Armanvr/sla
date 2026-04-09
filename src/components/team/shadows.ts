import beruData from '../../data/shadows/beru.json'
import besteData from '../../data/shadows/beste.json'
import bigrockData from '../../data/shadows/bigrock.json'
import bladesData from '../../data/shadows/blades.json'
import bruteData from '../../data/shadows/brute.json'
import cerbieData from '../../data/shadows/cerbie.json'
import igrisData from '../../data/shadows/igris.json'
import ironData from '../../data/shadows/iron.json'
import jimaData from '../../data/shadows/jima.json'
import kaiselData from '../../data/shadows/kaisel.json'
import skullData from '../../data/shadows/skull.json'
import tankData from '../../data/shadows/tank.json'
import tuskData from '../../data/shadows/tusk.json'
import urosData from '../../data/shadows/uros.json'
import type { ShadowData } from './types'

export const SHADOWS: ShadowData[] = [
	beruData,
	besteData,
	bigrockData,
	bladesData,
	bruteData,
	cerbieData,
	igrisData,
	ironData,
	jimaData,
	kaiselData,
	skullData,
	tankData,
	tuskData,
	urosData,
]

export const SHADOWS_BY_ID: Record<string, ShadowData> = {
	beru: beruData,
	beste: besteData,
	bigrock: bigrockData,
	blades: bladesData,
	brute: bruteData,
	cerbie: cerbieData,
	igris: igrisData,
	iron: ironData,
	jima: jimaData,
	kaisel: kaiselData,
	skull: skullData,
	tank: tankData,
	tusk: tuskData,
	uros: urosData,
}
