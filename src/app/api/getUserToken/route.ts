import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const code: string = (await req.json()).code as string

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: String(code),
    client_id: String(process.env.COGNITO_APP_CLIENT_ID),
    client_secret: String(process.env.COGNITO_APP_CLIENT_SECRET),
    redirect_uri: `${String(process.env.NEXT_PUBLIC_BASE_URL)}/auth/login`, // String(process.env.NEXT_PUBLIC_BASE_URL) + '/auth/login',
  })

  const tokenReq = await fetch(`${String(process.env.COGNITO_DOMAIN)}/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  const token = await tokenReq.json()

  return NextResponse.json(token)
}
