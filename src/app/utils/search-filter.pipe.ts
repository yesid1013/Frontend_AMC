import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): any {
    return list ? list.filter(item => item.activo_tipo_de_equipo.search(new RegExp(filterText, 'i')) > -1 || item.activo_id_primario.search(new RegExp(filterText, 'i')) > -1 )  : [];
  }

}
