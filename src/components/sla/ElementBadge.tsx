type Element = 'Dark' | 'Fire' | 'Water' | 'Light' | 'Wind' | 'Ember'

export const ELEMENT_SLUG: Record<string, string> = {
	Dark: 'dark',
	Fire: 'fire',
	Water: 'water',
	Light: 'light',
	Wind: 'wind',
	Ember: 'ember',
}

export const ELEMENT_LABEL_FR: Record<string, string> = {
	Dark: 'Ténèbres',
	Fire: 'Feu',
	Water: 'Eau',
	Light: 'Lumière',
	Wind: 'Vent',
	Ember: 'Ember',
}

export function ElementBadge({ element, label }: { element: Element; label?: string }) {
	const s = ELEMENT_SLUG[element]
	return <span className={`sla-elem-badge sla-elem-badge-${s}`}>{label ?? ELEMENT_LABEL_FR[element]}</span>
}

export function ElementBar({ element }: { element: Element }) {
	const s = ELEMENT_SLUG[element]
	return <span className={`sla-elem-bar sla-elem-bar-${s}`} />
}

export const ELEMENTS: Element[] = ['Dark', 'Fire', 'Water', 'Light', 'Wind']
