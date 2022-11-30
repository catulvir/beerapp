import { Component, OnInit } from '@angular/core';
import { Beer } from '../beer';
import { BeerService } from '../beer-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {

  form!: FormGroup;
  beerToBeDeleted?: Beer;
  beers: Beer[] = [];
  errorMessage?: string;
  successMessage?: string;
  loading = false;

  constructor(private beerService: BeerService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getBeers();

    this.form = this.fb.group({
      name: [null],
      beerType: [null],
      originCountry: [null],
      manufacturer: [null],
      isCraft: [null],
    });
  }

  getBeers(): void {
    this.loading = true;
    this.beerService.getBeers(this.form?.value).subscribe({
      next: (beers) => {
        this.beers = beers;
      },
      error: (err) => {
        this.errorMessage = err;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  deleteBeer(id?: number): void {
    if (id !== undefined) {
      this.loading = true;
      this.beerService.deleteBeer(id).subscribe({
        next: () => {
          this.ngOnInit();
        },
        error: (err) => {
          this.errorMessage = err;
          this.loading = false;
        },
        complete: () => {
          this.successMessage = this.beerToBeDeleted?.name + ' was successfully deleted!';
          this.loading = false;
        }
      });
    } else {
      //maybe should be handled on backend or in interceptors, if this case is even possible
      this.errorMessage = 'There is an error on our end, page will be reloaded!';
      this.ngOnInit();
    }
  }

  redirectToDetails(beer: Beer): void {
    this.router.navigate([beer.routePath], { relativeTo: this.activatedRoute, state: { id: beer.id } });
  }

  openModal(beer: Beer): void {
    this.beerToBeDeleted = beer;
  }
}
