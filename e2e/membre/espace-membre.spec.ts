import { test, expect } from "@playwright/test";

test.describe("Espace membre", () => {
  test("redirige vers connexion si non authentifié", async ({ page }) => {
    await page.goto("/espace-membre");
    await expect(page).toHaveURL(/connexion|auth-redirect/);
  });

  test("choisir-forfait ou redirection connexion si protégé", async ({
    page,
  }) => {
    await page.goto("/choisir-forfait");
    const url = page.url();
    const onChoix = url.includes("choisir-forfait");
    const onConnexion = url.includes("connexion");
    expect(onChoix || onConnexion).toBeTruthy();
    if (onChoix) {
      await expect(
        page.getByText(/Découverte|Essentiel|Intensif|forfait/i).first()
      ).toBeVisible({ timeout: 5000 });
    }
  });
});
