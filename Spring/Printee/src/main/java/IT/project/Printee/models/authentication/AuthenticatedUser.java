package IT.project.Printee.models.authentication;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthenticatedUser {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("role")
    private String role;

    @JsonProperty("name")
    private String name;

    @JsonProperty("lastName")
    private String lastName;

    @JsonProperty("uid")
    private String uid;

    @JsonProperty("email")
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
