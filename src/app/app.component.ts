import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SlideComponent } from './Components/slide/slide.component';
import { SlideNewComponent } from './Components/slide-new/slide-new.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SlideComponent, SlideNewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  slideNumber = 6;
  currentSlide = 0;
  slidesData = [
    { title: 'Slide 1' },
    { title: 'Slide 2' },
    { title: 'Slide 3' },
    { title: 'Slide 4' },
    { title: 'Slide 5' },
    { title: 'Slide 6' },
  ];

  handleNext() {
    if (this.currentSlide + this.slideNumber < this.slidesData.length) {
      this.currentSlide++;
    }
  }

  handlePrev() {
    let num = this.slidesData.length / this.currentSlide;
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  currentSlideone = 0;
  slides = [
    { title: 'Slide 1' },
    { title: 'Slide 2' },
    { title: 'Slide 3' },
    { title: 'Slide 4' },
    { title: 'Slide 5' },
  ];
}
