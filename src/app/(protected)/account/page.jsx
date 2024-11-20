// src/app/profile/[username]/page.jsx
import { auth } from "@/auth";
import SideMenu from "./_components/SideMenu";
import PersonalInfo from "./_components/PersonalInfo";

export default async function AccountPage() {
  const session = await auth();
  // console.log(session);

  return (
    <>
      <div className="flex">
        {/* <!-- 1/3 column --> */}
        <div className="w-1/4 py-4 my-4 px-2 mx-2">
          <SideMenu />
        </div>

        {/* <!-- 2/3 column --> */}
        <div className="w-3/4 p-8 border-l-2">
          <PersonalInfo user={session.user} />
        </div>
      </div>
    </>
  );
}
