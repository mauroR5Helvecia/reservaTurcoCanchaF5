package backEndReservaTurno.backend.Controller;
import backEndReservaTurno.backend.Entity.Shift;
import backEndReservaTurno.backend.Service.ShiftService.ShiftServiceInterface;
import backEndReservaTurno.backend.security.controller.AuthController;
import backEndReservaTurno.backend.util.ResponseApiCustom;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("apireserva/shift")
@CrossOrigin(origins = "*")
public class ShiftController {

    private final static Logger log = LogManager.getLogger(ShiftController.class);

    @Autowired
    private ShiftServiceInterface shiftServiceInterface;

    // Save Shift
    @PostMapping("/save")
    public ResponseEntity<?> saveShift(@RequestBody Shift shift) {
        try {

            // Formateamos la hora antes de persistirla
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
            String horaFormateada = LocalTime.parse(shift.getHourShift()).format(formatter);
            shift.setHourShift(horaFormateada);
            Shift savedShift = shiftServiceInterface.saveShift(shift);
            ResponseApiCustom response = new ResponseApiCustom("success shift" + shift.getCourt().getNameCourt(), savedShift);
            log.info("Se agrego turno"  + " Dia: " + shift.getDateShift()+ "Hora: "+ shift.getHourShift());


            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            ResponseApiCustom response = new ResponseApiCustom("error save shift" , e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }


    //find all shift
    @GetMapping("/all")
    public ResponseEntity<?> getAllShift() {
        try {
            List<Shift> shifts = shiftServiceInterface.getShift();

            ResponseApiCustom response = new ResponseApiCustom("success shifts", shifts);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al obtener los turnos: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // Find by Id Shift
    @GetMapping("find/{id}")
    public ResponseEntity<?> getShiftById(@PathVariable Long id) {
        try {
            Optional<Shift> optionalShift = shiftServiceInterface.findShiftById(id);
            if (optionalShift.isPresent()) {
                return new ResponseEntity<>(optionalShift.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>("No se encontró ningun turnocon el ID proporcionado", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error al obtener el turno: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    //passing the id, delete corresponded Shift

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteShiftById(@PathVariable Long id) {
        try {
            shiftServiceInterface.deleteShift(id);
            return new ResponseEntity<>("El turno ha sido eliminada correctamente", HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            return new ResponseEntity<>("No se encontró turno con el ID especificado", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al eliminar el turno: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
