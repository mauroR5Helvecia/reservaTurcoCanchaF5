package backEndReservaTurno.backend.security.controller;

import backEndReservaTurno.backend.security.entity.Usuario;
import backEndReservaTurno.backend.security.service.UsuarioServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("apireserva/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {


    @Autowired
    private UsuarioServiceInterface usuarioServiceInterface;


    @GetMapping("/traertodos")
    public ResponseEntity<List<Usuario>> getUsuarios(){

        return ResponseEntity.ok(usuarioServiceInterface.getUsuarios());

    }




    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUsuario(@PathVariable String id){
        ResponseEntity<String> response = null;
        if(usuarioServiceInterface.findUsuario(Long.parseLong(id)).isPresent()){
            usuarioServiceInterface.deleteUsuario(Long.parseLong(id));
            response =  ResponseEntity.status(HttpStatus.NO_CONTENT).body("Usuario id:" +id+ "Eliminado");
        }else{
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ah encontrado el elemento a eliminar");
        }

        return response;
    }

    @PutMapping("/update")
    public ResponseEntity<Usuario> update(@RequestBody Usuario usuario) {
        ResponseEntity<Usuario> response = null;

        if (usuario.getIdUsuario() != null && usuarioServiceInterface.findUsuario(usuario.getIdUsuario()).isPresent()){
            usuarioServiceInterface.save(usuario);
            response = ResponseEntity.status(HttpStatus.OK).build();
        } else
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        return response;

    }

    @GetMapping("/traer/{id}")
    public ResponseEntity<Usuario> findUsuario(@PathVariable(name = "id") String id){
        Usuario usuario = usuarioServiceInterface.findUsuario(Long.parseLong(id)).orElse(null);
        return ResponseEntity.ok(usuario);
    }






}
