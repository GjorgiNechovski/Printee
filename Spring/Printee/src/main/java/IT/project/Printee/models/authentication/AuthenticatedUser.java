package IT.project.Printee.models;

public class AuthenticatedUser {
    private Long id;
    private String role;
    private String name;
    private String lastName;
    private String uid;
    private String email;

    public AuthenticatedUser(Long id, String role, String name, String lastName, String uid, String email) {
        this.id = id;
        this.role = role;
        this.name = name;
        this.lastName = lastName;
        this.uid = uid;
        this.email = email;
    }
}
