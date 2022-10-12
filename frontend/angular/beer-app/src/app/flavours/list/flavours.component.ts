import { Component, OnInit } from '@angular/core';
import { Flavour } from '../flavour';
import { ActivatedRoute, Router } from '@angular/router';
import { FlavourService } from '../flavour-service';


@Component({
  selector: 'app-flavours',
  templateUrl: './flavours.component.html',
  styleUrls: ['./flavours.component.css']
})
export class FlavoursComponent implements OnInit {

  flavourName?: string;
  flavours: Flavour[] = [];
  flavourToBeDeleted?: Flavour;
  errorMessage?: string;
  successMessage?: string;
  loading = false;

  constructor(private flavourService: FlavourService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getFlavours();
  }

  getFlavours(): void {
    this.loading = true;
    this.flavourService.getFlavours(this.flavourName).subscribe({
      next: (flavours) => {
        this.flavours = flavours;
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

  deleteFlavour(id: number | undefined): void {
    if (id !== undefined) {
      this.loading = true;
      this.flavourService.deleteFlavour(id).subscribe({
        next: () => {
          this.ngOnInit();
        },
        error: (err) => {
          this.errorMessage = err;
          this.loading = false;
        },
        complete: () => {
          this.successMessage = this.flavourToBeDeleted?.name + ' was successfully deleted!';
          this.loading = false;
        }
      });
    } else {
      //maybe should be handled on backend or in interceptors, if this case is even possible
      this.errorMessage = 'There is an error on our end, page will be reloaded!';
      this.ngOnInit();
    }
  }

  openModal(flavour: Flavour): void {
    this.flavourToBeDeleted = flavour;
  }
}
