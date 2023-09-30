package IT.project.Printee.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;

import static jakarta.persistence.GenerationType.*;

@Entity
@Table(name="product_category")
@Data
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "category_name")
    private String categoryName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category", orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Product> products;

    @Column(name = "uid", nullable = false, unique = true, length = 36)
    private String uid;

}
