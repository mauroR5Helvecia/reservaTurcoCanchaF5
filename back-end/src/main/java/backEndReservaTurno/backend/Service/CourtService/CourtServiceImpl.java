package backEndReservaTurno.backend.Service.CourtService;

import backEndReservaTurno.backend.Entity.Court;
import backEndReservaTurno.backend.Entity.Shift;
import backEndReservaTurno.backend.Repository.CourtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
        LocalDate currentDate = LocalDate.now();

        // Agregar 7 días a la fecha actual
        LocalDate endDate = currentDate.plusDays(7);

        // Buscar la cancha por el nombre
        Court court = courtRepository.findByNameCourt(nameCourt);

        if (court != null) {
            // Si existe la cancha, obtener la lista de turnos
            List<Shift> shifts = court.getListShift();

            // Filtrar los turnos desde la fecha actual hasta 7 días posteriores
            List<Shift> filteredShifts = shifts.stream()
                    .filter(shift -> shift.getDateShift().isAfter(currentDate) && shift.getDateShift().isBefore(endDate))
                    .collect(Collectors.toList());

            return filteredShifts;
        } else {
            // Si no se encuentra la cancha, lanzar una excepción
            throw new IllegalArgumentException("No se encontró una cancha con el nombre especificado: " + nameCourt);
        }
    }



    @Override
    public List<Shift> getShiftCurrent(String nameCourt) {

        // Obtener la fecha actual
        LocalDate currentDate = LocalDate.now();

        // Convertir a LocalDateTime y establecer la hora a medianoche
        LocalDateTime startOfDay = currentDate.atStartOfDay();

        LocalDateTime endOfDay = startOfDay.plusDays(1);

        // Obtener las fechas de inicio y fin
        LocalDate startDate = startOfDay.toLocalDate();
        LocalDate endDate = endOfDay.toLocalDate();


        // Buscar la cancha por el nombre
        Court court = courtRepository.findByNameCourt(nameCourt);

        if (court != null) {
            // Si existe la cancha, obtener la lista de turnos
            List<Shift> shifts = court.getListShift();

            // Filtrar los turnos desde la medianoche del día actual hasta la medianoche del día siguiente
            List<Shift> filteredShifts = shifts.stream()
                    .filter(shift -> shift.getDateShift().isAfter(startDate) && shift.getDateShift().isBefore(endDate))
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
