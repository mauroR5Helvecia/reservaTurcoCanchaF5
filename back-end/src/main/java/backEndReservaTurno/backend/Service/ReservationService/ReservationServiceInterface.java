package backEndReservaTurno.backend.Service.ReservationService;
import backEndReservaTurno.backend.Entity.Reservation;
import backEndReservaTurno.backend.Entity.Shift;

import java.util.List;
import java.util.Optional;

public interface ReservationServiceInterface {

    public List<Reservation> getReservations();

    List<Reservation> getReservationCurrent();

    public void deleteReservation (Long id);

    public Optional<Reservation> findReservationById (Long id);


    Reservation saveReservation(Reservation reservation);

    Reservation findReservationByIdShift(Shift idShiftReserved);
}
