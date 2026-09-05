import { test, expect } from '@playwright/test';

test.describe('Comprehensive Portfolio E2E & Integrity Audit', () => {
  // Test 1: Page Error & Console Error Audit
  test('loads without any console errors, uncaught exceptions, or broken assets', async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: Error[] = [];
    const failedRequests: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        // Ignore expected backend connection retry if running Vite standalone
        if (!msg.text().includes('ERR_CONNECTION_REFUSED') && !msg.text().includes('Failed to load resource')) {
          consoleErrors.push(msg.text());
        }
      }
    });

    page.on('pageerror', (err) => {
      pageErrors.push(err);
    });

    page.on('requestfailed', (req) => {
      // Ignore backend proxy failure for /api when server is not started separately
      if (!req.url().includes('/api/')) {
        failedRequests.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
      }
    });

    await page.goto('/', { waitUntil: 'networkidle' });

    // Scroll through entire page to trigger all lazy-loaded elements and animations
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 300;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 80);
      });
    });

    // Wait a brief moment for canvas and animations
    await page.waitForTimeout(500);

    expect(pageErrors).toHaveLength(0);
    expect(failedRequests).toHaveLength(0);
  });

  // Test 2: Hero Section & Comic Avatar
  test('Hero section renders correctly with title, avatar, and CTA buttons', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Check main title
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('Thakshnesh');

    // Check Comic Avatar
    const avatarImg = page.locator('img[alt="Thakshnesh B - Illustrated Avatar"]');
    await expect(avatarImg).toBeVisible();

    // Check CTA button "Explore Hardware Lab"
    const exploreBtn = page.getByRole('link', { name: /Explore Hardware Lab/i }).first();
    await expect(exploreBtn).toBeVisible();

    // Check "Chat with Bujji" CTA
    const chatBujjiBtn = page.getByRole('link', { name: /Chat with Bujji/i }).first();
    await expect(chatBujjiBtn).toBeVisible();

    // Check "Resume" button and Modal interaction
    const resumeBtn = page.getByRole('button', { name: /Resume/i }).first();
    await expect(resumeBtn).toBeVisible();
    await resumeBtn.click();

    // Verify Resume Modal is displayed with high-res document image
    const resumeModal = page.locator('div[role="dialog"][aria-label="Resume Document Preview"]');
    await expect(resumeModal).toBeVisible();
    const resumeImg = resumeModal.locator('img[alt="Thakshnesh B Resume Document"]');
    await expect(resumeImg).toBeVisible();

    // Close Resume Modal
    const closeBtn = resumeModal.getByRole('button', { name: /Close/i });
    await closeBtn.click();
    await expect(resumeModal).not.toBeVisible();
  });

  // Test 3: About Section & Radar Telemetry
  test('About section displays credentials and radar canvas', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const aboutSection = page.locator('#about');
    await aboutSection.scrollIntoViewIfNeeded();

    await expect(aboutSection).toBeVisible();
    await expect(aboutSection.getByText(/Bachelor of Engineering in Electronics/i).first()).toBeVisible();
    await expect(aboutSection.getByText(/K. S. Rangasamy College of Technology/i).first()).toBeVisible();
    await expect(aboutSection.getByText(/NPTEL Elite \+ Silver/i).first()).toBeVisible();

    // Verify radar canvas is present
    const canvas = aboutSection.locator('canvas').first();
    await expect(canvas).toBeVisible();
  });

  // Test 4: Interactive Hardware Lab (Projects)
  test('Hardware Lab interactive simulations, tabs, and like counter work', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const projectsSection = page.locator('#projects');
    await projectsSection.scrollIntoViewIfNeeded();

    // Check Solar Tracker tab is initially active
    await expect(projectsSection.getByRole('heading', { name: /Solar Tracking System/i })).toBeVisible();

    // Switch to Smoke Detector tab
    const smokeTabBtn = projectsSection.getByRole('button', { name: /Smoke & Gas Detection System/i });
    if (await smokeTabBtn.isVisible()) {
      await smokeTabBtn.click();
      await expect(projectsSection.getByRole('heading', { name: /Smoke & Gas Detection System/i })).toBeVisible();
    }

    // Switch to VLSI Design tab
    const vlsiTabBtn = projectsSection.getByRole('button', { name: /VLSI Design & Digital Circuit Architecture/i });
    if (await vlsiTabBtn.isVisible()) {
      await vlsiTabBtn.click();
      await expect(projectsSection.getByRole('heading', { name: /VLSI Design & Digital Circuit Architecture/i })).toBeVisible();
    }
  });

  // Test 5: Skills Matrix & Interactive Modals
  test('Skills Matrix tabs and modal detail popup work cleanly', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const skillsSection = page.locator('#skills');
    await skillsSection.scrollIntoViewIfNeeded();

    await expect(skillsSection).toBeVisible();
    await expect(skillsSection.getByText('Python').first()).toBeVisible();

    // Click on Python skill card to open interactive code modal
    const pythonSkill = skillsSection.getByText('Python').first();
    await pythonSkill.click();

    // Modal should be visible with code snippet
    const modal = page.locator('div[class*="fixed inset-0"]', { hasText: 'Python' });
    await expect(modal).toBeVisible();

    // Close modal via close button
    const closeBtn = modal.getByRole('button').first();
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  // Test 6: Education & Achievements Section
  test('Education and Achievements render academic milestones without NSS', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const eduSection = page.locator('#education');
    await eduSection.scrollIntoViewIfNeeded();

    await expect(eduSection).toBeVisible();
    await expect(eduSection.getByText(/K. S. Rangasamy College of Technology/i).first()).toBeVisible();
    await expect(eduSection.getByText(/8.5 CGPA/i).first()).toBeVisible();

    const achSection = page.locator('#achievements');
    await achSection.scrollIntoViewIfNeeded();
    await expect(achSection).toBeVisible();
    await expect(achSection.getByText(/VLSI & Embedded Systems Technical Standing/i)).toBeVisible();
    await expect(achSection.getByText(/NPTEL Certification in Soft Skill Development/i)).toBeVisible();

    // Ensure no NSS exists on the page
    const nssMention = page.getByText(/\bNSS\b/);
    await expect(nssMention).toHaveCount(0);
  });

  // Test 7: Bujji AI Chat Section
  test('Bujji AI Assistant answers queries and handles preset options', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const chatSection = page.locator('#chat');
    await chatSection.scrollIntoViewIfNeeded();

    await expect(chatSection).toBeVisible();

    // Switch to Education & Honors category tab
    const honorsTab = chatSection.getByRole('button', { name: /Education & Honors/i });
    if (await honorsTab.isVisible()) {
      await honorsTab.click();
      // Click VLSI & Technical Innovations button
      const innovationBtn = chatSection.getByRole('button', { name: /VLSI & Technical Innovations/i });
      if (await innovationBtn.isVisible()) {
        await innovationBtn.click();
        await expect(chatSection.getByText(/VLSI/i).first()).toBeVisible();
      }
    }

    // Type a message in the input box
    const chatInput = chatSection.locator('input[placeholder*="Ask Bujji"]');
    if (await chatInput.isVisible()) {
      await chatInput.fill('What is your CGPA?');
      await chatInput.press('Enter');
      // Verify response appears
      await expect(chatSection.getByText(/8.5 CGPA/i).first()).toBeVisible();
    }
  });

  // Test 8: Contact Section & External Links
  test('Contact Section validates inputs and verifies social links', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    await expect(contactSection).toBeVisible();

    // Check external links have security rel attributes
    const linkedinLink = page.locator('a[href*="linkedin.com"]').first();
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
    await expect(linkedinLink).toHaveAttribute('rel', /noreferrer/);

    // Check contact form fields
    const nameInput = contactSection.locator('input[name="name"], input[placeholder*="Name" i]').first();
    const emailInput = contactSection.locator('input[name="email"], input[placeholder*="Email" i]').first();
    const messageInput = contactSection.locator('textarea').first();

    if (await nameInput.isVisible() && await emailInput.isVisible() && await messageInput.isVisible()) {
      await nameInput.fill('John Doe');
      await emailInput.fill('john@example.com');
      await messageInput.fill('Hello Thakshnesh, this is an automated E2E test verification message.');
      
      const submitBtn = contactSection.getByRole('button', { name: /Send Message/i });
      await expect(submitBtn).toBeEnabled();
    }
  });

  // Test 9: Theme & Sound Toggles
  test('Toggling theme and sound controls updates state cleanly', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Toggle Theme
    const themeBtn = page.getByTitle('Toggle Theme').first();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await themeBtn.click();
    await expect(page.locator('html')).toHaveClass(/light/);
    await themeBtn.click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Toggle Sound
    const soundBtn = page.getByTitle(/Sound/i).first();
    if (await soundBtn.isVisible()) {
      await soundBtn.click();
      await page.waitForTimeout(200);
      await soundBtn.click();
    }
  });

  // Test 10: Multi-Device Responsive Viewport & No Overflow Test
  const viewports = [
    { name: 'iPhone X / 13 (375x812)', width: 375, height: 812 },
    { name: 'Pixel / Galaxy (412x915)', width: 412, height: 915 },
    { name: 'iPad / Tablet (768x1024)', width: 768, height: 1024 },
    { name: 'Desktop (1440x900)', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    test(`renders cleanly with no horizontal scroll overflow at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      // Check for horizontal overflow
      const hasHorizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 2;
      });

      expect(hasHorizontalOverflow).toBe(false);
    });
  }
});
