import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
// el static a true hace que el objeto esté asignado desde que se lanza el componente
@ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];

  public selectedCategory: string = this.categories[0];

  public articles: Article[] = [];

  constructor(private newsSvc: NewsService) {}

  ngOnInit() {
    this.newsSvc
      .getTopHeadLinesByCategory(this.selectedCategory)
      .subscribe((articles) => {
        // console.log(articles);
        this.articles = [...articles];
        // this.articles.push(...articles);
      });
  }

  segmentChanged(event: Event) {
    this.selectedCategory = (event as CustomEvent).detail.value;
    // console.log(event.detail.value);
    this.newsSvc
      .getTopHeadLinesByCategory(this.selectedCategory)
      .subscribe((articles) => {
        // console.log(articles);
        this.articles = [...articles];
        // this.articles.push(...articles);
      });
  }

  loadData() {
    this.newsSvc
      .getTopHeadLinesByCategory(this.selectedCategory, true)
      .subscribe((articles) => {

        if (articles.length=== this.articles.length) {
          this.infiniteScroll.disabled=true;
          return;
        }


        this.articles = articles;

        setTimeout(() => {
          this.infiniteScroll.complete();
        }, 1000);
      });
  }
}
