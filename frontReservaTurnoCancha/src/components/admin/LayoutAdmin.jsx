import "../../assets/css/pruebas.css";
import { Footer } from "../admin/Footer";
import { Outlet } from "react-router-dom";

export const LayoutAdmin = () => {
  return (
    <>
      <header className="admin__header">
        <h1 className="admin__title">La cancha de los pibes</h1>
      </header>
      <main className="admin__content">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
