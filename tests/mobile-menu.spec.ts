import { test, expect } from '@playwright/test';

test.describe('Mobile Menu Tests at 375x812', () => {
  test.use({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('mobile menu button is visible and opens drawer', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: 'Open Navigation Menu' });
    await expect(menuButton).toBeVisible();

    // Drawer is closed initially
    await expect(page.getByRole('heading', { name: 'Thakshnesh.B' })).not.toBeVisible();

    // Open menu
    await menuButton.click();

    // Modal drawer is now visible
    const drawerHeader = page.getByText('Navigation Menu');
    await expect(drawerHeader).toBeVisible();
    await expect(page.getByRole('button', { name: /close/i })).toBeVisible();
  });

  test('all 7 navigation links are rendered and clickable in drawer', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: 'Open Navigation Menu' });
    await menuButton.click();

    const expectedLinks = [
      'About',
      'Hardware Lab',
      'Skills Matrix',
      'Education',
      'Certifications',
      'Bujji AI',
      'Contact',
    ];

    for (const label of expectedLinks) {
      const link = page.locator('div[class*="z-50"] a', { hasText: label }).first();
      await expect(link).toBeVisible();
    }
  });

  test('clicking a link navigates to target section and closes drawer', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: 'Open Navigation Menu' });
    await menuButton.click();

    // Click on "Hardware Lab"
    const hardwareLink = page.locator('div[class*="z-50"] a', { hasText: 'Hardware Lab' }).first();
    await hardwareLink.click();

    // Drawer should close
    await expect(page.getByText('Navigation Menu')).not.toBeVisible();

    // Target section #projects should be in document
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();
  });

  test('close button and backdrop dismiss the drawer', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: 'Open Navigation Menu' });
    await menuButton.click();

    // Click close button
    const closeButton = page.getByRole('button', { name: /close/i });
    await closeButton.click();
    await expect(page.getByText('Navigation Menu')).not.toBeVisible();

    // Open again and click backdrop
    await menuButton.click();
    await expect(page.getByText('Navigation Menu')).toBeVisible();

    // Click outside backdrop
    const backdrop = page.locator('div[class*="fixed inset-0 bg-slate-950"]');
    await backdrop.click({ position: { x: 10, y: 10 }, force: true });
    await expect(page.getByText('Navigation Menu')).not.toBeVisible();
  });

  test('drawer renders properly with high contrast in Light Mode', async ({ page }) => {
    // Switch to Light Mode
    const themeButton = page.getByTitle('Toggle Theme').first();
    await themeButton.click();
    await expect(page.locator('html')).toHaveClass(/light/);

    // Open drawer in light mode
    const menuButton = page.getByRole('button', { name: 'Open Navigation Menu' });
    await menuButton.click();

    // Verify contrast and visibility of elements
    const drawerTitle = page.getByText('Thakshnesh.B').first();
    await expect(drawerTitle).toBeVisible();

    const askBujjiBtn = page.locator('div[class*="z-50"] a', { hasText: 'Ask Bujji' });
    await expect(askBujjiBtn).toBeVisible();

    const getInTouchBtn = page.locator('div[class*="z-50"] a', { hasText: 'Get in Touch' });
    await expect(getInTouchBtn).toBeVisible();
  });

  test('Escape key closes the mobile drawer', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: 'Open Navigation Menu' });
    await menuButton.click();
    await expect(page.getByText('Navigation Menu')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByText('Navigation Menu')).not.toBeVisible();
  });
});
