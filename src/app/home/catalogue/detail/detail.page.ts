import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MyserviceService } from 'src/app/myservice.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  produit : any;
  constructor(private activateRoute: ActivatedRoute, private myService: MyserviceService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(
      (pa: Params)=>{
        const id = pa['id'];
        this.myService.getOne("produits",id).subscribe(
          donnees=>{
            this.produit=donnees;
            // console.log(donnees);
            
          }
        )
      }
    )
  }

}
