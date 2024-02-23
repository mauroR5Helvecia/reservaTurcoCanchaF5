package backEndReservaTurno.backend.security.config.filter;

import backEndReservaTurno.backend.security.entity.Usuario;
import backEndReservaTurno.backend.security.repository.UsuarioRepository;
import backEndReservaTurno.backend.security.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;


@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final static Logger log = LogManager.getLogger(JwtAuthenticationFilter.class);


    @Autowired
    private JwtService jwtService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");


        if (authHeader == null || !authHeader.startsWith("Bearer")){
            filterChain.doFilter(request, response);
            return;
        }


        String jwt = authHeader.substring(7);

        log.info("dentro de doFilter se obtiene este jwt: ");

        String username = jwtService.extractUsername(jwt); //obtener subjet username desde jwt
        log.info(username);

        if (username != null || SecurityContextHolder.getContext().getAuthentication() == null){

            Optional<Usuario> usuarioA = usuarioRepository.findByUsername(username);

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(

                        usuarioA, null, usuarioA.get().getAuthorities()
                );

                log.info(usuarioA.get().getAuthorities());

//                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);


        }


        filterChain.doFilter(request, response);
    }
}
