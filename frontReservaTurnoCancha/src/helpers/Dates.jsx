import { useState } from "react";
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
    let nuevoDia = nuevaFecha.getDate();
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
      onlyDate: `${nuevoDia}-${nuevoMes}-${nuevoAño}`,
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
      {diasSemana.map((Día) => {
        return (
          <label htmlFor={Día} className="days__form-label" key={Día}>
            {dateOfDay(Día).dayAndDate}
            <input
              type="checkbox"
              className="days__form-day"
              value={dateOfDay(Día).onlyDate}
              id={Día}
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
