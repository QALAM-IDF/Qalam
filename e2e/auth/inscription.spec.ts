import { test, expect } from "@playwright/test";

test.describe("Page Inscription", () => {
  test("charge correctement", async ({ page }) => {
    await page.goto("/inscription");
    await expect(page).toHaveURL(/inscription/);
  });

  test("affiche le formulaire Clerk", async ({ page }) => {
    await page.goto("/inscription");
    await expect(
      page
        .locator(
          "[data-localization-key], .cl-rootBox, input[type='email']"
        )
        .first()
    ).toBeVisible({ timeout: 10000 });
  });
});
