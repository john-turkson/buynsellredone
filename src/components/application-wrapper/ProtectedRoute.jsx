'use client';

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth"; // Adjust the path as needed
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuth(); // Get the authentication status
    const router = useRouter(); // Use Next.js router for redirection
    const [mounted, setMounted] = useState(false); // Track the initial render state

    useEffect(() => {
        setMounted(true); // Set mounted to true after the first render
    }, []);

    useEffect(() => {
        if (mounted && isAuthenticated === false) {
            router.push("/sign-up"); // Redirect to the sign-up page if not authenticated
        }
    }, [isAuthenticated, router, mounted]);

    // Show a loading state if still checking authentication
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // If authenticated, render the protected content
    return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
