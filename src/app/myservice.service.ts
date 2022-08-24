import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(private http: HttpClient) { }

  getCatalogue(){
    return this.http.get<any>('http://127.0.0.1:8000/api/catalogue');
  }

}
