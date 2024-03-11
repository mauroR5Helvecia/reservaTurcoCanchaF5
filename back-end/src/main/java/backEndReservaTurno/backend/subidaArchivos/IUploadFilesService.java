package backEndReservaTurno.backend.subidaArchivos;

import org.springframework.web.multipart.MultipartFile;

public interface IUploadFilesService {

    String handleFileUpload (MultipartFile file) throws Exception;


}
