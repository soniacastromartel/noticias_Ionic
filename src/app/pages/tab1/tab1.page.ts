import { Component, OnInit } from '@angular/core';
import { NewsRespone } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private newsService: NewsService) {}

  ngOnInit(){
    this.newsService.getTopHeadLines().subscribe((data: NewsRespone) =>{
      console.log(data.articles);
    });
  }

}
