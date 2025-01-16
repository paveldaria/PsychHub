package PsychHub.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CommentUpdate {
    @NotBlank
    private String content;
}
