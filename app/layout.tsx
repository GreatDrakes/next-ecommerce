import "./globals.css";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Header from "../components/header";
import { SessionProvider } from "next-auth/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Ecommerce Store",
  description: "A simple ecommerce demo built with Next.js, Redux, and NextAuth.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Provider store={store}>
            <Header />
            <main>{children}</main>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
