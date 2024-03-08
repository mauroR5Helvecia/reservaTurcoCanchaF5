package backEndReservaTurno.backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhotoGalery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPhotoGalery;
    private String photo;

}
