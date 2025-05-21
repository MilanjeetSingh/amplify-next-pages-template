import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amplify Next.js App",
  description: "Demo of SSR and CSR with Amplify in Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <div className="container mx-auto px-4">
          {children}
        </div>
      </body>
    </html>
  );
}
