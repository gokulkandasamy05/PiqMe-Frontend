import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RootState } from "@/utils/appStore";
import { useSelector } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  const common = useSelector((store: RootState) => store.common)

  return (
    <>
      <div className="w-full h-full relative">
        <Header></Header>
        <main className="">
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
      </div>
      {common?.isLoading &&
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
          <span className="loading loading-ring w-40"></span>
        </div>
      }
    </>
  );
}
