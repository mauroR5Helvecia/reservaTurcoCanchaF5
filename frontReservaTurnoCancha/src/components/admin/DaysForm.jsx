import { useState, useEffect } from "react";

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
  const dateOfDay = (diaSemana) => {
    diaSemana = diaSemana.toLowerCase();

    let fechaActual = new Date();
    let diaActual = fechaActual.getDate();

    let diasSemana = [
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
    ];

    // Encontrar el índice del día de la semana dado en el arreglo de días de la semana
    let indiceDia = diasSemana.indexOf(diaSemana);

    if (indiceDia === -1) {
      return "Día de la semana inválido";
    }

    // Calcular cuántos días faltan hasta el próximo día de la semana especificado
    let diasFaltantes = (indiceDia - fechaActual.getDay() + 7) % 7;

    // Crear la nueva fecha sumando los días faltantes
    let nuevaFecha = new Date(fechaActual);
    nuevaFecha.setDate(diaActual + diasFaltantes);
    let nuevoDia = nuevaFecha.getDate();
    if (nuevoDia <= 9) {
      nuevoDia = `0${nuevoDia}`;
    }
    let nuevoMes = nuevaFecha.getMonth() + 1;
    let nuevoAño = nuevaFecha.getFullYear();

    return {
      dayAndDate: `${diaSemana} ${nuevoDia}/${nuevoMes}/${nuevoAño}`,
      onlyDate: `${nuevoDia}/${nuevoMes}/${nuevoAño}`,
    };
  };

  const dias = (e) => {
    if (e.target.checked) {
      setDays([...days, e.target.value]);
    } else {
      let pos = days.indexOf(e.target.value);
      days.splice(pos, 1);
    }
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

    let Acumulador = `${secondValue - firstValue}`;

    days.map(async (fecha) => {
      let shift = {
        dateShift: Date.UTC(fecha),
        hourShift: firstValue,
        court: SelectedCancha.idCourt,
      };

      for (let i = 0; i < Acumulador; i++) {
        shift.hourShift = firstValue + i;

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
      <section className="days">
        <label htmlFor="Lunes" className="days__form-label">
          {dateOfDay("Lunes").dayAndDate}
          <input
            type="checkbox"
            className="days__form-day"
            value={dateOfDay("Lunes").onlyDate}
            id="Lunes"
            onChange={(e) => {
              dias(e);
            }}
          />
        </label>

        <label htmlFor="Martes" className="days__form-label">
          {dateOfDay("Martes").dayAndDate}
          <input
            type="checkbox"
            className="days__form-day"
            value={dateOfDay("Martes").onlyDate}
            id="Martes"
            onChange={(e) => {
              dias(e);
            }}
          />
        </label>

        <label htmlFor="Miércoles" className="days__form-label">
          {dateOfDay("Miércoles").dayAndDate}
          <input
            type="checkbox"
            className="days__form-day"
            value={dateOfDay("Miércoles").onlyDate}
            id="Miércoles"
            onChange={(e) => {
              dias(e);
            }}
          />
        </label>

        <label htmlFor="Jueves" className="days__form-label">
          {dateOfDay("Jueves").dayAndDate}
          <input
            type="checkbox"
            className="days__form-day"
            value={dateOfDay("Jueves").onlyDate}
            id="Jueves"
            onChange={(e) => {
              dias(e);
            }}
          />
        </label>

        <label htmlFor="Viernes" className="days__form-label">
          {dateOfDay("Viernes").dayAndDate}
          <input
            type="checkbox"
            className="days__form-day"
            value={dateOfDay("Viernes").onlyDate}
            id="Viernes"
            onChange={(e) => {
              dias(e);
            }}
          />
        </label>

        <label htmlFor="Sábado" className="days__form-label">
          {dateOfDay("Sábado").dayAndDate}
          <input
            type="checkbox"
            className="days__form-day"
            value={dateOfDay("Sábado").onlyDate}
            id="Sábado"
            onChange={(e) => {
              dias(e);
            }}
          />
        </label>

        <label htmlFor="Domingo" className="days__form-label">
          {dateOfDay("Domingo").dayAndDate}
          <input
            type="checkbox"
            className="days__form-day"
            value={dateOfDay("Domingo").onlyDate}
            id="Domingo"
            onChange={(e) => {
              dias(e);
            }}
          />
        </label>
      </section>
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
