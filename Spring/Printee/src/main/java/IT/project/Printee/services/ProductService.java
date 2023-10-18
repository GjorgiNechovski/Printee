package IT.project.Printee.services;

import IT.project.Printee.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@Service
public interface ProductService extends JpaRepository<Product, Long> {
    Product findByUid(String uid);
    @Query("SELECT p FROM Product p WHERE p.category.uid = :categoryUid")
    Page<Product> getProductsByCategory(@Param("categoryUid") String categoryUid, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.printStudio.uid = :printStudioUid")
    Page<Product> getProductsByPrintStudio(@Param("printStudioUid") String printStudioUid, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.user.uid = :userUid")
    Page<Product> getProductsByUserUid(@Param("userUid") String userUid, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE (:categoryUid IS NULL OR p.category.uid = :categoryUid) " +
            "AND (:printStudioUid IS NULL OR p.printStudio.uid = :printStudioUid)")
    Page<Product> findProductsByFilters(
            @Param("categoryUid") String categoryUid,
            @Param("printStudioUid") String printStudioUid,
            Pageable pageable
    );
    @Modifying
    @Transactional
    @Query("DELETE FROM Product p WHERE p.uid = :uid")
    void deleteByUid(String uid);
}
