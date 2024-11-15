import { HiMiniUser } from "react-icons/hi2";
import { HiInboxStack } from "react-icons/hi2";

import SideMenuItem from "./SideMenuItem";

export default function SideMenu() {
  return (
    <div>
      {/* Menu Title */}
      <div className="px-6">
        <span
          className="pl-2 flex-none font-bold text-base text-black  dark:text-white"
          aria-label="Brand"
        >
          Brand
        </span>
      </div>

      {/* Side Menu */}
      <nav
        className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
        data-hs-accordion-always-open
      >
        <ul className="space-y-1.5">
          <SideMenuItem itemName={"Personal Info"}>
            <HiMiniUser />
          </SideMenuItem>
          <SideMenuItem itemName={"My Listings"}>
            <HiInboxStack />
          </SideMenuItem>
        </ul>
      </nav>
    </div>
  );
}
