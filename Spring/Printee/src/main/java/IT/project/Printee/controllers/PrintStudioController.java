package IT.project.Printee.controllers;

import IT.project.Printee.models.PrintStudio;
import IT.project.Printee.services.PrintStudioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PrintStudioController {
    private final PrintStudioService printStudioService;

    @Autowired
    public PrintStudioController(PrintStudioService printStudioService) {
        this.printStudioService = printStudioService;
    }

    @GetMapping("/printStudios")
    public List<PrintStudio> getAllPrintStudios() {
        return printStudioService.findAll();
    }
}
