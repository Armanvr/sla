export function RunesSection() {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
			{/* Techniques */}
			<div className='sla-panel' style={{ padding: 20 }}>
				<div
					className='sla-label'
					style={{ marginBottom: 16, textTransform: 'uppercase', letterSpacing: 'var(--sla-ls-wider)' }}
				>
					{'// Techniques'}
				</div>
				<div className='flex gap-3'>
					{[0, 1, 2].map((i) => (
						<div
							key={i}
							className='flex-1 flex flex-col items-center gap-2 p-3 border border-dashed border-border-sla-bright bg-bg-surface'
						>
							<div className='w-12 h-12 bg-bg-container border border-dashed border-border-sla-bright flex items-center justify-center text-text-sla-muted text-lg'>
								–
							</div>
							<span className='text-label text-text-sla-muted text-center'>— Vide —</span>
						</div>
					))}
				</div>
			</div>

			{/* Bénédictions */}
			<div className='sla-panel' style={{ padding: 20 }}>
				<div
					className='sla-label'
					style={{ marginBottom: 16, textTransform: 'uppercase', letterSpacing: 'var(--sla-ls-wider)' }}
				>
					{'// Bénédictions'}
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
					<div>
						<div className='text-label text-mana-bright font-semibold uppercase tracking-widest mb-2'>
							Offensives
						</div>
						<div className='flex gap-2'>
							{[0, 1, 2, 3].map((i) => (
								<div
									key={i}
									className='flex-1 flex flex-col items-center gap-1 p-2 border border-dashed border-border-sla-bright bg-bg-surface'
								>
									<div className='w-10 h-10 bg-bg-container border border-dashed border-border-sla-bright flex items-center justify-center text-text-sla-muted text-sm'>
										–
									</div>
									<span className='text-label text-text-sla-muted'>Vide</span>
								</div>
							))}
						</div>
					</div>
					<div>
						<div className='text-label text-mana-bright font-semibold uppercase tracking-widest mb-2'>
							Défensives
						</div>
						<div className='flex gap-2'>
							{[0, 1, 2, 3].map((i) => (
								<div
									key={i}
									className='flex-1 flex flex-col items-center gap-1 p-2 border border-dashed border-border-sla-bright bg-bg-surface'
								>
									<div className='w-10 h-10 bg-bg-container border border-dashed border-border-sla-bright flex items-center justify-center text-text-sla-muted text-sm'>
										–
									</div>
									<span className='text-label text-text-sla-muted'>Vide</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
