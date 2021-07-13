import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  /**
   * Endpoint API
   */
  private _endpoint: string = 'https://restcountries.eu/rest/v2';

  /**
   * Getter http params
   */
  get httpParams() {
    return new HttpParams().set('fields', 'name;capital;alpha2Code;flag;population');
  }

  /**
   * Se incializa constructor
   * 
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Servicio encargado de buscar países
   * 
   * @param termino
   * @returns Observable<Country[]>
   */
  buscarPais(termino: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this._endpoint}/name/${termino}`, { params: this.httpParams });
  }

  /**
   * Servicio encargado de buscar países por capitales
   * 
   * @param termino 
   * @returns Observable<Country[]>
   */
  buscarCapital(termino: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this._endpoint}/capital/${termino}`, { params: this.httpParams });
  }

  /**
   * Servicio encargado de buscar país por su código alpha2
   * 
   * @param id 
   * @returns Observable<Country>
   */
  buscarPaisId(id: string): Observable<Country> {
    return this.http.get<Country>(`${this._endpoint}/alpha/${id}`);
  }

  /**
   * Servicio encargado de buscar los países que están asociados a una región específica
   * 
   * @param region 
   * @returns  Observable<Country[]>
   */
  buscarRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this._endpoint}/region/${region}`, { params: this.httpParams });
  }

}