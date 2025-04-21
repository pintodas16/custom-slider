import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
})
export class SlideComponent implements AfterViewInit, OnChanges {
  @Input() slideNumber: number = 1;
  @Input() currentSlide: number = 0;
  @Input() slidesData: { title: string }[] = [];
  @Input() control: boolean = false;

  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  @ViewChild('slideItem', { static: false }) slideItem!: ElementRef;
  @ViewChild('container', { static: false }) containerRef!: ElementRef;

  slideWidth: number = 0;
  bounce: boolean = false;

  // Mouse drag state
  private isDragging = false;
  private startMouseX = 0;

  ngAfterViewInit(): void {
    this.calculateSlideWidth();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['slidesData'] || changes['slideNumber']) {
      setTimeout(() => this.calculateSlideWidth(), 0);
    }
  }

  private calculateSlideWidth(): void {
    if (this.containerRef?.nativeElement && this.slideNumber > 0) {
      const containerWidth = this.containerRef.nativeElement.offsetWidth;
      this.slideWidth = containerWidth / this.slideNumber;
    }
  }

  get translateX(): string {
    return `-${this.currentSlide * this.slideWidth}px`;
  }

  onNext(): void {
    const maxIndex = this.slidesData.length - this.slideNumber;
    if (this.currentSlide < maxIndex) {
      this.next.emit();
    } else {
      this.triggerBounce('left');
    }
  }

  onPrev(): void {
    if (this.currentSlide > 0) {
      this.prev.emit();
    } else {
      this.triggerBounce('right');
    }
  }
  bounceDirection: string = '';
  private triggerBounce(direction: 'left' | 'right'): void {
    this.bounce = true;
    this.bounceDirection = direction;
    setTimeout(() => {
      this.bounce = false;
      this.bounceDirection = '';
    }, 500); // Match animation duration
  }

  // Mouse Events
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startMouseX = event.clientX;
    document.body.style.userSelect = 'none';
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;

    const diff = event.clientX - this.startMouseX;

    if (diff > 10) {
      this.onPrev();
      this.isDragging = false;
    } else if (diff < -10) {
      this.onNext();
      this.isDragging = false;
    }
  }

  onMouseUp(): void {
    this.isDragging = false;
    document.body.style.userSelect = 'auto';
  }

  onMouseLeave(): void {
    this.isDragging = false;
    document.body.style.userSelect = 'auto';
  }
}
