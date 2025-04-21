import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-slide-new',
  imports: [CommonModule],
  templateUrl: './slide-new.component.html',
  styleUrl: './slide-new.component.css',
})
export class SlideNewComponent {
  @Input() slideNumber: number = 1;
  @Input() currentSlide: number = 0;
  @Input() slidesData: { title: string }[] = [];
  @Input() control: boolean = false;

  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  @ViewChild('slideItem', { static: false }) slideItem!: ElementRef;
  @ViewChild('container', { static: false }) containerRef!: ElementRef;

  slideWidth: number = 0;
  isDragging: boolean = false;
  startMouseX: number = 0;
  bounceDirection: 'left' | 'right' | null = null;

  ngAfterViewInit(): void {
    this.calculateWidths();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['slidesData'] || changes['slideNumber']) {
      setTimeout(() => this.calculateWidths(), 0);
    }
  }

  calculateWidths() {
    if (this.containerRef?.nativeElement) {
      const containerWidth = this.containerRef.nativeElement.offsetWidth;
      this.slideWidth = containerWidth / this.slideNumber;
    }
  }

  get clampedSlide(): number {
    return Math.min(
      this.currentSlide,
      this.slidesData.length - this.slideNumber
    );
  }

  get translateX(): string {
    const width = this.clampedSlide * this.slideWidth;
    return `-${width}px`;
  }

  onNext() {
    const maxSlide = this.slidesData.length - this.slideNumber;
    if (this.currentSlide < maxSlide) {
      this.next.emit();
    } else {
      this.triggerBounce('left');
    }
  }

  onPrev() {
    if (this.currentSlide > 0) {
      this.prev.emit();
    } else {
      this.triggerBounce('right');
    }
  }

  triggerBounce(direction: 'left' | 'right') {
    this.bounceDirection = direction;
    setTimeout(() => {
      this.bounceDirection = null;
    }, 300);
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startMouseX = event.clientX;
    document.body.style.userSelect = 'none';
  }

  onMouseMove(event: MouseEvent) {
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

  onMouseUp() {
    this.isDragging = false;
    document.body.style.userSelect = 'auto';
  }

  onMouseLeave() {
    this.isDragging = false;
  }
}
