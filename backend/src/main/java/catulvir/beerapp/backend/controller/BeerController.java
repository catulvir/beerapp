package catulvir.beerapp.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BeerController {

	@GetMapping("/beer")
	public String beer(@RequestParam(value = "name") String name) {
		return name;
	}
}
