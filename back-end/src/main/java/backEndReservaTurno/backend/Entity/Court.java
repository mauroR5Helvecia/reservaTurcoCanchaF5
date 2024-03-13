package backEndReservaTurno.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idCourt")
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
@OrderBy("dateShift ASC, hourShift ASC")
@JsonManagedReference
private List<Shift> listShift;




}
