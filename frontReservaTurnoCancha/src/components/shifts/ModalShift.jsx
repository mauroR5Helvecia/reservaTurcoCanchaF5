export const ModalShift = ({ isOpen, closeModal, shift }) => {
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
            <i className="bx bx-football"></i> {shift.nameCourt}
          </p>
          <p>
            <i className="bx bx-calendar"></i> Fecha: {shift.dateShift}
          </p>
          <p>
            <i className="bx bxs-hourglass-top"></i> Horario : {shift.hourShift}
          </p>

          <p>
            <i className="bx bx-map"></i> Dirección: {shift.location}
          </p>
          <p>
            <i className="bx bx-user"></i> Reserva: {shift.usuario}
          </p>
        </div>
        <button className="reservation__submit">Confirmar</button>
      </article>
    </div>
  );
};
