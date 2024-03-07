package backEndReservaTurno.backend.security.config;


import backEndReservaTurno.backend.security.config.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;


@Configuration
@EnableWebSecurity
@Component
public class HttpSecurityConfig {

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private JwtAuthenticationFilter authenticationFilter;




    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception {

        http
                .csrf( csrfConfig -> csrfConfig.disable())
                .sessionManagement(sessionMangConfig -> sessionMangConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .authorizeHttpRequests( authConfig ->{
//                    authConfig.requestMatchers("/error").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/apireserva/reservation/save").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/apireserva/auth/**").permitAll();
                    authConfig.requestMatchers(HttpMethod.GET, "/apireserva/court/all").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/apireserva/court/save").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/apireserva/shift/save").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/apireserva/cancha/mail/sendemail").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/apireserva/cancha/mail/sendverifyemail").permitAll();
                    authConfig.anyRequest().denyAll();



                })
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
    }




}
