import { Component, OnInit } from '@angular/core';
import { Beer } from '../beer';
import { BeerService } from '../beer-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {

  beerName?: string;
  beerToBeDeleted?: Beer;
  beers: Beer[] = [];
  errorMessage?: string;
  successMessage?: string;
  loading = false;

  constructor(private beerService: BeerService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getBeers();
  }

  getBeers(): void {
    this.loading = true;
    this.beerService.getBeers(this.beerName).subscribe({
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
    this.loading = false;
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
    this.router.navigate([beer.routePath], {relativeTo: this.activatedRoute, state: {id: beer.id}});
  }

  openModal(beer: Beer): void {
    this.beerToBeDeleted = beer;
  }
}
