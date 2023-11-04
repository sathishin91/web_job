import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCoinsComponent } from './manage-coins.component';

describe('ManageCoinsComponent', () => {
  let component: ManageCoinsComponent;
  let fixture: ComponentFixture<ManageCoinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCoinsComponent]
    });
    fixture = TestBed.createComponent(ManageCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
