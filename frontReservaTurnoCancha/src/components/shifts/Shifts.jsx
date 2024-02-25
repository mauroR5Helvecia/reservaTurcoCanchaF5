import { useState } from "react";
import { ModalShift } from "./ModalShift";

export const Shifts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <header className="list__shifts__header">
        <input type="date" defaultValue="2024-02-24" className="shift__date" />
        <div className="custom-select">
          <select name="days" id="days" className="shift__day">
            <option value="Lunes" defaultChecked>
              Cancha 1
            </option>
            <option value="Martes">Cancha 2</option>
            <option value="Miercoles">Cancha 3</option>
            <option value="Jueves">Cancha 4</option>
          </select>
        </div>
      </header>
      <h2 className="list__shifts-title">Turnos disponibles</h2>
      <ul className="list__shifts">
        <li className="shifts__shift">
          <div className="shift__box-info">
            <h3 className="shift__info">Cancha 1</h3>
            <span className="shift__schedule">
              {" "}
              <i className="bx bx-time-five"></i> 21.00 - 22.00 hs
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

        <li className="shifts__shift">
          <div className="shift__box-info">
            <h3 className="shift__info">Cancha 1</h3>
            <span className="shift__schedule">
              {" "}
              <i className="bx bx-time-five"></i> 21.00 - 22.00 hs
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

        <li className="shifts__shift">
          <div className="shift__box-info">
            <h3 className="shift__info">Cancha 1</h3>
            <span className="shift__schedule">
              {" "}
              <i className="bx bx-time-five"></i> 21.00 - 22.00 hs
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

        <li className="shifts__shift">
          <div className="shift__box-info">
            <h3 className="shift__info">Cancha 1</h3>
            <span className="shift__schedule">
              {" "}
              <i className="bx bx-time-five"></i> 21.00 - 22.00 hs
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

        <li className="shifts__shift">
          <div className="shift__box-info">
            <h3 className="shift__info">Cancha 1</h3>
            <span className="shift__schedule">
              {" "}
              <i className="bx bx-time-five"></i> 21.00 - 22.00 hs
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

        <li className="shifts__shift">
          <div className="shift__box-info">
            <h3 className="shift__info">Cancha 1</h3>
            <span className="shift__schedule">
              {" "}
              <i className="bx bx-time-five"></i> 21.00 - 22.00 hs
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

        <li className="shifts__shift">
          <div className="shift__box-info">
            <h3 className="shift__info">Cancha 1</h3>
            <span className="shift__schedule">
              {" "}
              <i className="bx bx-time-five"></i> 21.00 - 22.00 hs
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
