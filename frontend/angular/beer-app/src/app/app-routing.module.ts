import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerTypesComponent } from './beer-types/list/beer-types.component';
import { BeerTypeCreateEditComponent } from './beer-types/create-edit/beer-type-create-edit.component';
import { BeerCreateEditComponent } from './beers/create-edit/beer-create-edit.component';
import { BeerDeleteDetailsComponent } from './beers/delete-details/beer-delete-details.component';
import { BeersComponent } from './beers/list/beers.component';
import { FlavourCreateEditComponent } from './flavours/create-edit/flavour-create-edit.component';
import { FlavoursComponent } from './flavours/list/flavours.component';
import { ManufacturerCreateEditComponent } from './manufacturers/create-edit/manufacturer-create-edit.component';
import { ManufacturersComponent } from './manufacturers/list/manufacturers.component';
import { OriginCountryCreateEditComponent } from './origin-countries/create-edit/origin-country-create-edit.component';
import { OriginCountriesComponent } from './origin-countries/list/origin-countries.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},

  {path: 'beers', component: BeersComponent},
  {path: 'beers/create', component: BeerCreateEditComponent},
  {path: 'beers/edit/:id', component: BeerCreateEditComponent},
  {path: 'beers/:id', component: BeerDeleteDetailsComponent},

  {path: 'beer-types', component: BeerTypesComponent},
  {path: 'beer-types/create', component: BeerTypeCreateEditComponent},
  {path: 'beer-types/edit/:id', component: BeerTypeCreateEditComponent},

  {path: 'origin-countries', component: OriginCountriesComponent},
  {path: 'origin-countries/create', component: OriginCountryCreateEditComponent},
  {path: 'origin-countries/edit/:id', component: OriginCountryCreateEditComponent},

  {path: 'manufacturers', component: ManufacturersComponent},
  {path: 'manufacturers/create', component: ManufacturerCreateEditComponent}, 
  {path: 'manufacturers/edit/:id', component: ManufacturerCreateEditComponent},

  {path: 'flavours', component: FlavoursComponent},
  {path: 'flavours/create', component: FlavourCreateEditComponent},
  {path: 'flavours/edit/:id', component: FlavourCreateEditComponent},

  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
