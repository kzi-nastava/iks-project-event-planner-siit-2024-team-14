export interface User {
  id: number,
  email: string,
  role?: 'User' | 'EventOrganizer' | 'ServiceAndProductProvider' | 'Admin',
}
