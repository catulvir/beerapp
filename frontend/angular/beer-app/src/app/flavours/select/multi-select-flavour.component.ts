import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Flavour } from '../flavour';
import { FlavourService } from '../flavour-service';

@Component({
  selector: 'multi-select-flavours',
  templateUrl: './multi-select-flavour.component.html',
  styleUrls: ['./multi-select-flavour.component.css']
})
export class MultiSelectFlavourComponent implements OnInit {

  @Input() form!: FormGroup;

  allFlavours: Flavour[] = [];
  errorMessage?: string;
  loading: boolean = false;
  dropdownSettings: IDropdownSettings = {};

  constructor(private flavourService: FlavourService) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      enableCheckAll: false
    };
    
    this.getFlavours();
  }

  getFlavours(): void {
    this.loading = true;
    this.flavourService.getFlavours().subscribe({
      next: (flavours) => {
        this.allFlavours = flavours;
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

  markAsTouched(): void {
    this.flavours?.markAsTouched();
  }

  get flavours() {
    return this.form.get('flavours');
  }
}
