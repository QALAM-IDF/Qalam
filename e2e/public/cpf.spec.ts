import { test, expect } from "@playwright/test";

test.describe("Page CPF", () => {
  test("charge correctement", async ({ page }) => {
    await page.goto("/cpf");
    await expect(page).toHaveTitle(/CPF|Qalam/);
  });

  test("affiche les formations Arabe et Anglais", async ({ page }) => {
    await page.goto("/cpf");
    await expect(page.getByText(/arabe/i).first()).toBeVisible();
    await expect(page.getByText(/anglais/i).first()).toBeVisible();
  });

  test("bouton CPF ouvre la modale info", async ({ page }) => {
    await page.goto("/cpf");
    await page.getByRole("button", { name: /inscri.*cpf|S'inscrire avec mon CPF/i }).first().click();
    await expect(
      page.getByRole("dialog", { name: /Formation CPF/ })
    ).toBeVisible({ timeout: 8000 });
  });
});
