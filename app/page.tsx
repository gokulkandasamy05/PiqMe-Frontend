import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RootState } from "@/utils/appStore";
import { useSelector } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const common = useSelector((store: RootState) => store.common);

  return (
    <>
      <div className="min-h-screen bg-[#F5F7FA] text-[#1F2937]">
        <Header />
        <main className="pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {children}
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </main>
        {/* <Footer /> */}
      </div>

      {common?.isLoading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
          <div className="w-16 h-16 border-4 border-dashed border-pink-500 rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
}
