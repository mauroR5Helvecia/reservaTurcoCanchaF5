export const Register = () => {
  return (
    <main className="layout__login">
      <form className="register__form">
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
            title="Inpit title"
            name="input-name"
            type="text"
            className="register__form-input"
            id="name_field"
          />
        </section>

        <section className="register__form-group">
          <label className="register__form-label" htmlFor="surname_field">
            Apellido
          </label>
          <i className="bx bx-user register__form-icon"></i>
          <input
            placeholder="Tu nombre"
            title="Inpit title"
            name="input-name"
            type="text"
            className="register__form-input"
            id="surname_field"
          />
        </section>
        <section className="register__form-group">
          <label className="register__form-label" htmlFor="user_field">
            Usuario
          </label>
          <i className="bx bx-user-pin register__form-icon"></i>
          <input
            placeholder="Usuario#123"
            title="Inpit title"
            name="input-name"
            type="text"
            className="register__form-input"
            id="user_field"
          />
        </section>

        <section className="register__form-group">
          <label className="register__form-label" htmlFor="email_field">
            Email
          </label>
          <i className="bx bx-envelope register__form-icon"></i>
          <input
            placeholder="user@mail.com"
            title="Inpit title"
            name="input-name"
            type="email"
            className="register__form-input"
            id="email_field"
          />
        </section>

        <section className="register__form-group">
          <label className="register__form-label" htmlFor="email_field">
            Email
          </label>
          <i className="bx bx-phone register__form-icon"></i>
          <input
            placeholder="+54 11 7532-2520"
            title="Inpit title"
            name="input-name"
            type="tel"
            className="register__form-input"
            id="email_field"
          />
        </section>

        <section className="register__form-group">
          <label className="register__form-label" htmlFor="password_field">
            Contraseña
          </label>
          <i className="bx bx-lock-open register__form-icon"></i>
          <input
            placeholder="Contraseña"
            title="Inpit title"
            name="input-name"
            type="password"
            className="register__form-input"
            id="password_field"
          />
        </section>
        <button type="submit" className="register__form-submit">
          Crear cuenta
        </button>
      </form>
    </main>
  );
};
