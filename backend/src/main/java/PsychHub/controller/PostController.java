package PsychHub.controller;

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
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<Post> createPost(@Valid  @RequestBody PostCreate postCreate){
        Post post = postService.createPost(postCreate);
        return ResponseEntity.status(HttpStatus.CREATED).body(post);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Post> deletePost(@PathVariable int postId){
        postService.deletePost(postId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts(){
        List<Post> posts = postService.getAllPosts();
        return  ResponseEntity.ok(posts);
    }

    @GetMapping("/published")
    public ResponseEntity<List<Post>> getPublishedPosts(){
        List<Post> posts = postService.getPublishedPosts();
        return  ResponseEntity.ok(posts);

    }

    @GetMapping("/{userId}/posts")
    public ResponseEntity<List<Post>> getAllPostsByUserId(@PathVariable int userId) {
        List<Post> userPosts = postService.getAllPostsByUserId(userId);
        return ResponseEntity.ok(userPosts);
    }

}
