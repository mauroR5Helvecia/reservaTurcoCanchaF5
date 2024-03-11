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
import backEndReservaTurno.backend.util.ResponseApiCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;


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
    public void saveReservation(ReservationDTO reservationDTO) {
        Court court = courtRepository.findById(reservationDTO.getIdCourtReserved())
                .orElseThrow(() -> new IllegalArgumentException("Court no encontrada"));
        Usuario user = userRepository.findById(reservationDTO.getIdUserReserved())
                .orElseThrow(() -> new IllegalArgumentException("User not encontrado"));
        Shift shift = shiftRepository.findById(reservationDTO.getIdShiftReserved())
                .orElseThrow(() -> new IllegalArgumentException("Shift no encontrado"));


        //en caso de que el turno no se encuentre asociado a una reserva, se continua el proceso de persistencia
        //se instancia una Reserva
        Reservation reservation = new Reservation();
        reservation.setIdCourtReserved(court);
        reservation.setIdUserReserved(user);
        reservation.setIdShiftReserved(shift);

        List<Reservation> reservaShift = findReservationByIdShift(reservation.getIdShiftReserved());

        if (reservaShift.isEmpty()) {
            shift.setShiftReserved(true);
            reservationRepository.save(reservation);
            String mensaje = "se guardo la reserva";
            ResponseApiCustom response = new ResponseApiCustom("success", mensaje);

        } else {
            String mensaje = "Ya se encontro un turno asociado a una reserva";
            System.out.println("El Turno, ya esta asociado a una reserva");
            throw new IllegalArgumentException(mensaje);


        }

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
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isPresent()) {
            Reservation reservation = optionalReservation.get();

            // Obtener la hora de la reserva que se quiere eliminar
            LocalDateTime reservationStartDateTime = reservation.getIdShiftReserved().getDateShift().atTime(LocalTime.parse(reservation.getIdShiftReserved().getHourShift()));

            //pasarla a zona horaria argentina
            ZonedDateTime startDateTimeInBuenosAires = reservationStartDateTime.atZone(ZoneId.of("America/Argentina/Buenos_Aires"));

            //imprimo para verificar que llega
            System.out.println("Hora actual de la reserva es : " + startDateTimeInBuenosAires);


            // Veo la hora local en que se quiere eliminar
            ZonedDateTime currentDateTime = ZonedDateTime.now(ZoneId.of("America/Argentina/Buenos_Aires"));
            System.out.println("Hora que se quiere eliminar: " + currentDateTime);


            // Calcular la diferencia absoluta en horas entre startDateTimeInBuenosAires y currentDateTime
            long hoursUntilReservationStarts = Math.abs(ChronoUnit.HOURS.between(currentDateTime, startDateTimeInBuenosAires));
            System.out.println("Esta es la diferencia entre horas: "+ hoursUntilReservationStarts);

            if (hoursUntilReservationStarts < 2) {
                throw new RuntimeException("No se puede eliminar la reserva con menos de dos horas de anticipación.");
            } else {
                // Cambiar el atributo shiftReserved del turno asociado a la reserva a false
                Shift shift = reservation.getIdShiftReserved();
                shift.setShiftReserved(false);

                // Guardar el turno actualizado en la base de datos
                shiftRepository.save(shift);

                // Eliminar la reserva
                reservationRepository.deleteById(id);
            }
        } else {
            throw new RuntimeException("Reserva no encontrada con el ID: " + id);
        }
    }


    @Override
    public List<Reservation> findReservationByIdShift(Shift idShiftReserved) {
        List<Reservation> reservation = reservationRepository.findByidShiftReserved(idShiftReserved);
        return reservation;

    }






}
