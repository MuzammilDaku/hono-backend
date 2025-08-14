import { Hono } from 'hono'
import { dbConnection } from './db'
import { user } from './db/schemas'
const app = new Hono()


app.post('/api', async (c) => {
 try {
   const body = await c.req.json();

  const db = await dbConnection()
  if (!db) {
    return c.json({ error: 'Database connection failed' }, 500);
  }
  const [response] = await db.insert(user).values(body).returning();
  console.log(response)
  return c.json( response, 201)
 } catch (error) {
  console.error('Error inserting data:', error);
  return c.json({ error: error}, 500)
 }
})

app.get("/", (c) => {
  return c.json({
    DATABASE_URL: process.env.DATABASE_URL || "undefined",
    envKeys: Object.keys(process.env),
  });
});


export default app