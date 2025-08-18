"use client";

import "./globals.css";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Header from "../components/Header";
import { SessionProvider } from "next-auth/react";

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
