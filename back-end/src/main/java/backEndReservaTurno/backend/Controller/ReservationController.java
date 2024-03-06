package backEndReservaTurno.backend.Controller;
import backEndReservaTurno.backend.Entity.Reservation;
import backEndReservaTurno.backend.Service.ReservationService.ReservationServiceInterface;
import backEndReservaTurno.backend.util.ResponseApiCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("apireserva/reserva")
@CrossOrigin(origins = "*")
public class ReservationController {


    @Autowired
    private ReservationServiceInterface reservationService;


    @PostMapping("/save")
    public ResponseEntity<?> saveReservation(@RequestBody Reservation reservation) {
        try {
            //verificar que los id, no sean nulos
            if (reservation.getIdCourtReserved() == null || reservation.getIdUserReserved() == null || reservation.getIdShiftReserved() == null) {

                String mensaje = "los id correspondientes a una reserva, no pueden ser nulos";
                ResponseApiCustom response = new ResponseApiCustom("error" , mensaje);

                return ResponseEntity.badRequest().body(response);
            }

            //verificar que el idShift no esté ya reservado
            Reservation existingReservation = reservationService.findReservationByIdShift(reservation.getIdShiftReserved());
            if (existingReservation != null) {
                String mensaje = "El idShift ya ha sido reservado";
                ResponseApiCustom response = new ResponseApiCustom("error" , mensaje);

                return ResponseEntity.badRequest().body(response);
            }

            //en caso de que vengan bien los datos
            Reservation savedReservation = reservationService.saveReservation(reservation);
            ResponseApiCustom response = new ResponseApiCustom("success shift" , savedReservation);
            return  ResponseEntity.ok(response);

        } catch (Exception e) {
            // en caso que ocurra una exception
            String mensaje = "Ah ocurrido un error en el servidor: ";
            ResponseApiCustom response = new ResponseApiCustom("error" , mensaje + e.getMessage());

            return ResponseEntity.internalServerError().body(response);
        }
    }

}
