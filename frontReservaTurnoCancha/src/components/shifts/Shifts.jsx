import { useEffect, useState } from "react";
import { ModalShift } from "./ModalShift";
import data from "../../data/prototype.json";
import Calendario from "./Calendario";

export const Shifts = () => {
  const [canchas, setCanchas] = useState([]);

  const [SelectedCancha, setSelectedCancha] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    setCanchas(data.canchas);
    canchaSelection(0);
  }, [startDate]);

  const canchaSelection = (cancha) => {
    setSelectedCancha(cancha);
  };

  let canchaSeleccionada = data.canchas[SelectedCancha];
  console.log(startDate);

  let formaTime =
    startDate.getFullYear() +
    "-" +
    (startDate.getMonth() + 1) +
    "-" +
    startDate.getDate();

  return (
    <>
      <header className="list__shifts__header">
        <input
          type="date"
          defaultValue={""}
          min="2024-02-24"
          max="2024-03-01"
          className="shift__date"
        />

        <Calendario startDate={startDate} setStartDate={setStartDate} />
        <div className="custom-select">
          <select
            name="days"
            id="days"
            className="shift__day"
            onChange={(e) => canchaSelection(e.target.value)}
          >
            {canchas.map((cancha, indexOf) => {
              return (
                <option key={cancha.id_cancha} value={indexOf}>
                  {cancha.nombre}
                </option>
              );
            })}
          </select>
        </div>
      </header>
      <h2 className="list__shifts-title">Turnos disponibles</h2>
      <ul className="list__shifts">
        {canchaSeleccionada.listaTurnos.length >= 1 &&
          canchaSeleccionada.listaTurnos.map((turno) => {
            return (
              turno.fechaTurno == formaTime && (
                <li className="shifts__shift" key={turno.idTurno}>
                  <div className="shift__box-info">
                    <h3 className="shift__info">Cancha 1</h3>
                    <span className="shift__schedule">
                      {" "}
                      <i className="bx bx-time-five"></i> {`${turno.horaTurno}`}
                    </span>
                  </div>
                  <button
                    className="shift__submit"
                    onClick={() => {
                      setIsModalOpen(true);
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
        isOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};
