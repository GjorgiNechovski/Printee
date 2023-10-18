package IT.project.Printee.services;

import IT.project.Printee.config.exceptions.models.AuthenticationException;
import IT.project.Printee.models.authentication.AuthenticatedUser;
import IT.project.Printee.models.User;
import IT.project.Printee.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    @Autowired
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthenticatedUser authenticate(String email, String password) {
        User user = userRepository.findByEmailAndPassword(email, password);
        if (user != null) {
            return new AuthenticatedUser(
                    user.getId(),
                    user.getUserType(),
                    user.getName(),
                    user.getLastName(),
                    user.getUid(),
                    user.getEmail()
            );
        }

        throw new AuthenticationException("Authentication failed");
    }

    public AuthenticatedUser getLoggedInUser(String uid){
        User user = userRepository.findByUid(uid);
        if (user != null) {
            return new AuthenticatedUser(
                    user.getId(),
                    user.getUserType(),
                    user.getName(),
                    user.getLastName(),
                    user.getUid(),
                    user.getEmail()
            );
        }

        return null;
    }
}

