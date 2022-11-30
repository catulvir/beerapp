package catulvir.beerapp.backend.controller;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;
import org.springframework.web.bind.annotation.*;
import catulvir.beerapp.backend.model.Beer;
import catulvir.beerapp.backend.repository.BeerRepository;

@RestController
public class BeerController {

	private BeerRepository beerRepository;

    public BeerController(BeerRepository beerRepository) {
        this.beerRepository = beerRepository;
    }

    @GetMapping("beers")
    @ResponseBody
    public List<Beer> getBeers(@RequestParam(required = false) Map<String,String> params) {
        return beerRepository.findBeers(params);
    }

    @GetMapping("beers/{id}")
    public Beer getBeer(@PathVariable Long id) {
        return beerRepository.findBeer(id);
    }

	@PostMapping("beers")
    public Beer createBeer(@RequestBody @Valid Beer beer) {
        return beerRepository.saveBeer(beer);
    }

    @PutMapping("beers")
    public void editBeer(@RequestBody @Valid Beer beer) {
        beerRepository.updateBeer(beer);
    }

    @DeleteMapping("beers/{id}")
    public void deleteBeer(@PathVariable Long id) {
        beerRepository.deleteBeer(id);
    }
}
