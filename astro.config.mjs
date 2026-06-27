// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import AstroPWA from '@vite-pwa/astro';
import remarkObsidianCallout from 'remark-obsidian-callout';
import remarkWikilinkText from './src/plugins/remark-wikilink-text.mjs';
import starlightThemeFlexoki from 'starlight-theme-flexoki';

// https://astro.build/config
export default defineConfig({
	// GitHub Pages project site: https://<user>.github.io/medical-site/
	site: 'https://NobitaNguyenHung.github.io',
	base: '/medical-site/',
	markdown: {
		remarkPlugins: [remarkObsidianCallout, remarkWikilinkText],
	},
	integrations: [
		// mermaid PHẢI đứng trước starlight (hook vào markdown pipeline)
		mermaid({ theme: 'forest', autoTheme: true }),
		starlight({
			title: 'Học liệu Y khoa',
			defaultLocale: 'root',
			locales: { root: { label: 'Tiếng Việt', lang: 'vi' } },
			social: [],
			// Flexoki: giấy ấm, dịu mắt cho đọc lâu. accent blue = lâm sàng.
			// Theme nạp CSS trước -> medical.css (customCss) nạp cuối, KHÔNG bị đè.
			plugins: [starlightThemeFlexoki({ accentColor: 'blue' })],
			customCss: ['./src/styles/medical.css'],
			// Pagefind search = mặc định Starlight, bật sẵn
			sidebar: [
				{
					label: 'Học theo lộ trình',
					items: [
						{ label: 'Cách học theo lộ trình', link: 'learning-paths/' },
						{ label: 'Lộ trình Ôn bệnh đại cương', link: 'learning-paths/on-benh-dai-cuong/' },
						{ label: 'Ôn bệnh đại cương · Lượng giá', items: [{ autogenerate: { directory: 'books/on-benh-dai-cuong/luong-gia' } }] },
						{ label: 'Ca học từng bước', items: [{ autogenerate: { directory: 'cases' } }] },
					],
				},
				{
					label: 'Xử trí lâm sàng',
					items: [
						{ label: 'Cập nhật điều trị', items: [{ autogenerate: { directory: 'updates' } }] },
					],
				},
				{
					label: 'Tra cứu nhanh',
					items: [
						{ label: 'Ôn bệnh đại cương · Tóm tắt', items: [{ autogenerate: { directory: 'books/on-benh-dai-cuong/tom-tat' } }] },
						{ label: 'Bảng tra cứu', items: [{ autogenerate: { directory: 'topics/reference' } }] },
					],
				},
				{
					label: 'Hiểu sâu',
					items: [
						{ label: 'Ôn bệnh đại cương · Nguyên thủy', items: [{ autogenerate: { directory: 'books/on-benh-dai-cuong/nguyen-thuy' } }] },
						{ label: 'Giải thích cơ chế', items: [{ autogenerate: { directory: 'topics/explanation' } }] },
					],
				},
			],
		}),
		AstroPWA({
			registerType: 'autoUpdate',
			workbox: {
				// KHÔNG precache .html -> trang LUÔN lấy bản mới khi online (hết stale)
				globPatterns: ['**/*.{js,css,svg,png,jpg,jpeg,webp,avif,woff,woff2,wasm}'],
				cleanupOutdatedCaches: true,
				runtimeCaching: [
					{
						// điều hướng trang: ưu tiên mạng, offline mới fallback cache
						urlPattern: ({ request }) => request.mode === 'navigate',
						handler: 'NetworkFirst',
						options: { cacheName: 'pages', networkTimeoutSeconds: 4 },
					},
					{
						// asset tĩnh: dùng cache nhưng nền tự cập nhật
						urlPattern: ({ request }) =>
							['style', 'script', 'image', 'font'].includes(request.destination),
						handler: 'StaleWhileRevalidate',
						options: { cacheName: 'assets' },
					},
				],
				maximumFileSizeToCacheInBytes: 5_000_000,
			},
			manifest: {
				name: 'Học liệu Y khoa',
				short_name: 'YKhoa',
				start_url: '/medical-site/',
				scope: '/medical-site/',
				display: 'standalone',
				background_color: '#ffffff',
				theme_color: '#1f6feb',
				icons: [
					{ src: '/medical-site/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
				],
			},
		}),
	],
});
