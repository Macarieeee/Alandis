import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
const english: Record<string, string> = JSON.parse(readFileSync(new URL("../src/locales/en.json", import.meta.url), "utf8"));
const documents: { id: number; paragraphs: string[] }[] = JSON.parse(readFileSync(new URL("../src/data/documents.json", import.meta.url), "utf8"));

test("switching language persists across navigation and reload", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ro");
  await page.getByRole("button", { name: "English", exact: true }).click();
  await expect(page.locator("h1")).toHaveText("Driveyour own future");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle("Home — Permis Atestat");
  await page.locator(".desktop-nav").getByRole("link", { name: "About us" }).click();
  await expect(page.locator("h1")).toHaveText("Learning to move forward. Together.");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("button", { name: "Română", exact: true }).click();
  await expect(page.locator("h1")).toHaveText("Învățăm să mergem înainte. Împreună.");
  await expect(page).toHaveTitle("Despre noi — Permis Atestat");
});

test("all routes and course paragraphs render in English, with English downloads", async ({ page, request }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("button", { name: "English", exact: true }).click();
  for (const route of ["/", "/despre-noi", "/scoala-de-soferi", "/consultanta", "/atestate-profesionale", "/contact", "/confidentialitate", "/termeni-si-conditii", "/missing", ...documents.map(doc => `/atestate-profesionale/${doc.id}`)]) {
    await page.goto(`/#${route}`);
    await expect(page.locator("h1")).toBeVisible();
    const text = await page.locator("body").innerText();
    // Proper nouns in the postal address are intentionally retained.
    expect(text.replaceAll("Piața Valter Mărăcineanu", "Address")).not.toMatch(/[ăâîșțĂÂÎȘȚ]/);
  }
  const dictionary = english as Record<string, string>;
  for (const doc of documents) {
    await page.goto(`/#/atestate-profesionale/${doc.id}`);
    const expected = doc.paragraphs.map(p => dictionary[p.replace(/\s+/g, " ").trim()]);
    expect(expected.every(Boolean)).toBeTruthy();
    await expect(page.locator(".document-content > h2, .document-content > p")).toHaveText(expected);
    const link = page.getByRole("link", { name: "Download the DOCX guide" });
    await expect(link).toHaveAttribute("href", `/documents/en/${doc.id}.docx`);
    const download = await request.get(`/documents/en/${doc.id}.docx`);
    expect(download.ok()).toBeTruthy();
    expect((await download.body()).subarray(0, 2).toString()).toBe("PK");
  }
  expect(errors).toEqual([]);
});

test("English search and category filters work with stable Romanian URL values", async ({ page }) => {
  await page.goto("/#/atestate-profesionale");
  await page.getByRole("button", { name: "English", exact: true }).click();
  await page.getByRole("searchbox").fill("freight");
  await expect(page.locator(".course-card")).toHaveCount(4);
  await page.getByRole("button", { name: "Freight transport", exact: true }).click();
  await expect(page.locator(".course-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Română", exact: true }).click();
  await page.getByRole("searchbox").fill("marfă");
  await expect(page.locator(".course-card")).toHaveCount(2);
  await expect(page.getByRole("button", { name: "Transport marfă", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("searchbox").fill("zzzzzzzz");
  await page.getByRole("button", { name: "English", exact: true }).click();
  await expect(page.getByText("No certificates matched your search.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".course-card")).toHaveCount(18);
});

test("form values survive language changes and success and errors are translated", async ({ page }) => {
  await page.goto("/#/contact?interes=Conduc%C4%83tor%20auto%20taxi");
  await page.locator('[name="name"]').fill("Test User");
  await page.locator('[name="phone"]').fill("0712345678");
  await page.locator('[name="message"]').fill("Test message");
  await page.getByRole("button", { name: "English", exact: true }).click();
  await expect(page.locator('[name="name"]')).toHaveValue("Test User");
  await expect(page.locator('[name="phone"]')).toHaveValue("0712345678");
  await expect(page.locator('[name="message"]')).toHaveValue("Test message");
  await expect(page.locator('select option:checked')).toHaveText("Taxi driver");
  await page.route("**/api/contact.php", route => route.fulfill({ status: 429, json: { ok: false } }));
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByRole("alert")).toHaveText("You have sent several requests in a short period. Please try again later or call us.");
  await page.getByRole("button", { name: "Română", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("Ai trimis mai multe solicitări");
  await page.getByRole("button", { name: "English", exact: true }).click();
  await page.unroute("**/api/contact.php");
  await page.route("**/api/contact.php", route => route.fulfill({ status: 200, json: { ok: true } }));
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByRole("status")).toContainText("Your enquiry has been sent.");
});

test("selector is usable on mobile without overlapping WhatsApp", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "English", exact: true }).click();
  for (const width of [1440, 1280, 1024, 768, 375, 320]) {
    await page.setViewportSize({ width, height: 812 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({ path: "artifacts/language-desktop.png" });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await expect(page.locator("#mobile-nav").getByRole("link", { name: "Professional certificates" })).toBeVisible();
  await page.keyboard.press("Escape");
  const selector = await page.locator(".language-switcher").boundingBox();
  const whatsapp = await page.locator(".whatsapp-float").boundingBox();
  expect(selector!.x + selector!.width).toBeLessThan(whatsapp!.x);
  expect(selector!.x + selector!.width).toBeLessThanOrEqual(375);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  await page.screenshot({ path: "artifacts/language-mobile.png" });
});

test("switching still works when local storage is blocked", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage blocked"); } });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "English", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toHaveText("Driveyour own future");
});
