package backEndReservaTurno.backend.Controller;
import backEndReservaTurno.backend.Entity.Court;
import backEndReservaTurno.backend.Entity.Shift;
import backEndReservaTurno.backend.Service.CourtService.CourtServiceInterface;
import backEndReservaTurno.backend.util.ResponseApiCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("apireserva/court")
@CrossOrigin(origins = "*")
public class CourtController {


    @Autowired
    private CourtServiceInterface courtServiceInterface;

// Save Court
    @PostMapping("/save")
    public ResponseEntity<?> saveCourt(@RequestBody Court court) {
        try {
            Court savedCourt = courtServiceInterface.saveCourt(court);
            return new ResponseEntity<>(savedCourt, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al guardar la cancha: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



//find all courts
    @GetMapping("/all")
    public ResponseEntity<?> getAllCourts() {
        try {
            List<Court> courts = courtServiceInterface.getCourts();
            ResponseApiCustom response = new ResponseApiCustom("success", courts);
            return ResponseEntity.ok(response);
        } catch (Exception e) {

            ResponseApiCustom response = new ResponseApiCustom("Fallo al traer las cancha", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

// Find by Id Court
    @GetMapping("find/{id}")
    public ResponseEntity<?> getCourtById(@PathVariable Long id) {
        try {
            Optional<Court> optionalCourt = courtServiceInterface.findCourtById(id);
            if (optionalCourt.isPresent()) {
                return new ResponseEntity<>(optionalCourt.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>("No se encontró ninguna cancha con el ID proporcionado", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error al obtener la cancha: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Passing the name of the court, returns the list of turns the currentdate at 7 days posterior

    @GetMapping("/shifts")
    public ResponseEntity<?> getShiftsByCourtName(@RequestParam String nameCourt) {
        try {
            List<Shift> shifts = courtServiceInterface.findByShiftTheCourt(nameCourt);
            return new ResponseEntity<>(shifts, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al obtener los turnos de la cancha: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Passing the name of the court, returns the list of turns the currentdate at 1 days posterior

    @GetMapping("/shiftsdays")
    public ResponseEntity<?> getShiftsByCourtNameDay (@RequestParam String nameCourt) {
        try {
            List<Shift> shifts = courtServiceInterface.getShiftCurrent(nameCourt);
            return new ResponseEntity<>(shifts, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al obtener los turnos de la cancha: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    //passing the id, delete corresponded Court and Shift

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteCourtById(@PathVariable Long id) {
        Optional<Court> court = courtServiceInterface.findCourtById(id);
        if (court.isPresent()) {
            try {
                courtServiceInterface.deleteCourt(id);
                ResponseApiCustom response = new ResponseApiCustom("success delete cancha", id );
                return ResponseEntity.ok(response);
            } catch (Exception e) {
                ResponseApiCustom response = new ResponseApiCustom("error delete cancha", e.getMessage() );
                return ResponseEntity.ok(response);
            }
        } else {
            ResponseApiCustom response = new ResponseApiCustom("error delete cancha", "La cancha no existe en la base de datos" );
            return ResponseEntity.ok(response);
        }
    }









}
