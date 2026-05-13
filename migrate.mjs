import { createClient } from "@supabase/supabase-js"

const url = "https://ogonfuitbewiwntjaazo.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nb25mdWl0YmV3aXdudGphYXpvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzkzMTY2OSwiZXhwIjoyMDkzNTA3NjY5fQ.yrkrMB3-_WCPbMW6E16ONpqXyBQjydHqRrrPXUF9ELk"

const db = createClient(url, key)

// testa se a tabela resources existe
const { data, error } = await db.from("resources").select("id").limit(1)
if (error) {
  console.log("Tabela resources:", error.message)
} else {
  console.log("Tabela resources OK — registros:", data.length)
}

const { data: d2, error: e2 } = await db.from("lessons").select("id").limit(1)
if (e2) console.log("Tabela lessons:", e2.message)
else console.log("Tabela lessons OK")

const { data: d3, error: e3 } = await db.from("events").select("id").limit(1)
if (e3) console.log("Tabela events:", e3.message)
else console.log("Tabela events OK")
