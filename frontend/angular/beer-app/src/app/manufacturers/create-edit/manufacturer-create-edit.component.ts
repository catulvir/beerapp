import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ManufacturerService } from '../manufacturer-service';

@Component({
  selector: 'app-manufacturer-create-edit',
  templateUrl: './manufacturer-create-edit.component.html',
  styleUrls: ['./manufacturer-create-edit.component.css']
})
export class ManufacturerCreateEditComponent implements OnInit {

  form!: FormGroup;
  id?: number;
  manufacturerName?: string;
  isAddMode?: boolean;
  errorMessage?: string;
  successMessage?: string;
  loading = false;
  disableMode = false;

  constructor(private manufacturerService: ManufacturerService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.isAddMode = !this.id;

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(127)]],
      description: ['', Validators.maxLength(511)],
      imageLink: ['', [Validators.required, Validators.maxLength(511)]],
    });

    if (!this.isAddMode) {
      this.loading = true;
      this.manufacturerService.getManufacturer(this.id).subscribe({
        next: manufacturer => {
          this.manufacturerName = manufacturer.name;
          this.form.patchValue(manufacturer);
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
    this.isAddMode ? this.createManufacturer() : this.editManufacturer();
  }

  createManufacturer(): void {
    this.manufacturerService.createManufacturer(this.form.value).subscribe({
      next: () => {
        this.successMessage = 'New manufacturer was successfully added!';
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

  editManufacturer(): void {
    this.manufacturerService.editManufacturer(Object.assign({ id: this.id }, this.form.value)).subscribe({
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

  get imageLink() {
    return this.form.get('imageLink');
  }
}
