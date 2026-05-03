import { expect, test } from "@playwright/test";

test("home loads and exposes main landmark", async ({ page }) => {
  const res = await page.goto("/");
  expect(res?.ok()).toBeTruthy();
  await expect(page.getByRole("main")).toBeVisible();
});

test("home CTA section present after scroll", async ({ page }) => {
  await page.goto("/");
  const cta = page.locator(".section_cta");
  await cta.scrollIntoViewIfNeeded();
  await expect(cta).toBeVisible();
});

test("product page loads for first slug", async ({ page }) => {
  await page.goto("/product/bacon-burger");
  await expect(page.locator(".page-wrapper")).toBeVisible();
  await expect(page.locator(".section_product")).toBeVisible();
});

test("menu page splits testimonials lead", async ({ page }) => {
  await page.goto("/menu");
  await expect(page.locator(".menu-page-lead")).toBeVisible();
  await expect(page.locator(".main-wrapper")).toBeVisible();
});
