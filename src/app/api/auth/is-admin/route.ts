import { NextRequest, NextResponse } from "next/server"
import { getAuthUser, applyNewTokens } from "@/lib/auth-server"

const ADMIN_EMAILS = ["gdealmeida714@gmail.com", "gdealmeida629@gmail.com"]

export async function GET(req: NextRequest) {
  const adminToken = req.cookies.get("admin_token")?.value
  if (adminToken === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ isAdmin: true })
  }

  const { user, newTokens } = await getAuthUser(req)
  if (user?.email && ADMIN_EMAILS.includes(user.email)) {
    const res = NextResponse.json({ isAdmin: true })
    if (newTokens) applyNewTokens(res, newTokens)
    return res
  }

  return NextResponse.json({ isAdmin: false })
}
