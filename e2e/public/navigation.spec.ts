import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("NavBar visible sur toutes les pages publiques", async ({ page }) => {
    const pages = [
      "/",
      "/hommes",
      "/femmes",
      "/enfants",
      "/tarifs",
      "/cpf",
      "/contact",
      "/a-propos",
    ];
    for (const path of pages) {
      await page.goto(path);
      await expect(page.locator("header, nav").first()).toBeVisible();
    }
  });

  test("NavBar mobile — menu hamburger", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const hamburger = page.getByRole("button", {
      name: /menu|navigation|ouvrir|fermer/i,
    });
    await expect(hamburger).toBeVisible();
    await hamburger.click();
    await expect(
      page.getByRole("navigation", { name: /principale/i })
    ).toBeVisible();
  });

  test("Footer visible sur les pages publiques", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer")).toBeVisible();
  });

  test("lien Contact dans NavBar", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('header a[href="/contact"]').first()).toBeVisible();
    await page.goto("/contact");
    await expect(page).toHaveURL(/contact/);
  });

  test("lien À propos dans NavBar", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('header a[href="/a-propos"]').first()).toBeVisible();
    await page.goto("/a-propos");
    await expect(page).toHaveURL(/a-propos/);
  });

  test("lien Blog dans NavBar", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('header a[href="/blog"]').first()).toBeVisible();
    await page.goto("/blog");
    await expect(page).toHaveURL(/blog/);
  });

  test("lien CPF dans NavBar", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('header a[href="/cpf"]').first()).toBeVisible();
    await page.goto("/cpf");
    await expect(page).toHaveURL(/cpf/);
  });
});
