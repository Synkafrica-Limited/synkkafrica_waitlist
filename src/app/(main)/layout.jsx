import "../../styles/globals.css";
import Footer from "../components/footer/footer";
import HeaderNavbar from "../components/HeaderNavbar";

export const metadata = {
  title: "SynkkAfrica",
  description: "Empowering mobility across Africa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors duration-500">
        {children}
              <Footer/>
      </body>
    </html>
  );
}

