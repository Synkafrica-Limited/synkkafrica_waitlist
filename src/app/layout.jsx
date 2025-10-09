import { Montserrat, Montserrat_Alternates } from "next/font/google";
import "../styles/globals.css"; 


const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat-alternates",
});


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});


export const metadata = {
  title: "Synkkafrica — Book Authentic African Adventures",
  description: "Discover and book authentic African experiences — seamless bookings, local hosts, unforgettable memories.",
  openGraph: {
    title: "Synkkafrica — Book Authentic African Adventures",
    description: "Discover and book authentic African experiences — seamless bookings, local hosts, unforgettable memories.",
    images: ["/images/og-image.png"],
    url: "https://your-domain.example",
    siteName: "Synkkafrica"
  },
  twitter: {
    card: "summary_large_image",
    title: "Synkkafrica",
    description: "Discover and book authentic African experiences."
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <body className="font-sans bg-[var(--background)] text-[var(--foreground)]">
          {children}
        </body>
    </html>
  );
}
