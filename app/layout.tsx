'use client'
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { persistor, store } from "@/utils/appStore";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
