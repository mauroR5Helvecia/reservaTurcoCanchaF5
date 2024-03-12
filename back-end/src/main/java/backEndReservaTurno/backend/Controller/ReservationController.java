package backEndReservaTurno.backend.Controller;
import backEndReservaTurno.backend.Entity.DTO.ReservationDTO;
import backEndReservaTurno.backend.Entity.Reservation;
import backEndReservaTurno.backend.Entity.Shift;
import backEndReservaTurno.backend.Service.ReservationService.ReservationServiceInterface;
import backEndReservaTurno.backend.util.ResponseApiCustom;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("apireserva/reservation")
@CrossOrigin(origins = "*")
public class ReservationController {

    private final static Logger log = LogManager.getLogger(Reservation.class);


    @Autowired
    private ReservationServiceInterface reservationServiceInterface;

    @PostMapping("/save")
    public ResponseEntity<?> saveReservation(@RequestBody ReservationDTO reservationDTO) {
        try {


        //Si la reserva esta lista para ser guardada
            reservationServiceInterface.saveReservation(reservationDTO);
             String mensaje = "se guardo la reserva";

            ResponseApiCustom response = new ResponseApiCustom("success", mensaje);
            log.info(mensaje);

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            ResponseApiCustom response = new ResponseApiCustom("error save reserved " , e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> reservationAll() {
        try {
            List<Reservation> reservations = reservationServiceInterface.getReservations();

            ResponseApiCustom response = new ResponseApiCustom("success reservations", reservations);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al obtener las reservas: : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //reservas desde dia actual en adelante



    @GetMapping("/alldays")
    public ResponseEntity<?> reservationAllDays() {
        try {
            LocalDate today = LocalDate.now();

            // Obtener todas las reservas
            List<Reservation> reservations = reservationServiceInterface.getReservations();

            // Filtrar las reservas desde el día actual en adelante
            List<Reservation> filteredReservations = reservations.stream()
                    .filter(reservation -> reservation.getIdShiftReserved().getDateShift().isAfter(today.minusDays(1))) // Considerando desde hoy en adelante
                    .collect(Collectors.toList());

            ResponseApiCustom response = new ResponseApiCustom("success reservations", filteredReservations);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al obtener las reservas: : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//reservas por desde el dia actual en adelante, filtradas por canchas, pasando el id
    @GetMapping("/alldayscourt/{idCourt}")
    public ResponseEntity<?> reservationAllDaysCourt(@PathVariable Long idCourt) {
        try {
            LocalDate today = LocalDate.now();

            // todas las reservas
            List<Reservation> reservations = reservationServiceInterface.getReservations();

            // las reservas desde el día actual en adelante para la cancha específica
            List<Reservation> filteredReservations = reservations.stream()
                    .filter(reservation -> reservation.getIdCourtReserved().getIdCourt().equals(idCourt))
                    .filter(reservation -> reservation.getIdShiftReserved().getDateShift().isAfter(today.minusDays(1))) // Considerando desde hoy en adelante
                    .collect(Collectors.toList());

            ResponseApiCustom response = new ResponseApiCustom("success reservations", filteredReservations);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al obtener las reservas: : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//las reservas filtradas por id de usuario
    @GetMapping("/alldaysuser/{idUser}")
    public ResponseEntity<?> reservationAllDaysUser(@PathVariable Long idUser) {
        try {
            LocalDate today = LocalDate.now();

            // Obtener todas las reservas
            List<Reservation> reservations = reservationServiceInterface.getReservationsAtShift();

            // Filtrar las reservas desde el día actual en adelante para el usuario específico
            List<Reservation> filteredReservations = reservations.stream()
                    .filter(reservation -> reservation.getIdUserReserved().getIdUsuario().equals(idUser))
                    .filter(reservation -> reservation.getIdShiftReserved().getDateShift().isAfter(today.minusDays(1))) // Considerando desde hoy en adelante
                    .collect(Collectors.toList());

            ResponseApiCustom response = new ResponseApiCustom("success reservations", filteredReservations);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al obtener las reservas: : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //eliminar reserva

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable Long id) {
        try {
            reservationServiceInterface.deleteReservation(id);
            String mensaje = "La reserva fue eliminada de manera correcta";
            ResponseApiCustom response = new ResponseApiCustom("success delete", mensaje);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {

            ResponseApiCustom response = new ResponseApiCustom("error delete", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }




}
