import { auth } from "@/auth";

import PersonalInfo from "../components/PersonalInfo";
import InfoEdit from "../components/InfoEdit";

export default async function AccountInfo() {
  const session = await auth();

  return (
    <>
      {/* <!-- 2/3 column --> */}
      <div className="mx-4">
        {/* <PersonalInfo user={session.user} /> */}
        <InfoEdit user={session?.user} />
      </div>
    </>
  );
}
