import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginCountryCreateEditComponent } from './origin-country-create-edit.component';

describe('OriginCountryCreateEditComponent', () => {
  let component: OriginCountryCreateEditComponent;
  let fixture: ComponentFixture<OriginCountryCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginCountryCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OriginCountryCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
