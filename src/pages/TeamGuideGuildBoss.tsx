export function TeamGuideGuildBoss({ onBack }: { onBack: () => void }) {
	return (
		<div class='min-h-screen bg-zinc-900 text-zinc-100'>
			<header class='sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur px-6 py-4 flex items-center gap-4'>
				<button
					type='button'
					onClick={onBack}
					class='text-zinc-400 hover:text-zinc-100 transition-colors'
					aria-label='Back'
				>
					← Retour
				</button>
				<h1 class='text-lg font-bold'>
					Team Guides — <span class='text-purple-400'>Guild Boss</span>
				</h1>
			</header>

			<main class='max-w-6xl mx-auto px-4 py-12'>
				<div class='bg-zinc-800/30 border border-zinc-700/40 rounded-2xl px-8 py-20 text-center'>
					<span class='text-5xl mb-4 block select-none'>🏰</span>
					<p class='text-zinc-500 text-sm font-medium uppercase tracking-wider'>Coming Soon</p>
				</div>
			</main>
		</div>
	)
}
