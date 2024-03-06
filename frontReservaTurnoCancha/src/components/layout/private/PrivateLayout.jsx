import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const PrivateLayout = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  return (
    <>
      <Header />
      <main className="content__private">
        {token ? <Outlet /> : <Navigate to="/" />}
      </main>
      <Footer />
    </>
  );
};
