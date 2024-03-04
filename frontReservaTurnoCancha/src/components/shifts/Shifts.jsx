import { useLayoutEffect, useEffect, useState } from "react";
import { ModalShift } from "./ModalShift";

import Calendario from "./Calendario";
import { CourtSelector } from "./CourtSelector";
import { Global } from "../../helpers/Global";

export const Shifts = () => {
  const [canchas, setCanchas] = useState([]);

  const [SelectedCancha, setSelectedCancha] = useState({ listShift: [] });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [startDate, setStartDate] = useState(new Date());

  const [shiftList, setShiftList] = useState([]);

  const [shift, setShift] = useState({});

  useLayoutEffect(() => {
    getCanchas();
  }, []);
  useEffect(() => {
    setShiftList(SelectedCancha.listShift);
  }, [SelectedCancha.listShift]);

  let formaTime = () => {
    let day = startDate.getDate();
    if (day <= 9) day = "0" + day;
    let month = startDate.getMonth();
    if (month <= 9) month = "0" + (month + 1);
    let year = startDate.getFullYear();

    return `${year}-${month}-${day}`;
  };

  let fechaFormateada = formaTime();
  const getCanchas = async () => {
    const request = await fetch(Global.url + "court/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    setCanchas(data.response);
    setSelectedCancha(data.response[0]);
    setShiftList(data.response[0].listShift);
  };

  const activeModal = (fechaTurno, horarioTurno, idTurno) => {
    let turnoInfo = {
      id: idTurno,
      cancha: canchaSeleccionada.nombre,
      fecha: fechaTurno,
      horario: horarioTurno,
      direccion: canchaSeleccionada.ubicacion,
      usuario: "Pablo Romero",
    };
    //Definir el turno a reservar
    setShift(turnoInfo);
    //Finalmente activar el modal
    setIsModalOpen(true);
  };
  return (
    <>
      <header className="list__shifts__header">
        <div className="calendary__handler">
          <Calendario startDate={startDate} setStartDate={setStartDate} />
        </div>

        <CourtSelector
          canchas={canchas}
          setSelectedCancha={setSelectedCancha}
        />
      </header>
      <h2 className="list__shifts-title">Turnos disponibles</h2>
      <div className="shifts__extra-info">
        <span>
          Capacidad : {SelectedCancha.capacity}{" "}
          <i className="bx bx-group shifts__extra-icon"></i>
        </span>
        <span>
          Precio x turno : {SelectedCancha.price}
          <i className="bx bx-dollar shifts__extra-icon"></i>
        </span>
      </div>
      <ul className="list__shifts">
        {shiftList.length >= 1
          ? shiftList.map((turno) => {
              return (
                turno.dateShift == fechaFormateada && (
                  <li className="shifts__shift" key={turno.idShift}>
                    <div className="shift__box-info">
                      <h3 className="shift__info">
                        {SelectedCancha.nameCourt}
                      </h3>
                      <span className="shift__schedule">
                        {" "}
                        <i className="bx bx-time-five"></i> {turno.hourShift}
                      </span>
                    </div>
                    <button
                      className="shift__submit"
                      onClick={() => {
                        activeModal(turno.dateShift, turno.hourShift);
                      }}
                    >
                      Reservar
                    </button>
                  </li>
                )
              );
            })
          : "No hay turnos"}
      </ul>

      <ModalShift
        shift={shift}
        isOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};
