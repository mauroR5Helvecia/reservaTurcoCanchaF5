import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { PrivateLayout } from "../components/layout/private/PrivateLayout";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { Panel } from "../components/user/Panel";
import { PanelAdmin } from "../components/admin/PanelAdmin";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/panel" element={<PrivateLayout />}>
          <Route index element={<Panel />} />
          <Route path="Admin" element={<PanelAdmin />} />
        </Route>
        <Route
          path="*"
          element={
            <>
              <p>
                <h1>Error 404</h1>
                <Link to="/">Go home boy</Link>
              </p>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
