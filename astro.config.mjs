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
					label: 'Sách',
					items: [
						// ░░ MẪU 1 SÁCH — copy nguyên block, đổi 'on-benh' + nhãn ░░
						{
							label: 'Ôn bệnh',
							collapsed: true,
							items: [
								{ label: '1 · Lý thuyết tóm tắt', items: [{ autogenerate: { directory: 'books/on-benh/tom-tat' } }] },
								{ label: '2 · Lý thuyết nguyên thủy', items: [{ autogenerate: { directory: 'books/on-benh/nguyen-thuy' } }] },
								{ label: '3 · Câu hỏi lượng giá', slug: 'books/on-benh/luong-gia' },
							],
						},
						// ░░ thêm sách mới ở đây ░░
					],
				},
				{ label: 'Cases', items: [{ autogenerate: { directory: 'cases' } }] },
				{ label: 'Updates', items: [{ autogenerate: { directory: 'updates' } }] },
				{ label: 'Topics', items: [{ autogenerate: { directory: 'topics' } }] },
			],
		}),
		AstroPWA({
			registerType: 'autoUpdate',
			workbox: {
				// cache asset build -> đọc offline sau lần đầu
				globPatterns: [
					'**/*.{html,js,css,svg,png,jpg,jpeg,webp,avif,woff,woff2,json,wasm,pf_meta}',
				],
				navigateFallback: '/medical-site/index.html',
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
