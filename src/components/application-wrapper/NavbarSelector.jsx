import { auth } from "@/auth";
import ProfileNavbar from './ProfileNavbar';
import Navbar from './Navbar';

export default async function NavbarSelector() {
  const session = await auth();

  return session?.user ? <ProfileNavbar /> : <Navbar />;
}
