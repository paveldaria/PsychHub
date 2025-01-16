package PsychHub.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import PsychHub.entity.Post;
import PsychHub.model.PostCreate;
import PsychHub.service.PostService;

import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<Post> createPost(@Valid  @RequestBody PostCreate postCreate, HttpSession session){
        Integer currentUserId = (Integer) session.getAttribute("currentUserId");

        if(currentUserId==null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Post post = postService.createPost(postCreate,currentUserId);
        return ResponseEntity.status(HttpStatus.CREATED).body(post);
    }

    @GetMapping("/published")
    public ResponseEntity<List<Post>> getPublishedPosts(){
        List<Post> posts = postService.getPublishedPosts();
        return  ResponseEntity.ok(posts);

    }

}
