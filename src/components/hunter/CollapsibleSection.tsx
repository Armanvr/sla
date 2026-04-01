import { useState } from 'preact/hooks'

export function CollapsibleSection({
	title,
	children,
	defaultOpen = false,
}: {
	title: string
	children: preact.ComponentChildren
	defaultOpen?: boolean
}) {
	const [open, setOpen] = useState(defaultOpen)
	return (
		<section>
			<button
				type='button'
				onClick={() => setOpen((o) => !o)}
				class='w-full flex items-center gap-2 text-left hover:opacity-80 transition-opacity'
			>
				<span class='w-1 h-6 bg-purple-500 rounded-full flex-shrink-0' />
				<h3 class='text-2xl font-bold flex-1'>{title}</h3>
				<span class='text-zinc-400 text-sm font-mono'>{open ? '▲' : '▼'}</span>
			</button>
			{open && <div class='mt-6'>{children}</div>}
		</section>
	)
}
