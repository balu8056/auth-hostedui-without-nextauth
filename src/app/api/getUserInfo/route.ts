import { UserProfile } from '@/contexts/UserAuth'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const access_token: string = (await req.json()).access_token as string

  const userInfoReq = await fetch(`${String(process.env.COGNITO_DOMAIN)}/oauth2/userInfo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${access_token}`,
    },
  })

  const userInfo = await userInfoReq.json()

  const userProfileFromApi: UserProfile = {
    'custom:is_multi_admin': userInfo['custom:is_multi_admin'],
    'custom:org': userInfo['custom:org'],
    'custom:org_id': userInfo['custom:org_id'],
    'custom:role': userInfo['custom:role'],
    'custom:user_id': userInfo['custom:user_id'],
    email: userInfo['email'],
    name: userInfo['name'],
    sub: userInfo['sub'],
    username: userInfo['username'],
  }

  return NextResponse.json(userProfileFromApi)
}
