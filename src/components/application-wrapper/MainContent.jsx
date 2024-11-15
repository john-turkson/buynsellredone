export default function MainContent({ children }) {
  return (
    <main id="content">
      <div className=" mx-auto">
        <div className="min-h-screen bg-white dark:bg-neutral-800 ">
          {children}
        </div>
      </div>
    </main>
  );
}
