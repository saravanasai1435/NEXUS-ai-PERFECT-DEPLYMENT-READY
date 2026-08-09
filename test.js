import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('response', response => {
    if (!response.ok()) {
      console.log('RESPONSE NOT OK:', response.status(), response.url());
    }
  });
  await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
