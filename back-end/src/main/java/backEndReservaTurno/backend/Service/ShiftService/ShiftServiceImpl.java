package backEndReservaTurno.backend.Service.ShiftService;
import backEndReservaTurno.backend.Controller.ShiftController;
import backEndReservaTurno.backend.Entity.Shift;
import backEndReservaTurno.backend.Repository.ShiftRepository;
import jakarta.transaction.Transactional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionSystemException;


import java.util.List;
import java.util.Optional;

@Service
public class ShiftServiceImpl implements ShiftServiceInterface{

    private final static Logger log = LogManager.getLogger(ShiftServiceImpl.class);


    @Autowired
    private ShiftRepository shiftRepository;




    @Override
    public List<Shift> getShift() {
        List<Shift> listShift = shiftRepository.findAll();
        return listShift;
    }



//tengo que verificar que no se guarden dos turnos con el mismo horario y fechha

    @Override
    @Transactional
    public Shift saveShift(Shift shift) {



        // Validar que la fecha y la hora del turno no sean nulas
        if (shift.getDateShift() == null || shift.getHourShift() == null) {
            throw new IllegalArgumentException("La fecha y la hora del turno son obligatorias");
        }

        // Validar otros criterios de validez, si es necesario

        // Verificar si ya existe un turno para la misma fecha, hora y corte
        Optional<Shift> existingShift = shiftRepository.findByDateShiftAndHourShiftAndCourt(shift.getDateShift(), shift.getHourShift(), shift.getCourt());

        if (existingShift.isPresent()) {

            String mensaje = "El turno en fecha: " + shift.getDateShift() + " a la hora: "+ shift.getHourShift()+ " que se intenta guardar, ya se encuentra en la base de datos";
            log.error(mensaje);
            throw new IllegalArgumentException(mensaje);


        }

        if (shift.getIdShift() != null && shiftRepository.existsById(shift.getIdShift())) {
            try {
                return shiftRepository.save(shift);
            } catch (DataIntegrityViolationException e) {
                throw new IllegalArgumentException("Error al actualizar el turno: " + e.getMessage());
            } catch (TransactionSystemException e) {
                throw new IllegalStateException("Error de transacción al actualizar el turno: " + e.getMessage());
            }
        } else {
            try {
                return shiftRepository.saveAndFlush(shift);
            } catch (DataIntegrityViolationException e) {
                throw new IllegalArgumentException("Error al guardar el nuevo turno: " + e.getMessage());
            } catch (TransactionSystemException e) {
                throw new IllegalStateException("Error de transacción al guardar el nuevo turno: " + e.getMessage());
            }
        }
    }

    @Override
    public void deleteShift(Long id) {
            shiftRepository.deleteById(id);
    }

    @Override
    public Optional<Shift> findShiftById(Long id) {
        try {
            return shiftRepository.findById(id);
        } catch (Exception e) {
            // Manejar en caso de no estar el turno por id.
            throw new IllegalStateException("Error al buscar el turno por ID: " + id, e);
        }
    }

}
