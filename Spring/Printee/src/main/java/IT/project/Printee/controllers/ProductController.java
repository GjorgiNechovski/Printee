package IT.project.Printee.controllers;

import IT.project.Printee.models.PrintStudio;
import IT.project.Printee.models.Product;
import IT.project.Printee.models.ProductCategory;
import IT.project.Printee.services.FileUploadService;
import IT.project.Printee.services.PrintStudioService;
import IT.project.Printee.services.ProductCategoryService;
import IT.project.Printee.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;
    private final FileUploadService fileUploadService;
    private final ProductCategoryService productCategoryService;
    private final PrintStudioService printStudioService;

    @Autowired
    public ProductController(ProductService productService, FileUploadService fileUploadService, ProductCategoryService productCategoryService, PrintStudioService printStudioService) {
        this.productService = productService;
        this.fileUploadService = fileUploadService;
        this.productCategoryService = productCategoryService;
        this.printStudioService = printStudioService;
    }

    @GetMapping("/products")
    public Page<Product> getAllProducts(
            @RequestParam(name = "categoryUid", required = false) String categoryUid,
            @RequestParam(name = "printStudioUid", required = false) String printStudioUid,
            @RequestParam(name = "search", required = false) String search,
            Pageable pageable
    ) {
        pageable = PageRequest.of(pageable.getPageNumber(), 40, pageable.getSort());
        Page<Product> productReturn;

        if(categoryUid != null && printStudioUid != null){
            productReturn =  productService.findProductsByFilters(categoryUid, printStudioUid, pageable);
        }
        else if (categoryUid != null) {
            productReturn = productService.getProductsByCategory(categoryUid, pageable);
        } else if (printStudioUid != null) {
            productReturn = productService.getProductsByPrintStudio(printStudioUid, pageable);
        } else {
            productReturn =  productService.findAll(pageable);
        }

        if (search != null && !search.isEmpty()) {
            String searchLowerCase = search.toLowerCase();
            List<Product> filteredProducts = productReturn.getContent().stream()
                    .filter(product -> product.getName().toLowerCase().contains(searchLowerCase))
                    .collect(Collectors.toList());

            productReturn = new PageImpl<>(filteredProducts, pageable, filteredProducts.size());
        }

        return productReturn;
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

    @GetMapping("/productsByUser/{userUid}")
    public Page<Product> getProductsFromUser(@PathVariable String userUid, Pageable pageable) {
        pageable = PageRequest.of(pageable.getPageNumber(), 18, pageable.getSort());
        return productService.getProductsByUserUid(userUid, pageable);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/uploadObject", consumes = "multipart/form-data")
    public ResponseEntity<Product> uploadFile(@RequestParam("name") String name,
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

        PrintStudio studio = printStudioService.findByUid(studioUid);
        String imageUrl = fileUploadService.uploadFile(image);

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setUnitPrice(BigDecimal.valueOf(price));
        product.setImageUrl(imageUrl);
        product.setUnitsInStock(stock);
        product.setCategory(category);
        product.setUid(UUID.randomUUID().toString());
        product.setUser(null);
        product.setPrintStudio(studio);

        productService.save(product);

        return ResponseEntity.ok(product);
    }

    @PatchMapping("/{productUid}/edit")
    public ResponseEntity<Void> editProduct(@PathVariable String productUid, @RequestBody Product updatedProduct) {
        Product existingProduct = productService.findByUid(productUid);

        if (existingProduct == null) {
            return ResponseEntity.notFound().build();
        }

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setUnitPrice(updatedProduct.getUnitPrice());
        existingProduct.setUnitsInStock(updatedProduct.getUnitsInStock());
        existingProduct.setCategory(updatedProduct.getCategory());

        productService.save(existingProduct);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productUid}/delete")
    public ResponseEntity<Void> editProduct(@PathVariable String productUid){
        productService.deleteByUid(productUid);
        return ResponseEntity.ok().build();
    }

}
