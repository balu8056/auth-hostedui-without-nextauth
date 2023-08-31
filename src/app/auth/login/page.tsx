'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { UserProfile, UserTokens, useUserAuthContext } from '@/contexts/UserAuth'

export const runtime = 'edge'

export default function Login() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const { setUserProfile, setUserTokens } = useUserAuthContext()

  const tokenAndUserInfoAPIReq = async (code: string) => {
    const tokenRequest = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getUserToken`, {
      method: 'POST',
      body: JSON.stringify({ code: code }),
    })

    const token = await tokenRequest.json()

    console.log(token)

    if ('error' in token) {
      alert('Need to sign in...')
      const loginSessionURL = `${String(process.env.COGNITO_DOMAIN)}/oauth2/authorize`
      const loginSessionParams = new URLSearchParams({
        redirect_uri: `${String(process.env.NEXT_PUBLIC_BASE_URL)}/auth/login`,
        client_id: String(process.env.COGNITO_APP_CLIENT_ID),
        response_type: 'code',
        scope: 'email openid phone',
      })

      window.open(`${loginSessionURL}?${loginSessionParams}`, '_self')
    } else {
      const userTokenFromApi: UserTokens = {
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        id_token: token.id_token,
        expires_in: token.expires_in,
        token_type: token.token_type,
      }
      setUserTokens(userTokenFromApi)

      if (token && token.access_token) {
        const userInfoRequest = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getUserInfo`, {
          method: 'POST',
          body: JSON.stringify({ access_token: token.access_token }),
        })

        const userInfo = await userInfoRequest.json()

        setUserProfile(userInfo)

        if (token && userInfo) {
          router.push('/')
        }
      }
    }
  }

  useEffect(() => {
    const code = searchParams.get('code')
    console.log(code)

    if (code) {
      tokenAndUserInfoAPIReq(String(code))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return <>Signing in to the application...</>
}
