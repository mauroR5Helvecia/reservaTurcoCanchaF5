package backEndReservaTurno.backend.Service.ReservationService;
import backEndReservaTurno.backend.Entity.Court;
import backEndReservaTurno.backend.Entity.Reservation;
import backEndReservaTurno.backend.Entity.Shift;
import backEndReservaTurno.backend.security.entity.Usuario;

import java.util.List;
import java.util.Optional;

public interface ReservationServiceInterface {

    public List<Reservation> getReservations();

    public Reservation saveReservation (Court courtId, Shift shiftId, Usuario usuarioId);

    List<Reservation> getReservationCurrent();

    public void deleteReservation (Long id);

    public Optional<Reservation> findReservationById (Long id);


}
