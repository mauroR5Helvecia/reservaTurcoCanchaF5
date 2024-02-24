export const Shifts = () => {
  return (
    <>
      <header className="list__shifts__header">
        <input type="date" />
        <div className="custom-select">
          <select name="days" id="days" className="shift__day">
            <option value="Lunes" defaultChecked>
              Lunes
            </option>
            <option value="Martes">Martes</option>
            <option value="Miercoles">Miercoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sabado">Sabado</option>
            <option value="Domingo">Domingo</option>
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
          <button className="shift__submit">Reservar</button>
        </li>
        <li className="shifts__shift">
          <div className="shift__box-info">
            <h3 className="shift__info">Cancha 1</h3>
            <span className="shift__schedule">
              {" "}
              <i className="bx bx-time-five"></i> 21.00 - 22.00 hs
            </span>
          </div>
          <button className="shift__submit">Reservar</button>
        </li>

        <li className="shifts__shift">
          <div className="shift__box-info">
            <h3 className="shift__info">Cancha 1</h3>
            <span className="shift__schedule">
              {" "}
              <i className="bx bx-time-five"></i> 21.00 - 22.00 hs
            </span>
          </div>
          <button className="shift__submit">Reservar</button>
        </li>

        <li className="shifts__shift">
          <div className="shift__box-info">
            <h3 className="shift__info">Cancha 1</h3>
            <span className="shift__schedule">
              {" "}
              <i className="bx bx-time-five"></i> 21.00 - 22.00 hs
            </span>
          </div>
          <button className="shift__submit">Reservar</button>
        </li>

        <li className="shifts__shift">
          <div className="shift__box-info">
            <h3 className="shift__info">Cancha 1</h3>
            <span className="shift__schedule">
              {" "}
              <i className="bx bx-time-five"></i> 21.00 - 22.00 hs
            </span>
          </div>
          <button className="shift__submit">Reservar</button>
        </li>

        <li className="shifts__shift">
          <div className="shift__box-info">
            <h3 className="shift__info">Cancha 1</h3>
            <span className="shift__schedule">
              {" "}
              <i className="bx bx-time-five"></i> 21.00 - 22.00 hs
            </span>
          </div>
          <button className="shift__submit">Reservar</button>
        </li>
      </ul>
    </>
  );
};
