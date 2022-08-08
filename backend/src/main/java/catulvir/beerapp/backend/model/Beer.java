package catulvir.beerapp.backend.model;

import lombok.*;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Beer {

	@Id
    private Long id;

	private List<BeerFlavour> flavours;

	private BeerType beerType;

	private OriginCountry originCountry;

	@Size(min = 1, max = 64)
	private String name;

	@Size(max = 64)
	private String description;

	@NotNull
	private Float abv;

	private Float rating;

	private Float bitterness;

	private Float colour;

	private Float wortDensity;

	private Integer lowerServeTemperature;

	private Integer higherServeTemperature;

	//private String nutritionFacts;
	
	//private type picture;
}
