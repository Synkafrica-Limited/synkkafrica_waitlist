import LandingPage from "./home/page";

export default function HomePage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--bg-background)",
        color: "var(--text-foreground)",
      }}
    >
      <main>
        <div className="flex flex-col items-center justify-center  bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors duration-500">
          <LandingPage />
        </div>
      </main>
    </div>
  );
}
