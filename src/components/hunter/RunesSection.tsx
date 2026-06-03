export function RunesSection() {
	return (
		<div class='grid grid-cols-1 sm:grid-cols-2 gap-4'>
			{/* Techniques */}
			<div class='sla-panel' style={{ padding: 20 }}>
				<div
					class='sla-label'
					style={{ marginBottom: 16, textTransform: 'uppercase', letterSpacing: 'var(--sla-ls-wider)' }}
				>
					{'// Techniques'}
				</div>
				<div class='flex gap-3'>
					{[0, 1, 2].map((i) => (
						<div
							key={i}
							class='flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border border-dashed border-zinc-700/60 bg-zinc-800/40'
						>
							<div class='w-12 h-12 rounded-lg bg-zinc-700/30 border border-dashed border-zinc-600/50 flex items-center justify-center text-zinc-500 text-lg'>
								–
							</div>
							<span class='text-[10px] text-zinc-500 text-center'>— Vide —</span>
						</div>
					))}
				</div>
			</div>

			{/* Bénédictions */}
			<div class='sla-panel' style={{ padding: 20 }}>
				<div
					class='sla-label'
					style={{ marginBottom: 16, textTransform: 'uppercase', letterSpacing: 'var(--sla-ls-wider)' }}
				>
					{'// Bénédictions'}
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
					<div>
						<div class='text-[10px] text-emerald-400 font-semibold uppercase tracking-widest mb-2'>
							Offensives
						</div>
						<div class='flex gap-2'>
							{[0, 1, 2, 3].map((i) => (
								<div
									key={i}
									class='flex-1 flex flex-col items-center gap-1 p-2 rounded-xl border border-dashed border-zinc-700/60 bg-zinc-800/40'
								>
									<div class='w-10 h-10 rounded-lg bg-zinc-700/30 border border-dashed border-zinc-600/50 flex items-center justify-center text-zinc-500 text-sm'>
										–
									</div>
									<span class='text-[9px] text-zinc-500'>Vide</span>
								</div>
							))}
						</div>
					</div>
					<div>
						<div class='text-[10px] text-blue-400 font-semibold uppercase tracking-widest mb-2'>
							Défensives
						</div>
						<div class='flex gap-2'>
							{[0, 1, 2, 3].map((i) => (
								<div
									key={i}
									class='flex-1 flex flex-col items-center gap-1 p-2 rounded-xl border border-dashed border-zinc-700/60 bg-zinc-800/40'
								>
									<div class='w-10 h-10 rounded-lg bg-zinc-700/30 border border-dashed border-zinc-600/50 flex items-center justify-center text-zinc-500 text-sm'>
										–
									</div>
									<span class='text-[9px] text-zinc-500'>Vide</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
