import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideNewComponent } from './slide-new.component';

describe('SlideNewComponent', () => {
  let component: SlideNewComponent;
  let fixture: ComponentFixture<SlideNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
