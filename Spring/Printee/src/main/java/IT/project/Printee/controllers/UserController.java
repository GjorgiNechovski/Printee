package IT.project.Printee.controllers;

import IT.project.Printee.models.User;
import IT.project.Printee.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findByUserType("REGULAR");
    }

    @GetMapping("/printStudios")
    public List<User> getAllPrintStudios() {
        return userRepository.findByUserType("PRINT_STUDIO");
    }
}
