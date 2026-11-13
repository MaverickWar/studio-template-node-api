import { describe, expect, it } from 'vitest';
import { app } from './app.js';

describe('API', () => {
  it('answers /health', async () => {
    const res = await app.request('/health');
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  it('checks the request body', async () => {
    const bad = await app.request('/echo', { method: 'POST', body: JSON.stringify({}), headers: { 'Content-Type': 'application/json' } });
    expect(bad.status).toBe(400);
    const good = await app.request('/echo', { method: 'POST', body: JSON.stringify({ message: 'hi' }), headers: { 'Content-Type': 'application/json' } });
    expect(await good.json()).toEqual({ message: 'hi' });
  });
});
