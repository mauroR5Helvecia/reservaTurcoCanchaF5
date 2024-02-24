import { Outlet } from "react-router-dom";

export const PublicLayout = () => {
  return (
    <>
      <main className="layout__public">
        <Outlet />
      </main>
    </>
  );
};
