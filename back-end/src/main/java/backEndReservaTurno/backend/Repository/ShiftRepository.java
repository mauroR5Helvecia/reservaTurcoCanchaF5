package backEndReservaTurno.backend.Repository;

import backEndReservaTurno.backend.Entity.Court;
import backEndReservaTurno.backend.Entity.Shift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Long> {


    Optional<Shift> findByDateShiftAndHourShiftAndCourt(LocalDate dateShift, String hourShift, Court court);
    List<Shift> findByDateShiftBetween(Date startDate, Date endDate);
}
