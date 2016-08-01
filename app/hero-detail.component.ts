import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from 'angular2/router';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  index: number = -1;
  heroes: Hero[] = [];
  timer: any;
  timeout: number = 5000;

  constructor(
    private _router: Router,
    private _heroService: HeroService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    let isSlideshow = +this._routeParams.get('isSlideshow');

    this._heroService.getHeroes()
        .then(heroes =>  {
          this.heroes = heroes;
          for (let i=0; i<heroes.length; i++){
            if (heroes[i].id === id){
              this.index = i;
              this.hero = heroes[i];
            }
          }
          if (isSlideshow)
            this.slideshow();
        });

    /*this._heroService.getHero(id)
      .then(hero => this.hero = hero);*/
  }

  goBack() {
    if (this.index > 0) {
      let link = ['HeroDetail', {id: this.heroes[this.index - 1].id, isSlideshow: false}];
      this._router.navigate(link);
    }
  }

  goNext() {
    if (this.index < this.heroes.length-1) {
      let link = ['HeroDetail', {id: this.heroes[this.index + 1].id, isSlideshow: false}];
      this._router.navigate(link);
    }
  }

  setDefault(event: any){
    event.target.src = "un-available.jpg";
  }

  slideshow(){
    if (this.index < this.heroes.length-1) {
      this.timer = setTimeout(() => {
        let link = ['HeroDetail', {id: this.heroes[this.index + 1].id, isSlideshow: true}];
        this._router.navigate(link);
      }, this.timeout);
    }

  }
  stopSlideshow() {
    clearTimeout(this.timer);
  }

  delete() {
    let selected = this.heroes.filter(item => item.id === this.hero.id);
    if (selected.length > 0) {
      this.heroes.splice(selected.id, 1);
      if (this.index < this.heroes.length-1)
        //go next
        let link = ['HeroDetail', {id: this.heroes[this.index].id, isSlideshow: false}];
      }
    else if (this.index > 0) {
      //go back
      let link = ['HeroDetail', {id: this.heroes[this.index-1].id, isSlideshow: false}];
    }


    this._router.navigate(link);
  }
}
