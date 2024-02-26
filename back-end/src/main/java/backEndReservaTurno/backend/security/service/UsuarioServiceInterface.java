package backEndReservaTurno.backend.security.service;


import backEndReservaTurno.backend.security.entity.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioServiceInterface {

    public List<Usuario> getUsuarios ();

    public Usuario save (Usuario usuario);

    public void deleteUsuario (Long id);

    public Optional<Usuario> findUsuario (Long id);

    public Optional<Usuario> findByUsername(String username);

    Optional<Usuario> findByEmail(String email);
}
