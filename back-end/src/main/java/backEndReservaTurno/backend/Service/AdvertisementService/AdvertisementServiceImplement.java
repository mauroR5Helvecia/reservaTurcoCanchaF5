package backEndReservaTurno.backend.Service.AdvertisementService;
import backEndReservaTurno.backend.Entity.Advertisement;
import backEndReservaTurno.backend.Repository.AdvertisementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdvertisementServiceImplement implements AdverticementServiceInterface{

    @Autowired
    private AdvertisementRepository advertisementRepository;

    @Override
    public List<Advertisement> getAdvertisement() {
        try{
            List<Advertisement> list = advertisementRepository.findAll();
            return list;
        }catch (Exception e){
            throw new RuntimeException("Error al buscar lista de anuncios: "+ e.getMessage());
        }

    }

    @Override
    public void saveAdvertisement(Advertisement advertisement) {
        try {
            advertisementRepository.save(advertisement);
            System.out.println("Se guardo anuncio en service");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteAdvertisement(Long id) {
        try{
            advertisementRepository.deleteById(id);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public boolean existsById(long id) {
        return advertisementRepository.existsById(id);
    }
}
