import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'namecase'
})
export class NamecasePipe implements PipeTransform {

  transform(value: string): unknown {
    value = value.replace("$", '');
    let arr = value.split(/(?=[A-Z])/);
    arr = arr.map(m => m.toUpperCase());
    value = arr.join(' ');
    return value;
  }

}
