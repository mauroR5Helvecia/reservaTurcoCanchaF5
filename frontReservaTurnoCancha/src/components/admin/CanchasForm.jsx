import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";
export const CanchasForm = () => {
  const { form, changed } = useForm();

  const registerCourt = async (e) => {
    e.preventDefault();
    let newCourt = form;
    try {
      const request = await fetch(Global.url + "court/save", {
        method: "POST",
        body: JSON.stringify(newCourt),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await request.json();
      console.log(data);
      console.log("Registed correctly");
    } catch {
      console.log("No se ha podido registrar correctamente");
    }
  };
  return (
    <main className="layout__login">
      <form className="register__form" onSubmit={registerCourt}>
        <header className="register__header">
          <p className="register__title">Registrar cancha</p>
          <span className="register__subtitle">
            Crea tu cancha y modificala acorde a tus necesidades!
          </span>
        </header>

        <section className="register__form-group">
          <label className="register__form-label" htmlFor="name_field">
            Nombre/Numero de cancha
          </label>
          <i className="bx bx-abacus register__form-icon"></i>
          <input
            placeholder="Cancha 1"
            name="nameCourt"
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
            placeholder="10"
            title="Inpit title"
            name="capacity"
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
            placeholder="4000"
            name="price"
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
            placeholder="Av.San Martin 123"
            name="location"
            type="text"
            className="register__form-input"
            id="location__field"
            onChange={changed}
          />
        </section>

        <button type="submit" className="register__form-submit">
          Agregar cancha
        </button>
      </form>

      <section className="court__list">
        <article className="court__article">
          <p className="court__name">
            Cancha 3 <i className="bx bx-football"></i>
          </p>
          <p className="court__info">Precio : $2500</p>
          <p className="court__info">
            Capacidad : <i className="bx bxs-group"></i>20
          </p>
          <p className="court__info">
            Ubicación : <i className="bx bx-current-location"></i>Av.Siempre
            Viva 123
          </p>

          <div className="court__buttons-container">
            <button className="court__edit">Editar</button>
            <button className="court__delete">Borrar</button>
          </div>
        </article>
        <article className="court__article">
          <p className="court__name">
            Cancha 3 <i className="bx bx-football"></i>
          </p>
          <p className="court__info">Precio : $2500</p>
          <p className="court__info">
            Capacidad : <i className="bx bxs-group"></i>20
          </p>
          <p className="court__info">
            Ubicación : <i className="bx bx-current-location"></i>Av.Siempre
            Viva 123
          </p>

          <div className="court__buttons-container">
            <button className="court__edit">Editar</button>
            <button className="court__delete">Borrar</button>
          </div>
        </article>
        <article className="court__article">
          <p className="court__name">
            Cancha 3 <i className="bx bx-football"></i>
          </p>
          <p className="court__info">Precio : $2500</p>
          <p className="court__info">
            Capacidad : <i className="bx bxs-group"></i>20
          </p>
          <p className="court__info">
            Ubicación : <i className="bx bx-current-location"></i>Av.Siempre
            Viva 123
          </p>

          <div className="court__buttons-container">
            <button className="court__edit">Editar</button>
            <button className="court__delete">Borrar</button>
          </div>
        </article>
        <article className="court__article">
          <p className="court__name">
            Cancha 3 <i className="bx bx-football"></i>
          </p>
          <p className="court__info">Precio : $2500</p>
          <p className="court__info">
            Capacidad : <i className="bx bxs-group"></i>20
          </p>
          <p className="court__info">
            Ubicación : <i className="bx bx-current-location"></i>Av.Siempre
            Viva 123
          </p>

          <div className="court__buttons-container">
            <button className="court__edit">Editar</button>
            <button className="court__delete">Borrar</button>
          </div>
        </article>
        <article className="court__article">
          <p className="court__name">
            Cancha 3 <i className="bx bx-football"></i>
          </p>
          <p className="court__info">Precio : $2500</p>
          <p className="court__info">
            Capacidad : <i className="bx bxs-group"></i>20
          </p>
          <p className="court__info">
            Ubicación : <i className="bx bx-current-location"></i>Av.Siempre
            Viva 123
          </p>

          <div className="court__buttons-container">
            <button className="court__edit">Editar</button>
            <button className="court__delete">Borrar</button>
          </div>
        </article>
        <article className="court__article">
          <p className="court__name">
            Cancha 3 <i className="bx bx-football"></i>
          </p>
          <p className="court__info">Precio : $2500</p>
          <p className="court__info">
            Capacidad : <i className="bx bxs-group"></i>20
          </p>
          <p className="court__info">
            Ubicación : <i className="bx bx-current-location"></i>Av.Siempre
            Viva 123
          </p>

          <div className="court__buttons-container">
            <button className="court__edit">Editar</button>
            <button className="court__delete">Borrar</button>
          </div>
        </article>
      </section>
    </main>
  );
};
