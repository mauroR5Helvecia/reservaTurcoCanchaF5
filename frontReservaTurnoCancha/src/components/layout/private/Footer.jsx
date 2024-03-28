import { NavLink } from "react-router-dom";
export const Footer = () => {
  return (
    <aside className="aside__private" id="navegation__bar">
      <NavLink
        to="Inicio"
        className={({ isActive }) =>
          isActive ? "aside__button aside__button-active" : "aside__button"
        }
      >
        <i className="bx bx-home aside__button-icon"></i>
        <span>Inicio </span>
      </NavLink>
      <NavLink
        to="MisTurnos"
        className= {({ isActive }) =>
          isActive ? "aside__button aside__button-active" : "aside__button"
        } 
      >
        <i className="bx bx-list-check aside__button-icon"></i>
        <span>Mis turnos </span>
      </NavLink>
      <NavLink
        to={"Contacto"}
        className={({ isActive }) =>
          isActive ? "aside__button aside__button-active" : "aside__button "
        }
      >
        <i className="bx bxs-contact aside__button-icon"></i>
        <span>Contacto</span>
      </NavLink>
    </aside>
  );
};
