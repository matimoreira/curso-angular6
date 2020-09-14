import { DestinoViaje } from './destino-viaje.models';
import { Subject, BehaviorSubject } from 'rxjs';
import { Store, State } from '@ngrx/store';
import { AppState } from '../app.module';
import { NuevoDestinoAction, ElegidoFavoritoAction } from '../models/destinos-viajes-states.models';
import { Injectable } from '@angular/core';

@Injectable()
export class DestinoApiClient {
    constructor(private store: Store<AppState>){
    }
    add( d: DestinoViaje){
        this.store.dispatch(new NuevoDestinoAction(d));
    }

    elegir(d: DestinoViaje){
        this.store.dispatch(new ElegidoFavoritoAction(d));
    }

    
}
