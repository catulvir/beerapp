package catulvir.beerapp.backend.model;

import java.util.List;

import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class OriginCountry {

    @Id
    private Long id;

    private List<Beer> beers;

    @NotBlank
    @Size(min = 2, max = 32)
    private String name;
}
