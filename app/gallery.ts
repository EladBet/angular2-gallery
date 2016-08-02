import { Injectable } from 'angular2/core';

import { Hero } from './hero';



export class Gallery {
  search : boolean;
  pagination  : boolean;
  resultsPerPage : number;
  sorting  : boolean;
  autoRotateTime : number;
  isFeedArray: boolean;
  url: string;
  feedArray:Hero[];
}

@Injectable()
export class GalleryService {

  search: boolean = true;

  setSearch(search: boolean) {
    this.search = search;
  }

  getSearch(){
    return this.search;
  }

}