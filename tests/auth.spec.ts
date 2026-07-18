import { test, expect } from '@playwright/test';

test.describe('Authentication and route protection', () => {
	test('anonymous user should be redirected to login page', async ({ page }) => {
		await page.goto('/dashboard');

		await expect(page).toHaveURL(/.*login/);
	});

	test('admin should successfully log in and see the dashboard', async ({ page }) => {
		await page.goto('/login');

		await page.fill('input[name="email"]', 'admin@demo.test');
		await page.fill('input[name="password"]', 'demo1234');
		await page.click('button[type="submit"]');

		await expect(page).toHaveURL('/dashboard');

		await expect(page.locator('h1')).toContainText('Dashboard');
	});
});
