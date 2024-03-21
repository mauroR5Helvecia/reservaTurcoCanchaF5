import { useState, useEffect } from "react";

export const Dates = ({ setDays, days, additionalDays }) => {
  const [diasSemana, setDiasSemana] = useState([
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ]);

  const [sortedDates, setSortedDates] = useState([]);

  useEffect(() => {
    const sorted = diasSemana
      .map((dia) => {
        return dateOfDay(dia, additionalDays);
      })
      .sort((a, b) => {
        return new Date(a.onlyDate) - new Date(b.onlyDate);
      });
    setSortedDates(sorted);
  }, [diasSemana, days, additionalDays]);

  const dateOfDay = (diaSemana, additionalDays) => {
    diaSemana = diaSemana.toLowerCase();
    let fechaActual = new Date();
    let diaActual = fechaActual.getDate() + 1;

    let indiceDia = diasSemana.indexOf(diaSemana);

    if (indiceDia === -1) {
      return "Día de la semana inválido";
    }

    let diasFaltantes = (indiceDia - fechaActual.getDay() + 7) % 7;

    let diasExtra = additionalDays % 7;
    let semanasExtra = Math.floor(additionalDays / 7);

    diasFaltantes += diasExtra;

    if (diasFaltantes >= 7) {
      diasFaltantes -= 7;
      semanasExtra++;
    }

    let nuevaFecha = new Date(fechaActual);
    nuevaFecha.setDate(diaActual + diasFaltantes + semanasExtra * 7);

    let nuevoDia = nuevaFecha.getDate();
    let nuevoMes = nuevaFecha.getMonth() + 1;
    let nuevoAño = nuevaFecha.getFullYear();

    if (nuevoDia <= 9) {
      nuevoDia = `0${nuevoDia}`;
    }
    if (nuevoMes <= 9) {
      nuevoMes = `0${nuevoMes}`;
    }

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

  console.log(sortedDates);
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
