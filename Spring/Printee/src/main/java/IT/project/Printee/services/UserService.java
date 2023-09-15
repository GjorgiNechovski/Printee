package IT.project.Printee.services;

import IT.project.Printee.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface UserService extends JpaRepository<User, Long> {
}
