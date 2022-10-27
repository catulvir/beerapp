package catulvir.beerapp.backend.repository.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.RowMapper;

import catulvir.beerapp.backend.model.Beer;
import catulvir.beerapp.backend.model.BeerType;
import catulvir.beerapp.backend.model.Flavour;
import catulvir.beerapp.backend.model.Manufacturer;
import catulvir.beerapp.backend.model.OriginCountry;

public class BeerRowMapper implements RowMapper<Beer> {

    @Override
    public Beer mapRow(ResultSet rs, int rowNum) throws SQLException {
        Beer beer = new Beer();
        beer.setId(rs.getLong("ID"));
        beer.setName(rs.getString("NAME"));
        beer.setRoutePath(rs.getString("NAME").trim().toLowerCase().replaceAll("\s", "-"));
        beer.setDescription(rs.getString("DESCRIPTION"));
        beer.setImageLink(rs.getString("IMAGE_LINK"));
        beer.setIsCraft(rs.getBoolean("IS_CRAFT"));
        beer.setAbv(rs.getFloat("ABV"));
        beer.setAverageRating(rs.getFloat("AVERAGE_RATING"));
        beer.setBitterness(rs.getFloat("BITTERNESS"));
        beer.setColour(rs.getFloat("COLOUR"));
        beer.setWortDensity(rs.getFloat("WORT_DENSITY"));
        beer.setLowerServeTemperature(rs.getInt("LOWER_SERVE_TEMPERATURE"));
        beer.setHigherServeTemperature(rs.getInt("HIGHER_SERVE_TEMPERATURE"));

        BeerType beerType = new BeerType();
        beerType.setId(rs.getLong("BEER_TYPE_ID"));
        beerType.setName(rs.getString("TYPE_NAME"));
        beerType.setDescription(rs.getString("TYPE_DESCRIPTION"));

        OriginCountry originCountry = new OriginCountry();
        originCountry.setId(rs.getLong("ORIGIN_COUNTRY_ID"));
        originCountry.setName(rs.getString("COUNTRY_NAME"));
        originCountry.setDescription(rs.getString("COUNTRY_DESCRIPTION"));

        Manufacturer manufacturer = new Manufacturer();
        manufacturer.setId(rs.getLong("MANUFACTURER_ID"));
        manufacturer.setName(rs.getString("MANUFACTURER_NAME"));
        manufacturer.setDescription(rs.getString("MANUFACTURER_DESCRIPTION"));
        manufacturer.setImageLink(rs.getString("MANUFACTURER_IMAGE_LINK"));

        List<Flavour> flavours = new ArrayList<>();
        String flavourIds = rs.getString("FLAVOUR_IDS");
        String flavourNames = rs.getString("FLAVOUR_NAMES");
        String[] ids = (flavourIds != null) ? flavourIds.split(",") : new String[0];
        String[] names = (flavourNames != null) ? flavourNames.split(",") : new String[0];

        for (int i = 0; i < ids.length; i++) {
            flavours.add(new Flavour(Long.parseLong(ids[i]), names[i]));
        }

        beer.setBeerType(beerType);
        beer.setOriginCountry(originCountry);
        beer.setManufacturer(manufacturer);
        beer.setFlavours(flavours);

        return beer;
    }
}
