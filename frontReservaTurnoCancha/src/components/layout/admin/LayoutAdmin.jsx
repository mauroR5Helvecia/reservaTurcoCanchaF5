import { Toaster } from "sonner";
import { Footer } from "../admin/Footer";
import { Outlet } from "react-router-dom";
import logo from "../../../assets/img/futbol.svg";
export const LayoutAdmin = () => {
  return (
    <div className="layout__admin">
      <header className="admin__header">
        <img src={logo} alt="logo" />
      </header>
      <Footer />
      <main className="admin__content">
        <Toaster richColors visibleToasts={12} />
        <Outlet />
      </main>
    </div>
  );
};
