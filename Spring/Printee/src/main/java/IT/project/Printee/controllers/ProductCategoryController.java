package IT.project.Printee.controllers;

import IT.project.Printee.models.ProductCategory;
import IT.project.Printee.repositories.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductCategoryController {
    private final ProductCategoryRepository productCategoryRepository;
    @Autowired
    public ProductCategoryController(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    @GetMapping("/productCategories")
    public List<ProductCategory> getAllProductCategories() {
        return productCategoryRepository.findAll();
    }
}
