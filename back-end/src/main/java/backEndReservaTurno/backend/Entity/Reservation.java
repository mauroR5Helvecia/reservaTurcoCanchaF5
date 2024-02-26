package backEndReservaTurno.backend.Entity;
import backEndReservaTurno.backend.security.entity.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReservation;

    @ManyToOne
    @JoinColumn(name = "idCourt")
    private Court idCourtReserved;

    @ManyToOne
    @JoinColumn(name = "idUser")
    private Usuario idUserReserved;

    @ManyToOne
    @JoinColumn(name = "idShift")
    private Shift idShiftReserved;
}

