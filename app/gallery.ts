import { Injectable } from 'angular2/core';

import { Photo } from './photo';


@Injectable()
export class GalleryService {

  private search: boolean;
  private pagination: boolean;
  private resultsPerPage: number;
  private sorting: boolean;
  private autoRotateTime: number;
  isArrayFeed:boolean;
  feed: Photo[];
  url: string;
  sortBy:string = "";


  setSearch(value: boolean) {
    this.search = value;
  }

  getSearch(){
    return this.search;
  }

  setPagination(value: boolean) {
    this.pagination = value;
  }

  getPagination(){
    return this.pagination;
  }

  setResultPerPage(value: number) {
    this.resultsPerPage = value;
  }

  getResultPerPage(){
    return this.resultsPerPage;
  }

  setSorting(value: boolean) {
    this.sorting = value;
  }

  getSorting(){
    return this.sorting;
  }

  setAutoRotateTime(value: number) {
    this.autoRotateTime = value;
  }

  getAutoRotateTime(){
    return this.autoRotateTime;
  }

}