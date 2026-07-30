import { expect, test } from "@playwright/test";

test("home about carousel plays only while the section is visible", async ({ page }) => {
  await page.goto("/");

  const section = page.locator(".section_home-about");
  await section.scrollIntoViewIfNeeded();
  await expect(section).toBeVisible();

  const activeVideo = page.locator('video[aria-label="Birdside reel showing a stacked chicken sandwich."]');
  await expect(activeVideo).toBeVisible();

  await expect
    .poll(
      () =>
        activeVideo.evaluate((video: HTMLVideoElement) => ({
          paused: video.paused,
          readyState: video.readyState
        })),
      { timeout: 10_000 }
    )
    .toMatchObject({ paused: false });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await expect
    .poll(
      () =>
        activeVideo.evaluate((video: HTMLVideoElement) => ({
          muted: video.muted,
          paused: video.paused
        })),
      { timeout: 5_000 }
    )
    .toEqual({ muted: true, paused: true });
});

test("home about carousel keeps side cards visible after previous click", async ({ page }) => {
  await page.goto("/");

  const section = page.locator(".section_home-about");
  await section.scrollIntoViewIfNeeded();
  await expect(section).toBeVisible();

  await page.getByRole("button", { name: "Previous slide" }).click();

  const visibleVideoCards = page.locator(".section_home-about video");
  await expect
    .poll(
      () =>
        visibleVideoCards.evaluateAll((videos) =>
          videos
            .filter((video) => {
              const rect = video.getBoundingClientRect();
              return rect.right > 0 && rect.left < window.innerWidth;
            })
            .every((video) => Boolean(video.getAttribute("poster")))
        ),
      { timeout: 5_000 }
    )
    .toBe(true);
});
