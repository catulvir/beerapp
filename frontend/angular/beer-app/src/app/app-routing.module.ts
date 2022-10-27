import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterModule, Routes } from '@angular/router';
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

@Injectable({providedIn: 'root'})
export class ResolvedChildATitle implements Resolve<string> {
  resolve(route: ActivatedRouteSnapshot) {
    return Promise.resolve(route.params['routePath'].toUpperCase().replaceAll('-', ' '));
  }
}

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'home', title: 'HOME', component: HomePageComponent},

  {path: 'beers', title: 'BEERS', component: BeersComponent},
  {path: 'beers/create', title: 'ADD NEW BEER', component: BeerCreateEditComponent},
  {path: 'beers/edit/:id', title: 'EDIT BEER', component: BeerCreateEditComponent},
  {path: 'beers/:routePath', title: ResolvedChildATitle, component: BeerDeleteDetailsComponent},

  {path: 'beer-types', title: 'BEER TYPES', component: BeerTypesComponent},
  {path: 'beer-types/create', title: 'ADD NEW BEER TYPE', component: BeerTypeCreateEditComponent},
  {path: 'beer-types/edit/:id', title: 'EDIT BEER TYPE', component: BeerTypeCreateEditComponent},

  {path: 'origin-countries', title: 'COUNTRIES', component: OriginCountriesComponent},
  {path: 'origin-countries/create', title: 'ADD NEW COUNTRY', component: OriginCountryCreateEditComponent},
  {path: 'origin-countries/edit/:id', title: 'EDIT COUNTRY', component: OriginCountryCreateEditComponent},

  {path: 'manufacturers', title: 'MANUFACTURERS', component: ManufacturersComponent},
  {path: 'manufacturers/create', title: 'ADD NEW MANUFACTURER', component: ManufacturerCreateEditComponent}, 
  {path: 'manufacturers/edit/:id', title: 'EDIT MANUFACTURER', component: ManufacturerCreateEditComponent},

  {path: 'flavours', title: 'FLAVOURS', component: FlavoursComponent},
  {path: 'flavours/create', title: 'ADD NEW FLAVOUR', component: FlavourCreateEditComponent},
  {path: 'flavours/edit/:id', title: 'EDIT FLAVOUR', component: FlavourCreateEditComponent},

  {path: '**', title: 'PAGE NOT FOUND', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
