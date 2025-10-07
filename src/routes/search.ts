import { Hono } from 'hono';
import { Env } from '../types';

const search = new Hono<{ Bindings: Env }>();

search.get('/', async (c) => {
  const { q } = c.req.query();
  if (!q) {
    return c.json({ error: 'Query parameter "q" is required.' }, 400);
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'PigMap.org Community Tracker (pigmap.org)',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Nominatim API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return c.json(data);

  } catch (error) {
    console.error('Nominatim proxy error:', error);
    return c.json({ error: 'Failed to fetch search results.' }, 500);
  }
});

export default search;
