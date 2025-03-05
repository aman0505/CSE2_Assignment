// src/app/components/floating-element/floating-element.component.ts
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/utils';
import { FloatingService } from '../../shared/services/floating.service';

@Component({
  selector: 'app-floating-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-element.component.html',
  styleUrls: ['./floating-element.component.css']
})
export class FloatingElementComponent implements OnInit, OnDestroy {
  @Input() className: string = '';
  @Input() depth: number = 1;

  @ViewChild('elementRef', { static: true }) elementRef!: ElementRef;

  private id = Math.random().toString(36).substring(7);

  constructor(private floatingService: FloatingService) {}

  ngOnInit() {
    const nonNullDepth = this.depth ?? 0.01;
    this.floatingService.registerElement(this.id, this.elementRef, nonNullDepth);
  }

  ngOnDestroy() {
    this.floatingService.unregisterElement(this.id);
  }

  getClassName(...classes: (string | undefined | null | false)[]): string {
    return cn(...classes);
  }
}
