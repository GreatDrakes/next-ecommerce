import "./globals.css";
import { ReactNode } from "react";
import Header from "../components/header";
import Providers from "./providers";

export const metadata = {
  title: {
    default: "My E-Commerce Store",
    template: "%s | My E-Commerce Store",
  },
  description: "Shop the best products online.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
