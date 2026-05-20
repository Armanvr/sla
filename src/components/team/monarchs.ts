export type MonarchId =
	| 'monarch-of-steel'
	| 'monarch-of-white-flames'
	| 'monarch-of-transfiguration'

export interface MonarchData {
	id: MonarchId
	name: string
	image: string
}

export const DEFAULT_MONARCH: MonarchId = 'monarch-of-steel'

export const MONARCHS: MonarchData[] = [
	{
		id: 'monarch-of-steel',
		name: "Monarque d'Acier",
		image: '/assets/workshop/monarch-of-steel/monarch-of-steel.png',
	},
	{
		id: 'monarch-of-white-flames',
		name: 'Monarque des Flammes Blanches',
		image: '/assets/workshop/monarch-of-white-flames/monarch-of-white-flames.png',
	},
	{
		id: 'monarch-of-transfiguration',
		name: 'Monarque de la Transfiguration',
		image: '/assets/workshop/monarch-of-transfiguration/monarch-of-transfiguration.png',
	},
]
