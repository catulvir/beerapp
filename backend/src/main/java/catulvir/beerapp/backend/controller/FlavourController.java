package catulvir.beerapp.backend.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.*;
import catulvir.beerapp.backend.model.Flavour;
import catulvir.beerapp.backend.repository.FlavourRepository;

@RestController
public class FlavourController {
    private FlavourRepository flavourRepository;

    public FlavourController(FlavourRepository flavourRepository) {
        this.flavourRepository = flavourRepository;
    }

    @GetMapping("flavours")
    @ResponseBody
    public List<Flavour> getFlavours(@RequestParam(required = false) String name) {
        return flavourRepository.findFlavours(name);
    }

    @GetMapping("flavours/{id}")
    public Flavour getFlavour(@PathVariable Long id) {
        return flavourRepository.findFlavour(id);
    }

	@PostMapping("flavours")
    public Flavour createFlavour(@RequestBody @Valid Flavour flavour) {
        return flavourRepository.saveFlavour(flavour);
    }

    @PutMapping("flavours")
    public void editFlavour( @RequestBody @Valid Flavour flavour) {
        flavourRepository.updateFlavour(flavour);
    }

    @DeleteMapping("flavours/{id}")
    public void deleteFlavour(@PathVariable Long id) {
        flavourRepository.deleteFlavour(id);
    }
}
