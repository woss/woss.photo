import { chromium } from 'playwright';

async function test() {
	const browser = await chromium.launch({ headless: true });
	const page = await browser.newPage();
	
	await page.goto('http://localhost:5173/album/bafkr4ift7ewmyiyvzz2lwnan242t6whcaebjwmyby5jy2hzozg6qh6whqe');
	
	// Wait for page to load
	await page.waitForTimeout(3000);
	
	// Count links (each photo is in an anchor)
	const linkCount = await page.$$eval('a.aspect-square', links => links.length);
	console.log(`Initial: ${linkCount} photos`);
	
	// Scroll to load more
	for (let i = 1; i <= 15; i++) {
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
		await page.waitForTimeout(3000);
		const count = await page.$$eval('a.aspect-square', links => links.length);
		console.log(`Scroll ${i}: ${count} photos`);
	}
	
	const finalCount = await page.$$eval('a.aspect-square', links => links.length);
	console.log(`\nFinal: ${finalCount} photos (expected 203)`);
	
	await browser.close();
}

test().catch(console.error);
