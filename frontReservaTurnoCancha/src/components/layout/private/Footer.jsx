import { NavLink } from "react-router-dom";
export const Footer = () => {
  return (
    <aside className="aside__private">
      <NavLink
        to="Inicio"
        className={({ isActive }) =>
          isActive ? "aside__button aside__button-active" : "aside__button"
        }
        style={{ "--back": "#d92f68" }}
      >
        <i className="bx bx-home aside__button-icon"></i>
        <span>Inicio </span>
      </NavLink>
      <NavLink
        to="MisTurnos"
        className={({ isActive }) =>
          isActive ? "aside__button aside__button-active" : "aside__button"
        }
        style={{ "--back": "#4923c4" }}
      >
        <i className="bx bx-list-check aside__button-icon"></i>
        <span>Mis turnos </span>
      </NavLink>
      <NavLink
        to={"Contacto"}
        className={({ isActive }) =>
          isActive ? "aside__button aside__button-active" : "aside__button"
        }
        style={{ "--back": "#23c483" }}
      >
        <i className="bx bxl-whatsapp aside__button-icon"></i>
        <span>Contacto</span>
      </NavLink>

      <NavLink
        to={"logout"}
        className={({ isActive }) =>
          isActive ? "aside__button aside__button-active" : "aside__button"
        }
        style={{ "--back": "blue" }}
      >
        <i className="bx bx-exit aside__button-icon"></i>
        <span> Cerrar sesión</span>
      </NavLink>
    </aside>
  );
};
