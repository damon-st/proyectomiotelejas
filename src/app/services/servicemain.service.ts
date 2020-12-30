import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormularioModel } from '../model/formulario';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { MyUrl } from '../model/constante';
import { Observable } from 'rxjs';
import { ChipCompraFormulario } from '../model/chip.interface';


@Injectable({
  providedIn: 'root'
})
export class ServicemainService {


  documentosList: AngularFireList<any>;


  url: string;

  constructor(
    private storage: AngularFireStorage,
    private firebase: AngularFireDatabase,
    private http: HttpClient
  ) {
    this.url = MyUrl.Url;
   }


  // enviar Correo
  async enviarFormulario(form: FormularioModel){

    const valor = await this.firebase.list('Correo').push({
      texto: form.texto,
      email: form.email,
      nombre: form.nombre,
      paths: form.pathsArchivos,
      date: form.date,
      time: form.time,
      uid: form.uid,
      phone: form.phone
    }).key;

    const res = this.firebase.list('Correo').update(valor, {
      pid: valor
    });
  }

  async enviarCompraBD(chipVenta: ChipCompraFormulario){
    const compra = await this.firebase.list('Compras').push({
      address: chipVenta.address,
      name: chipVenta.name,
      phone: chipVenta.phone,
      chip: chipVenta.chip,
      stripeToken: chipVenta.stripeToken,
      price: chipVenta.price,
      descripcion: chipVenta.descripcion,
      id: chipVenta.id,
      paid: chipVenta.paid,
      uid: chipVenta.uid,
      email: chipVenta.email,
      time: chipVenta.time,
      date: chipVenta.date
    }).key;

    const salida = await  this.firebase.list('Compras').update(compra, {
      pid: compra
    });
  }

  enviarFormularios(form: FormularioModel){
    const item = this.firebase.list('Correo');
  }

  crearCompra(venta): Observable<any>{
    const params = JSON.stringify(venta);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.url + 'comprar', params, {headers:headers});
  }

}
