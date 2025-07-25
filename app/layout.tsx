'use client'
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { persistor, store } from "@/utils/appStore";
import { PersistGate } from "redux-persist/integration/react";
import AppLayout from "./page";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppLayout>{children}</AppLayout>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
