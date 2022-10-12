import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FlavourService } from '../flavour-service';

@Component({
  selector: 'app-flavour-create-edit',
  templateUrl: './flavour-create-edit.component.html',
  styleUrls: ['./flavour-create-edit.component.css']
})
export class FlavourCreateEditComponent implements OnInit {

  form!: FormGroup;
  id?: number;
  flavourName?: string;
  isAddMode?: boolean;
  errorMessage?: string;
  successMessage?: string;
  loading = false;
  disableMode = false;

  constructor(private flavourService: FlavourService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.isAddMode = !this.id;

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(63)]]
    });

    if (!this.isAddMode) {
      this.loading = true;
      this.flavourService.getFlavour(this.id).subscribe({
        next: flavour => {
          this.flavourName = flavour.name;
          this.form.patchValue(flavour);
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
    this.isAddMode ? this.createFlavour() : this.editFlavour();
  }

  createFlavour(): void {
    this.flavourService.createFlavour(this.form.value).subscribe({
      next: () => {
        this.successMessage = 'New flavour was successfully added!';
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

  editFlavour(): void {
    this.flavourService.editFlavour(Object.assign({ id: this.id }, this.form.value)).subscribe({
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
}
