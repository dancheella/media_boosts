import { Component, OnInit } from '@angular/core';
import { HighlightsType } from "../../../../types/highlights.type";
import { OwlOptions } from "ngx-owl-carousel-o";
import { HighlightsService } from "../../../shared/services/highlights.service";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit {
  highlights: HighlightsType[] = [];

  customHighlights: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    dotsSpeed: 700,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }

  constructor(private highlightsService: HighlightsService) {}

  ngOnInit(): void {
    this.highlights = this.highlightsService.getHighlights();
  }
}
