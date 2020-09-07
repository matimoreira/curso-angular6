import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.models';
import { DestinoApiClient } from './../models/destinos-api-client.models';
import { Store, State } from '@ngrx/store';
import { AppState } from '../app.module';
import { debounceTime } from 'rxjs/operators';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../models/destinos-viajes-states.models';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
	@Output() onItemAdded: EventEmitter<DestinoViaje>;
	updates: string[];
	all;

	constructor( public destinosApiClient: DestinoApiClient, private store: Store<AppState>) {
		this.onItemAdded = new EventEmitter();
		this.updates = [];
		this.store.select(state => state.destinos.favorito)
		.subscribe( d => {
			if(d != null){
				this.updates.push('Se ha elegido a ' + d.nombre);
			}
		});
		store.select(state => state.destinos.items).subscribe(items => this.all = items);
	}

	ngOnInit() {
	}

  	agregado(d: DestinoViaje) {
		this.destinosApiClient.add(d);
		this.onItemAdded.emit(d);
		this.store.dispatch(new NuevoDestinoAction(d));

		//this.destinos.push(new DestinoViaje(_nombre, _url));
		// console.log(this.destinos[0]);
  	}

  	
	elegido(e: DestinoViaje) {
		this.destinosApiClient.elegir(e);
		this.store.dispatch(new ElegidoFavoritoAction(e));
	}  
	

	getAll() {
		this.store.dispatch
	}

}
