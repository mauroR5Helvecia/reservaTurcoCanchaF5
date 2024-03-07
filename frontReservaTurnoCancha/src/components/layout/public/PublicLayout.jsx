import { Navigate, Outlet } from "react-router-dom";

export const PublicLayout = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <main className="layout__public">
        {!token ? <Outlet /> : <Navigate to="user/Inicio" />}
      </main>
    </>
  );
};
