package IT.project.Printee.services;

import IT.project.Printee.models.Product;
import IT.project.Printee.models.ProductCategory;
import IT.project.Printee.models.User;
import IT.project.Printee.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final FileUploadService fileUploadService;
    private final UserService userService;

    @Autowired
    public ProductService(ProductRepository productRepository, FileUploadService fileUploadService, UserService userService) {
        this.productRepository = productRepository;
        this.fileUploadService = fileUploadService;
        this.userService = userService;
    }

    public Page<Product> getProducts(String categoryUid, String printStudioUid, String search, Pageable pageable){
        pageable = PageRequest.of(pageable.getPageNumber(), 40, pageable.getSort());
        Page<Product> productReturn;

        if(categoryUid != null && printStudioUid != null){
            productReturn =  productRepository.findProductsByFilters(categoryUid, printStudioUid, pageable);
        }
        else if (categoryUid != null) {
            productReturn = productRepository.getProductsByCategory(categoryUid, pageable);
        } else if (printStudioUid != null) {
            productReturn = productRepository.getProductsByPrintStudio(printStudioUid, pageable);
        } else {
            productReturn =  productRepository.findAll(pageable);
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

    public Product getProduct(String uid){
        return productRepository.findByUid(uid);
    }

    public Page<Product> getProductsFromCategory(String categoryUid, Pageable pageable){
        pageable = PageRequest.of(pageable.getPageNumber(), 18, pageable.getSort());
        return productRepository.getProductsByCategory(categoryUid, pageable);
    }

    public Page<Product> getProductsFromPrintStudio(String uid, Pageable pageable) {
        pageable = PageRequest.of(pageable.getPageNumber(), 18, pageable.getSort());
        return productRepository.getProductsByPrintStudio(uid, pageable);
    }

    public Page<Product> getProductsFromUser(String userUid, Pageable pageable) {
        pageable = PageRequest.of(pageable.getPageNumber(), 18, pageable.getSort());
        return productRepository.getProductsByUserUid(userUid, pageable);
    }

    public Product uploadObject(String name,
                                String description,
                                double price,
                                int stock,
                                String studioUid,
                                MultipartFile image,
                                ProductCategory category) throws IOException {
        User studio = userService.findUserByUid(studioUid);
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

        productRepository.save(product);

        return product;
    }

    public void editProduct(Product existingProduct, Product updatedProduct){
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setUnitPrice(updatedProduct.getUnitPrice());
        existingProduct.setUnitsInStock(updatedProduct.getUnitsInStock());
        existingProduct.setCategory(updatedProduct.getCategory());

        productRepository.save(existingProduct);
    }

    public void deleteProduct(String productUid){
        productRepository.deleteByUid(productUid);
    }

    public void changeProductImage(Product product, MultipartFile image) throws IOException {
        String imageUrl = fileUploadService.uploadFile(image);

        System.out.println(imageUrl);

        product.setImageUrl(imageUrl);
        productRepository.save(product);
    }
}

