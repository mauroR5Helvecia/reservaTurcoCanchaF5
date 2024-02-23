package backEndReservaTurno.backend.javaMailSender;

import backEndReservaTurno.backend.javaMailSender.emailDTO.EmailDTO;
import backEndReservaTurno.backend.javaMailSender.emailDTO.EmailDTOVerify;
import backEndReservaTurno.backend.javaMailSender.util.CodeVerifyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/cancha/mail")
public class MailController {

    @Autowired
    private IEmailService emailService;

    @Autowired
    private CodeVerifyService codeVerifyService;

    @PostMapping("/sendemail")
    public ResponseEntity<?> receiveRequestEmail(@RequestBody EmailDTO emailDTO){

        System.out.println("Mensaje Recibido " + emailDTO);

        emailService.sendEmail(emailDTO.getToUser(), emailDTO.getSubject(), emailDTO.getMessage());

        Map<String, String> response = new HashMap<>();
        response.put("estado", "Enviado");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/sendverifyemail")
    public ResponseEntity<Map <String, String>> sendVerifyemail(@RequestBody EmailDTOVerify emailDTOVerify){
        System.out.println("Mensaje Recibido " + emailDTOVerify);

        emailService.sendEmailVerify(emailDTOVerify.getToUser(), emailDTOVerify.getSubject(), emailDTOVerify.getMessage());

        Map<String, String> response = new HashMap<>();
        response.put("estado", "Enviado");
        response.put("Verificar", "Verifica el codigo es Span");

        return ResponseEntity.ok(response);
    }



}
