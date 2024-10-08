import { useState } from "react";
import { toast } from "sonner";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";
import { jwtDecode } from "jwt-decode";
import { NavLink, useNavigate } from "react-router-dom";
import imgOpen from "../../assets/img/eye-open.svg";
import imgClosed from "../../assets/img/eye-closed.svg";
export const Login = () => {
  const navigate = useNavigate();
  const { form, changed } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const LoginUser = async (e) => {
    e.preventDefault();

    let UserToLogin = form;

    const request = await fetch(Global.url + "auth/login", {
      method: "POST",
      body: JSON.stringify(UserToLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(request);
    if (request.status === 200) {
      const token = await request.json();
      const decodedToken = jwtDecode(token.jwt);

      localStorage.setItem("token", JSON.stringify(token.jwt));
      localStorage.setItem("user", JSON.stringify(decodedToken));

      toast.success("Logeado correctamente");
      setTimeout(() => {
        navigate("/user/Inicio");
      }, 2000);
    } else {
      toast.error("Usuario o contraseña incorrecta");
    }
  };

  return (
    <main className="layout__login">
      <form className="login__form" onSubmit={LoginUser}>
        <header className="login__header">
          <p className="login__title">Inicia sesión </p>
          <span className="login__subtitle">
            Create tu cuenta y disfrutá de poder reservar tus turnos cuando lo
            necesites.
          </span>
        </header>

        <section className="login__form-group">
          <label className="login__form-label" htmlFor="username_field">
            Username
          </label>
          <i className="bx bx-user-pin login__form-icon"></i>
          <input
            placeholder="user2121"
            name="username"
            type="text"
            className="login__form-input"
            id="username_field"
            onChange={changed}
          />
        </section>

        <section className="login__form-group">
          <label className="login__form-label" htmlFor="password_field">
            Contraseña
          </label>
          <i className="bx bx-lock-open login__form-icon"></i>
          <input
            placeholder="Contraseña"
            name="password"
            type={showPassword ? "text" : "password"}
            className="login__form-input"
            id="password_field"
            onChange={changed}
          />
          <span
            className="show-password-toggle"
            onClick={togglePasswordVisibility}
          >
            <img src={showPassword ? imgOpen : imgClosed} />
          </span>
        </section>

        <span className="login__set-password">
          <NavLink to="/setpass1">Olvidé mi contraseña</NavLink>
        </span>

        <button type="submit" className="login__form-submit">
          Iniciar sesión
        </button>

        <div className="separator">
          <hr className="line" />
          <span>o</span>
          <hr className="line" />
        </div>

        <NavLink to="/Register" type="submit" className="login__form-register">
          Crear una cuenta
        </NavLink>
      </form>
    </main>
  );
};
