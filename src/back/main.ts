import { Hono } from 'jsr:@hono/hono'
import { serveStatic } from 'jsr:@hono/hono/deno'

const app = new Hono()

app.use('/', serveStatic({ root: '../front' }))
app.use('/data/*', serveStatic({ root: '../' }))

app.get('/f', async (c) => {
  const mp4s = Deno.readDirSync(`../data`).filter((f) => f.name.toLowerCase().endsWith('.mp4'))
  const files = []
  for await (const f of mp4s) {
    const d = await Deno.stat(`../data/${f.name}`)
    files.push({
      name: f.name,
      timestamp: d.birthtime ? Date.parse(d.birthtime.toISOString()) : 0,
      size: d.size
    })
  }
  return c.json(files.sort((a, b) => b.timestamp - a.timestamp))
})

Deno.serve({ port: 8782 }, app.fetch)
