export type SuccessorId = 'myro'

export interface SuccessorData {
	id: SuccessorId
	name: string
	image: string
}

export const DEFAULT_SUCCESSOR: SuccessorId = 'myro'

export const SUCCESSORS: SuccessorData[] = [
	{
		id: 'myro',
		name: 'Myro',
		image: '/assets/successors/Myro.png',
	},
]
