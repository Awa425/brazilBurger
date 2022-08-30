import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MyserviceService } from 'src/app/myservice.service';

@Component({
  selector: 'app-livraisons',
  templateUrl: './livraisons.page.html',
  styleUrls: ['./livraisons.page.scss'],
})
export class LivraisonsPage implements OnInit {
   livraisons : any
  constructor(private activateRoute: ActivatedRoute, private myService: MyserviceService ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(
      (pa: Params) => {
        const id = pa['id'];
        this.myService.getLivraisonsByLivreur(id).subscribe(
          res => {
            this.livraisons = res            
          }
         
        )
        
      }
    )
  }

}
