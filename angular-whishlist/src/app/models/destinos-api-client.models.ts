import { DestinoViaje } from './destino-viaje.models';
import { Subject, BehaviorSubject } from 'rxjs';
import { Store, State } from '@ngrx/store';
import { AppConfig, AppState, APP_CONFIG, db } from '../app.module';
import { NuevoDestinoAction, ElegidoFavoritoAction } from '../models/destinos-viajes-states.models';
import { forwardRef, Inject, inject, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http'

@Injectable()
export class DestinoApiClient {
    destinos: DestinoViaje[] = [];

    constructor(
        private store: Store<AppState>,
        @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
        private http: HttpClient
        ){
            this.store
                .select(state => state.destinos)
                .subscribe((data) => {
                    console.log('destinos sub store');
                    console.log(data);
                    this.destinos = data.items;
                });
            this.store
                .subscribe((data) =>{
                    console.log('all store');
                    console.log(data);
                });
        }

    add( d: DestinoViaje){
        const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
        const req = new HttpRequest('POST', this.config.apiEndPoint + "/my", {nuevo: d.nombre}, {headers: headers});
        this.http.request(req).subscribe((data: HttpResponse<{}>) => {
            if( data.status === 200) {
                this.store.dispatch(new NuevoDestinoAction(d));
                const myDB = db;
                myDB.destinos.add(d);
                console.log('Todos los destinos de la db!');
                myDB.destinos.toArray().then(destinos => console.log(destinos));
            }
        })           
    }

    elegir(d: DestinoViaje){
        this.store.dispatch(new ElegidoFavoritoAction(d));
    }

    
}
