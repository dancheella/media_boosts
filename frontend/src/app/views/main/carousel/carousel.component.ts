import { Component, OnInit } from '@angular/core';
import { HighlightsType } from "../../../../types/highlights.type";
import { OwlOptions } from "ngx-owl-carousel-o";
import { HighlightsService } from "../../../shared/services/highlights.service";
import { PopupComponent } from "../../../shared/components/popup/popup.component";
import { MatDialog } from "@angular/material/dialog";

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

  constructor(private highlightsService: HighlightsService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.highlights = this.highlightsService.getHighlights();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, selectedServiceTitle: string, showSelect: boolean): void {
    this.dialog.open(PopupComponent, {
      width: '727px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { selectedServiceTitle, showSelect }
    });
  }

  getButtonText(index: number): string {
    switch (index) {
      case 0:
        return 'Продвижение';
      case 1:
        return 'Копирайтинг';
      case 2:
        return 'Реклама';
      default:
        return 'Создание сайтов';
    }
  }
}
