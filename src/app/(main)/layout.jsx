import "../../styles/globals.css";
import Footer from "../components/footer/footer";
import HeaderNavbar from "../components/HeaderNavbar";

export const metadata = {
  title: "SynkkAfrica",
  description: "Empowering mobility across Africa",
};

export default function RootLayout({ children }) {
  return (
    // Keep html/body controlled by the root layout (src/app/layout.jsx).
    // Use an internal wrapper to apply layout-specific classes so we avoid
    // hydration mismatches between server and client.
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors duration-500 scroll-smooth">
      <main>{children}</main>
      <Footer />
    </div>
  );
}

