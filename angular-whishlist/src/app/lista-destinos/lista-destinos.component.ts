import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.models';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
	@Output() onItemAdded: EventEmitter<DestinoViaje>
	destinos: DestinoViaje[];
	constructor() {

		this.destinos = [];
	}

  	agregado(d: DestinoViaje){

		console.log(d);  	
		//this.destinos.push(new DestinoViaje(_nombre, _url));
		// console.log(this.destinos[0]);
  	}

  	ngOnInit(): void {

	}
	elegido(d: DestinoViaje){
		this.destinos.forEach(function(x){x.setSelected(false);});
		d.setSelected(true);
	}  
	

}
