import "../../styles/globals.css";

export const metadata = {
  title: "SynkkAfrica",
  description: "Empowering mobility across Africa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

