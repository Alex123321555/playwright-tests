
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', 
  reporter: [
    ['dot'], 
    ['html', { outputFolder: 'test-results', open: 'never' }] 
  ],
  use: {

    viewport: { width: 1280, height: 720 },
    trace: 'on', 
  },
});
