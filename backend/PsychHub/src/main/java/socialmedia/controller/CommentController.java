package PsychHub.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import PsychHub.entity.Comment;
import PsychHub.model.CommentCreate;
import PsychHub.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> createComment(@Valid @RequestBody CommentCreate commentCreate, HttpSession session){

        Integer currentUserId = (Integer) session.getAttribute("currentUserId");

        if(currentUserId==null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Comment comment = commentService.createComment(commentCreate,currentUserId);
        return ResponseEntity.status(HttpStatus.CREATED).body(comment);

    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable int postId) {
        List<Comment> comments = commentService.getAllComments(postId);
        return ResponseEntity.ok(comments);
    }


}
