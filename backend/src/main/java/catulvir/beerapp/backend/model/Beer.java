package catulvir.beerapp.backend.model;

import lombok.*;
import java.util.List;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Beer {

    private Long id;

	private List<Flavour> flavours;

	private BeerType beerType;

	private OriginCountry originCountry;

	private Manufacturer manufacturer;

	@Size(max = 63)
	private String name;

	private String routePath;

	@Size(max = 511)
	private String description;
	
	@Size(max = 511)
	private String imageLink;

	@NotNull
	private Boolean isCraft;

	@NotNull
	private Float abv;

	private Float averageRating;

	private Float bitterness;

	private Float colour;

	private Float wortDensity;

	private Integer lowerServeTemperature;

	private Integer higherServeTemperature;

	//private String nutritionFacts;
}
