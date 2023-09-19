package IT.project.Printee.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Table(name = "print_studio")
@Data
public class PrintStudio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "uid", unique = true)
    private String uid;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "printStudio")
    private Set<Product> products;

    }
