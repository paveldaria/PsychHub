package PsychHub.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserLogin {

    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
