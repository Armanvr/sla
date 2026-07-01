import type { Hunter } from './types'

export interface ParsedEffect {
	label: string
	value: string | null
	direction: 'increase' | 'decrease' | 'other'
}

export interface AggregatedEffect {
	label: string
	total: number | null
	rawValues: string[]
	direction: 'increase' | 'decrease' | 'other'
}

const INCREASE_RE = [/(.+?)\s+increases?\s+by\s+([\d.]+%?)/i, /increases?\s+(?:the\s+)?(.+?)\s+by\s+([\d.]+%?)/i]

const DECREASE_RE = [/(.+?)\s+decreases?\s+by\s+([\d.]+%?)/i, /decreases?\s+(?:the\s+)?(.+?)\s+by\s+([\d.]+%?)/i]

function normalizeLabel(raw: string): string {
	return raw
		.replace(/^the user's\s+/i, '')
		.replace(/^the\s+/i, '')
		.trim()
		.toLowerCase()
		.replace(/\b\w/g, (c) => c.toUpperCase())
}

function parseNumber(val: string): number | null {
	const n = parseFloat(val.replace('%', ''))
	return Number.isNaN(n) ? null : n
}

export function extractEffects(advancements: string[]): ParsedEffect[] {
	const effects: ParsedEffect[] = []

	for (const text of advancements) {
		// Split on ". " to process sentence fragments individually
		const sentences = text.split(/\.\s+/)
		for (const sentence of sentences) {
			let matched = false

			for (const re of INCREASE_RE) {
				const m = sentence.match(re)
				if (m) {
					effects.push({
						label: normalizeLabel(m[1] ?? m[2] ?? ''),
						value: m[2] ?? m[3] ?? null,
						direction: 'increase',
					})
					matched = true
					break
				}
			}
			if (matched) continue

			for (const re of DECREASE_RE) {
				const m = sentence.match(re)
				if (m) {
					effects.push({
						label: normalizeLabel(m[1] ?? m[2] ?? ''),
						value: m[2] ?? m[3] ?? null,
						direction: 'decrease',
					})
					matched = true
					break
				}
			}
			if (matched) continue

			// other — only emit if sentence mentions a % or a stat keyword
			if (
				/[\d.]+%/.test(sentence) ||
				/\b(damage|defense|attack|hp|critical|cooldown|power gauge|mp)\b/i.test(sentence)
			) {
				const pctMatch = sentence.match(/([\d.]+%)/)
				effects.push({
					label: normalizeLabel(sentence.replace(/[[\]()]/g, '').slice(0, 60)),
					value: pctMatch ? pctMatch[1] : null,
					direction: 'other',
				})
			}
		}
	}

	return effects
}

export function aggregateTeamEffects(hunters: (Hunter | null)[]): AggregatedEffect[] {
	const map = new Map<string, { total: number; rawValues: string[]; direction: 'increase' | 'decrease' | 'other' }>()

	for (const hunter of hunters) {
		if (!hunter) continue
		const advancements = hunter.data.advancements
		if (!advancements || advancements.length === 0) continue

		const effects = extractEffects(advancements)
		for (const e of effects) {
			const key = `${e.direction}::${e.label}`
			const existing = map.get(key)
			const num = e.value ? parseNumber(e.value) : null

			if (existing) {
				if (num !== null) existing.total += num
				if (e.value) existing.rawValues.push(e.value)
			} else {
				map.set(key, {
					total: num ?? 0,
					rawValues: e.value ? [e.value] : [],
					direction: e.direction,
				})
			}
		}
	}

	const result: AggregatedEffect[] = []
	for (const [key, v] of map.entries()) {
		const [_direction, ...labelParts] = key.split('::')
		result.push({
			label: labelParts.join('::'),
			total: v.rawValues.length > 0 ? v.total : null,
			rawValues: v.rawValues,
			direction: v.direction as 'increase' | 'decrease' | 'other',
		})
	}

	// Sort: increase first, then decrease, then other; within group by total desc
	const order = { increase: 0, decrease: 1, other: 2 }
	result.sort((a, b) => {
		const d = order[a.direction] - order[b.direction]
		if (d !== 0) return d
		return (b.total ?? 0) - (a.total ?? 0)
	})

	return result
}
