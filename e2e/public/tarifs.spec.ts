import { test, expect } from "@playwright/test";

test.describe("Page Tarifs", () => {
  test("charge correctement", async ({ page }) => {
    await page.goto("/tarifs");
    await expect(page).toHaveTitle(/Tarif|Qalam/);
  });

  test("affiche les 3 forfaits", async ({ page }) => {
    await page.goto("/tarifs");
    await expect(page.getByRole("heading", { name: "Découverte" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Essentiel" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Intensif" })).toBeVisible();
  });

  test("affiche les prix", async ({ page }) => {
    await page.goto("/tarifs");
    await expect(page.getByText("120")).toBeVisible();
    await expect(page.getByText("299")).toBeVisible();
    await expect(page.getByText("490")).toBeVisible();
  });

  test("bouton \"Je m'inscris\" ouvre le modal", async ({ page }) => {
    await page.goto("/tarifs");
    await page.getByRole("button", { name: /inscri/i }).first().click();
    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 5000 });
  });

  test("modal se ferme au clic X", async ({ page }) => {
    await page.goto("/tarifs");
    await page.getByRole("button", { name: /inscri/i }).first().click();
    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 5000 });
    await page.getByRole("button", { name: /fermer/i }).first().click();
    await expect(page.getByRole("dialog")).not.toBeVisible({ timeout: 3000 });
  });
});
