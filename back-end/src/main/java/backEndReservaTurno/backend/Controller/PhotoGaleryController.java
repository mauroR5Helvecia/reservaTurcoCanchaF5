package backEndReservaTurno.backend.Controller;
import backEndReservaTurno.backend.Entity.PhotoGalery;
import backEndReservaTurno.backend.Service.PhotoGaleryService.PhotoGaleryServiceInterface;
import backEndReservaTurno.backend.subidaArchivos.IUploadFilesService;
import backEndReservaTurno.backend.util.ResponseApiCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

}
