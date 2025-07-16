import LandingPage from "./home/page";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors duration-500 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center w-full px-0 sm:px-2 md:px-4 lg:px-0">
        <LandingPage />
      </main>
    </div>
  );
}
