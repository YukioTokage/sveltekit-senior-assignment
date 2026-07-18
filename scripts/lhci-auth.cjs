module.exports = async (browser, context) => {
	if (!context.url.includes('/dashboard')) return;

	const page = await browser.newPage();
	await page.goto('http://localhost:4173/login', { waitUntil: 'networkidle0' });

	await page.type('input[name="email"]', 'admin@demo.test');
	await page.type('input[name="password"]', 'demo1234');
	await Promise.all([
		page.waitForNavigation({ waitUntil: 'networkidle0' }),
		page.click('button[type="submit"]')
	]);

	await page.close();
};
