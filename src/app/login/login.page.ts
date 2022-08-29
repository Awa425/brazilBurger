import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  url = "http://127.0.0.1:8000/api/login_check";
  myForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl() 
});

  constructor(private myService: MyserviceService, private router: Router) { }

  ngOnInit() {
  }
  login(){
    this.myService.connexion(this.myForm.value, this.url).subscribe(
      user => {
        console.log(user['token']);
        if(user['token']){
          localStorage.setItem('token', user['token']);
            this.router.navigateByUrl('/home/livraisons')
        }
        else{this.router.navigateByUrl('/login')}
      }
    )
  }

}
