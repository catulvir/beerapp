import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginCountriesComponent } from './origin-countries.component';

describe('OriginCountriesComponent', () => {
  let component: OriginCountriesComponent;
  let fixture: ComponentFixture<OriginCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginCountriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OriginCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
