import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Beer } from '../beer';
import { BeerService } from '../beer-service';

@Component({
  selector: 'app-beer-create-edit',
  templateUrl: './beer-create-edit.component.html',
  styleUrls: ['./beer-create-edit.component.css']
})
export class BeerCreateEditComponent implements OnInit {

  form!: FormGroup;
  id?: number;
  beer?: Beer;
  isAddMode?: boolean;
  errorMessage?: string;
  successMessage?: string;
  loading = false;
  disableMode = false;

  constructor(private beerService: BeerService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.isAddMode = !this.id;

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(63)]],
      description: ['', [Validators.maxLength(511)]],
      imageLink: ['', [Validators.required, Validators.maxLength(511)]],
      beerType: ['', [Validators.required]],
      originCountry: ['', [Validators.required]],
      manufacturer: ['', [Validators.required]],
      flavours: ['', [Validators.required]],
      isCraft: [''],
      abv: ['', [Validators.required, Validators.min(0.0), Validators.max(99.9)]],
      averageRating: ['', [Validators.min(0), Validators.max(10)]],
      bitterness: ['', [Validators.min(0.0), Validators.max(1000)]],
      colour: ['', [Validators.min(0.0), Validators.max(5000)]],
      wortDensity: ['', [Validators.min(0.0), Validators.max(99.9)]],
      lowerServeTemperature: ['', [Validators.min(0.0), Validators.max(100)]],
      higherServeTemperature: ['', [Validators.min(0.0), Validators.max(100)]]
    },
    {
      validators: [this.compareTemperatures]
    });

    if (!this.isAddMode) {
      this.loading = true;
      this.beerService.getBeer(this.id).subscribe({
        next: beer => {
          this.beer = beer;
          this.form.patchValue(beer);
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
    this.isAddMode ? this.createBeer() : this.editBeer();
  }

  createBeer(): void {
    this.beerService.createBeer(this.form.value).subscribe({
      next: () => {
        this.successMessage = 'New beer was successfully added!';
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

  editBeer(): void {
    this.beerService.editBeer(Object.assign({ id: this.id }, this.form.value)).subscribe({
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

  compareTemperatures: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let lowerTemp = control.get('lowerServeTemperature');
    let higherTemp = control.get('higherServeTemperature');
  
    return lowerTemp && higherTemp && lowerTemp.value > higherTemp.value ? { lowTempIsHigher: true } : null;
  };

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  get imageLink() {
    return this.form.get('imageLink');
  }

  get isCraft() {
    return this.form.get('isCraft');
  }

  get abv() {
    return this.form.get('abv');
  }

  get averageRating() {
    return this.form.get('averageRating');
  }

  get bitterness() {
    return this.form.get('bitterness');
  }

  get colour() {
    return this.form.get('colour');
  }

  get wortDensity() {
    return this.form.get('wortDensity');
  }

  get lowerServeTemperature() {
    return this.form.get('lowerServeTemperature');
  }

  get higherServeTemperature() {
    return this.form?.get('higherServeTemperature');
  }
}
