import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";

export const Update = ({ getCanchas, cancha, setEditing }) => {
  const { form, changed } = useForm();

  const editCourt = async (e, idCourt) => {
    e.preventDefault();

    const courtUpdated = {
      ...cancha,
      ...form,
    };

    const request = await fetch(Global.url + "court/update/" + idCourt, {
      method: "PUT",
      body: JSON.stringify(courtUpdated),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    getCanchas();
    console.log(data);
  };
  return (
    <section className="court__register">
      <form
        className="register__form"
        onSubmit={(e) => {
          editCourt(e, cancha.idCourt);
        }}
      >
        <header className="register__header">
          <p className="register__title">Editar cancha :{cancha.nameCourt}</p>
        </header>

        <section className="register__form-group">
          <label className="register__form-label" htmlFor="name_field">
            Nombre/Numero de cancha
          </label>
          <i className="bx bx-abacus register__form-icon"></i>
          <input
            name="nameCourt"
            placeholder={cancha.nameCourt}
            type="text"
            className="register__form-input"
            id="name_field"
            onChange={changed}
          />
        </section>

        <section className="register__form-group">
          <label className="register__form-label" htmlFor="capacity__field">
            Capacidad
          </label>
          <i className="bx bx-group register__form-icon"></i>
          <input
            name="capacity"
            placeholder={cancha.capacity}
            type="number"
            className="register__form-input"
            id="capacity__field"
            onChange={changed}
          />
        </section>

        <section className="register__form-group">
          <label className="register__form-label" htmlFor="price__field">
            Precio del turno
          </label>
          <i className="bx bx-dollar register__form-icon"></i>
          <input
            name="price"
            placeholder={cancha.price}
            type="num"
            className="register__form-input"
            id="price__field"
            onChange={changed}
          />
        </section>

        <section className="register__form-group">
          <label className="register__form-label" htmlFor="location__field">
            Ubicación
          </label>
          <i className="bx bx-current-location register__form-icon"></i>
          <input
            name="location"
            placeholder={cancha.location}
            type="text"
            className="register__form-input"
            id="location__field"
            onChange={changed}
          />
        </section>
        <section className="register__form-group">
          <label className="register__form-label" htmlFor="phone__field">
            Teléfono
          </label>
          <i className="bx bx-phone register__form-icon"></i>
          <input
            name="phone"
            placeholder={cancha.phone}
            type="tel"
            className="register__form-input"
            id="phone__field"
            onChange={changed}
          />
        </section>
        <button type="submit" className="register__form-submit">
          Actualizar cancha
        </button>

        <div className="separator">
          <hr className="line" />
          <span>o</span>
          <hr className="line" />
        </div>

        <button
          className="login__form-register"
          onClick={() => {
            setEditing(false);
          }}
        >
          Crear una cancha
        </button>
      </form>
    </section>
  );
};
