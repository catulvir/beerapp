import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Beer } from '../beer';
import { BeerService } from '../beer-service';

@Component({
  selector: 'app-beer-delete-details',
  templateUrl: './beer-delete-details.component.html',
  styleUrls: ['./beer-delete-details.component.css']
})
export class BeerDeleteDetailsComponent implements OnInit {

  id?: number;
  beer?: Beer;
  errorMessage?: string;
  loading = false;

  constructor(private beerService: BeerService, private route: ActivatedRoute, private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.id = Number(state['id']);
    }
  }

  ngOnInit(): void {
    this.loadBeer();
  }

  loadBeer(): void {
    if (this.id) {
      this.loading = true;
      this.beerService.getBeer(this.id).subscribe({
        next: beer => {
          this.beer = beer;
        }, error: (error) => {
          this.errorMessage = error;
          this.loading = false;
        }, complete: () => {
          this.loading = false;
        }
      })
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  deleteBeer(): void {
    if (this.beer?.id !== undefined) {
      this.loading = true;
      this.beerService.deleteBeer(this.beer.id).subscribe({
        next: () => {
          this.ngOnInit();
        },
        error: (err) => {
          this.errorMessage = err;
          this.loading = false;
        },
        complete: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
          this.loading = false;
        }
      });
    } else {
      //maybe should be handled on backend or in interceptors, if this case is even possible
      this.errorMessage = 'There is an error on our end, page will be reloaded!';
      this.ngOnInit();
    }
  }
}
