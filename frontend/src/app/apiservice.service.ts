import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }//utilizando httpclient para tornar possíveis as requisições HTTP (get, post, put ...)

  apiUrl = 'http://localhost:3000/func';
//observables para que os métodos em index.js faça as devidas funções  do http 
  getAllData():Observable<any>{
    return this._http.get(`${this.apiUrl}`);
  }

  criarDados(data:any):Observable<any>{
    console.log(data, 'createapi=>');
    return this._http.post(`${this.apiUrl}`,data);
  }

  deletarDados(id:any):Observable<any>{
    let ids = id;
    return this._http.delete(`${this.apiUrl}/${ids}`);
  }

  atualizarDados(data:any,id:any):Observable<any>{
    let ids = id;
    return this._http.put(`${this.apiUrl}/${ids}`,data)
  }
  getSingleData(id:any):Observable<any>{
    let ids = id;
    return this._http.get(`${this.apiUrl}/${ids}`);
  }
}
