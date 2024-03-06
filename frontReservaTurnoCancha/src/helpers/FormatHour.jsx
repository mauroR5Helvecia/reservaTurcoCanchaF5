export const FormatHour = ({ turno }) => {
  const horaActual = turno.hourShift;

  const [horas, minutos] = horaActual.split(":");

  let horasEntero = parseInt(horas);

  horasEntero += 1;

  const horaIncrementada = horasEntero < 10 ? `0${horasEntero}` : horasEntero;

  const horaFinal = `${horaIncrementada}:${minutos}`;

  return horaFinal;
};
