import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino: string = '';
  error: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

/**
 * Recibe parámetro emitido por el hijo para realizar la búsqueda
 * 
 * @param termino 
 */
  buscar(termino: string) {

    this.error = false;
    this.termino = termino;

    /**
     * Se suscribe al observable retornado por el servicio
     */
    this.paisService.buscarCapital(this.termino).subscribe((data) => {
      this.paises = data;
    }, (err) => {
      this.error = true;
      this.paises = [];
    });
  }

}
