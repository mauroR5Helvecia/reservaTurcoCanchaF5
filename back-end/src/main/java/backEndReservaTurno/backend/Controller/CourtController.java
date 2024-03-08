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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
        List<Court> listaCourts = courtServiceInterface.getCourts();
        ResponseApiCustom response = new ResponseApiCustom("success", listaCourts);
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        ResponseApiCustom response = new ResponseApiCustom("Fallo al traer las cancha", e.getMessage());
        return ResponseEntity.badRequest().body(response);
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
        try {
            courtServiceInterface.deleteCourt(id);
            ResponseApiCustom response = new ResponseApiCustom("success delete id: ", id);
            return ResponseEntity.ok(response);
        } catch (EmptyResultDataAccessException e) {
            String mensaje = "No se encontro cancha con el id correspondiente";
            ResponseApiCustom response = new ResponseApiCustom("Error: ", mensaje);
            return ResponseEntity.badRequest().body(response);

        } catch (Exception e) {
            ResponseApiCustom response = new ResponseApiCustom("Error: ", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCourt(@PathVariable Long id, @RequestBody Court updatedCourt) {
        //Busco la cancha

        Court existingCourt = courtServiceInterface.findCourtById(id).orElse(null);
        if (existingCourt != null) {
            // Si existe, actualizo los atributos con los nuevos valores
            existingCourt.setNameCourt(updatedCourt.getNameCourt());
            existingCourt.setLocation(updatedCourt.getLocation());
            existingCourt.setCapacity(updatedCourt.getCapacity());
            existingCourt.setPhone(updatedCourt.getPhone());
            existingCourt.setPrice(updatedCourt.getPrice());

            // Guardar los cambios en la base de datos
            courtServiceInterface.saveCourt(existingCourt);
            String mensaje = "Los datos de cancha id: "+ id + " fueron modificados exitosamente";
            ResponseApiCustom response = new ResponseApiCustom("Success: ", mensaje);
            return ResponseEntity.ok(response);
        } else {
            String mensaje = "El id: "+ id + " de la cancha, no existe";
            ResponseApiCustom response = new ResponseApiCustom("Error: ", mensaje);
            return ResponseEntity.badRequest().body(response);
                }


    }







}
