'use client'
import { useSelector } from "react-redux";
import { RootState } from "@/utils/appStore";
import Header from "@/components/Header";
import { ToastContainer, Bounce } from "react-toastify";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const common = useSelector((store: RootState) => store.common);

  return (
    <div className="bg-[#F5F7FA] text-[#1F2937] h-full">
      <Header />
      <main className="mx-auto h-[90vh]">
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

      {common?.isLoading &&
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
          <span className="loading loading-ring w-40"></span>
        </div>
      }
    </div>
  );
}
