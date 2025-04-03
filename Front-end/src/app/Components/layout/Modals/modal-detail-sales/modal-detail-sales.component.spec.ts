import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailSalesComponent } from './modal-detail-sales.component';

describe('ModalDetailSalesComponent', () => {
  let component: ModalDetailSalesComponent;
  let fixture: ComponentFixture<ModalDetailSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDetailSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetailSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
