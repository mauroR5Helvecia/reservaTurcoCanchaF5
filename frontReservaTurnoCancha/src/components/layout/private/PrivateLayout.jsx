import { Outlet } from "react-router-dom";

export const PrivateLayout = () => {
  return (
    <>
      <main className="layout__public">
        <Outlet />
      </main>
    </>
  );
};
