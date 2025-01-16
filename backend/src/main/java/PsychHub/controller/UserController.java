package PsychHub.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import PsychHub.model.UserLogin;
import PsychHub.model.UserRegister;
import PsychHub.service.UserService;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody UserRegister userRegister){
        userService.register(userRegister);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<Integer> login(@Valid @RequestBody UserLogin userLogin){
        Integer userId = userService.login(userLogin);
        if(userId!=null){
            return ResponseEntity.ok(userId);
        }
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}
