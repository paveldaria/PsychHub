package PsychHub.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import jakarta.validation.constraints.Email;

@Data
public class UserRegister {

    @NotBlank
    private String name;
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
