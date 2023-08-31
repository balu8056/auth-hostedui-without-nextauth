'use client'

import { ReactNode, useState } from 'react'
import UserAuthContext, { UserProfile, UserTokens } from '.'

interface LayoutProps {
  children: ReactNode
}

const UserAuthProvider = ({ children }: LayoutProps) => {
  const [userAuthProfile, setUserAuthProfile] = useState<UserProfile | undefined>(undefined)
  const [userAuthTokens, setUserAuthTokens] = useState<UserTokens | undefined>(undefined)
  return (
    <UserAuthContext.Provider
      value={{
        userProfile: userAuthProfile,
        userTokens: userAuthTokens,
        setUserProfile: setUserAuthProfile,
        setUserTokens: setUserAuthTokens,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  )
}

export default UserAuthProvider
