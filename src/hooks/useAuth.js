// hooks/useAuth.js
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/lib/stores/useAuthStore";

export const useAuth = () => {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const checkAuth = () => {
      // Redirect to the sign-up page if the user is not authenticated
      if (!isAuthenticated) {
        redirect("/sign-up"); // Redirect to the sign-up page
      }
    };

    checkAuth();
  }, [isAuthenticated]);

  return isAuthenticated;
};
