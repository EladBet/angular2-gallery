import { bootstrap }    from 'angular2/platform/browser';
import { AppComponent } from './app.component';
//import { HTTP_PROVIDERS } from 'angular2/http';

import { StorageService } from './storage.service';



//bootstrap(AppComponent, [StorageService, HTTP_PROVIDERS]);
bootstrap(AppComponent, [StorageService]);