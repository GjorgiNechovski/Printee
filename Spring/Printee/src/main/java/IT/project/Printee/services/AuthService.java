package IT.project.Printee.services;

import IT.project.Printee.config.exceptions.models.AuthenticationException;
import IT.project.Printee.models.authentication.AuthenticatedUser;
import IT.project.Printee.models.PrintStudio;
import IT.project.Printee.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserService userService;
    private final PrintStudioService printStudioService;

    @Autowired
    public AuthService(UserService userService, PrintStudioService printStudioService) {
        this.userService = userService;
        this.printStudioService = printStudioService;
    }

    public AuthenticatedUser authenticate(String email, String password) {
        System.out.println(email + " " + password);
        User user = userService.findByEmailAndPassword(email, password);
        if (user != null) {
            return new AuthenticatedUser(
                    user.getId(),
                    "user",
                    user.getName(),
                    user.getLastName(),
                    user.getUid(),
                    user.getEmail()
            );
        }

        PrintStudio printStudio = printStudioService.findByEmailAndPassword(email, password);
        if (printStudio != null) {
            return new AuthenticatedUser(
                    printStudio.getId(),
                    "print_studio",
                    printStudio.getName(),
                    null,
                    printStudio.getUid(),
                    printStudio.getEmail()
            );
        }

        throw new AuthenticationException("Authentication failed");
    }
}

