// src/app/profile/[username]/page.jsx
import { auth } from "@/auth";

export default async function AccountPage() {
  const session = await auth();
  // console.log(session);

  return (
    <>
      <h1 className="text-3xl font-bold underline text-black text-center dark:text-neutral-200">
        Account Page!
      </h1>
    </>
  );
}
