package backEndReservaTurno.backend.Controller;

import backEndReservaTurno.backend.Entity.Advertisement;
import backEndReservaTurno.backend.Entity.Court;
import backEndReservaTurno.backend.Service.AdvertisementService.AdverticementServiceInterface;
import backEndReservaTurno.backend.util.ResponseApiCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("apireserva/advertisement")
@CrossOrigin(origins = "*")
public class AdvertisementController {

    @Autowired
    private AdverticementServiceInterface adverticementServiceInterface;


    //Create anuncio
    @PostMapping("/save")
    public ResponseEntity<?> saveAdvertisement(@RequestBody Advertisement advertisement) {
        try {
            adverticementServiceInterface.saveAdvertisement(advertisement);
            String mensaje = "Se guardo correctamente el anuncio";
            ResponseApiCustom response = new ResponseApiCustom("Success", mensaje);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ResponseApiCustom response = new ResponseApiCustom("Error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/lastthree")
    public ResponseEntity<?> getAllAdvertisement() {
        try {
            List<Advertisement> list = adverticementServiceInterface.getAdvertisement();
            int size = list.size();
            int startIndex = Math.max(size - 3, 0); // Para asegurarse de que startIndex no sea negativo
            List<Advertisement> lastThreeAdvertisements = list.subList(startIndex, size);
            Collections.reverse(lastThreeAdvertisements);
            ResponseApiCustom response = new ResponseApiCustom("success", lastThreeAdvertisements);
            return ResponseEntity.ok(response);
        }catch (EmptyResultDataAccessException e) {
            ResponseApiCustom response = new ResponseApiCustom("Error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            ResponseApiCustom response = new ResponseApiCustom("Error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }


    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteShiftById(@PathVariable String id) {
        try {
            // Verificar si el anuncio con el ID proporcionado existe
            if (!adverticementServiceInterface.existsById(Long.parseLong(id))) {
                // Si el anuncio no existe, devolver un error
                String mensaje = "El anuncio con el ID " + id + " no existe";
                ResponseApiCustom response = new ResponseApiCustom("Error", mensaje);
                return ResponseEntity.badRequest().body(response);
            }

            adverticementServiceInterface.deleteAdvertisement(Long.parseLong(id));
            String mensaje = "El anuncio se elimino correctamente";
            ResponseApiCustom response = new ResponseApiCustom("success", mensaje);
            return ResponseEntity.ok(response);
        } catch (EmptyResultDataAccessException e) {
            ResponseApiCustom response = new ResponseApiCustom("Error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            ResponseApiCustom response = new ResponseApiCustom("Error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }



}
