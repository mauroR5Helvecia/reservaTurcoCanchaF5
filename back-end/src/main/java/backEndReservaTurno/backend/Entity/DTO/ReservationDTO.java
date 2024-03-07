package backEndReservaTurno.backend.Entity.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
        private Long idCourtReserved;
        private Long idUserReserved;
        private Long idShiftReserved;


}

