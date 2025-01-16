package PsychHub.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PostCreate {

    @NotBlank
    private String title;
    @NotBlank
    private String content;
}
