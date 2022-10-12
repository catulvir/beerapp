import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOriginCountryComponent } from './select-origin-country.component';

describe('SelectOriginCountryComponent', () => {
  let component: SelectOriginCountryComponent;
  let fixture: ComponentFixture<SelectOriginCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectOriginCountryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectOriginCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
