package backEndReservaTurno.backend.security.controller;
import backEndReservaTurno.backend.javaMailSender.MailController;
import backEndReservaTurno.backend.javaMailSender.emailDTO.EmailDTOVerify;
import backEndReservaTurno.backend.javaMailSender.util.CodeVerifyService;
import backEndReservaTurno.backend.security.dto.AuthenticationRequest;
import backEndReservaTurno.backend.security.dto.AuthenticationResponse;
import backEndReservaTurno.backend.security.dto.VerifyEmailDTO;
import backEndReservaTurno.backend.security.entity.Usuario;
import backEndReservaTurno.backend.security.service.AuthenticationService;
import backEndReservaTurno.backend.security.service.UsuarioServiceInterface;
import backEndReservaTurno.backend.security.util.Role;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Optional;


@RestController
@RequestMapping("/apireserva/auth")
@CrossOrigin(origins = "*")
public class AuthController {

   private final static Logger log = LogManager.getLogger(AuthController.class);

    @Autowired
    private UsuarioServiceInterface usuarioServiceInterface;

    @Autowired
     private MailController mailController;

    @Autowired
     private CodeVerifyService codeVerifyService;


    int strength = 10;
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(strength, new SecureRandom());

    @Autowired
    private AuthenticationService authenticationService;


//
    @PostMapping("/register")
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) {
        String email = usuario.getEmail();


        if (usuarioServiceInterface.findByEmail(email).isPresent()) {
            String mensajeError = "El correo electrónico " + email + " ya está registrado.";
            return ResponseEntity.status(HttpStatus.CONFLICT).body(mensajeError);
        }

        // Generar el hash de la contraseña antes de guardar el usuario
        usuario.setPassword(bCryptPasswordEncoder.encode(usuario.getPassword()));
        Role role = Role.USUARIO;
        usuario.setRole(role);


//        Generar y setear el codigo de verificacion en la entidad usuario

        String codeVerify = codeVerifyService.generarCodigoVerificacion();

        usuario.setCodigoVerificacion(codeVerify);

        //Enviar por email el codigo de verificacion

        String subject = "Código de Verificación";
        String message = "Tu código de verificación es: " + codeVerify;
        EmailDTOVerify emailDTOVerify = new EmailDTOVerify(email, subject, message);

        mailController.sendVerifyemail(emailDTOVerify);

      Usuario createdUsuario = usuarioServiceInterface.save(usuario);

        return ResponseEntity.status(HttpStatus.OK).body("El usuario fue registrado con exito, Inicia sesion en SignIn con tu Username y password");
    }

//    Logica para verificar si los digitos ingresados son iguales a los generados
    // y para cambiar a true usuario verificado en caso de ser correcto.

    @PostMapping("/verifycode")
    public ResponseEntity<String> verificarCuenta (@RequestBody VerifyEmailDTO verifyEmailDTO){
        String emailAEnviar = verifyEmailDTO.getEmailAEnviar();
        String codigoVerificacionIngresado = verifyEmailDTO.getCodigoVerificacionIngresado();

        Optional<Usuario> usuarioOptional = usuarioServiceInterface.findByEmail(emailAEnviar);

        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            String codigoVerificacionAlmacenado = usuario.getCodigoVerificacion();

            if (codigoVerificacionAlmacenado.equals(codigoVerificacionIngresado)) {
                //Actualizo a true usuario verificado
                usuario.setUsuarioVerificado(true);

                usuarioServiceInterface.save(usuario);

                // Código de verificación correcto, puedes realizar acciones adicionales si es necesario
                return ResponseEntity.ok("La cuenta ha sido verificada correctamente.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Código de verificación incorrecto.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró un usuario con el correo electrónico proporcionado.");
        }
    }







//
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest authRequest ) {
           AuthenticationResponse jwtDTO = authenticationService.login(authRequest);

        // Obtener el usuario por el nombre de usuario
        Optional<Usuario> usuarioOptional = usuarioServiceInterface.findByUsername(authRequest.getUsername());

        // Verificar si el usuario existe y está verificado
        if (usuarioOptional.isPresent() && usuarioOptional.get().isUsuarioVerificado()) {
            log.info("Usuario logueado con éxito");

            //si esta verificado devuelve el JWT
            return ResponseEntity.status(HttpStatus.OK).body(jwtDTO);
        } else {
            log.warn("Intento de inicio de sesión por un usuario no verificado");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

    }



}