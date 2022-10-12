import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Manufacturer } from '../manufacturer';
import { ManufacturerService } from '../manufacturer-service';

@Component({
  selector: 'select-manufacturer',
  templateUrl: './select-manufacturer.component.html',
  styleUrls: ['./select-manufacturer.component.css']
})
export class SelectManufacturerComponent implements OnInit {

  @Input() form!: FormGroup;

  manufacturers: Manufacturer[] = [];
  errorMessage?: string;
  loading = false;

  constructor(private manufacturerService: ManufacturerService) { }

  ngOnInit(): void {
    this.getManufacturers();
  }

  getManufacturers(): void {
    this.loading = true;
    this.manufacturerService.getManufacturers().subscribe({
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

  compareFn(m1: any, m2: any): boolean {
    return m1 && m2 ? m1.id === m2.id : m1 === m2;
  }

  get manufacturer() {
    return this.form.get('manufacturer');
  }
}
