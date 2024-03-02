import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { PrivateLayout } from "../components/layout/private/PrivateLayout";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";

import { LayoutAdmin } from "../components/admin/LayoutAdmin";
import { Home } from "../components/user/Home";
import { ReservedShifts } from "../components/shifts/ReservedShifts";
import { Contact } from "../components/user/Contact";
import { DaysForm } from "../components/admin/DaysForm";
import { CanchasForm } from "../components/admin/CanchasForm";
import { VerifyCode } from "../components/layout/private/VerifyCode";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify" element={<VerifyCode />} />
        </Route>

        <Route path="/user" element={<PrivateLayout />}>
          <Route index element={<Home />} />
          <Route path="Inicio" element={<Home />} />
          <Route path="MisTurnos" element={<ReservedShifts />} />
          <Route path="Contacto" element={<Contact />} />
        </Route>

        <Route path="/Admin" element={<LayoutAdmin />}>
          <Route index element={<DaysForm />} />
          <Route path="Dias" element={<DaysForm />} />
          <Route path="Canchas" element={<CanchasForm />} />
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
