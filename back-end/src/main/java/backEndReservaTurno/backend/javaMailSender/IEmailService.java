package backEndReservaTurno.backend.javaMailSender;

public interface IEmailService {

    void sendEmail(String[] toUser, String subject, String message);

    void sendEmailVerify(String toUser, String subject, String message);

}