import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultServicosLayoutComponent } from './default-servicos-layout.component';

describe('DefaultServicosLayoutComponent', () => {
  let component: DefaultServicosLayoutComponent;
  let fixture: ComponentFixture<DefaultServicosLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultServicosLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultServicosLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
