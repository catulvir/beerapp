import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerCreateEditComponent } from './manufacturer-create-edit.component';

describe('ManufacturerCreateEditComponent', () => {
  let component: ManufacturerCreateEditComponent;
  let fixture: ComponentFixture<ManufacturerCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturerCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
