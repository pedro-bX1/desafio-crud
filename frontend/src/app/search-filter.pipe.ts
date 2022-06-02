import { Pipe, PipeTransform } from '@angular/core';
import { Funcionario } from './funcionario';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(readData: Funcionario[],searchValue:string): unknown {
    if(!readData || !searchValue){
    return readData;
  }
  return readData.filter(funcionario =>funcionario.nome.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }
}
