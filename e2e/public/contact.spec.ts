import { test, expect } from "@playwright/test";

test.describe("Page Contact", () => {
  test("charge correctement", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact|Qalam/);
  });

  test("formulaire visible", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByLabel(/nom/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
  });

  test("validation — champs vides affiche erreur", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /envoyer/i }).click();
    await expect(
      page.getByText("Veuillez remplir tous les champs obligatoires")
    ).toBeVisible({ timeout: 5000 });
  });

  test("email invalide affiche erreur", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel(/nom/i).fill("Test");
    await page.getByLabel(/email/i).fill("pas-un-email");
    await page.getByLabel(/message/i).fill("Message de test");
    await page.getByRole("button", { name: /envoyer/i }).click();
    // L'erreur Zod côté API ou validation côté client doit s'afficher
    await page.waitForTimeout(1500);
    const alert = page.getByRole("alert");
    const hasError =
      (await alert.isVisible()) ||
      (await page.getByText(/obligatoire|invalide|remplir/i).isVisible());
    expect(hasError).toBeTruthy();
  });
});
