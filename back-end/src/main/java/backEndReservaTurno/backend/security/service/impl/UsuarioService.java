package backEndReservaTurno.backend.security.service.impl;
import backEndReservaTurno.backend.security.entity.Usuario;
import backEndReservaTurno.backend.security.repository.UsuarioRepository;
import backEndReservaTurno.backend.security.service.UsuarioServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService implements UsuarioServiceInterface {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public List<Usuario> getUsuarios() {
        List<Usuario> listaUsuarios = usuarioRepository.findAll();
        return listaUsuarios;
    }

    @Override
    public Usuario save(Usuario usuario) {
        if (usuario.getIdUsuario() != null && usuarioRepository.existsById(usuario.getIdUsuario())) {
            return usuarioRepository.save(usuario);
        } else {
            // Si el usuario no tiene ID o no existe en la base de datos, guarda un nuevo registro
            return usuarioRepository.saveAndFlush(usuario);
        }
    }

    @Override
    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public Optional<Usuario> findUsuario(Long id) {
        return usuarioRepository.findById(Long.valueOf(id));
    }

    @Override
    public Optional<Usuario> findByUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }

    @Override
    public Optional<Usuario> findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }



}
