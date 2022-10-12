package catulvir.beerapp.backend.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.*;
import catulvir.beerapp.backend.model.BeerType;
import catulvir.beerapp.backend.repository.BeerTypeRepository;

@RestController
public class BeerTypeController {
    private BeerTypeRepository beerTypeRepository;

    public BeerTypeController(BeerTypeRepository beerTypeRepository) {
        this.beerTypeRepository = beerTypeRepository;
    }

    @GetMapping("beer-types")
    @ResponseBody
    public List<BeerType> getBeerTypes(@RequestParam(required = false) String name) {
        return beerTypeRepository.findBeerTypes(name);
    }

    @GetMapping("beer-types/{id}")
    public BeerType getBeerType(@PathVariable Long id) {
        return beerTypeRepository.findBeerType(id);
    }

	@PostMapping("beer-types")
    public BeerType createBeerType(@RequestBody @Valid BeerType beerType) {
        return beerTypeRepository.saveBeerType(beerType);
    }

    @PutMapping("beer-types")
    public void editBeerType(@RequestBody @Valid BeerType beerType) {
        beerTypeRepository.updateBeerType(beerType);
    }

    @DeleteMapping("beer-types/{id}")
    public void deleteBeerType(@PathVariable Long id) {
        beerTypeRepository.deleteBeerType(id);
    }
    
}
