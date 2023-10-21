package IT.project.Printee.controllers;

import IT.project.Printee.models.Product;
import IT.project.Printee.models.ProductCategory;
import IT.project.Printee.services.ProductCategoryService;
import IT.project.Printee.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
@RestController
@RequestMapping("/api")
public class ProductController {

    ProductService productService;
    ProductCategoryService productCategoryService;
    @Autowired
    public ProductController(ProductService productService, ProductCategoryService productCategoryService) {
        this.productService = productService;
        this.productCategoryService = productCategoryService;
    }

    @GetMapping("/products")
    public Page<Product> getProducts(
            @RequestParam(name = "categoryUid", required = false) String categoryUid,
            @RequestParam(name = "printStudioUid", required = false) String printStudioUid,
            @RequestParam(name = "search", required = false) String search,
            Pageable pageable
    ) {

        return productService.getProducts(categoryUid, printStudioUid, search, pageable);
    }

    @GetMapping("/product/{productUid}")
    public Product getProductByUid(@PathVariable String productUid){
        return this.productService.getProduct(productUid);
    }

    @GetMapping("/productsByCategory/{categoryUid}")
    public Page<Product> getProductsFromCategory(@PathVariable String categoryUid, Pageable pageable) {
        return this.productService.getProductsFromCategory(categoryUid, pageable);
    }

    @GetMapping("/productsByPrintStudio/{printStudioUid}")
    public Page<Product> getProductsFromPrintStudio(@PathVariable String printStudioUid, Pageable pageable) {
        return this.productService.getProductsFromPrintStudio(printStudioUid, pageable);
    }

    @GetMapping("/productsByUser/{userUid}")
    public Page<Product> getProductsFromUser(@PathVariable String userUid, Pageable pageable) {
        return productService.getProductsFromUser(userUid, pageable);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/uploadObject", consumes = "multipart/form-data")
    public ResponseEntity<Product> uploadObject(@RequestParam("name") String name,
                                                @RequestParam("description") String description,
                                                @RequestParam("price") double price,
                                                @RequestParam("image") MultipartFile image,
                                                @RequestParam("stock") int stock,
                                                @RequestParam("categoryUid") String categoryUid,
                                                @RequestParam("studioUid") String studioUid) throws IOException {

        ProductCategory category = productCategoryService.findByUid(categoryUid);

        if (category == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Product product = productService.uploadObject(name,description,price,stock,studioUid, image, category);

        return ResponseEntity.ok(product);
    }

    @PatchMapping("/{productUid}/edit")
    public ResponseEntity<Void> editProduct(@PathVariable String productUid, @RequestBody Product updatedProduct) {
        Product existingProduct = productService.getProduct(productUid);

        if (existingProduct == null) {
            return ResponseEntity.notFound().build();
        }

        this.productService.editProduct(existingProduct, updatedProduct);

        return ResponseEntity.ok().build();
    }

    @RequestMapping(method = RequestMethod.PATCH, value = "/{productUid}/changeImage", consumes = "multipart/form-data")
    public ResponseEntity<Void> editProductImage(@PathVariable String productUid, @RequestBody MultipartFile image) throws IOException {
        Product product = productService.getProduct(productUid);

        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        this.productService.changeProductImage(product, image);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productUid}/delete")
    public ResponseEntity<Void> deleteProduct(@PathVariable String productUid){
        productService.deleteProduct(productUid);
        return ResponseEntity.ok().build();
    }

}
