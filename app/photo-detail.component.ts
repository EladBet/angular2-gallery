import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { Router } from 'angular2/router';

import { Photo } from './photo';
import { PhotoService } from './photo.service';
import { BlackListService } from './black-list.service';
import {GalleryService } from './gallery';

@Component({
  selector: 'my-photo-detail',
  templateUrl: 'app/photo-detail.component.html',
  styleUrls: ['app/photo-detail.component.css'],
})
export class PhotoDetailComponent implements OnInit {
  @Input() photo: Photo;
  index: number = -1;
  photos: Photo[] = [];
  timer: any;
  timeout: number;

  constructor(
    private _router: Router,
    private _photoService: PhotoService,
    private _blackListService: BlackListService,
    private _routeParams: RouteParams,
    private galleryService: GalleryService) {
  }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    let isSlideshow = +this._routeParams.get('isSlideshow');
    this.timeout = this.galleryService.getAutoRotateTime();

    this._photoService.getPhotos()
        .then(photos =>  {
          this.photos = photos;
          for (let i=0; i<photos.length; i++){
            if (photos[i].id === id){
              this.index = i;
              this.photo = photos[i];
            }
          }
          if (isSlideshow)
            this.slideshow();
        });

    /*this._photoService.getPhoto(id)
      .then(photo => this.photo = photo);*/
  }

  goBack() {
    if (this.index > 0) {
      let link = ['PhotoDetail', {id: this.photos[this.index - 1].id, isSlideshow: false}];
      this._router.navigate(link);
    }
  }

  goNext() {
    if (this.index < this.photos.length-1) {
      let link = ['PhotoDetail', {id: this.photos[this.index + 1].id, isSlideshow: false}];
      this._router.navigate(link);
    }
  }

  setDefault(event: any){
    event.target.src = "un-available.jpg";
  }

  slideshow(){
    if (this.index < this.photos.length-1) {
      this.timer = setTimeout(() => {
        let link = ['PhotoDetail', {id: this.photos[this.index + 1].id, isSlideshow: true}];
        this._router.navigate(link);
      }, this.timeout);
    }

  }
  stopSlideshow() {
    clearTimeout(this.timer);
  }

  delete() {
    this._blackListService.addToBlackList(this.photos[this.index].id);
    this.photos.splice(this.index, 1);

    if (this.index < this.photos.length - 1) {
      //go next
      let link = ['PhotoDetail', {id: this.photos[this.index].id, isSlideshow: false}];
      this._router.navigate(link);
    }
    else{
      //go back
      let link = ['PhotoDetail', {id: this.photos[this.index - 1].id, isSlideshow: false}];
      this._router.navigate(link);
    }
  }
}
