// hooks/useAuth.js
import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/useAuthStore";

export const useAuth = () => {
  const { isAuthenticated, user, loadAccessTokenOnRefresh} = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      // Redirect to the sign-up page if the user is not authenticated
      if (!isAuthenticated && user == null) {
        await loadAccessTokenOnRefresh();
      } else {
        return true;
      }
    };

    checkAuth();
  }, [isAuthenticated, loadAccessTokenOnRefresh, user]);
 
  return isAuthenticated;
};
