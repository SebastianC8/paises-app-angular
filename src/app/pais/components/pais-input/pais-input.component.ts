import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html'
})
export class PaisInputComponent implements OnInit {

  /**
   * Hijo emitirá término ingresado en el input al componente padre
   */
  @Output() onEnter: EventEmitter<string> = new EventEmitter();

  /**
   * Hijo emitirá un string al componente padre cuando el usuario deja de escribir en el input
   */
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  /**
   * Recibe un placeholder enviado por el padre
   */
  @Input() placeholder: string = '';

  debouncer: Subject<string> = new Subject();

  termino: string = '';

  ngOnInit() {
    this.debouncer.pipe(debounceTime(300)).subscribe((valor) => {
      this.onDebounce.emit(valor);
    });
  }

  teclaPresionada() {
    this.debouncer.next(this.termino);
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }

}
