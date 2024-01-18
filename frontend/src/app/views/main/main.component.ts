import { Component, OnInit } from '@angular/core';
import { ServiceType } from "../../../types/service.type";
import { ServiceService } from "../../shared/services/service.service";
import { ArticleService } from "../../shared/services/article.service";
import { PopularArticleType } from "../../../types/popular-article.type";
import { ReviewsType } from "../../../types/reviews.type";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  services: ServiceType[] = [];
  articles: PopularArticleType[] = [];

  constructor(private serviceService: ServiceService,
              private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.articleService.getPopularArticle()
      .subscribe((data: PopularArticleType[]) => {
        this.articles = data;
      })

    this.services = this.serviceService.getServices();
  }
}
