import { Injectable } from 'angular2/core';
import { StorageService } from './storage.service';

@Injectable()
export class BlackListService {
  blackList: number[] = [];

  constructor(public storageService: StorageService) {}

  addToBlackList = function(id:number) {
    this.blackList.push(id);
    this.storageService.write('blackList', this.blackList);
    return this.blackList;
  };

  getBlackList = function() {
    if (this.blackList.length === 0) {
      this.blackList = this.storageService.read('blackList') || [] ;
    }
    return this.blackList;
  };
}
