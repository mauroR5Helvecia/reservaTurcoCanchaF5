package backEndReservaTurno.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Shift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idShift;
    private Date dateShift;
    private Date hourShift;
    private boolean shiftReserved;


    @ManyToOne
    @JoinColumn(name = "idCourt")
    private Court court;

}
