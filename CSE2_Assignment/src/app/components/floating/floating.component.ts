// src/app/components/floating/floating.component.ts
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/utils';
import { MousePositionService } from '../../shared/services/mouse-position.service';
import { FloatingService } from '../../shared/services/floating.service';

@Component({
  selector: 'app-floating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating.component.html',
  styleUrls: ['./floating.component.css'],
  providers: [FloatingService]
})
export class FloatingComponent implements OnInit, OnDestroy {
  @Input() className: string = '';
  @Input() sensitivity: number = 1;
  @Input() easingFactor: number = 0.05;

  @ViewChild('containerRef', { static: true }) containerRef!: ElementRef;

  private animationFrameId: number | null = null;
  private containerId = Math.random().toString(36).substring(7);
  private mousePosition: { x: number, y: number } = { x: 0, y: 0 };
  private removeListeners: (() => void) | null = null;

  constructor(
    private mousePositionService: MousePositionService,
    private floatingService: FloatingService
  ) {}

  ngOnInit() {
    // Register the container with the mouse position service
    this.mousePosition = this.mousePositionService.registerContainer(this.containerId);

    // Setup mouse position tracking
    this.removeListeners = this.mousePositionService.setupListeners(this.containerId, this.containerRef);

    // Start animation loop
    this.startAnimationLoop();
  }

  ngOnDestroy() {
    if (this.removeListeners) {
      this.removeListeners();
    }
    this.mousePositionService.unregisterContainer(this.containerId);

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private startAnimationLoop() {
    const animate = () => {
      this.updateElementPositions();
      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  private updateElementPositions() {
    if (!this.containerRef.nativeElement) return;

    this.floatingService.getElements().forEach((data) => {
      const strength = (data.depth * this.sensitivity) / 20;

      // Calculate new target position
      const newTargetX = this.mousePosition.x * strength;
      const newTargetY = this.mousePosition.y * strength;

      // Check if we need to update
      const dx = newTargetX - data.currentPosition.x;
      const dy = newTargetY - data.currentPosition.y;

      // Update position only if we're still moving
      data.currentPosition.x += dx * this.easingFactor;
      data.currentPosition.y += dy * this.easingFactor;

      data.element.nativeElement.style.transform =
        `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`;
    });
  }

  getClassName(...classes: (string | undefined | null | false)[]): string {
    return cn(...classes);
  }
}
