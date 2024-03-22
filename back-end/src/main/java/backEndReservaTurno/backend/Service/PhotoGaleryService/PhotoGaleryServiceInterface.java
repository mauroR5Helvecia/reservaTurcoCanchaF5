package backEndReservaTurno.backend.Service.PhotoGaleryService;
import backEndReservaTurno.backend.Entity.PhotoGalery;

import java.util.List;

public interface PhotoGaleryServiceInterface {

    public List<PhotoGalery> getPhotoGalery();


    public String savePhotoGalery (PhotoGalery photoGalery);


    public void deletePhotoGalery (Long id);

    PhotoGalery getPhotoGaleryById(Long id);
}
