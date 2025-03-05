// // src/app/components/animated-testimonials/animated-testimonials.component.ts
// import { Component, Input, OnInit, OnDestroy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { trigger, state, style, animate, transition } from '@angular/animations';
//
// export interface Testimonial {
//   quote: string;
//   name: string;
//   designation: string;
//   src: string;
// }
//
// @Component({
//   selector: 'app-animated-testimonials',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './animated-testimonials.component.html',
//   styleUrls: ['./animated-testimonials.component.css'],
//   animations: [
//     trigger('slideAnimation', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'scale(0.9) translateY(0)', filter: 'blur(10px)' }),
//         animate('400ms ease-in-out', style({ opacity: 1, transform: 'scale(1) translateY(0)', filter: 'blur(0px)' }))
//       ]),
//       transition(':leave', [
//         animate('400ms ease-in-out', style({ opacity: 0, transform: 'scale(0.9) translateY(0)', filter: 'blur(10px)' }))
//       ])
//     ]),
//     trigger('textAnimation', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'translateY(20px)' }),
//         animate('200ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
//       ]),
//       transition(':leave', [
//         animate('200ms ease-in-out', style({ opacity: 0, transform: 'translateY(-20px)' }))
//       ])
//     ])
//   ]
// })
// export class AnimatedTestimonialsComponent implements OnInit, OnDestroy {
//   @Input() testimonials: Testimonial[] = [];
//   @Input() autoplay: boolean = false;
//
//   active: number = 0;
//   interval: any;
//
//   ngOnInit() {
//     if (this.autoplay) {
//       this.interval = setInterval(() => this.handleNext(), 5000);
//     }
//   }
//
//   ngOnDestroy() {
//     if (this.interval) {
//       clearInterval(this.interval);
//     }
//   }
//
//   handleNext() {
//     this.active = (this.active + 1) % this.testimonials.length;
//   }
//
//   handlePrev() {
//     this.active = (this.active - 1 + this.testimonials.length) % this.testimonials.length;
//   }
//
//   isActive(index: number) {
//     return index === this.active;
//   }
//
//   randomRotateY() {
//     return Math.floor(Math.random() * 21) - 10;
//   }
//
//   getWords(quote: string): string[] {
//     return quote.split(' ');
//   }
//
//   getWordAnimationDelay(index: number): string {
//     return `${0.02 * index}s`;
//   }
// }

// src/app/components/animated-testimonials/animated-testimonials.component.ts
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

@Component({
  selector: 'app-animated-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-testimonials.component.html',
  styleUrls: ['./animated-testimonials.component.css'],
  animations: [
    trigger('simpleSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ]
})
export class AnimatedTestimonialsComponent implements OnInit, OnDestroy {
  @Input() testimonials: Testimonial[] = [];
  @Input() autoplay = false;

  active = 0;
  private intervalId: any;

  ngOnInit() {
    if (this.autoplay) {
      this.intervalId = setInterval(() => this.handleNext(), 5000);
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  handleNext() {
    this.active = (this.active + 1) % this.testimonials.length;
  }

  handlePrev() {
    this.active = (this.active - 1 + this.testimonials.length) % this.testimonials.length;
  }

  isActive(index: number): boolean {
    return index === this.active;
  }
}
