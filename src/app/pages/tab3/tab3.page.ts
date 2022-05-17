import { Component } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  get articles(): Article[] {
    return this.storageSvc.localArticles;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private storageSvc: StorageService) {

  }

}
