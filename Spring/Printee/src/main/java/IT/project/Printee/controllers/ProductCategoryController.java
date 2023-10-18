package IT.project.Printee.controllers;

import IT.project.Printee.models.ProductCategory;
import IT.project.Printee.repositories.ProductCategoryRepository;
import IT.project.Printee.services.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductCategoryController {
    private final ProductCategoryService productCategoryService;
    @Autowired
    public ProductCategoryController(ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    @GetMapping("/productCategories")
    public List<ProductCategory> getAllProductCategories() {
        return productCategoryService.getAllCategories();
    }
}
