import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultMedicosLayoutComponent } from './default-medicos-layout.component';

describe('DefaultMedicosLayoutComponent', () => {
  let component: DefaultMedicosLayoutComponent;
  let fixture: ComponentFixture<DefaultMedicosLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultMedicosLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultMedicosLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
