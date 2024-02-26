package backEndReservaTurno.backend.security.service;
import backEndReservaTurno.backend.security.dto.AuthenticationRequest;
import backEndReservaTurno.backend.security.dto.AuthenticationResponse;
import backEndReservaTurno.backend.security.entity.Usuario;
import backEndReservaTurno.backend.security.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private JwtService jwtService;

    public AuthenticationResponse login(AuthenticationRequest authRequest) {

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                authRequest.getUsername(), authRequest.getPassword()

        );

        authenticationManager.authenticate(authToken);


        Usuario usuario = usuarioRepository.findByUsername(authRequest.getUsername()).get();

        String jwt = jwtService.generateToken(usuario, (Map<String, Object>) generateExtraClaims(usuario));

        return  new AuthenticationResponse(jwt);


    }

    private Object generateExtraClaims(Usuario usuario) {

        Map<String, Object> extraClaims = new HashMap<>();

        extraClaims.put("name", usuario.getName());
        extraClaims.put("role", usuario.getRole().name());
        extraClaims.put("permissions", usuario.getAuthorities());

        return extraClaims;
    }
}
