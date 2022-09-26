import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'summary'
})

export class SummapryPipe implements PipeTransform {
    transform(value: string, args?: number) {
        let actualLimit = args? args : 20;
        return value.substr(0, actualLimit) + '...';
    }
}