'use client'
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { Provider, useSelector } from "react-redux";
import { persistor, RootState, store } from "@/utils/appStore";
import { PersistGate } from "redux-persist/integration/react";
import AppLayout from "./page";
import { Bounce, ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const common = useSelector((store: RootState) => store.common);
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <>
              <div className="min-h-screen bg-[#F5F7FA] text-[#1F2937]">
                <Header />
                <main className="mx-auto min-h-[95vh]">
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
                {/* <Footer /> */}
              </div>

              {common?.isLoading &&
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
                  <span className="loading loading-ring w-40"></span>
                </div>
              }
            </>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
