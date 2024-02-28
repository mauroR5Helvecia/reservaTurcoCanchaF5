package backEndReservaTurno.backend.Service.ShiftService;
import backEndReservaTurno.backend.Entity.Shift;

import java.util.List;
import java.util.Optional;

public interface ShiftServiceInterface {

    public List<Shift> getShift ();



    public Shift saveShift (Shift shift);

    public void deleteShift (Long id);

    public Optional<Shift> findShiftById (Long id);


}
