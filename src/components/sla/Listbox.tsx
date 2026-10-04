import type { ComponentChildren, JSX, RefObject } from 'preact'
import { useEffect, useId, useRef } from 'preact/hooks'

/**
 * Shared accessible slot picker (WAI-ARIA menu-button + listbox).
 *
 * const lb = useListbox({ open, onToggle, onClose, label: 'Arme 1', value: 'Épée' })
 * <button type='button' {...lb.triggerProps}>…</button>        // clear "×" = sibling, call lb.focusTrigger()
 * {open && <Listbox {...lb.popupProps} className='absolute …'>
 *   <EmptyOption selected={!value} onClick={…} />
 *   <button type='button' {...optionProps(isSelected)} onClick={…}>…</button>
 * </Listbox>}
 *
 * Keys in the popup: ArrowUp/Down (wrap), Home/End, Enter/Space (native button click), Escape + Tab close.
 * Focus moves into the popup on open ([data-autofocus] > selected option > first option) and back to the
 * trigger on select / Escape / Tab. Outside pointerdown closes.
 */

const OPTION = '[role="option"]'

export const optionProps = (selected: boolean) => ({
	role: 'option' as const,
	'aria-selected': selected,
	tabIndex: -1,
})

/** "— Vide —" option + separator shared by the zinc-styled slot pickers. */
export const EmptyOption = ({ selected, onClick }: { selected: boolean; onClick: () => void }) => (
	<>
		<button
			type='button'
			{...optionProps(selected)}
			onClick={onClick}
			className='w-full flex items-center gap-3 px-3 py-2 hover:bg-bg-container transition-colors'
		>
			<div className='w-8 h-8 bg-bg-container border border-dashed border-border-sla-bright flex items-center justify-center text-text-sla-muted flex-shrink-0'>
				–
			</div>
			<span className='text-sm text-text-sla-secondary'>— Vide —</span>
		</button>
		<div role='none' className='border-t border-border-sla-bright' />
	</>
)

export function useListbox({
	open,
	onToggle,
	onClose,
	label,
	value,
}: {
	open: boolean
	onToggle: () => void
	onClose: () => void
	label: string
	value: string
}) {
	const id = useId()
	const triggerRef = useRef<HTMLButtonElement>(null)
	return {
		focusTrigger: () => triggerRef.current?.focus(),
		triggerProps: {
			ref: triggerRef,
			'aria-haspopup': 'listbox' as const,
			'aria-expanded': open,
			'aria-controls': open ? id : undefined,
			'aria-label': `${label} : ${value}`,
			onClick: (e: MouseEvent) => {
				onToggle()
				// Safari doesn't focus buttons on click: make sure focus lands on the trigger when closing.
				if (open) (e.currentTarget as HTMLElement).focus()
			},
			onKeyDown: (e: KeyboardEvent) => {
				if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
					e.preventDefault()
					onToggle()
				}
			},
		},
		popupProps: { id, label, triggerRef, onClose },
	}
}

export function Listbox({
	id,
	label,
	triggerRef,
	onClose,
	className,
	style,
	listClassName,
	header,
	children,
}: {
	id: string
	label: string
	triggerRef: RefObject<HTMLButtonElement>
	onClose: () => void
	className?: string
	style?: JSX.CSSProperties
	listClassName?: string
	/** Non-option content above the list (e.g. a search input; mark the focus target `data-autofocus`). */
	header?: ComponentChildren
	children: ComponentChildren
}) {
	const ref = useRef<HTMLDivElement>(null)
	const closeRef = useRef(onClose)
	closeRef.current = onClose

	useEffect(() => {
		const el = ref.current
		if (!el) return
		const first =
			el.querySelector<HTMLElement>('[data-autofocus]') ??
			el.querySelector<HTMLElement>('[aria-selected="true"]') ??
			el.querySelector<HTMLElement>(OPTION)
		first?.focus()
		const onDown = (e: PointerEvent) => {
			const t = e.target as Node
			if (el.contains(t) || triggerRef.current?.contains(t)) return
			closeRef.current()
			// Mobile bottom sheet: the click that follows would hit whatever is under the scrim; swallow it once,
			// whatever the pointer. Wider screens have no scrim, so the click should reach its target.
			if (matchMedia('(max-width: 767px)').matches) {
				const swallow = (ev: Event) => {
					ev.preventDefault()
					ev.stopPropagation()
				}
				document.addEventListener('click', swallow, { capture: true, once: true })
				setTimeout(() => document.removeEventListener('click', swallow, { capture: true }), 400)
			}
		}
		document.addEventListener('pointerdown', onDown)
		return () => document.removeEventListener('pointerdown', onDown)
	}, [triggerRef])

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape' || e.key === 'Tab') {
			// Forward Tab: focus the trigger so the default action continues from it, not from a removed node.
			// Escape / Shift+Tab: stay on the trigger (Shift+Tab default would skip back past it).
			triggerRef.current?.focus()
			if (e.key === 'Escape' || e.shiftKey) e.preventDefault()
			onClose()
			return
		}
		const inInput = e.target instanceof HTMLInputElement
		const keys = inInput ? ['ArrowDown', 'ArrowUp'] : ['ArrowDown', 'ArrowUp', 'Home', 'End']
		if (!keys.includes(e.key)) return
		const opts = Array.from(ref.current?.querySelectorAll<HTMLElement>(OPTION) ?? [])
		if (opts.length === 0) return
		e.preventDefault()
		const i = opts.indexOf(document.activeElement as HTMLElement)
		const next =
			e.key === 'Home'
				? 0
				: e.key === 'End'
					? opts.length - 1
					: e.key === 'ArrowDown'
						? (i + 1) % opts.length
						: i <= 0
							? opts.length - 1
							: i - 1
		opts[next].focus()
	}

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: keyboard handling for the descendant options; the focusable elements are the options/input
		<div
			ref={ref}
			className={className ? `sla-listbox ${className}` : 'sla-listbox'}
			style={style}
			onKeyDown={onKeyDown}
			onClick={(e) => {
				if ((e.target as Element).closest(OPTION)) triggerRef.current?.focus()
			}}
		>
			{header}
			<div role='listbox' id={id} aria-label={label} className={listClassName}>
				{children}
			</div>
		</div>
	)
}
