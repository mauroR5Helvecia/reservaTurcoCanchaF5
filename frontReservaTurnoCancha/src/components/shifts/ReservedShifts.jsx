import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { toast } from "sonner";

export const ReservedShifts = ({ endpoint = "alldaysuser" }) => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    getShiftsReserved();
  }, []);

  const token = JSON.parse(localStorage.getItem("token"));
  const { idUser } = JSON.parse(localStorage.getItem("user"));

  const getShiftsReserved = async () => {
    const location = window.location.href;
    let allShifts = "";

    if (location.includes("user")) {
      allShifts = "/" + idUser;
    }

    console.log(location);
    const request = await fetch(
      Global.url + "reservation/" + endpoint + allShifts,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await request.json();

    if (data.status == "success reservations") {
      setShifts(data.response);
    }
  };

  const deleteShift = async (idUser) => {
    const request = await fetch(Global.url + "reservation/delete/" + idUser, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    const data = await request.json();

    if (data.status == "success delete") {
      toast.error("Turno cancelado correctamente");
      getShiftsReserved();
    } else {
      toast.warning("No se ha podido cancelar el turno");
    }
  };
  return (
    <div className="reserved-shifts__container">
      {shifts.map((shift) => {
        return (
          <article className="reservation__container" key={shift.idReservation}>
            <h3 className="reservation__title">Turno reservado</h3>

            <div className="reservation__info">
              <p>
                <i className="bx bx-football"></i> {shift.nameCourt}
              </p>
              <p>
                <i className="bx bx-calendar"></i> Fecha: {shift.dateShift}
              </p>
              <p>
                <i className="bx bxs-hourglass-top"></i> Horario :{" "}
                {shift.hourShift}
              </p>

              <p>
                <i className="bx bx-map"></i> Dirección: {shift.location}
              </p>
              <p>
                <i className="bx bx-user"></i> Reserva:{" "}
                {shift.name + " " + shift.lastName}
              </p>
            </div>
            <button
              className="reservation__submit"
              onClick={() => {
                deleteShift(shift.idReservation);
              }}
            >
              Eliminar
            </button>
          </article>
        );
      })}
    </div>
  );
};
