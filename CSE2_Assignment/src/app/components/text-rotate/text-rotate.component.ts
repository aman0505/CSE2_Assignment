// src/app/components/text-rotate/text-rotate.component.ts
import { Component, Input, OnDestroy, OnInit, ElementRef, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/utils';
import { animate, AnimationBuilder, style, transition, trigger } from '@angular/animations';

interface WordObject {
  characters: string[];
  needsSpace: boolean;
}

@Component({
  selector: 'app-text-rotate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-rotate.component.html',
  styleUrls: ['./text-rotate.component.css'],
  animations: [
    trigger('textAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate('{{duration}}ms {{delay}}ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('{{duration}}ms', style({ opacity: 0, transform: 'translateY(-120%)' }))
      ])
    ])
  ]
})
export class TextRotateComponent implements OnInit, OnDestroy {
  @Input() texts: string[] = [];
  @Input() rotationInterval: number = 2000;
  @Input() staggerDuration: number = 0;
  @Input() staggerFrom: 'first' | 'last' | 'center' | number | 'random' = 'first';
  @Input() loop: boolean = true;
  @Input() auto: boolean = true;
  @Input() splitBy: 'words' | 'characters' | 'lines' | string = 'characters';
  @Input() mainClassName: string = '';
  @Input() splitLevelClassName: string = '';
  @Input() elementLevelClassName: string = '';

  @Output() next = new EventEmitter<number>();

  currentTextIndex = 0;
  elements: WordObject[] = [];
  intervalId: any = null;

  @ViewChildren('textElement') textElements!: QueryList<ElementRef>;

  constructor(private builder: AnimationBuilder) {}

  ngOnInit(): void {
    this.updateElements();
    if (this.auto) {
      this.startAutoRotation();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoRotation();
  }

  updateElements(): void {
    const currentText = this.texts[this.currentTextIndex];
    if (this.splitBy === 'characters') {
      const text = currentText.split(' ');
      this.elements = text.map((word, i) => ({
        characters: this.splitIntoCharacters(word),
        needsSpace: i !== text.length - 1
      }));
    } else if (this.splitBy === 'words') {
      const words = currentText.split(' ');
      this.elements = words.map((word, i) => ({
        characters: [word],
        needsSpace: i !== words.length - 1
      }));
    } else if (this.splitBy === 'lines') {
      const lines = currentText.split('\n');
      this.elements = lines.map(line => ({
        characters: [line],
        needsSpace: false
      }));
    } else {
      const parts = currentText.split(this.splitBy);
      this.elements = parts.map((part, i) => ({
        characters: [part],
        needsSpace: i !== parts.length - 1
      }));
    }
  }

  splitIntoCharacters(text: string): string[] {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      // @ts-ignore - TypeScript might not recognize Intl.Segmenter
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
      // @ts-ignore
      return Array.from(segmenter.segment(text), ({ segment }) => segment);
    }
    // Fallback for browsers that don't support Intl.Segmenter
    return Array.from(text);
  }

  getStaggerDelay(index: number, totalChars: number): number {
    if (this.staggerFrom === 'first') return index * this.staggerDuration;
    if (this.staggerFrom === 'last') return (totalChars - 1 - index) * this.staggerDuration;
    if (this.staggerFrom === 'center') {
      const center = Math.floor(totalChars / 2);
      return Math.abs(center - index) * this.staggerDuration;
    }
    if (this.staggerFrom === 'random') {
      const randomIndex = Math.floor(Math.random() * totalChars);
      return Math.abs(randomIndex - index) * this.staggerDuration;
    }
    return Math.abs((this.staggerFrom as number) - index) * this.staggerDuration;
  }

  getTotalCharCount(): number {
    return this.elements.reduce((sum, word) => sum + word.characters.length, 0);
  }

  getPreviousCharsCount(wordIndex: number): number {
    return this.elements
      .slice(0, wordIndex)
      .reduce((sum, word) => sum + word.characters.length, 0);
  }

  nextText(): void {
    const nextIndex = this.currentTextIndex === this.texts.length - 1
      ? (this.loop ? 0 : this.currentTextIndex)
      : this.currentTextIndex + 1;

    if (nextIndex !== this.currentTextIndex) {
      this.currentTextIndex = nextIndex;
      this.updateElements();
      this.next.emit(this.currentTextIndex);
    }
  }

  previousText(): void {
    const prevIndex = this.currentTextIndex === 0
      ? (this.loop ? this.texts.length - 1 : this.currentTextIndex)
      : this.currentTextIndex - 1;

    if (prevIndex !== this.currentTextIndex) {
      this.currentTextIndex = prevIndex;
      this.updateElements();
      this.next.emit(this.currentTextIndex);
    }
  }

  jumpTo(index: number): void {
    const validIndex = Math.max(0, Math.min(index, this.texts.length - 1));
    if (validIndex !== this.currentTextIndex) {
      this.currentTextIndex = validIndex;
      this.updateElements();
      this.next.emit(this.currentTextIndex);
    }
  }

  reset(): void {
    if (this.currentTextIndex !== 0) {
      this.currentTextIndex = 0;
      this.updateElements();
      this.next.emit(this.currentTextIndex);
    }
  }

  startAutoRotation(): void {
    this.stopAutoRotation();
    this.intervalId = setInterval(() => this.nextText(), this.rotationInterval);
  }

  stopAutoRotation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getClassName(...classes: (string | undefined | null | false)[]): string {
    return cn(...classes);
  }
}
