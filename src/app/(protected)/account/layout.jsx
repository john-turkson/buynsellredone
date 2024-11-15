
export default function layout({ children }) {
  return (
    <main id="content">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" min-h-screen bg-white dark:bg-neutral-800 ">
          {children}
        </div>
      </div>
    </main>
  );
}
