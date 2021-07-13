import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs/operators';
import { Country, Translations } from '../../interfaces/pais.interface';


@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;
  translations!: Translations[];

  constructor(private paramsUrl: ActivatedRoute, private paisService: PaisService) { }

  ngOnInit(): void {

    this.paramsUrl.params
      .pipe(
        switchMap(({ id }) => this.paisService.buscarPaisId(id)),
        tap(console.log)
      ).subscribe((response) => {
        this.pais = response;
        this.translations = Array.from(Object.values(response.translations));        
      });

  }

}
