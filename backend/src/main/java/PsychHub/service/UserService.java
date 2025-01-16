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
    public void register(UserRegister userRegister){
        User user = UserMapper.INSTANCE.mapUserRegisterToUserEntity(userRegister);
        userRepository.save(user);
    }

    @Transactional
    public Integer login(UserLogin userLogin) {
        return userRepository
                .findByEmailAndPassword(userLogin.getEmail(), userLogin.getPassword())
                .map(User::getId)
                .orElse(null);
    }

}
