import { Component } from '@angular/core';

@Component({
  selector: 'app-prueba',
  template: `<h1>Hola mundo desde el componente prueba</h1>`,
})
export class PruebaComponent {
  constructor() {
    console.log('Hola mundo desde la consola del componente');
  }
}
