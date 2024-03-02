export const CourtSelector = ({ canchas, setSelectedCancha }) => {
  return (
    <div className="shifts__select-container">
      <select
        name="days"
        id="days"
        className="shift__day"
        onChange={(e) => setSelectedCancha(canchas[e.target.value])}
      >
        {canchas.map((cancha, indexOf) => {
          return (
            <option key={cancha.idCourt} value={indexOf}>
              {cancha.nameCourt}
            </option>
          );
        })}
      </select>
    </div>
  );
};
