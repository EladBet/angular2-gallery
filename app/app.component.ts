import { Component, Input, OnInit} from 'angular2/core';
import { GalleryComponent } from './gallery.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router'
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
  selector: 'my-app',
  template: `<my-gallery [search]=true></my-gallery>`,
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
    name: 'HeroDetail',
    component: HeroDetailComponent
  }
])

export class AppComponent {

}