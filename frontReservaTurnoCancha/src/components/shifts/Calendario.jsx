import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendario = ({ startDate, setStartDate }) => {
  // Calcula qué día es hoy
  const today = new Date();

  // Calcula la fecha mínima permitida (hoy)
  const minDate = new Date();
  minDate.setDate(today.getDate()); // A partir de mañana

  // Calcula la fecha máxima permitida (1 semana en adelante)
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7); // Una semana en adelante

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText="Seleccione una fecha"
        className="shift__date"
      />
    </div>
  );
};

export default Calendario;
