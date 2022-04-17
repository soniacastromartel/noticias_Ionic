import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Article,
  ArticlesByCategoryAndPage,
  NewsRespone,
} from '../interfaces/index';
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;
const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};

  constructor(private http: HttpClient) {}

  private executeQuery<T>(endpoint: string) {
    console.log('petición http realizada');
    return this.http.get<T>(`${apiURL}${endpoint}`, {
      params: {
        apiKey,
        country: 'us',
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  getTopHeadLines(): Observable<Article[]> {
    return this.getTopHeadLinesByCategory('business');
    // return this.http
    //   .get<NewsRespone>(
    //     `https://newsapi.org/v2/top-headlines?country=us&category=business`,
    //     {
    //       params: {
    //         apiKey,
    //       },
    //     }
    //   )
    //   .pipe(map(({ articles }) => articles));
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  getTopHeadLinesByCategory(
    category: string,
    loadMore: boolean = false
  ): Observable<Article[]> {
    if (loadMore) {
      return this.getArticlesByCategory(category);
    }

    if (this.articlesByCategoryAndPage[category]) {
      return of(this.articlesByCategoryAndPage[category].articles); //of=> regresa un observable de lo que pasemos por parámetro
    }

    return this.getArticlesByCategory(category);
  }

  private getArticlesByCategory(category: string): Observable<Article[]> {
    if (Object.keys(this.articlesByCategoryAndPage).includes(category)) {
      // this.articlesByCategoryAndPage[category].page += 1;
    } else {
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: [],
      };
    }
    const page = this.articlesByCategoryAndPage[category].page + 1;
    return this.executeQuery<NewsRespone>(
      `/top-headlines?category=${category}&page=${page}`
    ).pipe(
      map(({ articles }) => {
        if (articles.length === 0) {
          return this.articlesByCategoryAndPage[category].articles;
        }
        this.articlesByCategoryAndPage[category] = {
          page,
          articles: [
            ...this.articlesByCategoryAndPage[category].articles,
            ...articles,
          ],
        };
        return this.articlesByCategoryAndPage[category].articles;
      })
    );
  }
}
