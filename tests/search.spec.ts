import { test, expect } from '@playwright/test';

test.describe('Search panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for initial weather load before interacting
    await expect(page.getByText(/toronto/i).first()).toBeVisible({ timeout: 10_000 });
  });

  test('opens when search button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: /open city search/i }).click();
    await expect(page.getByPlaceholder(/enter city name/i)).toBeVisible();
  });

  test('closes when Escape is pressed', async ({ page }) => {
    await page.getByRole('button', { name: /open city search/i }).click();
    await expect(page.getByPlaceholder(/enter city name/i)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByPlaceholder(/enter city name/i)).not.toBeVisible();
  });

  test('closes when backdrop is clicked', async ({ page }) => {
    await page.getByRole('button', { name: /open city search/i }).click();
    await expect(page.getByPlaceholder(/enter city name/i)).toBeVisible();

    // Click the overlay (left side, outside the panel)
    await page.mouse.click(100, 300);
    await expect(page.getByPlaceholder(/enter city name/i)).not.toBeVisible();
  });

  test('searching a city updates the weather display', async ({ page }) => {
    await page.getByRole('button', { name: /open city search/i }).click();

    const input = page.getByPlaceholder(/enter city name/i);
    await input.fill('London');
    await input.press('Enter');

    // Panel closes and new city appears in hero
    await expect(page.locator('header ~ div').getByText(/london/i).first()).toBeVisible({ timeout: 10_000 });
  });

  test('quick city buttons trigger a weather load', async ({ page }) => {
    await page.getByRole('button', { name: /open city search/i }).click();

    // Click Tokyo in quick cities list
    await page.getByRole('button', { name: 'Tokyo' }).click();

    // Weather hero should show Tokyo (use location text, not quick city button)
    await expect(page.locator('header ~ div').getByText(/tokyo/i).first()).toBeVisible({ timeout: 10_000 });
  });

  test('shows error for an invalid city', async ({ page }) => {
    await page.getByRole('button', { name: /open city search/i }).click();

    const input = page.getByPlaceholder(/enter city name/i);
    await input.fill('xyznotacity12345');
    await input.press('Enter');

    await expect(page.getByText(/couldn't find/i)).toBeVisible({ timeout: 8_000 });
  });
});
