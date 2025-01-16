package PsychHub.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CommentCreate {

    @NotBlank
    private String content;
    @NotNull
    private int postId;

}
