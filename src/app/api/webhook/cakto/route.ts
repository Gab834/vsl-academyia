import { NextRequest, NextResponse } from "next/server"

const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN ?? "academyia"
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET ?? "6719804d-6107-49c4-ab77-261af4e160ff"

export async function POST(req: NextRequest) {
  // 1. Valida token na query string
  const token = req.nextUrl.searchParams.get("token")
  if (token !== WEBHOOK_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // 2. Lê e valida o body
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  // 3. Valida secret
  if (body.secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
  }

  const event = body.event as string
  const customer = body.customer as Record<string, unknown> | undefined

  // 4. Responde 200 imediatamente (Cakto exige resposta rápida)
  const response = NextResponse.json({ ok: true }, { status: 200 })

  // 5. Processa o evento
  if (event === "compra_aprovada") {
    // Venda confirmada — log para monitoramento
    console.log("[CAKTO] Venda aprovada:", {
      produto: body.product,
      cliente: customer?.name,
      email: customer?.email,
      metodo: body.paymentMethodName,
      checkout: body.checkout,
      timestamp: new Date().toISOString(),
    })
  } else if (event === "pix_gerado") {
    console.log("[CAKTO] PIX gerado:", {
      cliente: customer?.name,
      checkout: body.checkout,
      timestamp: new Date().toISOString(),
    })
  }

  return response
}

// Retorna 405 para métodos não permitidos
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
