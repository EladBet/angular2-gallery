import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import {MyFilterPipe} from './hero.filter';
import {MySortPipe} from './hero.sort';
import {GalleryService } from './gallery';


@Component({
  selector: 'my-dashboard',
  pipes: [MyFilterPipe, MySortPipe],
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private heroes: Hero[] = [];
  private sortBy: string;
  private itemsPer: number;
  private startAt: number;
  private endAt: number;
  private currentPage: number = 1;
  private pages: number[] = [];
  private loading: boolean = false;

  private search : boolean;
  private pagination  : boolean;
  private resultsPerPage : number;
  private sorting  : boolean;
  private isFeedArray: boolean;
  private url: string;
  private feedArray:Hero[];


  constructor(
    private _router: Router,
    private _heroService: HeroService,
    private galleryService: GalleryService
  ) {}

  ngOnInit() {
    this.search = this.galleryService.getSearch();
    this.pagination = this.galleryService.getPagination();
    this.itemsPer = this.galleryService.getResultPerPage();
    this.sorting = this.galleryService.getSorting();
    this.sortBy = this.galleryService.sortBy;

    this.loading = true;
    this._heroService.getHeroes()
        .then(heroes => {
          this.loading = false;
          this.heroes = heroes;
          this.pages = [];
          if (this.itemsPer > 0 && this.pagination) {
            let numberOfPages = Math.ceil(heroes.length / this.itemsPer);
            for (let i = 1; i <= numberOfPages; i++) {
              this.pages.push(i);
            }
          }
          else {
            this.pages.push(1);
            this.itemsPer = this.heroes.length;
          }
          this.pageChanged(1);
        });
      //.then(heroes => this.heroes = heroes.slice(1,5));
  }

  gotoDetail(hero: Hero) {
    let link = ['HeroDetail', { id: hero.id , isSlideshow: false}];
    this._router.navigate(link);
  }

  itemsPerChanged(items: number){
    this.galleryService.setResultPerPage(items);

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

  sortByChanged(value: string){
    this.galleryService.sortBy = value;
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
