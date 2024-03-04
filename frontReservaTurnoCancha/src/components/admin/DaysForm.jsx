import { useState, useEffect } from "react";
import { Dates } from "../../helpers/Dates";
import { CourtSelector } from "../shifts/CourtSelector";
import { Global } from "../../helpers/Global";
export const DaysForm = () => {
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

    setCanchas(data);
    setSelectedCancha(data[0]);
  };

  const shiftsCreator = (e) => {
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

    days.map(async (fecha) => {
      let shift = {
        dateShift: fecha,
        hourShift: firstValue,
        court: 1,
      };
      let hourFormated = "";
      for (let i = 0; i < Acumulador; i++) {
        if (firstValue < 9) {
          hourFormated = `0${firstValue + i}:00`;
        } else {
          hourFormated = `${firstValue + i}:00`;
        }

        shift.hourShift = hourFormated;

        console.log(shift);
        await fetch(Global.url + "shift/save", {
          method: "POST",
          body: JSON.stringify(shift),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    });
  };

  const handleChange = (e) => {
    let value = e.target.value;

    if (value > 24 || value < 1) {
      e.target.style.border = "1px solid red";
    } else {
      e.target.style.border = "1px solid green";
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
          onChange={handleChange}
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
          onChange={handleChange}
          name="secondValue"
          className="days__form-input"
        />
      </section>

      <button type="submit" className="days__form-submit">
        Definir dias
      </button>
    </form>
  );
};
