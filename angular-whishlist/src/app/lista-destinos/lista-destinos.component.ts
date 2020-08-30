import { Component, OnInit} from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.models';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
	destinos: DestinoViaje[];
	constructor() {

		this.destinos = [];
	}

  	agregar(_nombre: string, _url: string): boolean	{

		console.log(new DestinoViaje(_nombre, _url));  	
		this.destinos.push(new DestinoViaje(_nombre, _url));
		// console.log(this.destinos[0]);
		return false;
  	}

  	ngOnInit(): void {

  	}

}
