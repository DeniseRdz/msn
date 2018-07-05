import { Component, OnInit, Input } from '@angular/core';
import { UserFirebaseService } from '../user-firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
 
  @Input() user_id: string;
  friend = null;

  constructor(public userFirebaseService: UserFirebaseService, public router: Router) { }

  printUser(user_id){
    const stream = this.userFirebaseService.getUserById(user_id);
    stream.valueChanges().subscribe((result) =>{
    console.log(result);
    this.router.navigate(['/conversation/'+ user_id]);

    });
  }

  ngOnInit() {
    const stream = this.userFirebaseService.getUserById(this.user_id);
    stream.valueChanges().subscribe((result)=> {
      this.friend = result;
    });
  }

}
