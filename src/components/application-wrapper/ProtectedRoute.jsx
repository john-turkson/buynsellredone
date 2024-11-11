'use client'


import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth"; // Adjust the path as needed
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuth(); // Get the authentication status
    const router = useRouter(); // Use Next.js router for redirection
  
    // While checking authentication, you can show a loading state
    if (isAuthenticated === null) {
      return <div>Loading...</div>; // Optional: Show a loading spinner or placeholder
    }
  
    // Redirect if the user is not authenticated (after render)
    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/sign-up"); // Redirect to the sign-up page
      }
    }, [isAuthenticated, router]); // Dependency on isAuthenticated and router
  
    // If not authenticated, don't render the children yet
    if (!isAuthenticated) {
      return null; // Optionally, return nothing or a loading state while redirecting
    }
  
    // Render the protected content if authenticated
    return <>{children}</>;
  };
  
  export default ProtectedRoute;