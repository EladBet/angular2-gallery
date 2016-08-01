import { bootstrap }    from 'angular2/platform/browser';
import { AppComponent } from './app.component';

import { StorageService } from './storage.service';



bootstrap(AppComponent, [StorageService]);