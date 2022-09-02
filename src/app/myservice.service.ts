import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(private http: HttpClient) { }

  getCatalogue(){
    return this.http.get<any>('http://127.0.0.1:8000/api/catalogue');
  }

  getOne(type: string,id: number):Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/'+type+'/'+id);
  }
  getUsers(type: string):Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/'+type);
  }
  getLivraisonsByLivreur(id: number):Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/livreurs/'+id+'/livraisons');
  }

  connexion(body: any, url: string): Observable<any> {
    return this.http.post<any>(url, body)
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  getClientByEmail(value: "string"){
    return this.http.get<any>('http://127.0.0.1:8000/api/clients?email='+value);
  }

}
