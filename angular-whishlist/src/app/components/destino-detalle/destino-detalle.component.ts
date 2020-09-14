import { Component, OnInit, InjectionToken, inject } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.models';
import { ActivatedRoute } from '@angular/router';
import { DestinoApiClient } from '../../models/destinos-api-client.models';
import { AppState } from 'src/app/app.module';
import  { Store } from '@ngrx/store';

class DestinoApiClientViejo {
  getById(id: String): DestinoViaje {
    console.log('llamado por la clase vieja!');
    return null;
  }
}

interface AppConfig {
  apiEndpoint: string;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'mi_api.com'
}

const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

class DestinoApiClientDecorated extends DestinoApiClient{
  constructor( @inject(APP_CONFIG) private config: AppConfig, store: Store<AppState>){
    super(store);
  }
  getById(id: string): DestinoViaje {
    console.log('llamado por la clase decorada!');
    console.log('config: ' + this.config.apiEndpoint);
    return super.getById(id);
  }
}


@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [ 
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    { provide: DestinoApiClient, useClass: DestinoApiClientDecorated},
    { provide: DestinoApiClientViejo, useExisting: DestinoApiClient}
  ]
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;
  constructor( private route: ActivatedRoute, private destinoApiClient: DestinoApiClientViejo) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = null;
  }

}
