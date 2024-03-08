import { Toaster } from "sonner";
import { Footer } from "../admin/Footer";
import { Outlet } from "react-router-dom";

export const LayoutAdmin = () => {
  return (
    <div className="layout__admin">
      <header className="admin__header">
        <h1 className="admin__title">La cancha de los pibes</h1>
      </header>
      <main className="admin__content">
        <Toaster richColors visibleToasts={12} />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
