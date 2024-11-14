// src/app/profile/[username]/page.jsx
import { auth } from "@/auth"

export default async function ProfilePage() {
  const session = await auth();
  console.log(session);
  
 
  return (
    <>
      {/* <ProfileInfo /> */}
      <h1 className="text-3xl font-bold underline text-black text-center dark:text-neutral-200">
        Profile Page!
      </h1>
    </>
  );
}
