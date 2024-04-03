import PropTypes from "prop-types";

export const CourtSelector = ({ canchas, setSelectedCancha, setLastCourtSelector }) => {

  const handleSelectionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCancha(canchas[selectedValue]);
    setLastCourtSelector(selectedValue);
  };

  return (
    <div className="shifts__select-container">
      <select
        name="days"
        id="days"
        className="shift__day"
        onChange={handleSelectionChange}
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

CourtSelector.propTypes = {
  canchas: PropTypes.arrayOf(
    PropTypes.shape({
      idCourt: PropTypes.number.isRequired,
      nameCourt: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedCancha: PropTypes.func.isRequired,
  setLastCourtSelector: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
};

