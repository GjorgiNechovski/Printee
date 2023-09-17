package IT.project.Printee.controllers;

import IT.project.Printee.models.authentication.AuthenticatedUser;
import IT.project.Printee.models.authentication.LoginRequest;
import IT.project.Printee.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthenticationController {
    private final AuthService authService;

    @Autowired
    public AuthenticationController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public AuthenticatedUser login(@RequestBody LoginRequest loginRequest) {
        return authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
    }
}
