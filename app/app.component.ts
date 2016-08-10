import { Component, Input, OnInit} from 'angular2/core';
import { GalleryComponent } from './gallery.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router'
import { DashboardComponent } from './dashboard.component';
import { PhotoDetailComponent } from './photo-detail.component';

@Component({
  selector: 'my-app',
  //template: `<my-gallery [feed]="feed" [search]="true" [pagination]="true" [resultsPerPage]="5" [sorting]="true"  [autoRotateTime]="1000"></my-gallery>`,
  template: `<my-gallery [feed]="'https://mock.json'" [search]="true" [pagination]="true" [resultsPerPage]="5" [sorting]="true"  [autoRotateTime]="4000"></my-gallery>`,
  directives:[GalleryComponent]
})

@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/detail/:id/:isSlideshow',
    name: 'PhotoDetail',
    component: PhotoDetailComponent
  }
])

export class AppComponent {
  private feed = [
    {
      "title": "Blue river (much better in original size - press)",
      "url": "http://farm9.static.flickr.com/8305/7893507666_0d25cd9f30.jpg",
      "date": "Thu, 30 Aug 2012 10:41:00 -0400",
      "id": 0
    },
    {
      "title": "Dangerously beautiful paths",
      "url": "http://farm8.static.flickr.com/7275/7550745422_3e323cd79e.jpg",
      "date": "Thu, 12 Jul 2012 03:27:00 -0400",
      "id": 1
    },
    {
      "title": "World above clouds",
      "url": "http://farm8.static.flickr.com/7016/6399710385_8e435d2c73.jpg",
      "date": "Fri, 29 Jan 2010 02:28:00 -0500",
      "id": 14
    },
    {
      "title": "Impressions d'automne - Fall impressions",
      "url": "http://farm2.static.flickr.com/1066/5109663877_bec5467bb2.jpg",
      "date": "Sun, 24 Oct 2010 06:35:17 -0400",
      "id": 15
    },
    {
      "title": "Bridge",
      "url": "http://farm8.static.flickr.com/7266/7452173966_1dd42c4c04.jpg",
      "date": "Sat, 21 Jul 2012 13:40:00 -0400",
      "id": 16
    },{
      "title": "It's Been Too Long",
      "url": "http://farm4.static.flickr.com/3213/2912152462_9cf11eb88e.jpg",
      "date": "Sat, 04 Oct 2008 09:05:57 -0400",
      "id": 20
    },
    {
      "title": "I scream, you scream..",
      "url": "http://farm4.static.flickr.com/3068/2620294301_2522a015f5.jpg",
      "date": "Sun, 29 Jun 2008 08:55:13 -0400",
      "id": 21
    }]

}