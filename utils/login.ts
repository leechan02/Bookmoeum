import { auth } from "@/libs/firebase/config";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  User
} from "firebase/auth";

async function setServerSession(user: User) {
  const idToken = await user.getIdToken();
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: idToken }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "서버 세션 설정 실패");
  }
}

export async function loginWithEmailAndPassword(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  await setServerSession(userCredential.user);
  return userCredential.user;
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  await setServerSession(result.user);
  return result.user;
}

export async function registerUser(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await setServerSession(userCredential.user);
  return userCredential.user;
}