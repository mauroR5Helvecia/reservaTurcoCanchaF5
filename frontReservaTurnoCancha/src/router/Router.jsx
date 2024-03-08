import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { PrivateLayout } from "../components/layout/private/PrivateLayout";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import Background from "../assets/img/soccer-1.svg";
import { LayoutAdmin } from "../components/layout/admin/LayoutAdmin";

import { Home } from "../components/user/Home";
import { ReservedShifts } from "../components/shifts/ReservedShifts";
import { Contact } from "../components/user/Contact";
import { Schedules } from "../components/layout/admin/Schedules";
import { RegisterCourt } from "../components/layout/admin/RegisterCourt";
import { VerifyCode } from "../components/layout/public/VerifyCode";
import { Bookings } from "../components/layout/admin/Bookings";
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
          <Route index element={<Schedules />} />
          <Route path="Dias" element={<Schedules />} />
          <Route path="Canchas" element={<RegisterCourt />} />
          <Route path="Reservas" element={<Bookings />} />
        </Route>
        <Route
          path="*"
          element={
            <>
              <div className="error__container">
                <img src={Background} alt="" className="error__background" />
                <div>
                  <h2>Error 404</h2>
                  <h3>Ésta página no existe</h3>
                  <Link to="/">Volver al inicio</Link>
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
