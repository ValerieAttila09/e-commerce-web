import { test, expect } from '@playwright/test';

test('feedback api e2e - create then list', async ({ request }) => {
  const feedback = {
    name: 'E2E Tester',
    email: `e2e+${Date.now()}@example.com`,
    message: 'This is an automated e2e test feedback',
    category: 'E2E',
  };

  // POST
  const post = await request.post('/api/feedback', { data: feedback });
  expect(post.status()).toBe(201);
  const created = await post.json();
  expect(created).toHaveProperty('id');

  // GET list and ensure created exists
  const list = await request.get('/api/feedback');
  expect(list.ok()).toBeTruthy();
  const arr = await list.json();
  expect(Array.isArray(arr)).toBeTruthy();
  expect(arr.some((f: any) => f.id === created.id)).toBeTruthy();
});
