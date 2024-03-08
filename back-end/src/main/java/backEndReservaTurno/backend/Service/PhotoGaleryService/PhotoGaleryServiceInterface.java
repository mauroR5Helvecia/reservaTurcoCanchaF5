package backEndReservaTurno.backend.Service.PhotoGaleryService;
import backEndReservaTurno.backend.Entity.PhotoGalery;

import java.util.List;

public interface PhotoGaleryServiceInterface {

    public List<PhotoGalery> getPhotoGalery();


    public void savePhotoGalery (PhotoGalery photoGalery);


    public void deletePhotoGalery (Long id);

}
