package backEndReservaTurno.backend.Controller;
import backEndReservaTurno.backend.Entity.DTO.ReservationDTO;
import backEndReservaTurno.backend.Entity.DTO.ReservationResponseDTO;
import backEndReservaTurno.backend.Entity.Reservation;
import backEndReservaTurno.backend.Service.ReservationService.ReservationServiceInterface;
import backEndReservaTurno.backend.javaMailSender.MailController;
import backEndReservaTurno.backend.javaMailSender.emailDTO.EmailDTOVerify;
import backEndReservaTurno.backend.util.ResponseApiCustom;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("apireserva/reservation")
@CrossOrigin(origins = "*")
public class ReservationController {

    private final static Logger log = LogManager.getLogger(Reservation.class);


    @Autowired
    private ReservationServiceInterface reservationServiceInterface;

    @Autowired
    private MailController mailController;

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

            List<ReservationResponseDTO> listModelReserved = reservationServiceInterface.getListReservation(reservations);
            ResponseApiCustom response = new ResponseApiCustom("success reservations", listModelReserved);

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

            List<ReservationResponseDTO> listModelReserved = reservationServiceInterface.getListReservation(filteredReservations);
            ResponseApiCustom response = new ResponseApiCustom("success reservations", listModelReserved);

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

            List<ReservationResponseDTO> listModelReserved = reservationServiceInterface.getListReservation(filteredReservations);
            ResponseApiCustom response = new ResponseApiCustom("success reservations", listModelReserved);

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


            List<ReservationResponseDTO> listModelReserved = reservationServiceInterface.getListReservation(filteredReservations);
            ResponseApiCustom response = new ResponseApiCustom("success reservations", listModelReserved);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al obtener las reservas: : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Para traer detalles de una reserva, pasando el idUserReserved e idShiftReserved

//    @GetMapping("/detail/{idShiftReserved}/{idUserReserved}/{idCourtReserved}/{idReservation}")
//    public ResponseEntity<?> getDetailReserved (@PathVariable(name = "idShiftReserved") String idShiftReserved, @PathVariable(name = "idUserReserved") String idUserReserved,  @PathVariable(name = "idCourtReserved") String idCourtReserved, @PathVariable(name = "idReservation") String idReservation){
//
//        try{
//            ReservationResponseDTO detailsReservation = reservationServiceInterface.getDetailsReservation(Long.parseLong(idShiftReserved), Long.parseLong(idUserReserved), Long.parseLong(idCourtReserved), Long.parseLong(idReservation));
//            ResponseApiCustom response = new ResponseApiCustom("success", detailsReservation);
//            return ResponseEntity.ok(response);
//        }catch (Exception e){
//            ResponseApiCustom response = new ResponseApiCustom("error", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//
//    }

    //eliminar reserva

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable Long id) {
        try {
            //find reservation by id

            Optional<Reservation> reservation = reservationServiceInterface.findReservationById(id);

            //delete reservation
            String responseDelete = reservationServiceInterface.deleteReservation(id);

            if (responseDelete.equals("Success delete reservation") && reservation.isPresent()){
                ReservationResponseDTO dtoReserva = reservationServiceInterface.getDetailsReservation(reservation.get().getIdShiftReserved().getIdShift(), reservation.get().getIdUserReserved().getIdUsuario(), reservation.get().getIdCourtReserved().getIdCourt(), reservation.get().getIdReservation());
                String subject = "La reserva en Cancha "+ dtoReserva.getNameCourt() +" a sido cancelada";
                String message = dtoReserva.getName()+" "+dtoReserva.getLastName()+ " le informamos que la reserva en fecha " + dtoReserva.getDateShift()+ " en horario "+ dtoReserva.getHourShift() + " Horas a sido cancelada, visite nuestro sitio para ver los horarios disponibles. Gracias";
                EmailDTOVerify emailDTOVerify = new EmailDTOVerify(dtoReserva.getEmail(), subject, message);
                mailController.sendVerifyemail(emailDTOVerify);

            }

            String mensaje = "La reserva fue eliminada de manera correcta";
            ResponseApiCustom response = new ResponseApiCustom("success delete", mensaje);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {

            ResponseApiCustom response = new ResponseApiCustom("error delete", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }




}
