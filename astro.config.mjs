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
						{
							label: 'Ôn bệnh đại cương',
							items: [
								{ label: 'Lộ trình học', link: 'learning-paths/on-benh-dai-cuong/' },
								{ label: 'Lượng giá', items: [{ autogenerate: { directory: 'books/on-benh-dai-cuong/luong-gia' } }] },
							],
						},
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
						{
							label: 'Ôn bệnh đại cương',
							items: [
								{
									label: 'Tóm tắt theo chương',
									items: [
										{
											label: 'Bài 1. Đại cương Ôn bệnh',
											items: [
												{ label: 'Đại cương về Ôn bệnh', link: 'books/on-benh-dai-cuong/tom-tat/01-bai-1-dai-cuong-ve-on-benh/' },
												{ label: 'Phân biệt Ôn bệnh và Thương hàn', link: 'books/on-benh-dai-cuong/tom-tat/02-4-1-phan-biet-on-ta-va-ngoai-cam-han-ta/' },
											],
										},
										{
											label: 'Bài 2. Nguyên nhân và phát bệnh',
											items: [
												{ label: 'Nguyên nhân bệnh và phát bệnh', link: 'books/on-benh-dai-cuong/tom-tat/03-bai-2-nguyen-nhan-benh-va-phat-benh/' },
												{ label: 'Táo nhiệt, ôn nhiệt, ôn độc và tân cảm', link: 'books/on-benh-dai-cuong/tom-tat/04-2-1-5-on-nhiet-benh-ta/' },
												{ label: 'Phục tà ôn bệnh', link: 'books/on-benh-dai-cuong/tom-tat/05-2-4-2-phuc-ta-on-benh/' },
											],
										},
										{
											label: 'Bài 3. Biện chứng Ôn bệnh',
											items: [
												{ label: 'Biện chứng Ôn bệnh', link: 'books/on-benh-dai-cuong/tom-tat/06-bai-3-bien-chung-ve-on-benh/' },
												{ label: 'Vệ-khí-dinh-huyết và tam tiêu', link: 'books/on-benh-dai-cuong/tom-tat/07-2-3-moi-quan-he-giua-ve-khi-dinh-huyet-benh-chung-va-tam-tieu-benh-chung/' },
											],
										},
										{
											label: 'Bài 4. Chẩn đoán Ôn bệnh',
											items: [
												{ label: 'Chẩn đoán Ôn bệnh', link: 'books/on-benh-dai-cuong/tom-tat/08-bai-4-chan-doan-on-benh/' },
												{ label: 'Biện các chứng thường gặp', link: 'books/on-benh-dai-cuong/tom-tat/09-2-4-bien-nhung-chung-thuong-gap/' },
												{ label: 'Quyết thoát', link: 'books/on-benh-dai-cuong/tom-tat/10-2-4-6-quyet-thoat/' },
											],
										},
										{
											label: 'Bài 5. Dự phòng Ôn bệnh',
											items: [
												{ label: 'Dự phòng Ôn bệnh', link: 'books/on-benh-dai-cuong/tom-tat/11-bai-5-du-phong-on-benh/' },
											],
										},
										{
											label: 'Ngược tật',
											items: [
												{ label: 'Ngược tật', link: 'books/on-benh-dai-cuong/tom-tat/12-nguoc-tat/' },
												{ label: 'Xử trí triệu chứng và dự phòng', link: 'books/on-benh-dai-cuong/tom-tat/13-6-dieu-tri-trieu-chung/' },
											],
										},
										{
											label: 'Phong ôn',
											items: [
												{ label: 'Phong ôn', link: 'books/on-benh-dai-cuong/tom-tat/14-phong-on/' },
												{ label: 'Dương minh, tâm bào và hồi phục', link: 'books/on-benh-dai-cuong/tom-tat/15-5-4-nhiet-nhap-tam-bao/' },
												{ label: 'Dự phòng và điều hộ', link: 'books/on-benh-dai-cuong/tom-tat/16-6-du-phong-va-dieu-ho/' },
											],
										},
										{
											label: 'Thử thấp',
											items: [
												{ label: 'Thử thấp', link: 'books/on-benh-dai-cuong/tom-tat/17-thu-thap/' },
											],
										},
										{
											label: 'Xuân ôn',
											items: [
												{ label: 'Xuân ôn', link: 'books/on-benh-dai-cuong/tom-tat/18-xuan-on/' },
												{ label: 'Khí dinh huyết và tâm bào', link: 'books/on-benh-dai-cuong/tom-tat/19-5-3-1-khi-dinh-huyet-luong-phien/' },
												{ label: 'Nhiệt bế huyết thoát', link: 'books/on-benh-dai-cuong/tom-tat/20-5-7-2-nhiet-be-huyet-thoat/' },
											],
										},
									],
								},
								{ label: 'Bảng tra cứu', items: [{ autogenerate: { directory: 'topics/reference' } }] },
							],
						},
					],
				},
				{
					label: 'Hiểu sâu',
					items: [
						{
							label: 'Ôn bệnh đại cương',
							items: [
								{ label: 'Bài giảng chuyên sâu', items: [{ autogenerate: { directory: 'books/on-benh-dai-cuong/bai-giang' } }] },
								{
									label: 'Nguyên thủy theo chương',
									items: [
										{
											label: 'Bài 1. Đại cương Ôn bệnh',
											items: [
												{ label: 'Đại cương về Ôn bệnh', link: 'books/on-benh-dai-cuong/nguyen-thuy/01-bai-1-dai-cuong-ve-on-benh/' },
												{ label: 'Phân biệt Ôn bệnh và Thương hàn', link: 'books/on-benh-dai-cuong/nguyen-thuy/02-4-1-phan-biet-on-ta-va-ngoai-cam-han-ta/' },
											],
										},
										{
											label: 'Bài 2. Nguyên nhân và phát bệnh',
											items: [
												{ label: 'Nguyên nhân bệnh và phát bệnh', link: 'books/on-benh-dai-cuong/nguyen-thuy/03-bai-2-nguyen-nhan-benh-va-phat-benh/' },
												{ label: 'Táo nhiệt, ôn nhiệt, ôn độc và tân cảm', link: 'books/on-benh-dai-cuong/nguyen-thuy/04-2-1-5-on-nhiet-benh-ta/' },
												{ label: 'Phục tà ôn bệnh', link: 'books/on-benh-dai-cuong/nguyen-thuy/05-2-4-2-phuc-ta-on-benh/' },
											],
										},
										{
											label: 'Bài 3. Biện chứng Ôn bệnh',
											items: [
												{ label: 'Biện chứng Ôn bệnh', link: 'books/on-benh-dai-cuong/nguyen-thuy/06-bai-3-bien-chung-ve-on-benh/' },
												{ label: 'Vệ-khí-dinh-huyết và tam tiêu', link: 'books/on-benh-dai-cuong/nguyen-thuy/07-2-3-moi-quan-he-giua-ve-khi-dinh-huyet-benh-chung-va-tam-tieu-benh-chung/' },
											],
										},
										{
											label: 'Bài 4. Chẩn đoán Ôn bệnh',
											items: [
												{ label: 'Chẩn đoán Ôn bệnh', link: 'books/on-benh-dai-cuong/nguyen-thuy/08-bai-4-chan-doan-on-benh/' },
												{ label: 'Biện các chứng thường gặp', link: 'books/on-benh-dai-cuong/nguyen-thuy/09-2-4-bien-nhung-chung-thuong-gap/' },
												{ label: 'Quyết thoát', link: 'books/on-benh-dai-cuong/nguyen-thuy/10-2-4-6-quyet-thoat/' },
											],
										},
										{
											label: 'Bài 5. Dự phòng Ôn bệnh',
											items: [
												{ label: 'Dự phòng Ôn bệnh', link: 'books/on-benh-dai-cuong/nguyen-thuy/11-bai-5-du-phong-on-benh/' },
											],
										},
										{
											label: 'Ngược tật',
											items: [
												{ label: 'Ngược tật', link: 'books/on-benh-dai-cuong/nguyen-thuy/12-nguoc-tat/' },
												{ label: 'Xử trí triệu chứng và dự phòng', link: 'books/on-benh-dai-cuong/nguyen-thuy/13-6-dieu-tri-trieu-chung/' },
											],
										},
										{
											label: 'Phong ôn',
											items: [
												{ label: 'Phong ôn', link: 'books/on-benh-dai-cuong/nguyen-thuy/14-phong-on/' },
												{ label: 'Dương minh, tâm bào và hồi phục', link: 'books/on-benh-dai-cuong/nguyen-thuy/15-5-4-nhiet-nhap-tam-bao/' },
												{ label: 'Dự phòng và điều hộ', link: 'books/on-benh-dai-cuong/nguyen-thuy/16-6-du-phong-va-dieu-ho/' },
											],
										},
										{
											label: 'Thử thấp',
											items: [
												{ label: 'Thử thấp', link: 'books/on-benh-dai-cuong/nguyen-thuy/17-thu-thap/' },
											],
										},
										{
											label: 'Xuân ôn',
											items: [
												{ label: 'Xuân ôn', link: 'books/on-benh-dai-cuong/nguyen-thuy/18-xuan-on/' },
												{ label: 'Khí dinh huyết và tâm bào', link: 'books/on-benh-dai-cuong/nguyen-thuy/19-5-3-1-khi-dinh-huyet-luong-phien/' },
												{ label: 'Nhiệt bế huyết thoát', link: 'books/on-benh-dai-cuong/nguyen-thuy/20-5-7-2-nhiet-be-huyet-thoat/' },
											],
										},
									],
								},
								{
									label: 'Giải thích cơ chế theo chương',
									items: [
										{
											label: 'Bài 1. Đại cương Ôn bệnh',
											items: [
												{ label: 'Cơ chế nền của Ôn bệnh', link: 'topics/explanation/on-benh-dai-cuong-bai-1-dai-cuong-ve-on-benh/' },
												{ label: 'Vì sao Ôn bệnh khác Thương hàn', link: 'topics/explanation/on-benh-dai-cuong-4-1-phan-biet-on-ta-va-ngoai-cam-han-ta/' },
											],
										},
										{
											label: 'Bài 2. Nguyên nhân và phát bệnh',
											items: [
												{ label: 'Cơ chế nguyên nhân và phát bệnh', link: 'topics/explanation/on-benh-dai-cuong-bai-2-nguyen-nhan-benh-va-phat-benh/' },
												{ label: 'Cơ chế ôn nhiệt bệnh tà', link: 'topics/explanation/on-benh-dai-cuong-2-1-5-on-nhiet-benh-ta/' },
												{ label: 'Cơ chế phục tà ôn bệnh', link: 'topics/explanation/on-benh-dai-cuong-2-4-2-phuc-ta-on-benh/' },
											],
										},
										{
											label: 'Bài 3. Biện chứng Ôn bệnh',
											items: [
												{ label: 'Cơ chế biện chứng Ôn bệnh', link: 'topics/explanation/on-benh-dai-cuong-bai-3-bien-chung-ve-on-benh/' },
												{ label: 'Vệ-khí-dinh-huyết và tam tiêu', link: 'topics/explanation/on-benh-dai-cuong-2-3-moi-quan-he-giua-ve-khi-dinh-huyet-benh-chung-va-tam-tieu-benh-chung/' },
												{ label: 'Cơ chế vệ-khí-dinh-huyết', link: 'topics/explanation/demo-co-che-ve-khi-dinh-huyet/' },
											],
										},
										{
											label: 'Bài 4. Chẩn đoán Ôn bệnh',
											items: [
												{ label: 'Cơ chế chẩn đoán Ôn bệnh', link: 'topics/explanation/on-benh-dai-cuong-bai-4-chan-doan-on-benh/' },
												{ label: 'Cơ chế các chứng thường gặp', link: 'topics/explanation/on-benh-dai-cuong-2-4-bien-nhung-chung-thuong-gap/' },
												{ label: 'Cơ chế quyết thoát', link: 'topics/explanation/on-benh-dai-cuong-2-4-6-quyet-thoat/' },
											],
										},
										{
											label: 'Bài 5. Dự phòng Ôn bệnh',
											items: [
												{ label: 'Cơ chế dự phòng Ôn bệnh', link: 'topics/explanation/on-benh-dai-cuong-bai-5-du-phong-on-benh/' },
											],
										},
										{
											label: 'Ngược tật',
											items: [
												{ label: 'Cơ chế ngược tật', link: 'topics/explanation/on-benh-dai-cuong-nguoc-tat/' },
												{ label: 'Cơ chế điều trị triệu chứng', link: 'topics/explanation/on-benh-dai-cuong-6-dieu-tri-trieu-chung/' },
											],
										},
										{
											label: 'Phong ôn',
											items: [
												{ label: 'Cơ chế phong ôn', link: 'topics/explanation/on-benh-dai-cuong-phong-on/' },
												{ label: 'Cơ chế nhiệt nhập tâm bào', link: 'topics/explanation/on-benh-dai-cuong-5-4-nhiet-nhap-tam-bao/' },
												{ label: 'Cơ chế dự phòng và điều hộ', link: 'topics/explanation/on-benh-dai-cuong-6-du-phong-va-dieu-ho/' },
											],
										},
										{
											label: 'Thử thấp',
											items: [
												{ label: 'Cơ chế thử thấp', link: 'topics/explanation/on-benh-dai-cuong-thu-thap/' },
											],
										},
										{
											label: 'Xuân ôn',
											items: [
												{ label: 'Cơ chế xuân ôn', link: 'topics/explanation/on-benh-dai-cuong-xuan-on/' },
												{ label: 'Cơ chế khí dinh huyết và tâm bào', link: 'topics/explanation/on-benh-dai-cuong-5-3-1-khi-dinh-huyet-luong-phien/' },
												{ label: 'Cơ chế nhiệt bế huyết thoát', link: 'topics/explanation/on-benh-dai-cuong-5-7-2-nhiet-be-huyet-thoat/' },
											],
										},
									],
								},
							],
						},
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
