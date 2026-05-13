import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { createSubscription } from "@/lib/subscriptions"

function generatePassword(length = 12): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$"
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

async function sendWelcomeEmail(email: string, password: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://academy-ia.vercel.app"
  const resendKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.EMAIL_FROM ?? "onboarding@resend.dev"

  if (!resendKey) return

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
    body: JSON.stringify({
      from: `Academy.IA <${fromEmail}>`,
      to: email,
      subject: "Seu acesso à Academy.IA está pronto!",
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;background:#fff">
          <h2 style="margin-bottom:8px;color:#111">Bem-vindo à Academy.IA!</h2>
          <p style="color:#555">Seu acesso <strong>Vitalício</strong> foi criado. Use as credenciais abaixo para entrar:</p>
          <div style="background:#f5f5f5;border-radius:8px;padding:16px;margin:16px 0">
            <p style="margin:0 0 8px;color:#111"><strong>Email:</strong> ${email}</p>
            <p style="margin:0;color:#111"><strong>Senha:</strong> <span style="font-family:monospace;font-size:16px;background:#e0e0e0;padding:2px 6px;border-radius:4px">${password}</span></p>
          </div>
          <a href="${appUrl}/login" style="display:inline-block;background:#111;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
            Acessar a Academy.IA →
          </a>
          <p style="color:#999;font-size:12px;margin-top:16px">Guarde essa senha em um lugar seguro. Você pode alterá-la nas configurações.</p>
        </div>
      `,
    }),
  })
  return res.ok
}

export async function POST(req: NextRequest) {
  const adminToken = req.cookies.get("admin_token")?.value
  if (adminToken !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { email, name } = await req.json()
  if (!email) return NextResponse.json({ error: "Email obrigatório" }, { status: 400 })

  const { data: existing } = await supabaseAdmin.auth.admin.listUsers()
  const existingUser = existing?.users?.find(u => u.email === email)
  if (existingUser) {
    return NextResponse.json({ error: "Usuário já existe" }, { status: 409 })
  }

  const password = generatePassword()
  const { data: newUser, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: name ?? email.split("@")[0], plan: "vitalicio" },
  })

  if (error || !newUser.user) {
    return NextResponse.json({ error: error?.message }, { status: 500 })
  }

  await createSubscription(newUser.user.id, email, "vitalicio")
  const emailSent = await sendWelcomeEmail(email, password)

  return NextResponse.json({ ok: true, email, password, emailSent: emailSent ?? false })
}
