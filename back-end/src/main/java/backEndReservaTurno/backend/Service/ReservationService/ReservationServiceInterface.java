package backEndReservaTurno.backend.Service.ReservationService;
import backEndReservaTurno.backend.Entity.DTO.ReservationDTO;
import backEndReservaTurno.backend.Entity.Reservation;

import java.util.List;


public interface ReservationServiceInterface {

    public List<Reservation> getReservations();


    Reservation saveReservation (ReservationDTO reservationDTO);

    List<Reservation> getReservationCurrent();

    public void deleteReservation (Long id);








}
