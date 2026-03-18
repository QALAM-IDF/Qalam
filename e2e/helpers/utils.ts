import type { Page } from "@playwright/test";

export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState("networkidle");
}

export async function checkNoErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  return errors;
}

export const SITE_URL =
  process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
