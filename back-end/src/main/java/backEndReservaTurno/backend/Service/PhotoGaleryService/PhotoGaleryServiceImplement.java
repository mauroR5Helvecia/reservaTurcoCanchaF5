package backEndReservaTurno.backend.Service.PhotoGaleryService;

import backEndReservaTurno.backend.Entity.PhotoGalery;
import backEndReservaTurno.backend.Repository.PhotoGaleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoGaleryServiceImplement implements PhotoGaleryServiceInterface{

    @Autowired
    private PhotoGaleryRepository photoGaleryRepository;

    @Override
    public List<PhotoGalery> getPhotoGalery() {
        return null;
    }

    @Override
    public void savePhotoGalery(PhotoGalery photoGalery) {

    }


    @Override
    public void deletePhotoGalery(Long id) {

    }
}
