package PsychHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import PsychHub.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmailAndPassword(String email, String password);
}