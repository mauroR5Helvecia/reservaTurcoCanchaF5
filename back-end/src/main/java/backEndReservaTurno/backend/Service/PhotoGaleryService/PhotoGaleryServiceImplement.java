package backEndReservaTurno.backend.Service.PhotoGaleryService;

import backEndReservaTurno.backend.Entity.PhotoGalery;
import backEndReservaTurno.backend.Repository.PhotoGaleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class PhotoGaleryServiceImplement implements PhotoGaleryServiceInterface{

    @Autowired
    private PhotoGaleryRepository photoGaleryRepository;

    @Override
    public List<PhotoGalery> getPhotoGalery() {
        try {
            List<PhotoGalery> listGalery = photoGaleryRepository.findAll();
            return listGalery;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public String savePhotoGalery(PhotoGalery photoGalery) {
        try {
            photoGaleryRepository.save(photoGalery);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    @Override
    public void deletePhotoGalery(Long id) {
        try{
            photoGaleryRepository.deleteById(id);
    }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public PhotoGalery getPhotoGaleryById(Long id) {
        return photoGaleryRepository.findById(id).orElse(null);
    }


}
