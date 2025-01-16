package PsychHub.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import PsychHub.entity.Post;
import PsychHub.entity.User;
import PsychHub.entity.enums.Status;
import PsychHub.model.PostCreate;
import PsychHub.repository.PostRepository;
import PsychHub.repository.UserRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public Post createPost(PostCreate postCreate){
        User user = userRepository.findById(postCreate.getUserId()).orElseThrow(()->new RuntimeException("User not found"));
        Post post = new Post();
        post.setTitle(postCreate.getTitle());
        post.setContent(postCreate.getContent());
        post.setUser(user);
        post.setStatus(Status.PUBLISHED);

        return postRepository.save(post);
    }

    public void deletePost(int postId){
        Post post = postRepository.findById(postId).orElseThrow(()-> new RuntimeException("Post not found"));
        postRepository.deleteById(postId);
    }

    public List<Post> getAllPosts(){
        return postRepository.findAllPosts();
    }

    public List<Post> getPublishedPosts(){
        return postRepository.findAllPublishedPosts(Status.PUBLISHED);
    }

    public List<Post> getAllPostsByUserId(int userId) {
        return postRepository.findAllPostsByUserId(userId);
    }
}
