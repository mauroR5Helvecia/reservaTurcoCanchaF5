package backEndReservaTurno.backend.Service.ReservationService;
import backEndReservaTurno.backend.Entity.Court;
import backEndReservaTurno.backend.Entity.DTO.ReservationDTO;
import backEndReservaTurno.backend.Entity.DTO.ReservationResponseDTO;
import backEndReservaTurno.backend.Entity.Reservation;
import backEndReservaTurno.backend.Entity.Shift;
import backEndReservaTurno.backend.Repository.CourtRepository;
import backEndReservaTurno.backend.Repository.ReservationRepository;
import backEndReservaTurno.backend.Repository.ShiftRepository;
import backEndReservaTurno.backend.Service.ShiftService.ShiftServiceInterface;
import backEndReservaTurno.backend.security.entity.Usuario;
import backEndReservaTurno.backend.security.repository.UsuarioRepository;
import backEndReservaTurno.backend.security.service.UsuarioServiceInterface;
import backEndReservaTurno.backend.util.ResponseApiCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.NameNotFoundException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;


@Service
public class ReservationServiceImpl implements ReservationServiceInterface{

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private CourtRepository courtRepository;

    @Autowired
    private UsuarioRepository userRepository;

    @Autowired
    private UsuarioServiceInterface usuarioServiceInterface;

    @Autowired
    private ShiftRepository shiftRepository;

    @Autowired
    private ShiftServiceInterface shiftServiceInterface;


    @Override
    public List<Reservation> getReservations() {
        List<Reservation> listReservations= reservationRepository.findAll();
        return listReservations;
    }

    @Override
    public List<Reservation> getReservationsAtShift() {
        // Obtener todas las reservas
        List<Reservation> listReservations = reservationRepository.findAll();

        // Recorrer la lista de reservas
        for (Reservation reservation : listReservations) {
            // Obtener el id del turno reservado
            Long idShiftReserved = reservation.getIdShiftReserved().getIdShift();

            // Busco el turno utilizando el id obtenido
            Optional<Shift> optionalShift = shiftServiceInterface.findShiftById(idShiftReserved);

            // Se obtiene el turno
            Shift shift = optionalShift.get();

            // Asignar el turno a la reserva
          reservation.setIdShiftReserved(shift);
        }

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
    public String deleteReservation(Long id) {
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

                return "Success delete reservation";
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

    @Override
    public Optional<Reservation> findReservationById(Long idReservation) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(idReservation);
        if (optionalReservation.isPresent()) {
            return optionalReservation;
        } else {
            throw new RuntimeException("Reservation not found with ID: " + idReservation);
        }
    }


    @Override
    public ReservationResponseDTO getDetailsReservation(Long idShiftReserved, Long idUserReserved, Long idCourtReserved, Long idReservation) {
        try{

            Court court = courtRepository.findById(idCourtReserved)
                    .orElseThrow(()-> new IllegalArgumentException("La cancha no fue encontrada"));
            Shift shift = shiftRepository.findById(idShiftReserved)
                    .orElseThrow(()-> new IllegalArgumentException("El turno no fue encontrado"));
            Usuario usuario = userRepository.findById(idUserReserved)
                    .orElseThrow(()-> new IllegalArgumentException("El usuario no fue encontrado"));

            ReservationResponseDTO reservationResponseDTO = new ReservationResponseDTO();

            reservationResponseDTO.setIdReservation(idReservation);
            reservationResponseDTO.setNameCourt(court.getNameCourt());
            reservationResponseDTO.setLocation(court.getLocation());
            reservationResponseDTO.setDateShift(shift.getDateShift());
            reservationResponseDTO.setHourShift(shift.getHourShift());
            reservationResponseDTO.setLocation(court.getLocation());
            reservationResponseDTO.setName(usuario.getName());
            reservationResponseDTO.setLastName(usuario.getLastName());
            reservationResponseDTO.setEmail(usuario.getEmail());
            reservationResponseDTO.setUsername(usuario.getUsername());
            reservationResponseDTO.setPhone(usuario.getPhone());
            return reservationResponseDTO;
        }catch (Exception e){
            throw new RuntimeException("Ocurrió un error al obtener los detalles de la reserva", e);

        }

    }

    @Override
    public List<ReservationResponseDTO> getListReservation(List<Reservation> lista) {
        List<Reservation> listReservations = lista;
        List<ReservationResponseDTO> listReservationDTO = new ArrayList<>();

        try {
            for (Reservation reservation : listReservations) {
                Long idReservation = reservation.getIdReservation().longValue();
                Long idCourtReserved = reservation.getIdCourtReserved().getIdCourt();
                Long idUserReserved = reservation.getIdUserReserved().getIdUsuario();
                Long idShiftReserved = reservation.getIdShiftReserved().getIdShift();

                // Llamar a la función para obtener los detalles de la reserva
                ReservationResponseDTO reservationDetails = getDetailsReservation(idShiftReserved, idUserReserved, idCourtReserved, idReservation);

                // Agregar los detalles de la reserva a la lista
                listReservationDTO.add(reservationDetails);
            }
        } catch (Exception e) {

            e.printStackTrace();
        }

        return listReservationDTO;
    }



}
