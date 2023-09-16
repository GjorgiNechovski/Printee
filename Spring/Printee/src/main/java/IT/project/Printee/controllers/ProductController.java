package IT.project.Printee.controllers;

import IT.project.Printee.models.Product;
import IT.project.Printee.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public Page<Product> getAllProducts(
            @RequestParam(name = "categoryUid", required = false) String categoryUid,
            @RequestParam(name = "printStudioUid", required = false) String printStudioUid,
            Pageable pageable
    ) {
        pageable = PageRequest.of(pageable.getPageNumber(), 18, pageable.getSort());
        if(categoryUid != null && printStudioUid != null){
            return productService.findProductsByFilters(categoryUid, printStudioUid, pageable);
        }
        else if (categoryUid != null) {
            return productService.getProductsByCategory(categoryUid, pageable);
        } else if (printStudioUid != null) {
            return productService.getProductsByPrintStudio(printStudioUid, pageable);
        } else {
            return productService.findAll(pageable);
        }
    }

    @GetMapping("/product/{productUid}")
    public Product getProductByUid(@PathVariable String productUid){
        return productService.findByUid(productUid);
    }

    @GetMapping("/productsByCategory/{categoryUid}")
    public Page<Product> getProductsFromCategory(@PathVariable String categoryUid, Pageable pageable) {
        pageable = PageRequest.of(pageable.getPageNumber(), 18, pageable.getSort());
        return productService.getProductsByCategory(categoryUid, pageable);
    }

    @GetMapping("/productsByPrintStudio/{printStudioUid}")
    public Page<Product> getProductsFromPrintStudio(@PathVariable String printStudioUid, Pageable pageable) {
        pageable = PageRequest.of(pageable.getPageNumber(), 18, pageable.getSort());
        return productService.getProductsByPrintStudio(printStudioUid, pageable);
    }
}
