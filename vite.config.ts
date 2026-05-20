import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	plugins: [
		preact(),
		tailwindcss(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*.{js,css,html,png,svg,webp,woff2}'],
				globIgnores: ['**/assets/hunters/**'],
				runtimeCaching: [
					{
						urlPattern: /\/assets\//,
						handler: 'CacheFirst',
						options: {
							cacheName: 'assets-cache',
							expiration: { maxAgeSeconds: 60 * 60 * 24 * 30 },
						},
					},
					{
						urlPattern: /\.json$/,
						handler: 'StaleWhileRevalidate',
						options: { cacheName: 'data-cache' },
					},
				],
			},
			manifest: {
				name: 'SLA — Solo Leveling: ARISE Guide',
				short_name: 'SLA',
				description: 'Guide interactif pour Solo Leveling: ARISE',
				theme_color: '#000000',
				background_color: '#000000',
				display: 'standalone',
				orientation: 'portrait-primary',
				start_url: '/',
				icons: [
					{
						src: '/icons/pwa-64x64.png',
						sizes: '64x64',
						type: 'image/png',
					},
					{
						src: '/icons/pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/icons/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: '/icons/maskable-icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
				],
			},
		}),
	],
})
