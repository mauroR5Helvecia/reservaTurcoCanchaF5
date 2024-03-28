import { NavLink } from "react-router-dom";
export const Footer = () => {
  return (
    <aside className="aside__private">
      <NavLink
        to="Canchas"
        className={({ isActive }) =>
          isActive ? "aside__button aside__button-active" : "aside__button"
        }
      >
        <i className="bx bx-football aside__button-icon"></i>
        <span  className="aside__button__text">Canchas</span>
      </NavLink>
      <NavLink
        to="Dias"
        className={({ isActive }) =>
          isActive ? "aside__button aside__button-active" : "aside__button"
        }
      >
        <i className="bx bx-list-check aside__button-icon"></i>
        <span  className="aside__button__text">Horarios</span>
      </NavLink>
      <NavLink
        to={"Reservas"}
        className={({ isActive }) =>
          isActive ? "aside__button aside__button-active" : "aside__button"
        }
      >
        <i className="bx bx-cog aside__button-icon"></i>
        <span  className="aside__button__text">Reservas</span>
      </NavLink>

      <NavLink
        to={"Edit"}
        className={({ isActive }) =>
          isActive ? "aside__button aside__button-active" : "aside__button"
        }
      >
        <i className="bx bx-cog aside__button-icon"></i>
        <span  className="aside__button__text"> Editar</span>
      </NavLink>
    </aside>
  );
};
