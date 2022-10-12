import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OriginCountry } from '../origin-country';
import { OriginCountryService } from '../origin-country-service';

@Component({
  selector: 'select-origin-country',
  templateUrl: './select-origin-country.component.html',
  styleUrls: ['./select-origin-country.component.css']
})
export class SelectOriginCountryComponent implements OnInit {

  @Input() form!: FormGroup;

  countries: OriginCountry[] = [];
  errorMessage?: string;
  loading = false;

  constructor(private countryService: OriginCountryService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.loading = true;
    this.countryService.getOriginCountries().subscribe({
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

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  get originCountry() {
    return this.form.get('originCountry');
  }
}
