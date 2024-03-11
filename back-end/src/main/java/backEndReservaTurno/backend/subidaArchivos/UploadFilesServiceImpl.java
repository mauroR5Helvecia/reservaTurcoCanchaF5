package backEndReservaTurno.backend.subidaArchivos;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class UploadFilesServiceImpl implements IUploadFilesService {
    @Override
    public String handleFileUpload(MultipartFile file) throws Exception {

        try {
            String fileName = UUID.randomUUID().toString();
            byte[] bytes = file.getBytes();
            String fileOriginalName = file.getOriginalFilename();
            long fileSize = file.getSize();
            long maxFileSize = 5 * 1024 * 1024;

            if (fileSize > maxFileSize){
                return ("Superado size the img, more 5MB");
            }

            if (
                    !fileOriginalName.endsWith(".jpg") &&
                            !fileOriginalName.endsWith(".jpeg") &&
                            !fileOriginalName.endsWith(".png") &&
                            !fileOriginalName.endsWith(".webp")
            ){

                return "Only .jpg, .jpeg , .png , .webp";
            }

            String fileExtension = fileOriginalName.substring(fileOriginalName.lastIndexOf("."));

            String newFileName = fileName + fileExtension;

            File folder = new File("./src/main/resources/galeryPhoto");


            if(!folder.exists()){
                folder.mkdirs();
            }
            String absolutePath = folder.getAbsolutePath();

            Path path = Paths.get(absolutePath + File.separator + newFileName);
            System.out.println("Ruta del archivo: " + path.toString());
            Files.write(path, bytes);


                    return newFileName;



        }catch (Exception e){
            e.printStackTrace();
            return "Error al manejar la carga del archivo: " + e.getMessage();


        }
    }


}
