package IT.project.Printee.controllers;

import IT.project.Printee.models.PrintStudio;
import IT.project.Printee.models.User;
import IT.project.Printee.models.authentication.AuthenticatedUser;
import IT.project.Printee.models.authentication.LoginRequest;
import IT.project.Printee.services.AuthService;
import IT.project.Printee.services.PrintStudioService;
import IT.project.Printee.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
public class AuthenticationController {
    private final AuthService authService;
    private final UserService userService;
    private final PrintStudioService printStudioService;

    @Autowired
    public AuthenticationController(AuthService authService, UserService userService, PrintStudioService printStudioService) {
        this.authService = authService;
        this.userService = userService;
        this.printStudioService = printStudioService;
    }

    @PostMapping("/login")
    public AuthenticatedUser login(@RequestBody LoginRequest loginRequest) {
        return authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
    }

    @GetMapping("/self")
    public AuthenticatedUser getLoggedIn(@RequestParam String uid){
        return this.authService.getLoggedInUser((uid));
    }

    @PostMapping("/createUser")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        try {
            user.setUid(UUID.randomUUID().toString());

            userService.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Failed to create user");
        }
    }

    @PostMapping("/createStudio")
    public ResponseEntity<String> createPrintStudio(@RequestBody PrintStudio studio){
        try {
            studio.setUid(UUID.randomUUID().toString());

            printStudioService.save(studio);

            return ResponseEntity.status(HttpStatus.CREATED).body("User created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Failed to create user");
        }
    }
}
