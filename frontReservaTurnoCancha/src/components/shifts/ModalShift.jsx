export const ModalShift = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="modal__reservation">
      <article className="reservation__container">
        <i className="bx bx-x reservation__closeModal" onClick={closeModal}></i>
        <h3 className="reservation__title">
          Estás a un paso de completar tu reserva
        </h3>

        <div className="reservation__info">
          <p>
            <i className="bx bx-football"></i> Cancha n°: 1
          </p>
          <p>
            <i className="bx bx-calendar"></i> Fecha: 24/02/2024
          </p>
          <p>
            <i className="bx bxs-hourglass-top"></i> Horario : 21.00 - 22.00 hs
          </p>

          <p>
            <i className="bx bx-map"></i> Dirección: Av.corrientes 2021
          </p>
          <p>
            <i className="bx bx-user"></i> Reserva: Juan Alvarez
          </p>
        </div>
        <button className="reservation__submit">Confirmar</button>
      </article>
    </div>
  );
};
