import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, NewsRespone } from '../interfaces/index';
import {map} from 'rxjs/operators';


const apiKey= environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {

   }

   getTopHeadLines(): Observable<Article[]> {
     return this.http.get<NewsRespone>(`https://newsapi.org/v2/top-headlines?country=us&category=business`,{
       params: {
         apiKey
       }
     }).pipe(
       map(({articles}) => articles)
     );
   }

   getTopHeadLinesByCategory(category: string): Observable<Article[]> {

    return this.http.get<NewsRespone>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}`,{
      params: {
        apiKey
      }
    }).pipe(
      map(({articles}) => articles)
    );
   }
}
