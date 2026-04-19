import { test, expect } from '@playwright/test';

test.describe('Static pages', () => {
  test('About page renders with key content', async ({ page }) => {
    await page.goto('/about');

    await expect(page.getByRole('heading', { name: /about lime weather/i })).toBeVisible();
    await expect(page.getByText(/why i built this/i)).toBeVisible();
    await expect(page.getByText(/tech stack/i).first()).toBeVisible();
    // Check Playwright is mentioned (first occurrence is enough)
    await expect(page.getByText('Playwright').first()).toBeVisible();
  });

  test('Privacy page renders', async ({ page }) => {
    await page.goto('/privacy');

    await expect(page.getByRole('heading', { name: /privacy policy/i })).toBeVisible();
    await expect(page.getByText(/what we collect/i)).toBeVisible();
  });

  test('Terms page renders', async ({ page }) => {
    await page.goto('/terms');

    await expect(page.getByRole('heading', { name: /terms of use/i })).toBeVisible();
    await expect(page.getByText(/acceptance of terms/i)).toBeVisible();
  });

  test('brand logo links back to home from About', async ({ page }) => {
    await page.goto('/about');
    await page.getByRole('link', { name: /lime weather/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('nav links work from static pages', async ({ page }) => {
    await page.goto('/about');

    await page.getByRole('link', { name: 'Privacy' }).first().click();
    await expect(page).toHaveURL('/privacy');

    await page.getByRole('link', { name: 'Terms' }).first().click();
    await expect(page).toHaveURL('/terms');

    await page.getByRole('link', { name: 'About' }).first().click();
    await expect(page).toHaveURL('/about');
  });

  test('home page nav links navigate to static pages', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'About' }).first().click();
    await expect(page).toHaveURL('/about');
  });
});
