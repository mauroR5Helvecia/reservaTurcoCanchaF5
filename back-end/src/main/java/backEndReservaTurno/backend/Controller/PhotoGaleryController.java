package backEndReservaTurno.backend.Controller;
import backEndReservaTurno.backend.Entity.PhotoGalery;
import backEndReservaTurno.backend.Service.PhotoGaleryService.PhotoGaleryServiceInterface;
import backEndReservaTurno.backend.subidaArchivos.IUploadFilesService;
import backEndReservaTurno.backend.util.ResponseApiCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("apireserva/photogalery")
@CrossOrigin(origins = "*")
public class PhotoGaleryController {

    @Autowired
    private IUploadFilesService iUploadFilesService;

    @Autowired
    private PhotoGaleryServiceInterface photoGaleryServiceInterface;



    @PostMapping("/save")
    public ResponseEntity<?> savePhoto(@RequestParam(name = "photo") MultipartFile file1) throws Exception {

        try {

            PhotoGalery photoGalery = new PhotoGalery();
            String fileName1 = iUploadFilesService.handleFileUpload(file1);
            photoGalery.setPhoto(fileName1);

            photoGaleryServiceInterface.savePhotoGalery(photoGalery);

            String mensaje = "Se guardo la imagen: "+ fileName1;
            ResponseApiCustom response = new ResponseApiCustom("success", mensaje);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            ResponseApiCustom response = new ResponseApiCustom("error", e.getMessage());
            return  ResponseEntity.badRequest().body(response);

        }


    }


    @GetMapping("/latestfive")
    public ResponseEntity<?> getLatestPhotos() {
        try {
            List<PhotoGalery>  latestFivePhotos = photoGaleryServiceInterface.getPhotoGalery();

            // Invertir la lista de fotos
            Collections.reverse(latestFivePhotos );

            List<PhotoGalery> latestPhotos = latestFivePhotos.subList(0, Math.min(5, latestFivePhotos.size()));

            if (!latestFivePhotos.isEmpty()) {
                ResponseApiCustom response = new ResponseApiCustom("success", latestPhotos);
                return ResponseEntity.ok(response);
            } else {
                String mensaje = "La lista de fotografias esta vacia";
                ResponseApiCustom response = new ResponseApiCustom("success", mensaje);
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            ResponseApiCustom response = new ResponseApiCustom("error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllPhotos() {
        try {
            List<PhotoGalery>  latestPhotos = photoGaleryServiceInterface.getPhotoGalery();



            if (!latestPhotos.isEmpty()) {
                ResponseApiCustom response = new ResponseApiCustom("success", latestPhotos);
                return ResponseEntity.ok(response);
            } else {
                String mensaje = "La lista de fotografias esta vacia";
                ResponseApiCustom response = new ResponseApiCustom("success", mensaje);
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            ResponseApiCustom response = new ResponseApiCustom("error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }


    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deletePhoto(@PathVariable Long id) {
        try {
            // Obtener el nombre del archivo desde la base de datos utilizando el id
            PhotoGalery photoGalery = photoGaleryServiceInterface.getPhotoGaleryById(id);
            String fileName = photoGalery.getPhoto();

            // Eliminar la entrada de la base de datos
            photoGaleryServiceInterface.deletePhotoGalery(id);

            // Eliminar el archivo físico
            File folder = new File("../frontReservaTurnoCancha/public/galeryPhoto");
            File fileToDelete = new File(folder, fileName);

            if (fileToDelete.exists()) {
                if (fileToDelete.delete()) {
                    String mensaje = "La imagen y el registro fueron eliminados correctamente";
                    ResponseApiCustom response = new ResponseApiCustom("success", mensaje);
                    return ResponseEntity.ok(response);
                } else {
                    // Si la eliminación del archivo físico falla por alguna razón desconocida
                    String mensaje = "Error al eliminar el archivo físico";
                    ResponseApiCustom response = new ResponseApiCustom("error", mensaje);
                    return ResponseEntity.internalServerError().body(response);
                }
            } else {
                // Si el archivo físico no existe pero el registro en la base de datos fue eliminado correctamente
                String mensaje = "El registro en la base de datos fue eliminado, pero la imagen no se encontró en el sistema de archivos";
                ResponseApiCustom response = new ResponseApiCustom("success", mensaje);
                return ResponseEntity.ok(response);
            }
        } catch (EmptyResultDataAccessException e) {
            String mensaje = "No se encontró la imagen en la base de datos";
            ResponseApiCustom response = new ResponseApiCustom("error", mensaje);
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            ResponseApiCustom response = new ResponseApiCustom("error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }


}
