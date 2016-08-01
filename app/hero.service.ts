import { Injectable } from 'angular2/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { BlackListService } from './black-list.service';

@Injectable()
export class HeroService {
  constructor(private _blackListService: BlackListService) {}

  getHeroes() {
    let itemsToFilter = this._blackListService.getBlackList();
    return Promise.resolve(HEROES.filter(item => itemsToFilter.indexOf(item.id) === -1));
  }

  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
    );
  }

  getHero(id: number) {
    return Promise.resolve(HEROES).then(
      heroes => heroes.filter(hero => hero.id === id)[0]
    );
  }
}
