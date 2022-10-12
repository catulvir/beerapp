import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectFlavourComponent } from './multi-select-flavour.component';

describe('MultiSelectFlavourComponent', () => {
  let component: MultiSelectFlavourComponent;
  let fixture: ComponentFixture<MultiSelectFlavourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSelectFlavourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectFlavourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
