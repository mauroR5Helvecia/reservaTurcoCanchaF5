package backEndReservaTurno.backend.Controller;
import backEndReservaTurno.backend.Entity.Shift;
import backEndReservaTurno.backend.Service.ShiftService.ShiftServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("apireserva/shift")
@CrossOrigin(origins = "*")
public class ShiftController {

    @Autowired
    private ShiftServiceInterface shiftServiceInterface;

    // Save Shift
    @PostMapping("/save")
    public ResponseEntity<?> saveShift(@RequestBody Shift shift) {
        try {
            Shift savedShift = shiftServiceInterface.saveShift(shift);
            return new ResponseEntity<>(savedShift, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al guardar el turno: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //find all shift
    @GetMapping("/all")
    public ResponseEntity<?> getAllShift() {
        try {
            List<Shift> shifts = shiftServiceInterface.getShift();
            return new ResponseEntity<>(shifts, HttpStatus.OK);
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
