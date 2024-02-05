import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HighlightsService {
  constructor() {
  }

  getHighlights() {
    return [
      {
        highlight: 'Предложение месяца',
        title: 'Продвижение в Instagram для вашего бизнеса <span class="main__title-color">-15%!</span>',
        description: '',
        image: 'carousel-big-1.jpeg'
      },
      {
        highlight: 'Акция',
        title: 'Нужен грамотный <span class="main__title-color">копирайтер?',
        description: 'Весь декабрь у нас действует акция на работу копирайтера.',
        image: 'carousel-big-2.jpeg'

      },
      {
        highlight: 'Новость дня',
        title: '<span class="main__title-color">6 место</span> в ТОП-10 SMM-агенств Москвы!',
        description: 'Мы благодарим каждого, кто голосовал за нас!',
        image: 'carousel-big-3.jpeg'
      }
    ]
  }

}
