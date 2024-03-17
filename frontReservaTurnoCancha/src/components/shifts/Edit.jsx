import { useLayoutEffect, useEffect, useState } from "react";
import Calendario from "./Calendario";
import { CourtSelector } from "./CourtSelector";
import { Global } from "../../helpers/Global";
import { FormatHour } from "../../helpers/FormatHour";

export const Edit = () => {
  const [canchas, setCanchas] = useState([]);

  const [SelectedCancha, setSelectedCancha] = useState({ listShift: [] });

  const [startDate, setStartDate] = useState(new Date());

  const [shiftList, setShiftList] = useState([]);

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

  return (
    <main className="edit__container">
      <header className="list__shifts__header">
        <div className="calendary__handler">
          <Calendario startDate={startDate} setStartDate={setStartDate} />
        </div>

        <CourtSelector
          canchas={canchas}
          setSelectedCancha={setSelectedCancha}
        />
      </header>
      <h2 className="list__shifts-title">Turnos definidos</h2>
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
      <div className="admin__list-shifts">
        {shiftList.length >= 1
          ? shiftList.map((turno) => {
              console.log(turno);
              return (
                turno.dateShift == fechaFormateada && (
                  <div className="shifts__shift" key={turno.idShift}>
                    <h3 className="shift__info">{SelectedCancha.nameCourt}</h3>
                    <span className="shift__schedule">
                      {" "}
                      <i className="bx bx-time-five"></i> {turno.hourShift}hs a{" "}
                      {<FormatHour turno={turno} />}hs
                    </span>

                    <p>
                      <strong>Estado</strong>:{" "}
                      {turno.shiftReserved ? "No reservado" : "Reservado"}
                    </p>
                    <button className="shift__submit">Eliminar</button>
                  </div>
                )
              );
            })
          : "No hay turnos"}
      </div>
    </main>
  );
};
