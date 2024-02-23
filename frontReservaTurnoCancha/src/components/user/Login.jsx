export const Login = () => {
  return (
    <main className="layout__login">
      <form className="login__form">
        <header className="login__header">
          <p className="login__title">Inicia sesión </p>
          <span className="login__subtitle">
            Create tu cuenta y disfrutá de poder reservar tus turnos cuando lo
            necesites.
          </span>
        </header>

        <section className="login__form-group">
          <label className="login__form-label" htmlFor="email_field">
            Email
          </label>
          <i className="bx bx-envelope login__form-icon"></i>
          <input
            placeholder="user@mail.com"
            title="Inpit title"
            name="input-name"
            type="text"
            className="login__form-input"
            id="email_field"
          />
        </section>

        <section className="login__form-group">
          <label className="login__form-label" htmlFor="password_field">
            Contraseña
          </label>
          <i className="bx bx-lock-open login__form-icon"></i>
          <input
            placeholder="Contraseña"
            title="Inpit title"
            name="input-name"
            type="password"
            className="login__form-input"
            id="password_field"
          />
        </section>
        <button type="submit" className="login__form-submit">
          Iniciar sesión
        </button>

        <div className="separator">
          <hr className="line" />
          <span>o</span>
          <hr className="line" />
        </div>

        <button title="Sign In" type="submit" className="login__form-register">
          Crear una cuenta
        </button>
      </form>
    </main>
  );
};
