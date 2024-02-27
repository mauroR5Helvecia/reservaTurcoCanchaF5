import { useState, useEffect } from "react";

export const DaysForm = () => {
  const [days, setDays] = useState([]);
  const fechas = (e) => {
    e.preventDefault();

    console.log(fecha);
  };

  const dias = (e) => {
    if (e.target.checked) {
      setDays([...days, e.target.value]);
    } else {
      let pos = days.indexOf(e.target.value);
      days.splice(pos, 1);
    }
  };
  useEffect(() => {
    console.log(days);
  }, [dias]);

  console.log(days);
  return (
    <form onSubmit={fechas}>
      <h2>Definir días y horarios disponibles</h2>
      <section className="days">
        <label htmlFor="Lunes">
          Lunes
          <input
            type="checkbox"
            value="Lunes"
            id="Lunes"
            onChange={(e) => {
              dias(e);
            }}
          />
        </label>
        <label htmlFor="Martes">
          Martes
          <input
            type="checkbox"
            value="Martes"
            id="Martes"
            onChange={(e) => {
              dias(e);
            }}
          />
        </label>
        <label htmlFor="Miercoles">
          Miercoles
          <input
            name="Miercoles"
            type="checkbox"
            value="Miercoles"
            id="Miercoles"
            onChange={(e) => {
              dias(e);
            }}
          />
        </label>

        <label htmlFor="Jueves">
          Jueves
          <input
            type="checkbox"
            value="Jueves"
            id="Jueves"
            onChange={(e) => {
              dias(e);
            }}
          />
        </label>

        <label htmlFor="Viernes">
          Viernes
          <input
            type="checkbox"
            value="Viernes"
            id="Viernes"
            onChange={(e) => {
              dias(e);
            }}
          />
        </label>

        <label htmlFor="Sabado">
          Sabado
          <input
            type="checkbox"
            value="Sabado"
            id="Sabado"
            onChange={(e) => {
              dias(e);
            }}
          />
        </label>

        <label htmlFor="Domingo">
          Domingo
          <input
            type="checkbox"
            value="Domingo"
            id="Domingo"
            onChange={(e) => {
              dias(e);
            }}
          />
        </label>
      </section>

      <input type="submit" value="Definirlo" />
    </form>
  );
};
