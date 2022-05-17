/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    // eslint-disable-next-line no-underscore-dangle
    this._storage = storage;
    this.loadFavorites();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get localArticles() {
    return [...this._localArticles];
  }

  async saveRemoveArticle(article: Article) {
    const exists = this._localArticles.find(
      (localArticle) => localArticle.title === article.title
    );

    if (exists) {
      this._localArticles = this._localArticles.filter(
        (localArticle) => localArticle.title !== article.title
      );
    } else {
      this._localArticles = [article, ...this._localArticles];
    }

    this._storage.set('articles', this._localArticles);
  }

  async loadFavorites(){
    try {
      const articles = await this._storage.get('articles');
      this._localArticles = articles || [];

    } catch (error) {
console.log(error);
    }

  }


}
