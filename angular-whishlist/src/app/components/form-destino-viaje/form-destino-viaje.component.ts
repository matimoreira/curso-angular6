import { Component, OnInit, Output, EventEmitter, Inject, forwardRef } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.models';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounce, distinctUntilChanged, switchMap, debounceTime } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { AppConfig, APP_CONFIG } from 'src/app/app.module';
@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  minLongitud = 3;
  searhResults: string[];

  constructor(fb: FormBuilder, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url: ['', Validators.required]
    })

    this.fg.valueChanges.subscribe((form: any) =>{
      console.log("cambio el formulario: " + form);
    });
   }

  ngOnInit(): void {
    let elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
      .pipe(
        map((e:KeyboardEvent) => (e.target as HTMLInputElement).value),
        filter( text => text.length > 2),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((text: String) => ajax(this.config.apiEndPoint + '/ciudades?q=' + text))
      ).subscribe(AjaxResponse => {
        this.searhResults = AjaxResponse.response;
        console.log(AjaxResponse.response);
      }); 
  }

  guardar(nombre: string, url: string): boolean{
    const d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }

  nombreValidator(control: FormControl): {[s: string]: boolean}{
    let l = control.value.toString().trim().length;
    if (l>0 && l<5){
      return {invalidNombre: true};
    }
    return null;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn{
    return (control:FormControl):{[s: string]:boolean} | null => {
      let l = control.value.toString().trim().length;
      if (l>0 && l<minLong){
        return {minLongNombre: true};
      }
      return null;
    }
  }

}
