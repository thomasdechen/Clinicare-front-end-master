import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultProfileLayoutComponent } from './default-profile-layout.component';

describe('DefaultProfileLayoutComponent', () => {
  let component: DefaultProfileLayoutComponent;
  let fixture: ComponentFixture<DefaultProfileLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultProfileLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultProfileLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
