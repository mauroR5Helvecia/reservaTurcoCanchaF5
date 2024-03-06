package backEndReservaTurno.backend.Service.CourtService;
import backEndReservaTurno.backend.Entity.Court;
import backEndReservaTurno.backend.Entity.Shift;
import java.util.List;
import java.util.Optional;


public interface CourtServiceInterface {
    public List<Court> getCourts ();

    public Court saveCourt (Court court);

    List<Shift> getShiftCurrent(String nameCourt);

    public void deleteCourt (Long id);

    public Optional<Court> findCourtById (Long id);

    public List<Shift> findByShiftTheCourt(String nameCourt);

    Optional<Court> findByReservation(String nameCourt);
}
