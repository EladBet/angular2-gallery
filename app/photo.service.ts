import { Injectable } from 'angular2/core';

import { Photo } from './photo';
import { PHOTOS } from './mock-photos';
import { BlackListService } from './black-list.service';
import {GalleryService } from './gallery';

@Injectable()
export class PhotoService {
  constructor(
      private _blackListService: BlackListService,
      private galleryService: GalleryService
  ) {}
  private photos: Photo[] = [];

  getPhotos() {
    let itemsToFilter = this._blackListService.getBlackList();

    if (this.photos.length > 0)
      return Promise.resolve(this.photos);
    else {
      if (this.galleryService.isArrayFeed)
        this.photos = this.galleryService.feed.filter(item => itemsToFilter.indexOf(item.id) === -1);
      else
        this.photos = PHOTOS.filter(item => itemsToFilter.indexOf(item.id) === -1);
      return Promise.resolve(this.photos);
    }
  }

}