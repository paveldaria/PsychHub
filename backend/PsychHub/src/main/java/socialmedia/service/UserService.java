package PsychHub.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import PsychHub.entity.User;
import PsychHub.mapper.UserMapper;
import PsychHub.model.UserLogin;
import PsychHub.model.UserRegister;
import PsychHub.repository.UserRepository;


@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void register(UserRegister userRegister){                                    // To do: validare daca exista deja email-ul in baza de date
        User user = UserMapper.INSTANCE.mapUserRegisterToUserEntity(userRegister);
        userRepository.save(user);
    }

    @Transactional
    public Integer login(UserLogin userLogin) {
        return userRepository
                .findByEmailAndPassword(userLogin.getEmail(), userLogin.getPassword())
                .map(User::getId) // extragem si returnam id-ul user-ului, daca acesta este gasit
                .orElse(null);    // returnam null daca user-ul nu este gasit
    }




}
