// src/app/shared/services/floating.service.ts
import { ElementRef, Injectable } from '@angular/core';

interface FloatingElement {
  element: ElementRef;
  depth: number;
  currentPosition: { x: number; y: number };
}

@Injectable()
export class FloatingService {
  private elementsMap = new Map<string, FloatingElement>();

  registerElement(id: string, element: ElementRef, depth: number): void {
    this.elementsMap.set(id, {
      element,
      depth,
      currentPosition: { x: 0, y: 0 }
    });
  }

  unregisterElement(id: string): void {
    this.elementsMap.delete(id);
  }

  getElements(): FloatingElement[] {
    return Array.from(this.elementsMap.values());
  }
}
