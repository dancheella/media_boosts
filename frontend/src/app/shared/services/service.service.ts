import { Injectable } from '@angular/core';
import { ServiceType } from "../../../types/service.type";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  getServices(): ServiceType[] {
    return  [
      {
        image: 'service1.jpeg',
        title: 'Создание сайтов',
        description: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
        price: 'От 7 500₽',
      },
      {
        image: 'service2.jpeg',
        title: 'Продвижение',
        description: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
        price: 'От 3 500₽',

      },
      {
        image: 'service3.jpeg',
        title: 'Реклама',
        description: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
        price: 'От 1 000₽',
      },
      {
        image: 'service4.jpeg',
        title: 'Копирайтинг',
        description: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
        price: 'От 750₽',
      }
    ];
  }

  getServiceTitles(): string[] {
    return this.getServices().map(service => service.title);
  }
}
