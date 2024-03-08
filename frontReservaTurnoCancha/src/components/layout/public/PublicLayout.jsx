import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export const PublicLayout = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <main className="layout__public">
        <Toaster richColors expand={true} />
        {!token ? <Outlet /> : <Navigate to="user/Inicio" />}
      </main>
    </>
  );
};
