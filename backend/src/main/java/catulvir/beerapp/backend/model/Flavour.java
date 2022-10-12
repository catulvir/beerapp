package catulvir.beerapp.backend.model;

import lombok.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Flavour {
    
    private Long id;

    @NotBlank
    @Size(min = 2, max = 63)
    private String name;
}
