import { signOut, getAuth } from "firebase/auth";

const auth = getAuth();

export async function logoutUser() {
  try {
    // Firebase에서 로그아웃
    await signOut(auth);
    
    // 서버에 로그아웃 요청 보내기
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("서버 로그아웃 실패");
    }

    return { success: true };
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
    return { success: false, error };
  }
}