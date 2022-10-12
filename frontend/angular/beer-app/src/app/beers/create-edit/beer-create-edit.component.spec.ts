import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerCreateEditComponent } from './beer-create-edit.component';

describe('BeerCreateEditComponent', () => {
  let component: BeerCreateEditComponent;
  let fixture: ComponentFixture<BeerCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
