package catulvir.beerapp.backend.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;
import catulvir.beerapp.backend.model.OriginCountry;

@Repository
public class OriginCountryRepository {
    private JdbcTemplate template;

    public OriginCountryRepository(JdbcTemplate template) {
        this.template = template;
    }

    public List<OriginCountry> findOriginCountries(String name) {

        StringBuilder sql = new StringBuilder("SELECT * FROM origin_countries ");

        if (name != null) {
            sql.append("WHERE LOWER(name) LIKE ? ORDER BY name");
            String trimmedName = "%" + name.trim().toLowerCase() + "%";
            return template.query(sql.toString(), BeanPropertyRowMapper.newInstance(OriginCountry.class), trimmedName);
        }

        sql.append("ORDER BY name");

        return template.query(sql.toString(), BeanPropertyRowMapper.newInstance(OriginCountry.class));
    }

    public OriginCountry findOriginCountry(Long id) {

        String sql = "SELECT * FROM origin_countries WHERE id = ?";

        return template.queryForObject(sql, BeanPropertyRowMapper.newInstance(OriginCountry.class), id);
    }

    public OriginCountry saveOriginCountry(OriginCountry originCountry) {

        if (originCountry.getId() != null) {
            originCountry.setId(null);
        }

        Map<String, Object> parameters = new HashMap<>();

        String[] columns = { "name", "description" };

        parameters.put("name", originCountry.getName());
        parameters.put("description", originCountry.getDescription());

        new SimpleJdbcInsert(template)
                .withTableName("origin_countries")
                .usingColumns(columns)
                .execute(parameters);

        return originCountry;
    }

    public void updateOriginCountry(OriginCountry originCountry) {

        if (originCountry.getId() != null) {

            String sql = "UPDATE origin_countries SET name = ?, description = ? where id = ?";

            template.update(sql, originCountry.getName(), originCountry.getDescription(), originCountry.getId());
        }
    }

    public void deleteOriginCountry(Long id) {

        String sql = "DELETE FROM origin_countries WHERE id = ?";

        template.update(sql, id);
    }
}
