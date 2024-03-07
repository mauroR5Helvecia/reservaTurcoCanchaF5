package backEndReservaTurno.backend.Service.ReservationService;
import backEndReservaTurno.backend.Entity.Court;
import backEndReservaTurno.backend.Entity.DTO.ReservationDTO;
import backEndReservaTurno.backend.Entity.Reservation;
import backEndReservaTurno.backend.Entity.Shift;
import backEndReservaTurno.backend.Repository.CourtRepository;
import backEndReservaTurno.backend.Repository.ReservationRepository;
import backEndReservaTurno.backend.Repository.ShiftRepository;
import backEndReservaTurno.backend.security.entity.Usuario;
import backEndReservaTurno.backend.security.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;


@Service
public class ReservationServiceImpl implements ReservationServiceInterface{

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private CourtRepository courtRepository;

    @Autowired
    private UsuarioRepository userRepository;

    @Autowired
    private ShiftRepository shiftRepository;


    @Override
    public List<Reservation> getReservations() {
        List<Reservation> listReservations= reservationRepository.findAll();
        return listReservations;
    }



    @Override
    public Reservation saveReservation(ReservationDTO reservationDTO) {
            Court court = courtRepository.findById(reservationDTO.getIdCourtReserved())
                    .orElseThrow(() -> new IllegalArgumentException("Court no encontrada"));
            Usuario user = userRepository.findById(reservationDTO.getIdUserReserved())
                    .orElseThrow(() -> new IllegalArgumentException("User not encontrado"));
            Shift shift = shiftRepository.findById(reservationDTO.getIdShiftReserved())
                    .orElseThrow(() -> new IllegalArgumentException("Shift no encontrado"));

            Reservation reservation = new Reservation();
            reservation.setIdCourtReserved(court);
            reservation.setIdUserReserved(user);
            reservation.setIdShiftReserved(shift);

            return reservationRepository.save(reservation);
        }








    @Override
    public List<Reservation> getReservationCurrent() {
        // Obtener la fecha actual
        Date startDate = new Date();

        // Calcular la fecha 7 días posteriores
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);
        calendar.add(Calendar.DAY_OF_YEAR, 7);
        Date endDate = calendar.getTime();

        // Obtener las reservas para los próximos 7 días
        return reservationRepository.findByShiftDateBetween(startDate, endDate);
    }

    @Override
    public void deleteReservation(Long id) {
            reservationRepository.deleteById(id);
    }




}
