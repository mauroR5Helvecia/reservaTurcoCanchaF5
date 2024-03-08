import { useState, useEffect } from "react";
import { Dates } from "../../../helpers/Dates";
import { CourtSelector } from "../../shifts/CourtSelector";
import { Global } from "../../../helpers/Global";
import { toast } from "sonner";
import { Link, NavLink } from "react-router-dom";
export const Schedules = () => {
  const [days, setDays] = useState([]);
  const [canchas, setCanchas] = useState([]);
  const [SelectedCancha, setSelectedCancha] = useState();

  useEffect(() => {
    getCanchas();
  }, []);

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
  };

  const shiftsCreator = async (e) => {
    e.preventDefault();

    let hourList = [e.target.firstValue.value, e.target.secondValue.value].sort(
      (a, b) => {
        return a - b;
      }
    );
    let firstValue = Number(hourList[0]);
    let secondValue = Number(hourList[1]);
    if (firstValue > 24 || secondValue > 24) {
      return console.log("Value must be more than 1 and less than 24");
    }

    let Acumulador = secondValue - firstValue;
    let timeFormated = "";
    let ListofShifts = [];
    days.map((fecha) => {
      for (let i = 0; i < Acumulador; i++) {
        if (firstValue + i <= 9) {
          timeFormated = "0" + (firstValue + i) + ":00";
        } else {
          timeFormated = "" + (firstValue + i) + ":00";
        }
        let shift = {
          dateShift: fecha,
          hourShift: timeFormated,
          court: { idCourt: SelectedCancha.idCourt },
        };
        ListofShifts.push(shift);
      }
    });

    console.log(ListofShifts);
    for (const shift of ListofShifts) {
      try {
        const request = await fetch(Global.url + "shift/save", {
          method: "POST",
          body: JSON.stringify(shift),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (request.status === 200) {
          toast.success(
            `Turno creado correctamente: ${shift.dateShift} a las ${shift.hourShift}`
          );
        } else {
          toast.warning(
            `El turno ${shift.dateShift} a las ${shift.hourShift} ya existe`
          );
        }
      } catch (error) {
        console.error("Error al procesar el turno:", error);
        toast.error("Ocurrió un error al procesar los turnos");
      }
    }
  };

  return (
    <form onSubmit={shiftsCreator} className="days__form">
      <h2>Definir días y horarios disponibles</h2>
      <CourtSelector canchas={canchas} setSelectedCancha={setSelectedCancha} />
      <Dates setDays={setDays} days={days} />
      <section className="days__form-group">
        <label className="days__form-numb-label" htmlFor="firstValue">
          Desde las
        </label>
        <i className="bx bx-time days__form-icon"></i>
        <input
          placeholder="0 a 24 hs"
          type="num"
          id="primerHora"
          required
          name="firstValue"
          className="days__form-input"
        />
      </section>
      <section className="days__form-group">
        <label className="days__form-numb-label" htmlFor="secondValue">
          Hasta las
        </label>
        <i className="bx bx-time days__form-icon"></i>
        <input
          placeholder="0 a 24 hs"
          type="num"
          id="segundaHora"
          required
          name="secondValue"
          className="days__form-input"
        />
      </section>

      <button type="submit" className="days__form-submit">
        Definir dias
      </button>

      <div className="separator">
        <hr className="line" />
        <span>o</span>
        <hr className="line" />
      </div>

      <Link to="Edit" className="days__form-submit days__form-edit">
        Modificar horarios
      </Link>
    </form>
  );
};
