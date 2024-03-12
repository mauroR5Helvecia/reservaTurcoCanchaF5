import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toaster } from "sonner";

export const PrivateLayout = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  return (
    <>
      <Header />
      <Footer />
      <main className="content__private">
        <Toaster richColors expand={true} />
        {token ? <Outlet /> : <Navigate to="/" />}
      </main>
    </>
  );
};
