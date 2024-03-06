import { useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";

export const Register = () => {
  const { form, changed } = useForm();

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

      const data = await request.json();

      localStorage.setItem("email", newUser.email);

      let userEmail = localStorage.getItem("email");

      console.log(userEmail);

      navigate("/verify");


    } catch (error) {
      console.log("Error en registrar usuario", error);
    }
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

        <section className="register__form-group">
          <label className="register__form-label" htmlFor="name_field">
            Nombre
          </label>
          <i className="bx bx-user register__form-icon"></i>
          <input
            placeholder="Tu nombre"
            name="name"
            type="text"
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
            className="register__form-input"
            id="surname_field"
            onChange={changed}
          />
        </section>
        <section className="register__form-group">
          <label className="register__form-label" htmlFor="user_field">
            Usuario
          </label>
          <i className="bx bx-user-pin register__form-icon"></i>
          <input
            placeholder="Usuario#123"
            name="username"
            type="text"
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
            placeholder="user@mail.com"
            name="email"
            type="email"
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
            placeholder="+54 11 7532-2520"
            name="phone"
            type="tel"
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
            type="password"
            className="register__form-input"
            id="password_field"
            onChange={changed}
          />
        </section>
        <button type="submit" className="register__form-submit">
          Crear cuenta
        </button>
      </form>
    </main>
  );
};
