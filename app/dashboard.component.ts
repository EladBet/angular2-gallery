import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import {MyFilterPipe} from './hero.filter';
import {MySortPipe} from './hero.sort';
import { Gallery, GalleryService } from './gallery';


@Component({
  selector: 'my-dashboard',
  pipes: [MyFilterPipe, MySortPipe],
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];
  sortBy: string = "";
  itemsPer: number = 5;
  startAt: number = 0;
  endAt: number = 4;
  currentPage: number = 1;
  pages: number[] = [];

  search : boolean;
  pagination  : boolean;
  resultsPerPage : number;
  sorting  : boolean;
  autoRotateTime : number;
  isFeedArray: boolean;
  url: string;
  feedArray:Hero[];


  constructor(
    private _router: Router,
    private _heroService: HeroService
    ,private galleryService: GalleryService
  ) {}

  ngOnInit() {
    this.search = this.galleryService.getSearch();


    this._heroService.getHeroes()
        .then(heroes => {
          this.heroes = heroes;
          this.pages = [];
          if (this.itemsPer > 0) {
            let numberOfPages = Math.ceil(heroes.length / this.itemsPer);
            for (let i = 1; i <= numberOfPages; i++) {
              this.pages.push(i);
            }
          }
        });
      //.then(heroes => this.heroes = heroes.slice(1,5));
  }

  gotoDetail(hero: Hero) {
    let link = ['HeroDetail', { id: hero.id , isSlideshow: false}];
    this._router.navigate(link);
  }

  itemsPerChanged(items: number){
    this.startAt =  items*(this.currentPage-1);
    this.endAt =  items*(this.currentPage-1) + (items-1);
    this.currentPage = 1;
    this.pages = [];
    if (this.itemsPer > 0) {
      let numberOfPages = Math.ceil(this.heroes.length / items);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    }
  }

  pageChanged(page: number){
    this.startAt =  this.itemsPer*(page-1);
    this.endAt =  this.itemsPer*(page-1) + (this.itemsPer-1);
  }

  goBack() {
    if (this.currentPage > 1) {
      this.pageChanged(--this.currentPage);
    }
  }

  goNext() {
    if (this.currentPage <= this.pages.length-1)
      this.pageChanged(++this.currentPage);
  }

  setDefault(event: any){
    event.target.src = "un-available.jpg";
  }

}
