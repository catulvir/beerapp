import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerDeleteDetailsComponent } from './beer-delete-details.component';

describe('BeerDeleteDetailsComponent', () => {
  let component: BeerDeleteDetailsComponent;
  let fixture: ComponentFixture<BeerDeleteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerDeleteDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerDeleteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
