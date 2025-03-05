import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedTestimonialsComponent } from './animated-testimonials.component';

describe('AnimatedTestimonialsComponent', () => {
  let component: AnimatedTestimonialsComponent;
  let fixture: ComponentFixture<AnimatedTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedTestimonialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
