import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { UserFirebaseService } from '../user-firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any;

  constructor(public authenticationService: AuthenticationService, public router: Router, public userFirebaseService: UserFirebaseService ) { 

    authenticationService.getStatus().subscribe((status)=>{
      console.log('status',status);
      this.user = status.uid;
      if(status == null){
        this.router.navigate(['login']);
      }else{
        
      }
    });
  }

  printUser(user){
    const stream = this.userFirebaseService.getUserById(user);
    stream.valueChanges().subscribe((result) =>{
    console.log(result);
    });
  }
  
  ngOnInit() {
  }

}
