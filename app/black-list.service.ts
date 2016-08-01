import { Injectable } from 'angular2/core';

@Injectable()
export class BlackListService {
  blackList: number[] = [];

  constructor(
      //private _localStorage:LocalStorage
  ) {}

  addToBlackList = function(id:number) {
    this.blackList.push(id);
    //this._localStorage.set('blackList', this.blackList);
    return this.blackList;
  };

  getBlackList = function() {
    if (this.blackList.length === 0) {
      //this.blackList = this._localStorage.get('blackList') || [] ;
    }
    return this.blackList;
  };
}
