import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBeerTypeComponent } from './select-beer-type.component';

describe('SelectBeerTypeComponent', () => {
  let component: SelectBeerTypeComponent;
  let fixture: ComponentFixture<SelectBeerTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBeerTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectBeerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
