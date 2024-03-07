package backEndReservaTurno.backend.security.entity;
import backEndReservaTurno.backend.Entity.Reservation;
import backEndReservaTurno.backend.security.util.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long idUsuario;
    private String name;
    private String lastName;
    @Column(unique = true)
    private String username;
    @Column(unique = true)
    private String email;
    private String phone;
    private String password;

    // Agregar este campo a la entidad Usuario
    private String codigoVerificacion;

    private boolean usuarioVerificado;




    @Enumerated(EnumType.STRING)
    private Role role;

//Implementaciones de user details


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));

        // Agrega roles adicionales según sea necesario
        if (role == Role.ADMINISTRADOR) {
            authorities.add(new SimpleGrantedAuthority("ROLE_USUARIO"));
            authorities.add(new SimpleGrantedAuthority("ROLE_COMERCIANTE"));
        } if (role == Role.COMERCIANTE) {
            authorities.add(new SimpleGrantedAuthority("ROLE_USUARIO"));
        }

        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }


    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
