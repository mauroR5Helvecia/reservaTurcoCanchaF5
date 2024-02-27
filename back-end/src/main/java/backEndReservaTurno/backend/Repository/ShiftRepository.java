package backEndReservaTurno.backend.Repository;

import backEndReservaTurno.backend.Entity.Shift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Long> {


    List<Shift> findByDateShiftBetween(Date startDate, Date endDate);
}
