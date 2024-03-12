import { useState, useEffect } from "react";

export const Dates = ({ setDays, days }) => {
  const [diasSemana, setDiasSemana] = useState([
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ]);

  // Definir estado para almacenar las fechas ordenadas
  const [sortedDates, setSortedDates] = useState([]);

  // useEffect para ordenar las fechas cuando cambie 'diasSemana' o 'days'
  useEffect(() => {
    const sorted = diasSemana
      .map((dia) => {
        return dateOfDay(dia);
      })
      .sort((a, b) => {
        return new Date(a.onlyDate) - new Date(b.onlyDate);
      });
    setSortedDates(sorted);
  }, [diasSemana, days]);

  const dateOfDay = (diaSemana) => {
    diaSemana = diaSemana.toLowerCase();

    let fechaActual = new Date();
    let diaActual = fechaActual.getDate();

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
    let nuevoDia = nuevaFecha.getDate() + 1;
    if (nuevoDia <= 9) {
      nuevoDia = `0${nuevoDia}`;
    }
    let nuevoMes = nuevaFecha.getMonth() + 1;
    if (nuevoMes <= 9) {
      nuevoMes = `0${nuevoMes}`;
    }
    let nuevoAño = nuevaFecha.getFullYear();

    return {
      dayAndDate: `${diaSemana} ${nuevoDia}-${nuevoMes}-${nuevoAño}`,
      onlyDate: `${nuevoAño}-${nuevoMes}-${nuevoDia}`,
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

  return (
    <section className="days">
      {sortedDates.map((date) => {
        return (
          <label
            htmlFor={date.onlyDate}
            className="days__form-label"
            key={date.onlyDate}
          >
            {date.dayAndDate}
            <input
              type="checkbox"
              className="days__form-day"
              value={date.onlyDate}
              id={date.onlyDate}
              onChange={(e) => {
                dias(e);
              }}
            />
          </label>
        );
      })}
    </section>
  );
};
