import { chromium } from 'playwright';

async function test() {
	const browser = await chromium.launch({ headless: true });
	const page = await browser.newPage();
	
	page.on('console', msg => console.log(`Console: ${msg.type()}: ${msg.text()}`));
	page.on('pageerror', error => console.log(`Page error: ${error}`));
	
	// Go to first file
	await page.goto('http://localhost:5173/file/U-wk4UOPSMWQ3beM4-DC4w-7?from=bafkr4ift7ewmyiyvzz2lwnan242t6whcaebjwmyby5jy2hzozg6qh6whqe');
	await page.waitForTimeout(2000);
	
	const title1 = await page.$eval('h1', el => el.textContent);
	console.log(`Initial: ${title1}`);
	
	// Click next arrow
	const nextBtn = await page.$('text=Next');
	if (nextBtn) {
		console.log('Clicking next...');
		await nextBtn.click();
		await page.waitForTimeout(2000);
		
		const title2 = await page.$eval('h1', el => el.textContent);
		console.log(`After click: ${title2}`);
		
		const url = page.url();
		console.log(`URL: ${url}`);
	}
	
	await browser.close();
}

test().catch(console.error);
