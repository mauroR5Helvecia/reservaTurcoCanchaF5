package backEndReservaTurno.backend.Repository;

import backEndReservaTurno.backend.Entity.Reservation;
import backEndReservaTurno.backend.Entity.Shift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT r FROM Reservation r WHERE r.idShiftReserved.dateShift BETWEEN :startDate AND :endDate")
    List<Reservation> findByShiftDateBetween(@Param("startDate") Date startDate, @Param("endDate") Date endDate);


    Reservation findByidShiftReserved(Shift idShiftReserved);
}
