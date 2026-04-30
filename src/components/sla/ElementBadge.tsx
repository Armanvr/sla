type Element = 'Dark' | 'Fire' | 'Water' | 'Light' | 'Wind' | 'Ember'

const slug: Record<Element, string> = {
	Dark: 'dark',
	Fire: 'fire',
	Water: 'water',
	Light: 'light',
	Wind: 'wind',
	Ember: 'ember',
}

const labelFr: Record<Element, string> = {
	Dark: 'Ténèbres',
	Fire: 'Feu',
	Water: 'Eau',
	Light: 'Lumière',
	Wind: 'Vent',
	Ember: 'Ember',
}

export function ElementBadge({ element, label }: { element: Element; label?: string }) {
	const s = slug[element]
	return <span class={`sla-elem-badge sla-elem-badge-${s}`}>{label ?? labelFr[element]}</span>
}

export function ElementBar({ element }: { element: Element }) {
	const s = slug[element]
	return <span class={`sla-elem-bar sla-elem-bar-${s}`} />
}

export const ELEMENTS: Element[] = ['Dark', 'Fire', 'Water', 'Light', 'Wind']
