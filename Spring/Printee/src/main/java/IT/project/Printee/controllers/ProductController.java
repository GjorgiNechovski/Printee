package IT.project.Printee.controllers;

import IT.project.Printee.models.Product;
import IT.project.Printee.models.ProductCategory;
import IT.project.Printee.services.ProductService;
import IT.project.Printee.services.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public Page<Product> getAllProducts(Pageable pageable) {
        pageable = PageRequest.of(pageable.getPageNumber(), 15, pageable.getSort());
        return productService.findAll(pageable);
    }

    @GetMapping("/productsByCategory/{categoryId}")
    public Page<Product> getProductsFromCategory(@PathVariable Long categoryId, Pageable pageable) {
        pageable = PageRequest.of(pageable.getPageNumber(), 15, pageable.getSort());
        return productService.getProductsByCategory(categoryId, pageable);
    }

    @GetMapping("/productsByPrintStudio/{printStudioId}")
    public Page<Product> getProductsFromPrintStudio(@PathVariable Long printStudioId, Pageable pageable) {
        pageable = PageRequest.of(pageable.getPageNumber(), 15, pageable.getSort());
        return productService.getProductsByPrintStudio(printStudioId, pageable);
    }
}
