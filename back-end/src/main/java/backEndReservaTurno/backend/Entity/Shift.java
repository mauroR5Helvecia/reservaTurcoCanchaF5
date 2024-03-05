package backEndReservaTurno.backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Shift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idShift;
    private LocalDate dateShift;
    private String hourShift;
    private boolean shiftReserved;


    @ManyToOne
    @JoinColumn(name = "idCourt")
    @JsonBackReference
    private Court court;


    // Método para formatear la hora antes de asignarla


}
