import { NavLink } from "react-router-dom";
export const Footer = () => {
  return (
    <aside className="aside__private">
      <NavLink
        to="Canchas"
        className={({ isActive }) =>
          isActive ? "aside__button aside__button-active" : "aside__button"
        }
        style={{ "--back": "#d92f68" }}
      >
        <i className="bx bx-football aside__button-icon"></i>
        <span>Canchas</span>
      </NavLink>
      <NavLink
        to="Dias"
        className={({ isActive }) =>
          isActive ? "aside__button aside__button-active" : "aside__button"
        }
        style={{ "--back": "#4923c4" }}
      >
        <i className="bx bx-list-check aside__button-icon"></i>
        <span>Horarios</span>
      </NavLink>
      <NavLink
        to={"Reservas"}
        className={({ isActive }) =>
          isActive ? "aside__button aside__button-active" : "aside__button"
        }
        style={{ "--back": "#23c483" }}
      >
        <i className="bx bx-cog aside__button-icon"></i>
        <span>Reservas</span>
      </NavLink>

      <NavLink
        to={"Edit"}
        className={({ isActive }) =>
          isActive ? "aside__button aside__button-active" : "aside__button"
        }
        style={{ "--back": "blue" }}
      >
        <i className="bx bx-cog aside__button-icon"></i>
        <span> Editar horarios</span>
      </NavLink>
    </aside>
  );
};
