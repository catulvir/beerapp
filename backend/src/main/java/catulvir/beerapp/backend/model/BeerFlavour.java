package catulvir.beerapp.backend.model;

import javax.persistence.Id;

public class BeerFlavour {
    @Id
    private Long id;

    private Beer beer;
    
    private Flavour flavour;
}
