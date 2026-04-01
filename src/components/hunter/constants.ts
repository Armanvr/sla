export const elementColors: Record<string, string> = {
	Dark: 'bg-purple-600',
	Water: 'bg-blue-600',
	Fire: 'bg-red-600',
	Light: 'bg-yellow-500',
	Wind: 'bg-emerald-600',
}

export const rarityColors: Record<string, string> = {
	SSR: 'text-amber-400 border-amber-400/30',
	SR: 'text-purple-400 border-purple-400/30',
	R: 'text-blue-400 border-blue-400/30',
}

export const classColors: Record<string, string> = {
	Mage: 'bg-violet-700',
	Fighter: 'bg-red-700',
	Ranger: 'bg-green-700',
	Tank: 'bg-blue-700',
	Assassin: 'bg-zinc-700',
	Healer: 'bg-pink-700',
}

export const statIcons: Record<string, string> = {
	strength: '⚔️',
	vitality: '🛡️',
	agility: '💨',
	intelligence: '🧠',
	perception: '👁️',
}

export const skillSectionLabels: Record<string, string> = {
	basic: 'Basic',
	core: 'Core',
	skill: 'Skills',
	support: 'Support',
	qte: 'QTE',
	ultimate: 'Ultimate',
}

export const ARMOR_SLOTS = [
	{ label: 'Tête', iconKey: 'head' },
	{ label: 'Torse', iconKey: 'chest' },
	{ label: 'Gants', iconKey: 'gloves' },
	{ label: 'Bottes', iconKey: 'boots' },
] as const

export const JEWELRY_SLOTS = [
	{ label: 'Collier', iconKey: 'necklace' },
	{ label: 'Bague', iconKey: 'ring' },
	{ label: 'Bracelet', iconKey: 'bracelet' },
	{ label: "Boucles d'oreilles", iconKey: 'earrings' },
] as const

export const CORE_SLOTS = [
	{ key: 'mind' as const, label: 'Mind', emoji: '🧠' },
	{ key: 'body' as const, label: 'Body', emoji: '🛡️' },
	{ key: 'spirit' as const, label: 'Spirit', emoji: '✨' },
] as const
