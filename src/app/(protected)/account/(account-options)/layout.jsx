import SideMenu from "./components/SideMenu";

export default function layout({ children }) {
  return (
    <main id="content">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" min-h-screen bg-white dark:bg-neutral-800 flex">
          {/* <!-- 1/3 column --> */}
          <div className="w-1/4 py-4 px-2 mx-2 border-r sticky top-0">
            <SideMenu />
          </div>
          <div className="w-3/4 py-4 px-2 mx-2">{children}</div>
        </div>
      </div>
    </main>
  );
}
