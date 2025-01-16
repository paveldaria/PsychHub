package PsychHub.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import PsychHub.entity.User;
import PsychHub.model.UserRegister;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User mapUserRegisterToUserEntity(UserRegister userRegister);
}
