import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerPageComponent } from './creer-page.component';

describe('CreerPageComponent', () => {
  let component: CreerPageComponent;
  let fixture: ComponentFixture<CreerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreerPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
