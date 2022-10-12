import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OriginCountryService } from '../origin-country-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-origin-country-create-edit',
  templateUrl: './origin-country-create-edit.component.html',
  styleUrls: ['./origin-country-create-edit.component.css']
})
export class OriginCountryCreateEditComponent implements OnInit {

  form!: FormGroup;
  id?: number;
  countryName?: string;
  isAddMode?: boolean;
  errorMessage?: string;
  successMessage?: string;
  loading = false;
  disableMode = false;

  constructor(private countryService: OriginCountryService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.isAddMode = !this.id;

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(63)]],
      description: ['', Validators.maxLength(511)],
    });

    if (!this.isAddMode) {
      this.loading = true;
      this.countryService.getOriginCountry(this.id).subscribe({
        next: country => {
          this.countryName = country.name;
          this.form.patchValue(country);
        }, error: (error) => {
          this.disableMode = true;
          this.form.disable();
          this.errorMessage = error;
          this.loading = false;
        }, complete: () => {
          this.loading = false;
        }
      })
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.isAddMode ? this.createOriginCountry() : this.editOriginCountry();
  }

  createOriginCountry(): void {
    this.countryService.createOriginCountry(this.form.value).subscribe({
      next: () => {
        this.successMessage = 'New country was successfully added!';
      },
      error: (error) => {
        this.errorMessage = error;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  editOriginCountry(): void {
    this.countryService.editOriginCountry(Object.assign({ id: this.id }, this.form.value)).subscribe({
      next: () => {
        this.successMessage = this.name + ' was successfully edited!';
      },
      error: (error) => {
        this.errorMessage = error;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.router.navigate(['../../'], { relativeTo: this.route });
      }
    });
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }
}
