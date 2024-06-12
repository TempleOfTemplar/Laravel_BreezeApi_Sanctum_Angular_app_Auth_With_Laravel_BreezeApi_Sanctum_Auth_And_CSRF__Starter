import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBasicLayoutComponent } from './app-basic-layout.component';

describe('AppBasicLayoutComponent', () => {
  let component: AppBasicLayoutComponent;
  let fixture: ComponentFixture<AppBasicLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppBasicLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppBasicLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
