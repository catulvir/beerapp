import { Component, OnInit } from '@angular/core';
import { BeerType } from '../beer-type';
import { BeerTypeService } from '../beer-type-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-beer-types',
  templateUrl: './beer-types.component.html',
  styleUrls: ['./beer-types.component.css']
})
export class BeerTypesComponent implements OnInit {

  beerTypeName?: string;
  beerTypeToBeDeleted?: BeerType;
  beerTypes: BeerType[] = [];
  errorMessage?: string;
  successMessage?: string;
  loading = false;

  constructor(private beerTypeService: BeerTypeService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getBeerTypes();
  }

  getBeerTypes(): void {
    this.loading = true;
    this.beerTypeService.getBeerTypes(this.beerTypeName).subscribe({
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

  deleteBeerType(id: number | undefined): void {
    if (id !== undefined) {
      this.loading = true;
      this.beerTypeService.deleteBeerType(id).subscribe({
        next: () => {
          this.ngOnInit();
        },
        error: (err) => {
          this.errorMessage = err;
          this.loading = false;
        },
        complete: () => {
          this.successMessage = this.beerTypeToBeDeleted?.name + ' was successfully deleted!';
          this.loading = false;
        }
      });
    } else {
      //maybe should be handled on backend or in interceptors, if this case is even possible
      this.errorMessage = 'There is an error on our end, page will be reloaded!';
      this.ngOnInit();
    }
  }

  openModal(beerType: BeerType): void {
    this.beerTypeToBeDeleted = beerType;
  }
}
