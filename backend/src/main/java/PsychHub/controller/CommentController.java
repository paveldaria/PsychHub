package PsychHub.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import PsychHub.entity.Comment;
import PsychHub.model.CommentCreate;
import PsychHub.model.CommentUpdate;
import PsychHub.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> createComment(@Valid @RequestBody CommentCreate commentCreate){
        Comment comment = commentService.createComment(commentCreate);
        return ResponseEntity.status(HttpStatus.CREATED).body(comment);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable int commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<Void> updateComment(@PathVariable int commentId, @RequestBody CommentUpdate commentUpdate){
        commentService.updateComment(commentId,commentUpdate);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<Comment>> getAllCommentsForPost(@PathVariable int postId) {
        List<Comment> comments = commentService.getAllCommentsForPost(postId);
        return ResponseEntity.ok(comments);
    }

}
