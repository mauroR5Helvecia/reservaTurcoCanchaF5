import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";

export const ReservedShifts = () => {
  const [shift, setShift] = useState({
    nameCourt: "Cancha 2",
    dateShift: "22-05-2024",
    hourShift: "22:00 a 23:00",
    location: "Av.San martin 123",
    usuario: "Juan carlos",
  });

  useEffect(() => {
    getShiftsReserved();
  }, []);
  const { idUser } = JSON.parse(localStorage.getItem("user"));

  const getShiftsReserved = async () => {
    const request = await fetch(Global.url + "reservation/alldays", {
      method: "GET",
    });

    const data = await request.json();

    console.log(data);
  };

  const deleteShift = async () => {
    const request = await fetch("deleteCourt", {
      method: "DELETE",
    });
  };
  return (
    <div className="reserved-shifts__container">
      <article className="reservation__container">
        <h3 className="reservation__title">Turno reservado</h3>

        <div className="reservation__info">
          <p>
            <i className="bx bx-football"></i> {shift.nameCourt}
          </p>
          <p>
            <i className="bx bx-calendar"></i> Fecha: {shift.dateShift}
          </p>
          <p>
            <i className="bx bxs-hourglass-top"></i> Horario : {shift.hourShift}
          </p>

          <p>
            <i className="bx bx-map"></i> Dirección: {shift.location}
          </p>
          <p>
            <i className="bx bx-user"></i> Reserva: {shift.usuario}
          </p>
        </div>
        <button className="reservation__submit" onClick={deleteShift}>
          Eliminar
        </button>
      </article>
      <article className="reservation__container">
        <h3 className="reservation__title">Turno reservado</h3>

        <div className="reservation__info">
          <p>
            <i className="bx bx-football"></i> {shift.nameCourt}
          </p>
          <p>
            <i className="bx bx-calendar"></i> Fecha: {shift.dateShift}
          </p>
          <p>
            <i className="bx bxs-hourglass-top"></i> Horario : {shift.hourShift}
          </p>

          <p>
            <i className="bx bx-map"></i> Dirección: {shift.location}
          </p>
          <p>
            <i className="bx bx-user"></i> Reserva: {shift.usuario}
          </p>
        </div>
        <button className="reservation__submit" onClick={deleteShift}>
          Eliminar
        </button>
      </article>
      <article className="reservation__container">
        <h3 className="reservation__title">Turno reservado</h3>

        <div className="reservation__info">
          <p>
            <i className="bx bx-football"></i> {shift.nameCourt}
          </p>
          <p>
            <i className="bx bx-calendar"></i> Fecha: {shift.dateShift}
          </p>
          <p>
            <i className="bx bxs-hourglass-top"></i> Horario : {shift.hourShift}
          </p>

          <p>
            <i className="bx bx-map"></i> Dirección: {shift.location}
          </p>
          <p>
            <i className="bx bx-user"></i> Reserva: {shift.usuario}
          </p>
        </div>
        <button className="reservation__submit" onClick={deleteShift}>
          Eliminar
        </button>
      </article>
      <article className="reservation__container">
        <h3 className="reservation__title">Turno reservado</h3>

        <div className="reservation__info">
          <p>
            <i className="bx bx-football"></i> {shift.nameCourt}
          </p>
          <p>
            <i className="bx bx-calendar"></i> Fecha: {shift.dateShift}
          </p>
          <p>
            <i className="bx bxs-hourglass-top"></i> Horario : {shift.hourShift}
          </p>

          <p>
            <i className="bx bx-map"></i> Dirección: {shift.location}
          </p>
          <p>
            <i className="bx bx-user"></i> Reserva: {shift.usuario}
          </p>
        </div>
        <button className="reservation__submit" onClick={deleteShift}>
          Eliminar
        </button>
      </article>
      <article className="reservation__container">
        <h3 className="reservation__title">Turno reservado</h3>

        <div className="reservation__info">
          <p>
            <i className="bx bx-football"></i> {shift.nameCourt}
          </p>
          <p>
            <i className="bx bx-calendar"></i> Fecha: {shift.dateShift}
          </p>
          <p>
            <i className="bx bxs-hourglass-top"></i> Horario : {shift.hourShift}
          </p>

          <p>
            <i className="bx bx-map"></i> Dirección: {shift.location}
          </p>
          <p>
            <i className="bx bx-user"></i> Reserva: {shift.usuario}
          </p>
        </div>
        <button className="reservation__submit" onClick={deleteShift}>
          Eliminar
        </button>
      </article>
      <article className="reservation__container">
        <h3 className="reservation__title">Turno reservado</h3>

        <div className="reservation__info">
          <p>
            <i className="bx bx-football"></i> {shift.nameCourt}
          </p>
          <p>
            <i className="bx bx-calendar"></i> Fecha: {shift.dateShift}
          </p>
          <p>
            <i className="bx bxs-hourglass-top"></i> Horario : {shift.hourShift}
          </p>

          <p>
            <i className="bx bx-map"></i> Dirección: {shift.location}
          </p>
          <p>
            <i className="bx bx-user"></i> Reserva: {shift.usuario}
          </p>
        </div>
        <button className="reservation__submit" onClick={deleteShift}>
          Eliminar
        </button>
      </article>
      <article className="reservation__container">
        <h3 className="reservation__title">Turno reservado</h3>

        <div className="reservation__info">
          <p>
            <i className="bx bx-football"></i> {shift.nameCourt}
          </p>
          <p>
            <i className="bx bx-calendar"></i> Fecha: {shift.dateShift}
          </p>
          <p>
            <i className="bx bxs-hourglass-top"></i> Horario : {shift.hourShift}
          </p>

          <p>
            <i className="bx bx-map"></i> Dirección: {shift.location}
          </p>
          <p>
            <i className="bx bx-user"></i> Reserva: {shift.usuario}
          </p>
        </div>
        <button className="reservation__submit" onClick={deleteShift}>
          Eliminar
        </button>
      </article>
      <article className="reservation__container">
        <h3 className="reservation__title">Turno reservado</h3>

        <div className="reservation__info">
          <p>
            <i className="bx bx-football"></i> {shift.nameCourt}
          </p>
          <p>
            <i className="bx bx-calendar"></i> Fecha: {shift.dateShift}
          </p>
          <p>
            <i className="bx bxs-hourglass-top"></i> Horario : {shift.hourShift}
          </p>

          <p>
            <i className="bx bx-map"></i> Dirección: {shift.location}
          </p>
          <p>
            <i className="bx bx-user"></i> Reserva: {shift.usuario}
          </p>
        </div>
        <button className="reservation__submit" onClick={deleteShift}>
          Eliminar
        </button>
      </article>
      <article className="reservation__container">
        <h3 className="reservation__title">Turno reservado</h3>

        <div className="reservation__info">
          <p>
            <i className="bx bx-football"></i> {shift.nameCourt}
          </p>
          <p>
            <i className="bx bx-calendar"></i> Fecha: {shift.dateShift}
          </p>
          <p>
            <i className="bx bxs-hourglass-top"></i> Horario : {shift.hourShift}
          </p>

          <p>
            <i className="bx bx-map"></i> Dirección: {shift.location}
          </p>
          <p>
            <i className="bx bx-user"></i> Reserva: {shift.usuario}
          </p>
        </div>
        <button className="reservation__submit" onClick={deleteShift}>
          Eliminar
        </button>
      </article>
    </div>
  );
};
