import { useLayoutEffect, useRef } from 'preact/hooks'

/** Arm only from a slot selection handler; mounts and external value changes stay quiet. */
export function useFlashOnChange(value: string | null) {
	const ref = useRef<HTMLDivElement>(null)
	const pending = useRef<string | null | undefined>(undefined)

	useLayoutEffect(() => {
		const frame = ref.current
		if (pending.current !== undefined && pending.current === value && frame) {
			frame.classList.remove('sla-pick-flash')
			// Flush the removal so a second pick during the glow restarts the CSS animation.
			void frame.offsetWidth
			frame.classList.add('sla-pick-flash')
		}
	}, [value])

	// Expire uncommitted picks after the value effect has had its chance.
	useLayoutEffect(() => {
		pending.current = undefined
	})

	return {
		ref,
		markChange: (next: string | null) => {
			pending.current = next !== value ? next : undefined
		},
	}
}
