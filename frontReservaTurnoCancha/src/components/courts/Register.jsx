import { toast } from "sonner";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";

export const Register = ({ getCanchas }) => {
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

      if (request.status == 201)
        toast.success("Cancha registrada correctamente");

      getCanchas();
    } catch {
      toast.error("No se ha podido registrar correctamente");
    }
  };
  return (
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
          required
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
          required
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
          required
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
          required
          type="text"
          className="register__form-input"
          id="location__field"
          onChange={changed}
        />
      </section>

      <section className="register__form-group">
        <label className="register__form-label" htmlFor="price__field">
          Telefono
        </label>
        <i className="bx bx-phone register__form-icon"></i>
        <input
          placeholder="1125254040"
          name="phone"
          required
          maxLength={10}
          minLength={10}
          type="tel"
          className="register__form-input"
          id="price__field"
          onChange={changed}
        />
      </section>

      <button type="submit" className="register__form-submit">
        Agregar cancha
      </button>
    </form>
  );
};
