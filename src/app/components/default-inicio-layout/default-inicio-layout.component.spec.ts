import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultInicioLayoutComponent } from './default-inicio-layout.component';

describe('DefaultInicioLayoutComponent', () => {
  let component: DefaultInicioLayoutComponent;
  let fixture: ComponentFixture<DefaultInicioLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultInicioLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultInicioLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
