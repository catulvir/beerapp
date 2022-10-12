package catulvir.beerapp.backend.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.*;
import catulvir.beerapp.backend.model.Manufacturer;
import catulvir.beerapp.backend.repository.ManufacturerRepository;

@RestController
public class ManufacturerController {
    private ManufacturerRepository manufacturerRepository;

    public ManufacturerController(ManufacturerRepository manufacturerRepository) {
        this.manufacturerRepository = manufacturerRepository;
    }

    @GetMapping("manufacturers")
    @ResponseBody
    public List<Manufacturer> getManufacturers(@RequestParam(required = false) String name) {
        return manufacturerRepository.findManufacturers(name);
    }

    @GetMapping("manufacturers/{id}")
    public Manufacturer getManufacturer(@PathVariable Long id) {
        return manufacturerRepository.findManufacturer(id);
    }

    @PostMapping("manufacturers")
    public Manufacturer createManufacturer(@RequestBody @Valid Manufacturer manufacturer) {
        return manufacturerRepository.saveManufacturer(manufacturer);
    }

    @PutMapping("manufacturers")
    public void editManufacturer(@RequestBody @Valid Manufacturer manufacturer) {
        manufacturerRepository.updateManufacturer(manufacturer);
    }

    @DeleteMapping("manufacturers/{id}")
    public void deleteManufacturer(@PathVariable Long id) {
        manufacturerRepository.deleteManufacturer(id);
    }
}
