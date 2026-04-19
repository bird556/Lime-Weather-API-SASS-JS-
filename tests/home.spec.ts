import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads and displays weather data for default city', async ({ page }) => {
    await page.goto('/');

    // Skeleton shows while loading — non-blocking since a fast API response can make it disappear before assertion
    await page.locator('.skeleton').first().waitFor({ state: 'visible', timeout: 2000 }).catch(() => {});

    // Weather hero renders once data loads (wait up to 10s for API)
    await expect(page.getByText(/toronto/i).first()).toBeVisible({ timeout: 10_000 });
  });

  test('shows temperature, condition, and stat cards', async ({ page }) => {
    await page.goto('/');

    // Wait for weather data
    await expect(page.getByText(/toronto/i).first()).toBeVisible({ timeout: 10_000 });

    // Main temperature — the large hero temp (first °-suffixed number)
    await expect(page.locator('text=/\\d+°/').first()).toBeVisible();

    // Stat labels from WeatherDetails
    await expect(page.getByText('Humidity').first()).toBeVisible();
    await expect(page.getByText('Wind').first()).toBeVisible();
    await expect(page.getByText('Feels Like').first()).toBeVisible();
    await expect(page.getByText('Cloud').first()).toBeVisible();
  });

  test('header shows brand on desktop', async ({ page, viewport }) => {
    await page.goto('/');

    // Brand text appears in header (use exact match to avoid footer duplicate)
    await expect(page.locator('header').getByText('Lime Weather')).toBeVisible();

    // Nav links only render on md+ screens (hidden on mobile)
    if (viewport && viewport.width >= 768) {
      await expect(page.locator('header').getByRole('link', { name: 'About' })).toBeVisible();
      await expect(page.locator('header').getByRole('link', { name: 'Privacy' })).toBeVisible();
      await expect(page.locator('header').getByRole('link', { name: 'Terms' })).toBeVisible();
    }
  });

  test('footer shows nav links and attribution', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/Powered by WeatherAPI/)).toBeVisible();
    await expect(page.getByText(/Lime Weather. Forecasts you can feel/)).toBeVisible();
  });
});
