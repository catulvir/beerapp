import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BeerTypeService } from '../beer-type-service';

@Component({
  selector: 'app-beer-type-create-edit',
  templateUrl: './beer-type-create-edit.component.html',
  styleUrls: ['./beer-type-create-edit.component.css']
})
export class BeerTypeCreateEditComponent implements OnInit {

  form!: FormGroup;
  id?: number;
  beerTypeName?: string;
  isAddMode?: boolean;
  errorMessage?: string;
  successMessage?: string;
  loading = false;
  disableMode = false;

  constructor(private beerTypeService: BeerTypeService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.isAddMode = !this.id;

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(63)]],
      description: ['', Validators.maxLength(511)],
    });

    if (!this.isAddMode) {
      this.loading = true;
      this.beerTypeService.getBeerType(this.id).subscribe({
        next: beerType => {
          this.beerTypeName = beerType.name;
          this.form.patchValue(beerType);
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
    this.isAddMode ? this.createBeerType() : this.editBeerType();
  }

  createBeerType(): void {
    this.beerTypeService.createBeerType(this.form.value).subscribe({
      next: () => {
        this.successMessage = 'New beer type was successfully added!';
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

  editBeerType(): void {
    this.beerTypeService.editBeerType(Object.assign({ id: this.id }, this.form.value)).subscribe({
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
