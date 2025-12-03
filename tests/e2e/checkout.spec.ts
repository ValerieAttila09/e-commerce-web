import { test, expect } from '@playwright/test';

test('checkout UI shows processing toast', async ({ page }) => {
  // Seed cart in localStorage so /cart has an item
  await page.addInitScript(() => {
    localStorage.setItem(
      'cart-storage',
      JSON.stringify({ state: { items: [{ id: 'e2e-1', productId: 1, name: 'E2E Product', price: 9.99, quantity: 1, image: 'placeholder.jpg' }] } })
    );
  });

  await page.goto('/cart');

  // Fill email and click checkout
  await page.waitForSelector('input[placeholder="Masukkan email untuk konfirmasi"]', { timeout: 10000 });
  await page.fill('input[placeholder="Masukkan email untuk konfirmasi"]', `e2e+${Date.now()}@example.com`);
  await page.click('text=Lanjutkan ke pembayaran');

  // Expect the sonner toast message to appear
  await expect(page.locator('text=Pembayaran anda sedang di proses, Silahkan cek Email anda.')).toBeVisible({ timeout: 5000 });
});
