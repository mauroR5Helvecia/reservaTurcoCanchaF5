package backEndReservaTurno.backend.security.service;


import backEndReservaTurno.backend.security.entity.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {

    private final static Logger log = LogManager.getLogger(JwtService.class);

    @Value("${security.jwt.expiration-minutes}")
    private Long EXPIRATION_MINUTES;

    @Value("${security.jwt.secret-key}")
    private  String SECRET_KEY;


    public String generateToken(Usuario usuario, Map<String, Object> extraClaims) {
        Date issuesAt = new Date(System.currentTimeMillis());
        Date expiration = new Date(issuesAt.getTime() + EXPIRATION_MINUTES * 60 * 1000);

        // Utiliza la misma clave para firmar y verificar


        return Jwts.builder()
                .header()
                .type("JWT")
                .and()
                .subject(usuario.getUsername())
                .issuedAt(issuesAt)
                .expiration(expiration)
                .claims(extraClaims)
                .signWith(generateKey(), Jwts.SIG.HS256)
                .compact();
    }

    private SecretKey generateKey(){
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    }


    public String extractUsername (String jwt) {
           return Jwts.parser()
                    .verifyWith(generateKey())
                    .build()
                   .parseSignedClaims(jwt)
                   .getPayload()
                   .getSubject();



    }


}
