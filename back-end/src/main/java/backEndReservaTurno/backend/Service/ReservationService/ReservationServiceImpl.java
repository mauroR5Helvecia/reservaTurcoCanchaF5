package backEndReservaTurno.backend.Service.ReservationService;
import backEndReservaTurno.backend.Entity.Reservation;
import backEndReservaTurno.backend.Entity.Shift;
import backEndReservaTurno.backend.Repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationServiceImpl implements ReservationServiceInterface{

    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public List<Reservation> getReservations() {
        List<Reservation> listReservations= reservationRepository.findAll();
        return listReservations;
    }

    @Override
    public Reservation saveReservation(Reservation reservation) {

        try {
            // Guardar la reserva y devuelve el resultado
            return reservationRepository.save(reservation);
        } catch (Exception e) {
            throw new RuntimeException("Error al guardar la reserva", e);
        }
    }

    @Override
    public Reservation findReservationByIdShift(Shift idShiftReserved) {
        Reservation reservation = reservationRepository.findByidShiftReserved(idShiftReserved);
        if (reservation != null) {
            System.out.println("ya se encontro un id de turno guardado en la reserva");
            throw new RuntimeException("El turno ya se encuentra reservado");

        }
        return null;

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

    @Override
    public Optional<Reservation> findReservationById(Long id) {
        return reservationRepository.findById(Long.valueOf(id));
    }
}
