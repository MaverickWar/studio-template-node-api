import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

// The API. Every request body and query is checked with Zod before it's used.
export const app = new Hono();

app.use(logger());

/** Is it up? Hosts and Universal App Studio's checklist call this. */
app.get('/health', (c) => c.json({ ok: true, at: new Date().toISOString() }));

app.get('/', (c) => c.json({ name: 'API', docs: 'See README.md for every endpoint.' }));

/** An example endpoint: replace it with the first one from docs/PLAN.md. */
app.post('/echo', zValidator('json', z.object({ message: z.string().min(1).max(500) })), (c) => {
  const { message } = c.req.valid('json');
  return c.json({ message });
});

app.notFound((c) => c.json({ error: 'Not found' }, 404));
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'Something went wrong' }, 500);
});
