import { Dispatch, SetStateAction, createContext, useContext } from 'react'

export interface UserProfile {
  'custom:is_multi_admin': string
  'custom:org': string
  'custom:org_id': string
  'custom:role': string
  'custom:user_id': string
  email: string
  name: string
  sub: string
  username: string
}

export interface UserTokens {
  access_token: string
  refresh_token: string
  id_token: string
  expires_in: string
  token_type: string
}

interface UserAuthContextType {
  userProfile: UserProfile | undefined
  userTokens: UserTokens | undefined

  setUserProfile: Dispatch<SetStateAction<UserProfile | undefined>>
  setUserTokens: Dispatch<SetStateAction<UserTokens | undefined>>
}

const UserAuthContext = createContext<UserAuthContextType>({
  userProfile: undefined,
  userTokens: undefined,
  setUserProfile: () => {},
  setUserTokens: () => {},
})

export default UserAuthContext

export const useUserAuthContext = () => useContext(UserAuthContext)
