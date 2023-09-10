package IT.project.Printee.services;

import IT.project.Printee.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ProductService extends JpaRepository<Product, Long> {
}
