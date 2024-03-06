package backEndReservaTurno.backend.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Court {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCourt;
    private String nameCourt;
    private String location;
    private String capacity;
    private String phone;
    private Double price;

//Una cancha va a tener una lista de turnos, si se elimina un objeto cancha, se eliminaran de
    //manera en cascada todos los turnos que le corresponden.
@OneToMany(mappedBy = "court", cascade = CascadeType.ALL)
@OrderBy("dateShift, hourShift")
@JsonManagedReference
private List<Shift> listShift;


    @OneToMany(mappedBy = "idCourtReserved")
    private List<Reservation> reservations;




}
