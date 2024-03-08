package backEndReservaTurno.backend.Repository;

import backEndReservaTurno.backend.Entity.PhotoGalery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoGaleryRepository extends JpaRepository<PhotoGalery, Long> {



}
