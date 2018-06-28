import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UserFirebaseService } from '../user-firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name:string;
  email:string;
  password:string;
  passwordRp:string;
  registeredUid: any;
  recibelogin:any;

  constructor(public authenticationService: AuthenticationService, public userFirebaseService : UserFirebaseService) { }

  ngOnInit() {
  }
  register(){
  const promise = this.authenticationService.emailRegistration(this.email, this.password);
  promise.then((data)=>{
    alert('Regitrado con exito');
    console.log(data);
    this.registeredUid = data.user.uid;
    this.insertOnDatabase(this.registeredUid);
    console.log(this.registeredUid);
  }).catch((error)=>{
    alert('Error');
    console.log(error);
  });
}
  insertOnDatabase(uid){
    const user = {
      user_id: uid,
      name: this.name,
      email: this.email
    };

    //this.userFirebaseService.createUser(user);
    const promise = this.userFirebaseService.createUser(user);
    promise.then((data)=>{
      console.log(data);
    }).catch((error)=>{
      console.log(error);
    });
    
  }

  login(){
    const promise = this.authenticationService.emailLogin(this.email, this.password);
    promise.then((data)=>{
      alert('Login Exitoso');
      console.log(data);
    }).catch((error)=>{
      alert('error');
      console.log(error);
    });
  }
  
}
