const { test, expect } = require('@playwright/test');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=6',
  'https://sanand0.github.io/tdsdata/js_table/?seed=7',
  'https://sanand0.github.io/tdsdata/js_table/?seed=8',
  'https://sanand0.github.io/tdsdata/js_table/?seed=9',
  'https://sanand0.github.io/tdsdata/js_table/?seed=10',
  'https://sanand0.github.io/tdsdata/js_table/?seed=11',
  'https://sanand0.github.io/tdsdata/js_table/?seed=12',
  'https://sanand0.github.io/tdsdata/js_table/?seed=13',
  'https://sanand0.github.io/tdsdata/js_table/?seed=14',
  'https://sanand0.github.io/tdsdata/js_table/?seed=15'
];

test('Scrape and sum table numbers for 23f2003721@ds.study.iitm.ac.in', async ({ page }) => {
  let totalSum = 0;

  for (const url of urls) {
    await page.goto(url);
    // Wait for dynamic tables to load
    await page.waitForSelector('table', { timeout: 10000 });
    
    // Find all table cells, extract numbers (handles decimals/commas)
    const numbers = await page.evaluate(() => {
      const cells = document.querySelectorAll('table td, table th');
      return Array.from(cells)
        .map(cell => cell.textContent.trim())
        .filter(text => {
          const num = parseFloat(text.replace(/[^\d.-]/g, ''));
          return !isNaN(num);
        })
        .map(text => parseFloat(text.replace(/[^\d.-]/g, '')));
    });
    
    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;
    console.log(`Sum for ${url}: ${pageSum.toFixed(2)}`);
  }
  
  console.log(`GRAND TOTAL SUM: ${totalSum.toFixed(2)}`);
});
