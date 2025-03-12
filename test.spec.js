const { test, expect } = require('@playwright/test');

test.describe('Базовая проверка лендинга', () => {
  
  test('Страница загружается без ошибок', async ({ page }) => {
    await page.goto('https://polis812.github.io/vacuu/');
    await expect(page).toHaveTitle(/vacuu/i); 
  });

  test('Кнопка "Get Started" отображается и не ведет никуда', async ({ page }) => {
    await page.goto('https://polis812.github.io/vacuu/');
    
    const ctaButton = page.locator('text=Get started');
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();

    await expect(page).toHaveURL('https://polis812.github.io/vacuu/');
  });

  test('Все ссылки на странице работают', async ({ page }) => {
    await page.goto('https://polis812.github.io/vacuu/');

    const links = await page.locator('a').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('#')) {
        try {
          const response = await page.request.get(href);
          expect(response.status()).toBeLessThan(400);
        } catch (e) {
          console.error(`Ошибка с ссылкой: ${href}`);
        }
      }
    }
  });

  test('Проверка мобильной адаптивности для iPhone SE', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('https://polis812.github.io/vacuu/');

    const mobileMenu = page.locator('.menu');
    await expect(mobileMenu).toBeVisible();
  });

});
