import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserFirebaseService } from '../user-firebase.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  userId: any;
  friend = {};
  users: any;
  constructor( public activatedRoute: ActivatedRoute, public userService: UserService, public authenticationService: AuthenticationService, public router: Router) { 
    this.userId = this.activatedRoute.snapshot.params['userId'];
    console.log(this.userId);
    this.userId = parseInt(this.userId);
    this.friend = this.userService.getUserById(this.userId);
    console.log(this.friend);

    authenticationService.getStatus().subscribe((status)=>{
      console.log('status',status);
      if(status == null){
        this.router.navigate(['login']);
      }else{
        
      }
    });
}

  ngOnInit() {
  }

}
