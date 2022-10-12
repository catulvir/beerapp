package catulvir.beerapp.backend.repository;

import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;
import catulvir.beerapp.backend.model.Beer;
import catulvir.beerapp.backend.model.Flavour;
import catulvir.beerapp.backend.repository.mappers.BeerRowMapper;

@Repository
public class BeerRepository {
    private JdbcTemplate template;

    public BeerRepository(JdbcTemplate template) {
        this.template = template;
    }

    public List<Beer> findBeers(String name) {

        StringBuilder sql = new StringBuilder(
                "SELECT b.ID, b.BEER_TYPE_ID, b.ORIGIN_COUNTRY_ID, b.MANUFACTURER_ID, b.NAME, b.DESCRIPTION, b.IMAGE_LINK, "
                        +
                        "b.IS_CRAFT, b.ABV, b.AVERAGE_RATING, b.BITTERNESS, b.COLOUR, b.WORT_DENSITY, " +
                        "b.LOWER_SERVE_TEMPERATURE, b.HIGHER_SERVE_TEMPERATURE, " +
                        "GROUP_CONCAT(f.ID) AS FLAVOUR_IDS, GROUP_CONCAT(f.NAME) AS FLAVOUR_NAMES, " +
                        "bt.NAME AS TYPE_NAME, bt.DESCRIPTION AS TYPE_DESCRIPTION, " +
                        "oc.NAME AS COUNTRY_NAME, oc.DESCRIPTION AS COUNTRY_DESCRIPTION, " +
                        "m.NAME AS MANUFACTURER_NAME, m.DESCRIPTION AS MANUFACTURER_DESCRIPTION, " +
                        "m.IMAGE_LINK AS MANUFACTURER_IMAGE_LINK " +
                        "FROM BEERS b " +
                        "LEFT JOIN BEER_FLAVOURS bf ON b.ID = bf.BEER_ID " +
                        "LEFT JOIN FLAVOURS f ON f.ID = bf.FLAVOUR_ID " +
                        "LEFT JOIN BEER_TYPES bt ON b.beer_type_id = bt.id " +
                        "LEFT JOIN ORIGIN_COUNTRIES oc ON b.ORIGIN_COUNTRY_ID = oc.ID " +
                        "LEFT JOIN MANUFACTURERS m ON b.MANUFACTURER_ID = m.ID ");
        // limit, order by, pagination, overall complexity causes concerns

        if (name != null) {
            sql.append("WHERE LOWER(b.name) LIKE ? GROUP BY b.id ORDER BY b.name");
            String trimmedName = "%" + name.trim().toLowerCase() + "%";
            return template.query(sql.toString(), new BeerRowMapper(), trimmedName);
        }

        sql.append("GROUP BY b.id ORDER BY b.name");

        return template.query(sql.toString(), new BeerRowMapper());
    }

    public Beer findBeer(Long id) {

        String sql = "SELECT b.ID, b.BEER_TYPE_ID, b.ORIGIN_COUNTRY_ID, b.MANUFACTURER_ID, b.NAME, b.DESCRIPTION, b.IMAGE_LINK, "
                +
                "b.IS_CRAFT, b.ABV, b.AVERAGE_RATING, b.BITTERNESS, b.COLOUR, b.WORT_DENSITY, " +
                "b.LOWER_SERVE_TEMPERATURE, b.HIGHER_SERVE_TEMPERATURE, " +
                "GROUP_CONCAT(f.ID) AS FLAVOUR_IDS, GROUP_CONCAT(f.NAME) AS FLAVOUR_NAMES, " +
                "bt.NAME AS TYPE_NAME, bt.DESCRIPTION AS TYPE_DESCRIPTION, " +
                "oc.NAME AS COUNTRY_NAME, oc.DESCRIPTION AS COUNTRY_DESCRIPTION, " +
                "m.NAME AS MANUFACTURER_NAME, m.DESCRIPTION AS MANUFACTURER_DESCRIPTION, " +
                "m.IMAGE_LINK AS MANUFACTURER_IMAGE_LINK " +
                "FROM BEERS b " +
                "LEFT JOIN BEER_FLAVOURS bf ON b.ID = bf.BEER_ID " +
                "LEFT JOIN FLAVOURS f ON f.ID = bf.FLAVOUR_ID " +
                "LEFT JOIN BEER_TYPES bt ON b.beer_type_id = bt.id " +
                "LEFT JOIN ORIGIN_COUNTRIES oc ON b.ORIGIN_COUNTRY_ID = oc.ID " +
                "LEFT JOIN MANUFACTURERS m ON b.MANUFACTURER_ID = m.ID " +
                "WHERE b.id = ?";

        return template.queryForObject(sql, new BeerRowMapper(), id);
    }

    public Beer saveBeer(Beer beer) {

        if (beer.getId() != null) {
            beer.setId(null);
        }

        Map<String, Object> parameters = new HashMap<>();

        String[] columns = { "beer_type_id", "origin_country_id", "manufacturer_id", "name", "description", "is_craft",
                "abv", "average_rating", "bitterness", "colour", "wort_density", "lower_serve_temperature",
                "higher_serve_temperature" };

        parameters.put("beer_type_id", beer.getBeerType().getId());
        parameters.put("origin_country_id", beer.getOriginCountry().getId());
        parameters.put("manufacturer_id", beer.getManufacturer().getId());
        parameters.put("name", beer.getName());
        parameters.put("description", beer.getDescription());
        parameters.put("image_link", beer.getImageLink());
        parameters.put("is_craft", beer.getIsCraft() == null ? false : beer.getIsCraft());
        parameters.put("abv", beer.getAbv());
        parameters.put("average_rating", beer.getAverageRating());
        parameters.put("bitterness", beer.getBitterness());
        parameters.put("colour", beer.getColour());
        parameters.put("wort_density", beer.getWortDensity());
        parameters.put("lower_serve_temperature", beer.getLowerServeTemperature());
        parameters.put("higher_serve_temperature", beer.getHigherServeTemperature());

        Number beerId = new SimpleJdbcInsert(template)
                .withTableName("beers")
                .usingGeneratedKeyColumns("id")
                .usingColumns(columns)
                .executeAndReturnKey(parameters);

        template.batchUpdate("INSERT INTO beer_flavours (beer_id, flavour_id) " +
                "VALUES (?, ?)",
                beer.getFlavours(),
                50,
                (PreparedStatement ps, Flavour flavour) -> {
                    ps.setLong(1, beerId.longValue());
                    ps.setLong(2, flavour.getId());
                });

        return beer;
    }

    public void updateBeer(Beer beer) {

        String updateSql = "UPDATE beers SET beer_type_id = ?, origin_country_id = ?, manufacturer_id = ?, name = ?," +
                "description = ?, image_link = ?, is_craft = ?, abv = ?, average_rating = ?, bitterness = ?, colour = ?,"
                +
                "wort_density = ?, lower_serve_temperature = ?, higher_serve_temperature = ? WHERE id = ?";

        template.update(updateSql, beer.getBeerType().getId(), beer.getOriginCountry().getId(),
                beer.getManufacturer().getId(), beer.getName(), beer.getDescription(), beer.getImageLink(),
                beer.getIsCraft() == null ? false : beer.getIsCraft(), beer.getAbv(),
                beer.getAverageRating(), beer.getBitterness(), beer.getColour(), beer.getWortDensity(),
                beer.getLowerServeTemperature(), beer.getHigherServeTemperature(), beer.getId());

        // maybe compare flavours not to uselessly run batch and delete

        String deleteFlavoursSql = "DELETE FROM beer_flavours WHERE beer_id = ?";

        template.update(deleteFlavoursSql, beer.getId());

        template.batchUpdate("INSERT INTO beer_flavours (beer_id, flavour_id) " +
                "VALUES (?, ?)",
                beer.getFlavours(),
                50,
                (PreparedStatement ps, Flavour flavour) -> {
                    ps.setLong(1, beer.getId());
                    ps.setLong(2, flavour.getId());
                });
    }

    public void deleteBeer(Long id) {

        String sql = "DELETE FROM beers WHERE id = ?";

        template.update(sql, id);
    }
}
