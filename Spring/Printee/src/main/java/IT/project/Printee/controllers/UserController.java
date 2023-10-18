package IT.project.Printee.controllers;

import IT.project.Printee.models.User;
import IT.project.Printee.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllRegularUsers();
    }

    @GetMapping("/printStudios")
    public List<User> getAllPrintStudios() {
        return this.userService.getAllPrintStudioUsers();
    }
}
