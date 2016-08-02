import { Component, Input, OnInit} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { BlackListService } from './black-list.service';
import { HTTP_PROVIDERS } from 'angular2/http';
import { Gallery, GalleryService } from './gallery';

@Component({
  selector: 'my-gallery',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    //HTTP_PROVIDERS,
    HeroService,
    GalleryService,
    BlackListService
  ]
})

/*@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/detail/:id/:isSlideshow',
    name: 'HeroDetail',
    component: HeroDetailComponent
  }
])*/
export class GalleryComponent implements OnInit{
  @Input() search:boolean = true;
  @Input() pagination:boolean = true;
  @Input() resultsPerPage:number = 10;
  @Input() sorting:boolean = true;
  @Input() autoRotateTime:number = 40000;
  @Input() feed:any = "https://s3.amazonaws.com/yotpo-ads/assets/images.json";

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.galleryService.setSearch(this.search);
  }

  title = 'Angular 2 Gallery';
}

