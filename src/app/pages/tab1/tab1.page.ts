import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article, NewsRespone } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
@ViewChild(IonInfiniteScroll)infinite: IonInfiniteScroll;

  public articles: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService
      .getTopHeadLines()
      .subscribe((articles) => this.articles.push(...articles));
  }

  loadData() {
    this.newsService.getTopHeadLinesByCategory('business', true).subscribe((articles)=>{
      if(articles.length===this.articles.length){
        this.infinite.disabled=true;
        return;
      }

      this.articles=articles;
      this.infinite.complete();
    });

  }
}
