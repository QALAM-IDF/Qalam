import { test, expect } from "@playwright/test";

test.describe("Pages Univers", () => {
  for (const univers of ["hommes", "femmes", "enfants"]) {
    test(`/${univers} charge correctement`, async ({ page }) => {
      await page.goto(`/${univers}`);
      await expect(page).toHaveTitle(/Qalam/);
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.waitForLoadState("networkidle");
      expect(errors).toHaveLength(0);
    });

    test(`/${univers} affiche les forfaits`, async ({ page }) => {
      await page.goto(`/${univers}`);
      await expect(page.getByText("Découverte")).toBeVisible();
      await expect(page.getByText("Essentiel")).toBeVisible();
    });
  }
});
