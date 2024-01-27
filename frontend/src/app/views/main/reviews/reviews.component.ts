import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from "ngx-owl-carousel-o";
import { ReviewsType } from "../../../../types/reviews.type";
import { ReviewsService } from "../../../shared/services/reviews.service";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit{
  @Input() review: ReviewsType;

  customReviews: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin: 26,
    dotsSpeed: 700,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false
  }

  reviews: ReviewsType[] = [];

  constructor(private reviewsService: ReviewsService) {
    this.review = {
      name: '',
      image: '',
      text: '',
    }
  }

  ngOnInit(): void {
    this.reviews = this.reviewsService.getReviews();
  }
}
