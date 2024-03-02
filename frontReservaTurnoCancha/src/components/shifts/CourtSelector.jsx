export const CourtSelector = ({ canchas, setSelectedCancha }) => {
  return (
    <div className="shifts__select-container">
      <select
        name="days"
        id="days"
        className="shift__day"
        onChange={(e) => setSelectedCancha(e.target.value)}
      >
        {canchas.map((cancha, indexOf) => {
          return (
            <option key={cancha.id_cancha} value={indexOf}>
              {cancha.nombre}
            </option>
          );
        })}
      </select>
    </div>
  );
};
