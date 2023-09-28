package IT.project.Printee.models.nonApiModels;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UploadObject {
    private String name;
    private String description;
    private double unitPrice;
    private MultipartFile image;
    private int unitsInStock;
}
