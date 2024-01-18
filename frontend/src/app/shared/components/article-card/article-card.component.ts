import { Component, Input } from '@angular/core';
import { PopularArticleType } from "../../../../types/popular-article.type";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() article: PopularArticleType;

  serverImagePath = environment.serverImagePath

  constructor() {
    this.article = {
      id: '',
      title: '',
      description: '',
      image: '',
      date: '',
      category: '',
      url: ''
    }
  }
}
