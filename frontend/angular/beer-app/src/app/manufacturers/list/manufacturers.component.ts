import { Component, OnInit } from '@angular/core';
import { Manufacturer } from '../manufacturer';
import { ActivatedRoute, Router } from '@angular/router';
import { ManufacturerService } from '../manufacturer-service';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.css']
})
export class ManufacturersComponent implements OnInit {

  manufacturerName?: string;
  manufacturers: Manufacturer[] = [];
  manufacturerToBeDeleted?: Manufacturer;
  errorMessage?: string;
  successMessage?: string;
  loading = false;

  constructor(private manufacturerService: ManufacturerService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getManufacturers();
  }

  getManufacturers(): void {
    this.loading = true;
    this.manufacturerService.getManufacturers(this.manufacturerName).subscribe({
      next: (manufacturers) => {
        this.manufacturers = manufacturers;
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

  deleteManufacturer(id: number | undefined): void {
    if (id !== undefined) {
      this.loading = true;
      this.manufacturerService.deleteManufacturer(id).subscribe({
        next: () => {
          this.ngOnInit();
        },
        error: (err) => {
          this.errorMessage = err;
          this.loading = false;
        },
        complete: () => {
          this.successMessage = this.manufacturerToBeDeleted?.name + ' was successfully deleted!';
          this.loading = false;
        }
      });
    } else {
      //maybe should be handled on backend or in interceptors, if this case is even possible
      this.errorMessage = 'There is an error on our end, page will be reloaded!';
      this.ngOnInit();
    }
  }

  openModal(manufacturer: Manufacturer): void {
    this.manufacturerToBeDeleted = manufacturer;
  }
}
