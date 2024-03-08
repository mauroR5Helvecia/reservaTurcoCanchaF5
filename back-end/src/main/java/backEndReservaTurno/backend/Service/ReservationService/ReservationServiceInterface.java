package backEndReservaTurno.backend.Service.ReservationService;
import backEndReservaTurno.backend.Entity.DTO.ReservationDTO;
import backEndReservaTurno.backend.Entity.Reservation;
import backEndReservaTurno.backend.Entity.Shift;

import java.util.List;


public interface ReservationServiceInterface {

    public List<Reservation> getReservations();


    public void saveReservation (ReservationDTO reservationDTO);

    List<Reservation> getReservationCurrent();

    public void deleteReservation (Long id);



    List<Reservation> findReservationByIdShift(Shift idShiftReserved);










}
