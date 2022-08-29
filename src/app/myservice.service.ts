import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  connexion(body: any, url: string): Observable<any> {
    return this.http.post<any>(url, body)
  }

}
