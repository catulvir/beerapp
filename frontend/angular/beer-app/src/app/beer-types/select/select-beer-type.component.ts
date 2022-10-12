import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BeerType } from '../beer-type';
import { BeerTypeService } from '../beer-type-service';

@Component({
  selector: 'select-beer-type',
  templateUrl: './select-beer-type.component.html',
  styleUrls: ['./select-beer-type.component.css']
})
export class SelectBeerTypeComponent implements OnInit {

  @Input() form!: FormGroup;

  beerTypes: BeerType[] = [];
  errorMessage?: string;
  loading = false;

  constructor(private beerTypeService: BeerTypeService) { }

  ngOnInit(): void {
    this.getBeerTypes();
  }

  getBeerTypes(): void {
    this.loading = true;
    this.beerTypeService.getBeerTypes().subscribe({
      next: (beerTypes) => {
        this.beerTypes = beerTypes;
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

  compareFn(bt1: any, bt2: any): boolean {
    return bt1 && bt2 ? bt1.id === bt2.id : bt1 === bt2;
  }

  get beerType() {
    return this.form.get('beerType');
  }
}
