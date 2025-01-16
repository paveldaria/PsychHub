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

    public Post createPost(PostCreate postCreate, int userId){

        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found"));

        Post post = new Post();
        post.setTitle(postCreate.getTitle());
        post.setContent(postCreate.getContent());
        post.setUser(user);
        post.setStatus(Status.PENDING);

        return postRepository.save(post);
    }

    public List<Post> getPublishedPosts(){
        return postRepository.findAllPublishedPosts(Status.PENDING);
    }

}
