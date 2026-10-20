import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const errors = [];
const badResponses = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("response", (r) => {
  if (r.status() >= 400) badResponses.push(`${r.status()} ${r.url()}`);
});
await mkdir("artifacts", { recursive: true });
try {
  const response = await page.goto("http://127.0.0.1:5173/");
  assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "artifacts/home-desktop.png", fullPage: true });
  assert.equal(await page.locator("h1").count(), 1);
  await page.getByRole("link", { name: "Vreau un atestat" }).click();
  await expect(page.locator(".course-card")).toHaveCount(16);
  await page.getByRole("searchbox").fill("marfa");
  await expect(page.locator(".course-card")).toHaveCount(3);
  await page.getByRole("searchbox").fill("");
  await page.getByRole("button", { name: "Management", exact: true }).click();
  await expect(page.locator(".course-card")).toHaveCount(2);
  await page.getByRole("searchbox").fill("not-a-course");
  await expect(page.locator(".course-card")).toHaveCount(0);
  await page.getByRole("button", { name: "Resetează filtrele" }).click();
  await expect(page.locator(".course-card")).toHaveCount(16);
  await page.screenshot({
    path: "artifacts/courses-desktop.png",
    fullPage: true,
  });
  for (let i = 1; i <= 16; i++) {
    await page.goto(`http://127.0.0.1:5173/atestate-profesionale/${i}`);
    await expect(page.locator(".document-content")).toHaveCount(1);
    const doc = await page.request.get(
      `http://127.0.0.1:5173/documents/${i}.docx`,
    );
    assert.equal(doc.status(), 200);
    assert.equal((await doc.body()).subarray(0, 2).toString(), "PK");
  }
  await page.goto("http://127.0.0.1:5173/contact?interes=ADR");
  await page.getByLabel("Numele tău").fill("Test utilizator");
  await page.getByLabel("Mesajul tău").fill("Doresc informații despre curs.");
  await page.getByRole("button", { name: "Pregătește mesajul" }).click();
  const href = await page
    .getByRole("link", { name: "Deschide WhatsApp" })
    .getAttribute("href");
  assert.ok(decodeURIComponent(href).includes("Test utilizator"));
  assert.ok(decodeURIComponent(href).includes("ADR"));
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    "/",
    "/scoala-de-soferi",
    "/atestate-profesionale",
    "/atestate-profesionale/3",
    "/consultanta",
    "/contact",
    "/despre-noi",
    "/confidentialitate",
    "/pagina-inexistenta",
  ]) {
    await page.goto("http://127.0.0.1:5173" + route);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `Mobile overflow on ${route}`,
    );
  }
  await page.goto("http://127.0.0.1:5173/");
  await page.screenshot({ path: "artifacts/home-mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Deschide meniul" }).click();
  await page
    .locator("#mobile-nav")
    .getByRole("link", { name: "Consultanță" })
    .click();
  await expect(page).toHaveURL(/\/consultanta$/);
  await expect(page.locator("#mobile-nav")).toHaveCount(0);
  await page.goto("http://127.0.0.1:5173/scoala-de-soferi");
  const tip = page.locator(".driving-tips details").nth(1);
  await tip.locator("summary").click();
  assert.ok((await tip.getAttribute("open")) !== null);
  assert.deepEqual(errors, []);
  assert.deepEqual(badResponses, []);
  console.log(
    "PASS: all routes, 16 documents, search, filters, empty state, WhatsApp message, mobile navigation, accordions, no mobile overflow, no browser errors or missing assets.",
  );
} finally {
  await browser.close();
}
