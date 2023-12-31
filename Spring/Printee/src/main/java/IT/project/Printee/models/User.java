package IT.project.Printee.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Table(name = "user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "uid", unique = true, nullable = false)
    private String uid;

    @Column(name = "user_type")
    private String userType;

    @OneToMany(mappedBy = "user")
    private Set<Product> products;
}
