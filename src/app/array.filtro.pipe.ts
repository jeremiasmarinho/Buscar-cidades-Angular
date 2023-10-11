import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFiltro',
})
export class ArrayFiltroPipe implements PipeTransform {
  transform(value: Array<any>, filtro: string): any {
    if (filtro) {
      filtro = filtro.toUpperCase();

      return value.filter((a) => a.nome.toUpperCase().indexOf(filtro) >= 0);
    } else {
      return value;
    }
  }
}
