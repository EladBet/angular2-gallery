import { Injectable } from 'angular2/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { BlackListService } from './black-list.service';
import {GalleryService } from './gallery';

@Injectable()
export class HeroService {
  constructor(
      private _blackListService: BlackListService,
      private galleryService: GalleryService
  ) {}
  private heroes: Hero[] = [];

  getHeroes() {
    let itemsToFilter = this._blackListService.getBlackList();

    if (this.heroes.length > 0)
      return Promise.resolve(this.heroes);
    else {
      if (this.galleryService.isArrayFeed)
        this.heroes = this.galleryService.feed.filter(item => itemsToFilter.indexOf(item.id) === -1);
      else
        this.heroes = HEROES.filter(item => itemsToFilter.indexOf(item.id) === -1);
      return Promise.resolve(this.heroes);
    }
  }

}