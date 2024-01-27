import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceType } from "../../../types/service.type";
import { ServiceService } from "../../shared/services/service.service";
import { ArticleService } from "../../shared/services/article.service";
import { PopularArticleType } from "../../../types/popular-article.type";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy {
  services: ServiceType[] = [];
  articles: PopularArticleType[] = [];
  private subscription: Subscription | null = null;

  constructor(private serviceService: ServiceService,
              private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.subscription = this.articleService.getPopularArticle()
      .subscribe((data: PopularArticleType[]) => {
        this.articles = data;
      })

    this.services = this.serviceService.getServices();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
