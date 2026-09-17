import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  public transform(value: boolean): string {
    switch (value) {
      case true:
        return 'Active';
      case false:
        return 'Inactive';
      default:
        return '-';
    }
  }

}
