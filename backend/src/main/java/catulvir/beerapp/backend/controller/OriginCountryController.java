package catulvir.beerapp.backend.controller;

import java.util.List;

import javax.validation.Valid;
import org.springframework.web.bind.annotation.*;
import catulvir.beerapp.backend.model.OriginCountry;
import catulvir.beerapp.backend.repository.OriginCountryRepository;

@RestController
public class OriginCountryController {
    private OriginCountryRepository originCountryRepository;

    public OriginCountryController(OriginCountryRepository originCountryRepository) {
        this.originCountryRepository = originCountryRepository;
    }

    @GetMapping("origin-countries")
    @ResponseBody
    public List<OriginCountry> getOriginCountries(@RequestParam(required = false) String name) {
        return originCountryRepository.findOriginCountries(name);
    }

    @GetMapping("origin-countries/{id}")
    public OriginCountry getOriginCountry(@PathVariable Long id) {
        return originCountryRepository.findOriginCountry(id);
    }

    @PostMapping("origin-countries")
    public OriginCountry createOriginCountry(@RequestBody @Valid OriginCountry originCountry) {
        return originCountryRepository.saveOriginCountry(originCountry);
    }

    @PutMapping("origin-countries")
    public void editOriginCountry(@RequestBody @Valid OriginCountry originCountry) {
        originCountryRepository.updateOriginCountry(originCountry);
    }

    @DeleteMapping("origin-countries/{id}")
    public void deleteOriginCountry(@PathVariable Long id) {
        originCountryRepository.deleteOriginCountry(id);
    }
}
