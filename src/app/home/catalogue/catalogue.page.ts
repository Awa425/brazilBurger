import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/myservice.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.scss'],
})
export class CataloguePage implements OnInit {
  catalogue: any[];
  segment: string = '';
  constructor(private serviceCatalogue: MyserviceService) { }

  ngOnInit() {
    this.serviceCatalogue.getCatalogue().subscribe(
      data => {
        this.catalogue = data;        
      }
    )
  }

}
