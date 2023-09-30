package IT.project.Printee.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class FileUploadService {
    @Value("${file.upload.directory}")
    private String uploadDirectory;

    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        String filePath = Paths.get(uploadDirectory, fileName).toString();
        Files.write(Paths.get(filePath), file.getBytes());

        return "assets/images/products/" + fileName;
    }
}
