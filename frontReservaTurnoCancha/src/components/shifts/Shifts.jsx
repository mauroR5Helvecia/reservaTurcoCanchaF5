import { useEffect, useState } from "react";
import { ModalShift } from "./ModalShift";
import data from "../../data/prototype.json";
import Calendario from "./Calendario";
import { CourtSelector } from "./CourtSelector";

export const Shifts = () => {
  const [canchas, setCanchas] = useState([]);

  const [SelectedCancha, setSelectedCancha] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [startDate, setStartDate] = useState(new Date());

  const [shift, setShift] = useState({});

  useEffect(() => {
    setCanchas(data.canchas);
    setSelectedCancha(0);
  }, []);

  let canchaSeleccionada = data.canchas[SelectedCancha];

  let formaTime =
    startDate.getFullYear() +
    "-" +
    (startDate.getMonth() + 1) +
    "-" +
    startDate.getDate();

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
          Capacidad : {canchaSeleccionada.capacidad}{" "}
          <i className="bx bx-group shifts__extra-icon"></i>
        </span>
        <span>
          Precio x turno : {canchaSeleccionada.precio}
          <i className="bx bx-dollar shifts__extra-icon"></i>
        </span>
      </div>
      <ul className="list__shifts">
        {canchaSeleccionada.listaTurnos.length >= 1 &&
          canchaSeleccionada.listaTurnos.map((turno) => {
            return (
              turno.fechaTurno == formaTime && (
                <li className="shifts__shift" key={turno.idTurno}>
                  <div className="shift__box-info">
                    <h3 className="shift__info">{canchaSeleccionada.nombre}</h3>
                    <span className="shift__schedule">
                      {" "}
                      <i className="bx bx-time-five"></i> {`${turno.horaTurno}`}
                    </span>
                  </div>
                  <button
                    className="shift__submit"
                    onClick={() => {
                      activeModal(turno.fechaTurno, turno.horaTurno);
                    }}
                  >
                    Reservar
                  </button>
                </li>
              )
            );
          })}
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
