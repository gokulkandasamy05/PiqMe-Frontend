'use client'
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { persistor, store } from "@/utils/appStore";
import { PersistGate } from "redux-persist/integration/react";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {


  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Header></Header>
            <main className="bg-base-200">
              {children}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
              />
            </main>
            <Footer></Footer>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
