import { getAuth, GoogleAuthProvider, type User } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { app } from './firebase';

export const ADMIN_EMAIL = 'avedisinfosys@gmail.com';

export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export function isAuthorizedAdmin(user: User | null): boolean {
  return Boolean(
    user &&
      user.email?.toLowerCase() === ADMIN_EMAIL &&
      user.emailVerified,
  );
}
