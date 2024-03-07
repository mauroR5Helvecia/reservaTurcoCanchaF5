package backEndReservaTurno.backend.Controller;
import backEndReservaTurno.backend.Entity.DTO.ReservationDTO;
import backEndReservaTurno.backend.Entity.Reservation;
import backEndReservaTurno.backend.Service.ReservationService.ReservationServiceInterface;
import backEndReservaTurno.backend.util.ResponseApiCustom;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;




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
}
