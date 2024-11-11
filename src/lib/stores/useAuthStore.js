// stores/useAuthStore.js

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios"; // Import axios
import { jwtDecode } from "jwt-decode";
import { mountStoreDevtool } from "simple-zustand-devtools";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null, // Store the JWT token
      isAuthenticated: false, // Track if the user is authenticated
      user: null, // Store the user object after decoding the JWT token

      loadAccessTokenOnRefresh: async () => {
        // Attempt to refresh access token on page load or refresh
        if (!get().token) {
          try {
            const response = await axios.post(
              "/api/refresh-token",
              {},
              { withCredentials: true }
            );

            if (response.status === 200) {
              const newAccessToken = response.data.accessToken;

              if (newAccessToken) {
                const decodedUser = jwtDecode(newAccessToken);
                set({
                  token: newAccessToken,
                  isAuthenticated: true,
                  user: decodedUser,
                });
              }
            }
          } catch (error) {
            console.log("Error loading access token on refresh:", error);
          }
        }
      },

      // Action to login and set the token and user info
      login: async (email, password) => {
        try {
          // Make API call to login
          const response = await axios.post("/api/login-user", {
            email,
            password,
          });

          // Check if the API call was successful and contains a token
          if (response.status === 200) {
            const { accessToken } = response.data;

            // Decode the access token to get user info
            const decodedUser = jwtDecode(accessToken);

            // Set the token, authentication status, and user object in the store
            set({
              token: accessToken,
              isAuthenticated: true,
              user: decodedUser,
            });

            console.log("Successfully logged in");
            
          } else {
            console.error(response.data.error || "Login failed");
          }
        } catch (error) {
          console.error("Login failed", error);
        }
      },

      // Action to logout and clear the token and user info
      logout: async () => {
        try {
          // Call the serverless function to remove the refreshToken cookie
          const response = await axios.post("/api/logout", null, {
            withCredentials: true, // Include cookies with the request
          });
      
          // Check if the logout was successful by checking the response status
          if (response.status === 200) {
            // Handle successful logout
            console.log("User logged out successfully.");
            
            // Optionally, clear the user state or redirect the user
            set({
              token: null,
              isAuthenticated: false,
              user: null,
            });
      
          } else {
            // Handle any errors from the serverless function
            console.error(response.data.error || "Logout failed");
          }
        } catch (error) {
          console.error("Error during logout:", error);
        }
      },
      
    }),
    {
      name: "auth", // Key to store state in localStorage
      getStorage: () => localStorage, // Store the state in localStorage
    }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Auth Store", useAuthStore);
}
