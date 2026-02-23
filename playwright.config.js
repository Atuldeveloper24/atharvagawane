// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './',
    testMatch: 'scrape.test.js',
    timeout: 120000,
    use: {
        headless: true,
    },
    reporter: 'list',
});
