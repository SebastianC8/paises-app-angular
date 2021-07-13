import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html'
})
export class PaisTablaComponent {

  /**
   * Hijo recibe array de países emitido por el padre
   */
  @Input('paises') paises: Country[] = [];

}
