package IT.project.Printee.services;

import IT.project.Printee.models.ProductCategory;
import IT.project.Printee.repositories.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;

    @Autowired
    public ProductCategoryService(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    public List<ProductCategory> getAllCategories(){
        return this.productCategoryRepository.findAll();
    }

    public ProductCategory findByUid(String uid){
        return this.productCategoryRepository.findByUid(uid);
    }
}
