// src/app/directives/glowing-effect.directive.ts
import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { animate } from 'motion';

@Directive({
  selector: '[appGlowingEffect]',
  standalone: true
})
export class GlowingEffectDirective implements OnInit, OnDestroy {
  @Input() blur = 0;
  @Input() inactiveZone = 0.7;
  @Input() proximity = 0;
  @Input() spread = 20;
  @Input() variant: 'default' | 'white' = 'default';
  @Input() glow = false;
  @Input() movementDuration = 2;
  @Input() borderWidth = 1;
  @Input() disabled = true;

  private containerRef: HTMLDivElement | null = null;
  private lastPosition = { x: 0, y: 0 };
  private animationFrameId = 0;
  private outerDiv: HTMLDivElement | null = null;
  private innerDiv: HTMLDivElement | null = null;
  private glowDiv: HTMLDivElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setupEffectElements();
    if (!this.disabled) {
      this.addEventListeners();
    }
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private setupEffectElements(): void {
    // Make host element relative positioned
    const hostElement = this.el.nativeElement;
    this.renderer.setStyle(hostElement, 'position', 'relative');

    // Create outer container for border
    this.outerDiv = this.renderer.createElement('div');
    this.renderer.addClass(this.outerDiv, 'pointer-events-none');
    this.renderer.addClass(this.outerDiv, 'absolute');
    this.renderer.addClass(this.outerDiv, '-inset-px');
    this.renderer.addClass(this.outerDiv, 'rounded-inherit');
    this.renderer.addClass(this.outerDiv, 'border');
    this.renderer.addClass(this.outerDiv, 'opacity-0');
    this.renderer.addClass(this.outerDiv, 'transition-opacity');
    this.renderer.addClass(this.outerDiv, 'hidden');

    if (this.glow) {
      this.renderer.addClass(this.outerDiv, 'opacity-100');
    }
    if (this.variant === 'white') {
      this.renderer.addClass(this.outerDiv, 'border-white');
    }
    if (this.disabled) {
      // Use style instead of className for !block
      this.renderer.setStyle(this.outerDiv, 'display', 'block');
    }

    // Create container for glow effect
    this.innerDiv = this.renderer.createElement('div');
    this.containerRef = this.innerDiv;

    this.renderer.addClass(this.innerDiv, 'pointer-events-none');
    this.renderer.addClass(this.innerDiv, 'absolute');
    this.renderer.addClass(this.innerDiv, 'inset-0');
    this.renderer.addClass(this.innerDiv, 'rounded-inherit');
    this.renderer.addClass(this.innerDiv, 'opacity-100');
    this.renderer.addClass(this.innerDiv, 'transition-opacity');

    if (this.glow) {
      this.renderer.addClass(this.innerDiv, 'opacity-100');
    }
    if (this.blur > 0) {
      this.renderer.addClass(this.innerDiv, 'blur-var-blur');
    }
    if (this.disabled) {
      // Use style instead of className for !hidden
      this.renderer.setStyle(this.innerDiv, 'display', 'none');
    }

    // Set gradient based on variant
    const gradient = this.variant === 'white'
      ? `repeating-conic-gradient(
          from 236.84deg at 50% 50%,
          var(--black),
          var(--black) calc(25% / var(--repeating-conic-gradient-times))
        )`
      : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
        radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
        radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%),
        radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
        repeating-conic-gradient(
          from 236.84deg at 50% 50%,
          #dd7bbb 0%,
          #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
          #5a922c calc(50% / var(--repeating-conic-gradient-times)),
          #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
          #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
        )`;

    this.renderer.setStyle(this.innerDiv, '--blur', `${this.blur}px`);
    this.renderer.setStyle(this.innerDiv, '--spread', this.spread);
    this.renderer.setStyle(this.innerDiv, '--start', '0');
    this.renderer.setStyle(this.innerDiv, '--active', '0');
    this.renderer.setStyle(this.innerDiv, '--glowingeffect-border-width', `${this.borderWidth}px`);
    this.renderer.setStyle(this.innerDiv, '--repeating-conic-gradient-times', '5');
    this.renderer.setStyle(this.innerDiv, '--gradient', gradient);

    // Create glow div
    this.glowDiv = this.renderer.createElement('div');
    this.renderer.addClass(this.glowDiv, 'glow');
    this.renderer.addClass(this.glowDiv, 'rounded-inherit');

    // Add glow div to inner div
    this.renderer.appendChild(this.innerDiv, this.glowDiv);

    // Add outer and inner divs to the host element
    this.renderer.appendChild(hostElement, this.outerDiv);
    this.renderer.appendChild(hostElement, this.innerDiv);
  }

  private addEventListeners(): void {
    window.addEventListener('scroll', this.handleScroll);
    document.body.addEventListener('pointermove', this.handlePointerMove);
  }

  private removeEventListeners(): void {
    window.removeEventListener('scroll', this.handleScroll);
    document.body.removeEventListener('pointermove', this.handlePointerMove);
  }

  private handleScroll = (): void => {
    this.handleMove();
  };

  private handlePointerMove = (e: PointerEvent): void => {
    this.handleMove(e);
  };

  private handleMove(e?: MouseEvent | PointerEvent | { x: number; y: number }): void {
    if (!this.containerRef) return;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.animationFrameId = requestAnimationFrame(() => {
      const element = this.containerRef;
      if (!element) return;

      const { left, top, width, height } = element.getBoundingClientRect();
      const mouseX = e ? 'x' in e ? e.x : this.lastPosition.x : this.lastPosition.x;
      const mouseY = e ? 'y' in e ? e.y : this.lastPosition.y : this.lastPosition.y;

      if (e && 'x' in e && 'y' in e) {
        this.lastPosition = { x: mouseX, y: mouseY };
      }

      const center = [left + width * 0.5, top + height * 0.5];
      const distanceFromCenter = Math.hypot(
        mouseX - center[0],
        mouseY - center[1]
      );
      const inactiveRadius = 0.5 * Math.min(width, height) * this.inactiveZone;

      if (distanceFromCenter < inactiveRadius) {
        element.style.setProperty('--active', '0');
        return;
      }

      const isActive =
        mouseX > left - this.proximity &&
        mouseX < left + width + this.proximity &&
        mouseY > top - this.proximity &&
        mouseY < top + height + this.proximity;

      element.style.setProperty('--active', isActive ? '1' : '0');

      if (!isActive) return;

      const currentAngle = parseFloat(element.style.getPropertyValue('--start')) || 0;
      let targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;

      const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
      const newAngle = currentAngle + angleDiff;

      animate(currentAngle, newAngle, {
        duration: this.movementDuration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (value) => {
          element.style.setProperty('--start', String(value));
        },
      });
    });
  }
}
