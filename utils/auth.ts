import { auth } from '@/libs/firebase/config';
import { fetchSignInMethodsForEmail } from 'firebase/auth';

export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    return signInMethods.length > 0;
  } catch (error) {
    console.error('Error checking email:', error);
    return false;
  }
}