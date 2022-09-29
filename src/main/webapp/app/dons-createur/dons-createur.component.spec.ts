import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonsCreateurComponent } from './dons-createur.component';

describe('DonsCreateurComponent', () => {
  let component: DonsCreateurComponent;
  let fixture: ComponentFixture<DonsCreateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonsCreateurComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DonsCreateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
