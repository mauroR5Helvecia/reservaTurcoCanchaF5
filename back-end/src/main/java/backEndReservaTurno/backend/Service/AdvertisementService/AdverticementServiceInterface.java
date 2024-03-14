package backEndReservaTurno.backend.Service.AdvertisementService;

import backEndReservaTurno.backend.Entity.Advertisement;

import java.util.List;

public interface AdverticementServiceInterface {

    public List<Advertisement> getAdvertisement();


    public void saveAdvertisement (Advertisement advertisement);


    public void deleteAdvertisement (Long id);

    boolean existsById(long id);
}
