import { BeerType } from "../beer-types/beer-type";
import { Flavour } from "../flavours/flavour";
import { Manufacturer } from "../manufacturers/manufacturer";
import { OriginCountry } from "../origin-countries/origin-country";

export class Beer {
    
    id?: number;
    beerType?: BeerType;
    originCountry?: OriginCountry;
    manufacturer?: Manufacturer;
    flavours?: Flavour[];
    name?: string;
    description?: string;
    imageLink?: string;
	isCraft?: boolean;
	abv?: number;
	averageRating?: number;
	bitterness?: number;
    colour?: number;
	wortDensity?: number;
	lowerServeTemperature?: number;
    higherServeTemperature?: number;

	//private String nutritionFacts;
	//private type picture;
}