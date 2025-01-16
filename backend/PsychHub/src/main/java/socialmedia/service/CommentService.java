package PsychHub.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import PsychHub.entity.Comment;
import PsychHub.entity.Post;
import PsychHub.entity.User;
import PsychHub.model.CommentCreate;
import PsychHub.repository.CommentRepository;
import PsychHub.repository.PostRepository;
import PsychHub.repository.UserRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public Comment createComment(CommentCreate commentCreate, int userId){     // modificare la final Spring Security

        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found"));

        Post post = postRepository.findById(commentCreate.getPostId()).orElseThrow(()->new RuntimeException("Post not found"));      // gasim postarea la care facem comentariul

        Comment comment = new Comment();
        comment.setContent(commentCreate.getContent());
        comment.setPost(post);
        comment.setUser(user);

        return commentRepository.save(comment);
    }

    public List<Comment> getAllComments(int postId){
        return commentRepository.findAllByPostId(postId);
    }

}
