export function UnderConstruction({ label }: { label?: string }) {
	return (
		<div class='bg-zinc-800/30 border border-zinc-700/40 rounded-xl px-6 py-8 text-center space-y-2'>
			{label && <p class='text-zinc-500 text-sm font-semibold'>{label}</p>}
			<p class='text-zinc-600 text-xs font-medium uppercase tracking-wider'>En construction</p>
		</div>
	)
}
