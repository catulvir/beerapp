import { BeerType } from "../beer-types/beer-type";
import { Manufacturer } from "../manufacturers/manufacturer";
import { OriginCountry } from "../origin-countries/origin-country";

export class BeerSearchObject {

    beerType?: BeerType;
    originCountry?: OriginCountry;
    manufacturer?: Manufacturer;
    name?: string;
    isCraft?: boolean;

    //flavours?, beerTypes...
}