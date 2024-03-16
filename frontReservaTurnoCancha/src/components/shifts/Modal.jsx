import { toast } from "sonner";
import { Global } from "../../helpers/Global";

export const Modal = ({ isOpen, closeModal, shift, idCourt }) => {
  if (!isOpen) return null;

  const ReserveShift = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = JSON.parse(localStorage.getItem("token"));
    let Booking = {
      idCourtReserved: idCourt,
      idUserReserved: user.idUser,
      idShiftReserved: shift.idShift,
    };

    const request = await fetch(Global.url + "reservation/save", {
      method: "POST",
      body: JSON.stringify(Booking),
      headers: {
        Authorization: token.jwt,
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      toast.success("Reservado correctamente");
      closeModal();
    } else {
      toast.error("No se ha podido reservar el turno");
    }
  };
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
        <button className="reservation__submit" onClick={ReserveShift}>
          Confirmar
        </button>
      </article>
    </div>
  );
};
