import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
export const useAuth = (redirectIfNotAuth = true) => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && redirectIfNotAuth) {
      router.push("/login");
    }
  }, [redirectIfNotAuth, router]);

  return { isAuthenticated, user, logout };
};
