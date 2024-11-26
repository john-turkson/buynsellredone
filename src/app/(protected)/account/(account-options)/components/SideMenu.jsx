import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineCollection } from "react-icons/hi";
import SideMenuItem from "./SideMenuItem";

export default function SideMenu() {
  return (
    <div>
      {/* Menu Title */}
      <div className="px-6">
        <span
          className="pl-2 flex-none font-bold text-lg text-black  dark:text-white"
          aria-label="Brand"
        >
          Account
        </span>
      </div>

      {/* Side Menu */}
      <nav
        className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
        data-hs-accordion-always-open
      >
        <ul className="space-y-1.5">
          <SideMenuItem itemName={"Personal Info"} link={'/account/account-info'}>
            <HiOutlineUser />
          </SideMenuItem>
          <SideMenuItem itemName={"My Listings"} link={'/account/my-listings'}>
            <HiOutlineCollection />
          </SideMenuItem>
          <SideMenuItem itemName={"My Orders"} link={'/account/my-orders'}>
            <HiOutlineShoppingBag />
          </SideMenuItem>
        </ul>
      </nav>
    </div>
  );
}
