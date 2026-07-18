import { test } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test('dashboard items — Lighthouse audit', async ({ page }) => {
	await page.goto('/login');
	await page.fill('input[name="email"]', 'admin@demo.test');
	await page.fill('input[name="password"]', 'demo1234');
	await page.click('button[type="submit"]');
	await page.waitForURL('/dashboard');

	await page.goto('/dashboard/items');

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
