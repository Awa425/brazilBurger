import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  catalogue: any[];
  // myImagePath = '../../assets/burgerHeade.jpg'
  constructor(private serviceCatalogue: MyserviceService, private http: HttpClient) {
    this.serviceCatalogue.getCatalogue().subscribe(
      data => {
        this.catalogue = data;
      }
    )
  }

}
