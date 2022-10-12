import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OriginCountry } from '../origin-country';
import { OriginCountryService } from '../origin-country-service';

@Component({
  selector: 'app-origin-countries',
  templateUrl: './origin-countries.component.html',
  styleUrls: ['./origin-countries.component.css']
})
export class OriginCountriesComponent implements OnInit {

  countryName?: string;
  countryToBeDeleted?: OriginCountry;
  countries: OriginCountry[] = [];
  errorMessage?: string;
  successMessage?: string;
  loading = false;

  constructor(private countryService: OriginCountryService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.loading = true;
    this.countryService.getOriginCountries(this.countryName).subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: (err) => {
        this.errorMessage = err;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
    this.loading = false;
  }

  deleteCountry(id: number | undefined): void {
    if (id !== undefined) {
      this.loading = true;
      this.countryService.deleteOriginCountry(id).subscribe({
        next: () => {
          this.ngOnInit();
        },
        error: (err) => {
          this.errorMessage = err;
          this.loading = false;
        },
        complete: () => {
          this.successMessage = this.countryToBeDeleted?.name + ' was successfully deleted!';
          this.loading = false;
        }
      });
    } else {
      //maybe should be handled on backend or in interceptors, if this case is even possible
      this.errorMessage = 'There is an error on our end, page will be reloaded!';
      this.ngOnInit();
    }
  }

  openModal(country: OriginCountry): void {
    this.countryToBeDeleted = country;
  }
}
