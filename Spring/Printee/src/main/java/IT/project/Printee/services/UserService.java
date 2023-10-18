package IT.project.Printee.services;

import IT.project.Printee.models.User;
import IT.project.Printee.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUserByUid(String uid){
        return this.userRepository.findByUid(uid);
    }

    public List<User> getAllRegularUsers(){
        return this.userRepository.findByUserType("REGULAR");
    }

    public List<User> getAllPrintStudioUsers(){
        return userRepository.findByUserType("PRINT_STUDIO");
    }


}
