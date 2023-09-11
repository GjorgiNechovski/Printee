package IT.project.Printee.controllers;

import IT.project.Printee.models.Product;
import IT.project.Printee.models.ProductCategory;
import IT.project.Printee.services.ProductService;
import IT.project.Printee.services.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;
    private final ProductCategoryService productCategoryService;

    @Autowired
    public ProductController(ProductService productService, ProductCategoryService productCategoryService) {
        this.productService = productService;
        this.productCategoryService = productCategoryService;
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productService.findAll();
    }

    @GetMapping("/productCategories")
    public List<ProductCategory> getAllProductCategories() {
        return productCategoryService.findAll();
    }
}
