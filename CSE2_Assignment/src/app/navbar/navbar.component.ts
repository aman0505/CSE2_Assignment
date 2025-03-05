// import { Component } from '@angular/core';
// import {RouterLink, RouterLinkActive} from '@angular/router';
//
// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   imports: [
//     RouterLink,
//     RouterLinkActive
//   ],
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent {
//   isMenuOpen = false;
//
//   toggleMenu(): void {
//     this.isMenuOpen = !this.isMenuOpen;
//   }
// }




import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface NavItem {
  path: string;
  label: string;
  exact?: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  standalone: true,
  animations: [
    trigger('itemHover', [
      state('normal', style({
        width: '40px',
        height: '40px'
      })),
      state('hovered', style({
        width: '80px',
        height: '80px'
      })),
      transition('normal <=> hovered', animate('200ms ease'))
    ]),
    trigger('labelAnimation', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(0)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(-10px)'
      })),
      transition('hidden <=> visible', animate('200ms ease'))
    ])
  ]
})
export class NavbarComponent {
  isMenuOpen = false;
  hoveredItem: string | null = null;
  mouseX = 0;
  navItems: NavItem[] = [
    { path: '/', label: 'Home', exact: true },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' }
  ];

  @ViewChildren('navItem') navItemElements!: QueryList<ElementRef>;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.pageX;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hoveredItem = null;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setHoveredItem(path: string | null) {
    this.hoveredItem = path;
  }

  calculateItemScale(element: HTMLElement): number {
    if (!this.hoveredItem) return 1;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distance = Math.abs(this.mouseX - centerX);

    // Scale factor decreases as distance increases
    if (distance > 150) return 1;
    return 1 + (1 - distance / 150) * 1; // Max scale is 2x
  }
}
