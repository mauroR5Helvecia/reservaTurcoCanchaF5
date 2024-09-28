import { useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import { toast } from "sonner";
import imgOpen from "../../assets/img/eye-open.svg";
import imgClosed from "../../assets/img/eye-closed.svg";

export const Register = () => {
  const { form, changed } = useForm();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const RegisterUser = async (e) => {
    e.preventDefault();
    let newUser = form;

    try {
      const request = await fetch(Global.url + "auth/register", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(request)

      toast.info("Se ha enviado un código de verificación a tu email");
      localStorage.setItem("email", newUser.email);

      navigate("/verify");
    } catch (error) {
      toast.error("Error en registrar usuario", error);
    }
  };

  const verifyPassword = (e) => {
    let newPassword = e.target.value;

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      e.target.setCustomValidity(
        "La contraseña debe contener al menos una letra mayúscula, un número y tener una longitud mínima de 8 caracteres."
      );
    } else {
      e.target.setCustomValidity("");
    }

    setPassword(newPassword);
  };
  return (
    <main className="layout__login">
      <form className="register__form" onSubmit={RegisterUser}>
        <header className="register__header">
          <p className="register__title">Registrarte</p>
          <span className="register__subtitle">
            Create tu cuenta y disfrutá de poder reservar tus turnos cuando lo
            necesites.
          </span>
        </header>
        <div className="register__fullname">
          <section className="register__form-group">
            <label className="register__form-label" htmlFor="name_field">
              Nombre
            </label>
            <i className="bx bx-user register__form-icon"></i>
            <input
              placeholder="Tu nombre"
              name="name"
              type="text"
              required
              className="register__form-input"
              id="name_field"
              onChange={changed}
            />
          </section>

          <section className="register__form-group">
            <label className="register__form-label" htmlFor="surname_field">
              Apellido
            </label>
            <i className="bx bx-user register__form-icon"></i>
            <input
              placeholder="Tu apellido"
              name="lastName"
              type="text"
              required
              className="register__form-input"
              id="surname_field"
              onChange={changed}
            />
          </section>
        </div>
        <section className="register__form-group">
          <label className="register__form-label" htmlFor="user_field">
            Usuario
          </label>
          <i className="bx bx-user-pin register__form-icon"></i>
          <input
            placeholder="Usuario#123"
            name="username"
            type="text"
            required
            className="register__form-input"
            id="user_field"
            onChange={changed}
          />
        </section>

        <section className="register__form-group">
          <label className="register__form-label" htmlFor="email_field">
            Email
          </label>
          <i className="bx bx-envelope register__form-icon"></i>
          <input
            placeholder="user@hotmail.com"
            name="email"
            type="email"
            required
            className="register__form-input"
            id="email_field"
            onChange={changed}
          />
        </section>

        <section className="register__form-group">
          <label className="register__form-label" htmlFor="phone__field">
            Telefono
          </label>
          <i className="bx bx-phone register__form-icon"></i>
          <input
            placeholder="1175322520"
            name="phone"
            type="tel"
            required
            maxLength={10}
            minLength={10}
            className="register__form-input"
            id="email_field"
            onChange={changed}
          />
        </section>

        <section className="register__form-group">
          <label className="register__form-label" htmlFor="password_field">
            Contraseña
          </label>
          <i className="bx bx-lock-open register__form-icon"></i>
          <input
            placeholder="Contraseña"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            className="register__form-input"
            id="password_field"
            onChange={(e) => {
              changed(e);
              verifyPassword(e);
            }}
          />
          <span
            className="show-password-toggle"
            onClick={togglePasswordVisibility}
          >
            <img src={showPassword ? imgOpen : imgClosed} />
          </span>
        </section>
        <button type="submit" className="register__form-submit">
          Crear cuenta
        </button>
      </form>
    </main>
  );
};
