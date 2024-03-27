package backEndReservaTurno.backend.Service.ReservationService;
import backEndReservaTurno.backend.Entity.DTO.ReservationDTO;
import backEndReservaTurno.backend.Entity.DTO.ReservationResponseDTO;
import backEndReservaTurno.backend.Entity.Reservation;
import backEndReservaTurno.backend.Entity.Shift;

import java.util.List;
import java.util.Optional;


public interface ReservationServiceInterface {

    public List<Reservation> getReservations();


    List<Reservation> getReservationsAtShift();

    public void saveReservation (ReservationDTO reservationDTO);

    List<Reservation> getReservationCurrent();

    public String deleteReservation (Long id);



    List<Reservation> findReservationByIdShift(Shift idShiftReserved);


    public Optional<Reservation> findReservationById(Long idReservation);

    public ReservationResponseDTO getDetailsReservation(Long idShiftReserved, Long idUserReserved, Long idCourtReserved, Long idReservation);

        public List<ReservationResponseDTO> getListReservation(List<Reservation> lista);








}
