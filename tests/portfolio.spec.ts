import { test, expect } from '@playwright/test';

test.describe('Portfolio End-to-End Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('has correct page title and metadata', async ({ page }) => {
    await expect(page).toHaveTitle(/Thakshnesh B/i);
  });

  test('renders hero section and comic illustration', async ({ page }) => {
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('Thakshnesh');

    // Comic Avatar image
    const avatar = page.locator('img[alt="Thakshnesh B - Illustrated Avatar"]');
    await expect(avatar).toBeVisible();
  });

  test('navigates through main sections via navbar', async ({ page, isMobile }) => {
    if (!isMobile) {
      // Check Desktop Dynamic Island links
      const aboutLink = page.getByRole('link', { name: 'About' }).first();
      await expect(aboutLink).toBeVisible();

      const hardwareLink = page.getByRole('link', { name: 'Hardware Lab' }).first();
      await expect(hardwareLink).toBeVisible();
      await hardwareLink.click();

      // Ensure Projects section is in view
      const projectsSection = page.locator('#projects');
      await expect(projectsSection).toBeVisible();
    } else {
      // Mobile drawer test
      const menuButton = page.getByRole('button', { name: 'Open Navigation Menu' });
      await expect(menuButton).toBeVisible();
      await menuButton.click();

      // Modal is visible
      const mobileNavModal = page.locator('text=Navigation Menu');
      await expect(mobileNavModal).toBeVisible();
    }
  });

  test('toggles theme between dark and light mode', async ({ page }) => {
    const htmlElement = page.locator('html');
    const themeButton = page.getByTitle('Toggle Theme').first();

    // Initial mode is dark
    await expect(htmlElement).toHaveClass(/dark/);

    // Click to toggle to light
    await themeButton.click();
    await expect(htmlElement).toHaveClass(/light/);

    // Click again to toggle back to dark
    await themeButton.click();
    await expect(htmlElement).toHaveClass(/dark/);
  });

  test('interacts with Bujji AI option selection portal', async ({ page }) => {
    const bujjiSection = page.locator('#chat');
    await bujjiSection.scrollIntoViewIfNeeded();

    // Check Bujji section heading
    await expect(page.locator('#chat h2')).toContainText('Bujji');

    // Click on "Solar Tracking System" option button within #chat
    const solarOptionBtn = page.locator('#chat').getByRole('button', { name: /Solar Tracking System/i });
    if (await solarOptionBtn.isVisible()) {
      await solarOptionBtn.click();
      await expect(page.locator('#chat').getByText(/Solar Tracking System/i).first()).toBeVisible();
    }
  });
});
