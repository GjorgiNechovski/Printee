package IT.project.Printee.services;

import IT.project.Printee.models.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@Service
public interface ProductCategoryService extends JpaRepository<ProductCategory, Long> {
}
