/**
 * Created by betit on 7/30/2016.
 */
import {Injectable, Pipe, PipeTransform} from 'angular2/core';
import { Photo } from './photo';

@Pipe({
    name: 'myFilterPipe',
    pure: false
})
@Injectable()
export class MyFilterPipe implements PipeTransform {
    transform(photos: any[], args: any[]): any {
        // filter items array, items which match and return true will be kept, false will be filtered out
        if (args[0])
            return photos.filter(item => item.title.toLowerCase().indexOf(args[0].toLowerCase()) !== -1 );
        else
            return photos;
    }
}
