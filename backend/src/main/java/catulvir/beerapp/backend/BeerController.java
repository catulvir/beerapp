package catulvir.beerapp.backend;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BeerController {
    private static final String template = "Hello, %s!";
	private final AtomicLong counter = new AtomicLong();

	@GetMapping("/beer")
	public Beer beer(@RequestParam(value = "name", defaultValue = "World") String name) {
		return new Beer(counter.incrementAndGet(), String.format(template, name));
	}
    
}
