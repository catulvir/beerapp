import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavourCreateEditComponent } from './flavour-create-edit.component';

describe('FlavourCreateEditComponent', () => {
  let component: FlavourCreateEditComponent;
  let fixture: ComponentFixture<FlavourCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlavourCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlavourCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
