import { Component, OnInit } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.models';
import { ActivatedRoute } from '@angular/router';
import { DestinoApiClient } from '../models/destinos-api-client.models';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css']
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;
  constructor( private route: ActivatedRoute, private destinoApiClient: DestinoApiClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = null;
  }

}
