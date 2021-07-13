import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
    button {
      margin-right: 5px;
    }
    `
  ]
})
export class PorRegionComponent {

  /**
   * Array de regiones
   */
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Country[] = [];
  loading: boolean = false;

  constructor(private paisService: PaisService) { }

  activarRegion(region: string) {

    if (region !== this.regionActiva) {
      this.regionActiva = region;
      this.loading = true;
      this.paises = [];
  
      this.paisService.buscarRegion(region).subscribe((response) => {
        this.loading = false;
        this.paises = response;
      });
    }

  }

  getClaseCSS(region: string): string {
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

}
