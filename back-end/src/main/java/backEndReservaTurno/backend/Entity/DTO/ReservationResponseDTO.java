package backEndReservaTurno.backend.Entity.DTO;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponseDTO {

    private Long idReservation;
    private String nameCourt;
    private String location;
    private LocalDate dateShift;
    private String hourShift;
    private String name;
    private String lastName;
    private String username;
    private String email;
    private String phone;
}
