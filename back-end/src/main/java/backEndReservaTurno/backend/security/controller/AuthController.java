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
import backEndReservaTurno.backend.util.ResponseApiCustom;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Map;
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
            ResponseApiCustom response = new ResponseApiCustom("Error", mensajeError);
            return ResponseEntity.ok(response);
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


        ResponseApiCustom response = new ResponseApiCustom("Usuario creado exitosamente: ", usuario.getName());
        return ResponseEntity.ok(response);
    }

//    Logica para verificar si los digitos ingresados son iguales a los generados
    // y para cambiar a true usuario verificado en caso de ser correcto.

    @PostMapping("/verifycode")
    public ResponseEntity<?> verificarCuenta (@RequestBody VerifyEmailDTO verifyEmailDTO){
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
                ResponseApiCustom response = new ResponseApiCustom("Success verify User", usuario.isUsuarioVerificado());
                return ResponseEntity.ok(response);

            } else {

               String mensajeError = "error al verificar el usuario con los datos del email";
                ResponseApiCustom response = new ResponseApiCustom("Error", mensajeError);
                return ResponseEntity.ok(response);

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



    // controllers para seteo de password

    @PostMapping("/setpassword1")
    public ResponseEntity<?> verifyEmailAndSendEmail(@RequestBody Map<String, String> requestbody)  {

        String email = requestbody.get("email");

        Optional<Usuario> optionalUsuario = usuarioServiceInterface.findByEmail(email);

        System.out.println(optionalUsuario);
        if (optionalUsuario.isPresent()) {
            Usuario usuario = optionalUsuario.get();

            String codeVerify = codeVerifyService.generarCodigoVerificacion();

            usuario.setCodigoSetPassword(codeVerify);

            String subject = "Este es su código para restablecer su contraseña, " + usuario.getName() + ". Si usted no inició el restablecimiento de la misma, omita este mensaje y no comparta el código con nadie.";
            String message = "Tu código de verificación es: " + codeVerify;
            EmailDTOVerify emailDTOVerify = new EmailDTOVerify(email, subject, message);

            System.out.println("Se esta por enviar un codigo para restablecer password");

            mailController.sendVerifyemail(emailDTOVerify);

            System.out.println("Se Envio el codigo a: "+ usuario.getName() +" al email: " +usuario.getEmail());

            usuarioServiceInterface.save(usuario);

            String mensaje = "Por favor, verifica tu correo electrónico y utiliza el código de verificación proporcionado para completar el proceso.";
            ResponseApiCustom response = new ResponseApiCustom("Success", mensaje);
            return ResponseEntity.ok(response);
        } else {

            return ResponseEntity.badRequest().body("No se encontró ningún usuario con el correo electrónico proporcionado, verifica el mismo y vuelve a intentar.");
        }
    }

    @PostMapping("/setpassword2")
    public ResponseEntity<?> verifyCodeCorrect(@RequestBody Map<String, String> request) {


        String email = request.get("email");
        String codigo = request.get("codigo");
        Optional<Usuario> optionalUsuario = usuarioServiceInterface.findByEmail(email);

        if (optionalUsuario.isPresent()) {
            Usuario usuario = optionalUsuario.get();
            if (usuario.getCodigoSetPassword().equals(codigo)){
                usuario.setHabilitadoCambiarPassword(true);
                usuarioServiceInterface.save(usuario);
                ResponseApiCustom response = new ResponseApiCustom("Success", "Ingresa tu nueva password");
                return ResponseEntity.ok(response);
            }else{
                ResponseApiCustom response = new ResponseApiCustom("Error", "No coinciden los codigos");
                return ResponseEntity.badRequest().body(response);

            }
        } else {
            throw new RuntimeException("Hubo un error en el servicio de verificación de código para el restablecimiento de contraseña. Disculpe las molestias.");
        }
    }

    @PostMapping("/setpassword3")
    public ResponseEntity<?> IngressNewPassword(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");
        try {
            Optional<Usuario> optionalUsuario = usuarioServiceInterface.findByEmail(email);


            Usuario usuario = optionalUsuario.get();
            if (usuario.isHabilitadoCambiarPassword()) {


                // Generar el hash de la contraseña antes de guardar el usuario
                usuario.setPassword(bCryptPasswordEncoder.encode(password));
                usuario.setHabilitadoCambiarPassword(false);
                usuarioServiceInterface.save(usuario);

                ResponseApiCustom response = new ResponseApiCustom("Success", "Su password fue restablecida exitosamente");
                return ResponseEntity.ok(response);

            }else{
                ResponseApiCustom response = new ResponseApiCustom("Error", "El usuario no esta habilitado a cambiar password");
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            ResponseApiCustom response = new ResponseApiCustom("Error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);

        }
    }


}