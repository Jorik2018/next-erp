export interface CurrentUser {
  id: string
  name?: string | null
  email?: string | null
}

export interface GraphQLContext {
  currentUser: CurrentUser | null
}

export function requireUser(context: GraphQLContext): CurrentUser {
  if (!context.currentUser?.id) throw new Error('Unauthorized')
  return context.currentUser
}
