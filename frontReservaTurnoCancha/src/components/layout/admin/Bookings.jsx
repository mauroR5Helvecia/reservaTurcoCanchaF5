import { ReservedShifts } from "../../shifts/ReservedShifts";

export const Bookings = () => {
  return (
    <div className="Bookings__container">
      <section className="Bookings__list">
        <ReservedShifts />
      </section>
      <section className="Bookings__announcement">
        <form className="announcement__form-text">
          <h2> Haz un anuncio</h2>
          <label htmlFor="message">
            <textarea
              name="textarea"
              id="message"
              placeholder="Anuncio a realizar"
            ></textarea>
          </label>
          <button type="submit">Enviar</button>
        </form>

        <form className="announcement__form-photos">
          <h2>Sube tus fotos</h2>
          <label className="announcement__file-upload" htmlFor="file">
            <div className="announcement__icon-container">
              <i className="bx bx-cloud-upload upload__icon"></i>
            </div>
            <div className="text">
              <span>Click to upload image</span>
            </div>
            <input type="file" id="file" />
          </label>

          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
};
