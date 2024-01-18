import { Injectable } from '@angular/core';
import { ReviewsType } from "../../../types/reviews.type";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  getReviews(): ReviewsType[] {
    return [
      {
        name: 'Станислав',
        image: 'review1.jpeg',
        text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
      },
      {
        name: 'Алёна',
        image: 'review2.jpeg',
        text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
      },
      {
        name: 'Мария',
        image: 'review3.jpeg',
        text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
      },
      {
        name: 'Аделина',
        image: 'review4.jpg',
        text: 'АйтиШторм просто мастера перемен! За короткое время они превратились из обычной компании в яркий блог о личном бренде. Удивительно, как они это делают!'
      },
      {
        name: 'Яника',
        image: 'review5.jpg',
        text: 'Как впечатляюще команда АйтиШторм прокачала свой бизнес до уровня блога о личном бренде! Это как ракетный старт в мире контента. Класс!'
      },
      {
        name: 'Марина',
        image: 'review6.jpg',
        text: 'Очень впечатляюще, как АйтиШторм быстро выросли из простой фирмы в блог о личном бренде. Невероятно, как они умеют заинтересовать и вдохновить! '
      }
    ]
  }
}