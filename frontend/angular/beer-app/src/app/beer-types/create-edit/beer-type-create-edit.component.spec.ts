import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerTypeCreateEditComponent } from './beer-type-create-edit.component';

describe('BeerTypeCreateEditComponent', () => {
  let component: BeerTypeCreateEditComponent;
  let fixture: ComponentFixture<BeerTypeCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerTypeCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerTypeCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
