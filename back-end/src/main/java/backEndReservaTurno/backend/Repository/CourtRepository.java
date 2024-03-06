package backEndReservaTurno.backend.Repository;

import backEndReservaTurno.backend.Entity.Court;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourtRepository extends JpaRepository<Court, Long> {

    Court findByNameCourt(String nameCourt);

}
