import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const [logout, setLogout] = useState(false);
  return (
    <header className="user__header">
      <section className="header__title-container">
        <h1 className="header__title">La canchita de los pibes</h1>
      </section>

      <section
        className="header__user-container"
        onClick={() => {
          setLogout(!logout);
        }}
      >
        <h2 className="header__user-name">Pablo Romero</h2>
        <img
          src="https://imgs.search.brave.com/CAtVOv-guW4Ksxe5xp71hwQC-tjx4VdiCT4oPycaFnQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/Y29tcHV0ZXJob3Bl/LmNvbS9qYXJnb24v/Zy9ndWVzdC11c2Vy/LnBuZw"
          alt=""
          className="header__user-image"
        />
        <NavLink
          to={"logout"}
          className={
            logout
              ? "aside__button-logout aside__button-logout-active"
              : "aside__button-logout"
          }
          style={{ "--back": "blue" }}
        >
          <i className="bx bx-exit aside__button-icon"></i>
          <span> Cerrar sesión</span>
        </NavLink>
      </section>
    </header>
  );
};
