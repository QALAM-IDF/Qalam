import { test, expect } from "@playwright/test";

test.describe("Page d'accueil", () => {
  test("charge correctement", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Qalam/);
    await expect(
      page.locator("h1, [class*='hero'], main").first()
    ).toBeVisible({ timeout: 10000 });
  });

  test("affiche le logo Qalam", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("svg, img[alt*='Qalam']").first()).toBeVisible();
  });

  test("affiche les 3 portails", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Hommes").first()).toBeVisible();
    await expect(page.getByText("Femmes").first()).toBeVisible();
    await expect(page.getByText("Enfants").first()).toBeVisible();
  });

  test("le lien Hommes mène à /hommes", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('main a[href="/hommes"]').first()).toBeVisible();
    await page.goto("/hommes");
    await expect(page).toHaveURL(/hommes/);
    await expect(page).toHaveTitle(/Qalam/);
  });

  test("le lien Femmes mène à /femmes", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('main a[href="/femmes"]').first()).toBeVisible();
    await page.goto("/femmes");
    await expect(page).toHaveURL(/femmes/);
    await expect(page).toHaveTitle(/Qalam/);
  });

  test("le lien Enfants mène à /enfants", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('main a[href="/enfants"]').first()).toBeVisible();
    await page.goto("/enfants");
    await expect(page).toHaveURL(/enfants/);
    await expect(page).toHaveTitle(/Qalam/);
  });

  test("lien Tarifs fonctionne", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('header a[href="/tarifs"]').first()).toBeVisible();
    await page.goto("/tarifs");
    await expect(page).toHaveURL(/tarifs/);
    await expect(page).toHaveTitle(/Tarif|Qalam/);
  });

  test("pas d'erreur console critique", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });

  test("skip link présent et focusable", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skipLink = page.getByText("Aller au contenu principal");
    await expect(skipLink).toBeFocused();
  });
});
