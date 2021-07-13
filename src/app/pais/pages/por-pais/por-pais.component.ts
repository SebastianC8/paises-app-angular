import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `li {
      cursor:pointer
    }`
  ]
})
export class PorPaisComponent {

  termino: string = '';
  error: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {}

  /**
   * Recibe parámetro emitido por el hijo para realizar la búsqueda
   * 
   * @param termino 
   */
  buscar(termino: string) {

    this.error = false;
    this.termino = termino;
    this.mostrarSugerencias = false;

    /**
     * Se suscribe al observable retornado por el servicio
     */
    this.paisService.buscarPais(this.termino).subscribe((data) => {
      this.paises = data;
    }, (err) => {
      this.error = true;
      this.paises = [];
    });
  }

  sugerencias(termino: string) {

    this.error = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    
    if (termino) {
      this.paisService.buscarPais(termino)
        .subscribe((paises) => this.paisesSugeridos = paises.splice(0, 5),
                   (err) => this.paisesSugeridos = []);
    } else {
      this.paisesSugeridos = [];
    }

  }

  buscarSugerido(termino: string) {
    this.buscar(termino);
  }

}
