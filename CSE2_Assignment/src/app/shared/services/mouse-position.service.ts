// src/app/shared/services/mouse-position.service.ts
import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MousePositionService {
  private positionMap = new Map<string, { x: number, y: number }>();

  registerContainer(id: string): { x: number, y: number } {
    if (!this.positionMap.has(id)) {
      this.positionMap.set(id, { x: 0, y: 0 });
    }
    return this.positionMap.get(id)!;
  }

  unregisterContainer(id: string): void {
    this.positionMap.delete(id);
  }

  setupListeners(id: string, containerRef: ElementRef): () => void {
    const updatePosition = (x: number, y: number) => {
      if (containerRef && containerRef.nativeElement) {
        const rect = containerRef.nativeElement.getBoundingClientRect();
        const relativeX = x - rect.left;
        const relativeY = y - rect.top;

        const position = this.positionMap.get(id);
        if (position) {
          position.x = relativeX;
          position.y = relativeY;
        }
      }
    };

    const handleMouseMove = (ev: MouseEvent) => {
      updatePosition(ev.clientX, ev.clientY);
    };

    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }
}
