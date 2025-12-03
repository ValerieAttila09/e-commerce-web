import { test, expect } from '@playwright/test';

test('checkout UI shows processing toast', async ({ page }) => {
  // Seed cart in localStorage so /cart has an item
  await page.addInitScript(() => {
    localStorage.setItem(
      'cart-storage',
      JSON.stringify({ state: { items: [{ id: 'e2e-1', productId: 1, name: 'E2E Product', price: 9.99, quantity: 1, image: 'placeholder.jpg' }] } })
    );
  });

  // Stub checkout API so the UI flow doesn't depend on real backend/email infra
  await page.route('/api/checkout', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ order: { id: 'e2e-test', total: 20.99 } }),
    });
  });

  await page.goto('/cart');

  // Fill email and click checkout
  await page.getByPlaceholder('Masukkan email untuk konfirmasi').fill(`e2e+${Date.now()}@example.com`);
  await page.getByText('Lanjutkan ke pembayaran').click();

  // Expect the sonner toast message to appear
  await expect(page.getByText('Pembayaran anda sedang di proses, Silahkan cek Email anda.')).toBeVisible({ timeout: 5000 });
});
