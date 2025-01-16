package PsychHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import PsychHub.entity.Post;
import PsychHub.entity.enums.Status;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query("SELECT p FROM Post p ORDER BY p.createdOn DESC")
    List<Post> findAllPosts();

    @Query("SELECT p FROM Post p WHERE p.status = :status ORDER BY p.createdOn DESC")
    List<Post> findAllPublishedPosts(@Param("status") Status status);

    List<Post> findAllPostsByUserId(int userId);
}
