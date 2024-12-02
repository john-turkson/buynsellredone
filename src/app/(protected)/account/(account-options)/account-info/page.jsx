import { auth } from "@/auth";

import PersonalInfo from "../components/PersonalInfo";

export default async function AccountInfo() {
  const session = await auth();

  return (
    <>
      {/* <!-- 2/3 column --> */}
      <div className="p-8">
        <PersonalInfo user={session.user} />
      </div>
    </>
  );
}
