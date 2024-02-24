import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const PrivateLayout = () => {
  return (
    <>
      <Header />
      <main className="content__private">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
