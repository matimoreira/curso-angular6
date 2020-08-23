import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nuevo-destino',
  templateUrl: './nuevo-destino.component.html',
  styleUrls: ['./nuevo-destino.component.css']
})
export class NuevoDestinoComponent implements OnInit {
	@Input() destinos: [string[]];
	nuevoDestino: String;
  constructor() {  }

  agregar(_nuevoDestino: HTMLInputElement)	{
  	console.log(_nuevoDestino.value);  	
  	this.destinos[0].push(_nuevoDestino.value);
  	console.log(this.destinos[0]);
  }

  ngOnInit(): void {
  }

}
