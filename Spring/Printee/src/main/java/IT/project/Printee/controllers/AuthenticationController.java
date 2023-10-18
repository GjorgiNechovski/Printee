package IT.project.Printee.controllers;

import IT.project.Printee.models.User;
import IT.project.Printee.models.authentication.AuthenticatedUser;
import IT.project.Printee.models.authentication.LoginRequest;
import IT.project.Printee.services.AuthService;
import IT.project.Printee.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
public class AuthenticationController {
    private final AuthService authService;
    private final UserRepository userRepository;

    @Autowired
    public AuthenticationController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public AuthenticatedUser login(@RequestBody LoginRequest loginRequest) {
        return authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
    }

    @GetMapping("/self")
    public AuthenticatedUser getLoggedIn(@RequestParam String uid) {
        return authService.getLoggedInUser(uid);
    }

    @PostMapping("/createUser")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        try {
            user.setUid(UUID.randomUUID().toString());
            user.setUserType("REGULAR"); // Set the user type to REGULAR

            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User account created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Failed to create user");
        }
    }

    @PostMapping("/createStudio")
    public ResponseEntity<String> createPrintStudio(@RequestBody User studio) {
        try {
            studio.setUid(UUID.randomUUID().toString());
            studio.setUserType("PRINT_STUDIO");

            userRepository.save(studio);
            return ResponseEntity.status(HttpStatus.CREATED).body("Print Studio account created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Failed to create print studio");
        }
    }
}

