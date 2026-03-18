import { test, expect } from "@playwright/test";

test.describe("Page Connexion", () => {
  test("charge correctement", async ({ page }) => {
    await page.goto("/connexion");
    await expect(page).toHaveURL(/connexion/);
  });

  test("affiche le formulaire Clerk", async ({ page }) => {
    await page.goto("/connexion");
    await expect(
      page
        .locator(
          "[data-localization-key], .cl-rootBox, input[type='email']"
        )
        .first()
    ).toBeVisible({ timeout: 10000 });
  });

  test("/espace-membre redirige vers connexion si non connecté", async ({
    page,
  }) => {
    await page.goto("/espace-membre");
    await expect(page).toHaveURL(/connexion|auth-redirect/);
  });

  test("/admin redirige vers connexion si non connecté", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/connexion/);
  });

  test("/professeur redirige vers connexion si non connecté", async ({
    page,
  }) => {
    await page.goto("/professeur");
    await expect(page).toHaveURL(/connexion/);
  });
});
