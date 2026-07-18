import { test, expect } from '@playwright/test';
import { gzipSync } from 'node:zlib';

type RouteBudget = { path: string; name: string; limitKB: number };

const routes: RouteBudget[] = [
	// public surface — 80 KB
	{ path: '/', name: 'home', limitKB: 80 },
	{ path: '/search', name: 'search', limitKB: 80 },
	{ path: '/blog', name: 'blog-index', limitKB: 80 },
	{ path: '/blog/example-post-slug', name: 'blog-post', limitKB: 80 },
	{ path: '/login', name: 'login', limitKB: 80 },

	// dashboard — 150 KB
	{ path: '/dashboard', name: 'dashboard-home', limitKB: 150 },
	{ path: '/dashboard/items', name: 'dashboard-items', limitKB: 150 }
];

for (const { path, name, limitKB } of routes) {
	test(`JS budget — ${name} (${path})`, async ({ page }) => {
		const seen = new Map<string, number>();
		let origin = '';

		page.on('response', async (response) => {
			const req = response.request();
			if (req.resourceType() !== 'script') return;

			const url = response.url();
			if (origin && new URL(url).origin !== origin) return;
			if (seen.has(url)) return;

			try {
				const body = await response.body();
				seen.set(url, gzipSync(body).length);
			} catch {
				// cross-origin/opaque/canceled request — ignore
			}
		});

		const response = await page.goto(path, { waitUntil: 'networkidle' });
		origin = new URL(response!.url()).origin;

		const totalBytes = [...seen.values()].reduce((sum, n) => sum + n, 0);
		const totalKB = totalBytes / 1024;

		console.log(
			`\n${name} (${path}): ${totalKB.toFixed(1)} KB gzip / ${limitKB} KB limit\n` +
				[...seen.entries()]
					.sort((a, b) => b[1] - a[1])
					.map(([u, b]) => `  ${(b / 1024).toFixed(1).padStart(6)} KB  ${new URL(u).pathname}`)
					.join('\n')
		);

		expect(
			totalBytes,
			`JS на ${path} перевищує бюджет ${limitKB} KB gzip (факт: ${totalKB.toFixed(1)} KB)`
		).toBeLessThanOrEqual(limitKB * 1024);
	});
}
