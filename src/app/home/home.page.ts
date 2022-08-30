import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MyserviceService } from '../myservice.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage{
  user : any
  id: number
  listLivraison: any
  url = "http://127.0.0.1:8000/api/login_check";
  myForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl() 
});

  constructor(private myService: MyserviceService, private router: Router) { }

  login(){
    this.myService.connexion(this.myForm.value, this.url).subscribe(
      result => {
        if(result['token']){
          localStorage.setItem('token', result['token']);
          this.user=this.getDecodedAccessToken(result['token'])
          const username = this.user.username
          // console.log(this.user.username);
          
          if (this.user.roles[0] == 'ROLE_CLIENT') {
            this.router.navigateByUrl('/home/catalogue')
          }
          else if(this.user.roles[0] == 'ROLE_LIVREUR'){
            this.myService.getUsers('livreurs').subscribe(
              res => {
                for (let i = 0; i < res.length; i++) {
                  if (this.user.username == res[i].email) {
                    this.id = res[i].id 
                    // console.log(res[i]);
                    this.router.navigateByUrl('/home/livraisons/'+this.id)

                  }
                }   
              }
            )
            
            // this.router.navigate(['/home/livraisons/',this.id])
          }          
        }
        else{this.router.navigateByUrl('/login')}
      }
    )
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}
