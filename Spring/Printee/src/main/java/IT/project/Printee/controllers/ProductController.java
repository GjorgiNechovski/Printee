package IT.project.Printee.controllers;

import IT.project.Printee.models.Product;
import IT.project.Printee.models.nonApiModels.UploadObject;
import IT.project.Printee.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

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
            @RequestParam(name = "search", required = false) String search,
            Pageable pageable
    ) {
        pageable = PageRequest.of(pageable.getPageNumber(), 18, pageable.getSort());
        Page<Product> productReturn = null;

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

    @RequestMapping(method = RequestMethod.POST, name = "/uploadObject",  consumes = "multipart/form-data")
    public void uploadFile(@RequestParam("name") String name, @RequestParam("description") String description, @RequestParam("unitPrice") double unitPrice,
                           @RequestParam("image") MultipartFile image, @RequestParam("unitsInStock") int unitsInStock)
     {
        System.out.println(image);
    }

}
