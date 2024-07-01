import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultMedicoDetailLayoutComponent } from './default-medico-detail-layout.component';

describe('DefaultMedicoDetailLayoutComponent', () => {
  let component: DefaultMedicoDetailLayoutComponent;
  let fixture: ComponentFixture<DefaultMedicoDetailLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultMedicoDetailLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultMedicoDetailLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
