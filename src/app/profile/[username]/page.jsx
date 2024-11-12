// src/app/profile/[username]/page.jsx

import ProtectedRoute from "@/components/application-wrapper/ProtectedRoute";
import ProfileInfo from "./components/ProfileInfo";

// Dynamic route component (e.g., /profile/[username])
export default async function ProfilePage({ params }) {
  // // Await the params object
  // const { username } = await params;

  // // Fetch user data based on the dynamic username
  // const response = await fetch(
  //   `http://localhost:8888/api/get-user-info/${username}`,
  //   {
  //     credentials: 'include', // if your API requires cookies or credentials
  //   }
  // );
  // const user = await response.json();
  // // console.log(user);
  

  // Render the profile page with fetched user data
  return (
    <ProtectedRoute>
      {/* <ProfileInfo /> */}
      <h1 className="text-3xl font-bold underline text-black text-center dark:text-neutral-200">
        Profile Page!
      </h1>
    </ProtectedRoute>
  );
}
