package catulvir.beerapp.backend.model;

import java.util.List;
import lombok.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OriginCountry {

    private Long id;

    private List<Beer> beers;

    @NotBlank
    @Size(min = 2, max = 63)
    private String name;

    @Size(max = 511)
    private String description;

    // shortened name for icon/flag?
}
