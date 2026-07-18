import { test, chromium } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test('dashboard items — Lighthouse audit', async () => {
	const browser = await chromium.launch({
		args: ['--remote-debugging-port=9222']
	});
	const page = await browser.newPage();

	await page.goto('http://localhost:4173/login');
	await page.goto('/login');
	await page.fill('input[name="email"]', 'admin@demo.test');
	await page.fill('input[name="password"]', 'demo1234');
	await page.click('button[type="submit"]');
	await page.waitForURL('/dashboard');

	await page.goto('/dashboard/items');
	await page.screenshot({ path: 'debug-before-audit.png', fullPage: true });

	await playAudit({
		page,
		thresholds: {
			performance: 95,
			accessibility: 95,
			seo: 95,
			'best-practices': 95
		},
		port: 9222
	});
});
