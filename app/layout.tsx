import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";

const inter = Lato({
  subsets: ["latin"],
  weight: ["700", "300", "400", "900"],
});

export const metadata: Metadata = {
  title: "Invoice Hub",
  description: "Gerenciador de finanças pessoais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider enableSystem>{children}</Provider>
      </body>
    </html>
  );
}
