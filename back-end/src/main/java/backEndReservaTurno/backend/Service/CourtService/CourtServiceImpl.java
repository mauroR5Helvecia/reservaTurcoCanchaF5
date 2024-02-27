package backEndReservaTurno.backend.Service.CourtService;

import backEndReservaTurno.backend.Entity.Court;
import backEndReservaTurno.backend.Entity.Shift;
import backEndReservaTurno.backend.Repository.CourtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourtServiceImpl implements CourtServiceInterface{

    @Autowired
    private CourtRepository courtRepository;


    @Override
    public List<Court> getCourts() {
        List<Court> listCourt = courtRepository.findAll();
        return listCourt;
    }

    @Override
    public Court saveCourt(Court court) {
        if (court.getIdCourt() != null && courtRepository.existsById(court.getIdCourt())) {
            return courtRepository.save(court);
        } else {
            // Si el usuario no tiene ID o no existe en la base de datos, guarda un nuevo registro
            return courtRepository.saveAndFlush(court);
        }
    }

    @Override
    public void deleteCourt(Long id) {
            courtRepository.deleteById(id);
    }

    @Override
    public Optional<Court> findCourtById(Long id) {
        return courtRepository.findById(Long.valueOf(id));
    }

    @Override
    public List<Shift> findByShiftTheCourt(String nameCourt) {
        // Obtener la fecha actual
        Date currentDate = new Date();

        // Crear una instancia de Calendar y establecer la fecha actual
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);

        // Agregar 7 días a la fecha actual
        calendar.add(Calendar.DAY_OF_MONTH, 7);

        // Obtener la fecha posterior a 7 días
        Date endDate = calendar.getTime();

        // Buscar la cancha por el nombre
        Court court = courtRepository.findByNameCourt(nameCourt);

        if (court != null) {
            // Si existe la cancha, obtener la lista de turnos
            List<Shift> shifts = court.getListShift();

            // Filtrar los turnos desde la fecha actual hasta 7 días posteriores
            List<Shift> filteredShifts = shifts.stream()
                    .filter(shift -> shift.getDateShift().after(currentDate) && shift.getDateShift().before(endDate))
                    .collect(Collectors.toList());

            return filteredShifts;
        } else {
            // Si no se encuentra la cancha, lanzar una excepción
            throw new IllegalArgumentException("No se encontró una cancha con el nombre especificado: " + nameCourt);
        }
    }


    @Override
    public Optional<Court> findByReservation(String nameCourt) {

        //Faltaria la clase de las reservas, para implementar
        return Optional.empty();
    }
}
