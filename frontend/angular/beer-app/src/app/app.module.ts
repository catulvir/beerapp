import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BeersComponent } from './beers/list/beers.component';
import { BeerTypesComponent } from './beer-types/list/beer-types.component';
import { FlavoursComponent } from './flavours/list/flavours.component';
import { ManufacturersComponent } from './manufacturers/list/manufacturers.component';
import { OriginCountriesComponent } from './origin-countries/list/origin-countries.component';
import { OriginCountryCreateEditComponent } from './origin-countries/create-edit/origin-country-create-edit.component';
import { ManufacturerCreateEditComponent } from './manufacturers/create-edit/manufacturer-create-edit.component';
import { FlavourCreateEditComponent } from './flavours/create-edit/flavour-create-edit.component';
import { BeerTypeCreateEditComponent } from './beer-types/create-edit/beer-type-create-edit.component';
import { BeerDeleteDetailsComponent } from './beers/delete-details/beer-delete-details.component';
import { BeerCreateEditComponent } from './beers/create-edit/beer-create-edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GlobalHttpInterceptorService } from './global-http-interceptor-service.service';
import { SelectOriginCountryComponent } from './origin-countries/select/select-origin-country.component';
import { SelectManufacturerComponent } from './manufacturers/select/select-manufacturer.component';
import { SelectBeerTypeComponent } from './beer-types/select/select-beer-type.component';
import { MultiSelectFlavourComponent } from './flavours/select/multi-select-flavour.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BeersComponent,
    BeerTypesComponent,
    FlavoursComponent,
    ManufacturersComponent,
    OriginCountriesComponent,
    OriginCountryCreateEditComponent,
    ManufacturerCreateEditComponent,
    FlavourCreateEditComponent,
    BeerTypeCreateEditComponent,
    BeerDeleteDetailsComponent,
    BeerCreateEditComponent,
    PageNotFoundComponent,
    HomePageComponent,
    SelectOriginCountryComponent,
    SelectManufacturerComponent,
    SelectBeerTypeComponent,
    MultiSelectFlavourComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
