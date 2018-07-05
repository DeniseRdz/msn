import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserFirebaseService } from '../user-firebase.service';
import { AuthenticationService } from '../authentication.service';

import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'firebase';
import { ConversationService } from '../conversation.service';
import { Stream } from 'stream';
import { MAX_LENGTH_VALIDATOR } from '@angular/forms/src/directives/validators';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  userId: any;
  friend: any;
  users: any;
  message: string;
  conversation: any;
  ids=[];
  constructor( public activatedRoute: ActivatedRoute, public userService: UserService, 
    public authenticationService: AuthenticationService, public router: Router, 
    public userServiceFirebase : UserFirebaseService, public conversationService: ConversationService)
    { 
    this.userId = this.activatedRoute.snapshot.params['userId'];
    
    //console.log(this.userId);
    //this.userId = parseInt(this.userId);
    this.authenticationService.getStatus().subscribe((response)=>{
      this.userServiceFirebase.getUserById(response.uid).valueChanges().subscribe( (user)=> {
        this.users= user;
        console.log(this.users);

        this.friend = this.userServiceFirebase.getUserById(this.userId).valueChanges().subscribe((result: User) =>{
          this.friend = result;
          console.log(this.friend);
         this.getConversationMessage();

        });

      });
    
      //console.log('status',status);
      if(status == null){
        this.router.navigate(['login']);
      }else{
      }


    });
/*
    const source = from ([1,2,3,4,5]);
    const example = source.pipe(map(val => val + 10));
    const stream = example.subscribe( val => console.log(val));*/

    
}

/*timestamp  = Date.now();
price = 123.343454645234324;
user = {
  name: 'Denise',
  age: 21,
  status: 'online',
  friend: true
};*/

getConversationMessage(){
  this.ids= [this.friend.user_id, this.users.user_id].sort();
          
  const stream = this.conversationService.getConversation(this.ids.join('||'));
  stream.valueChanges().subscribe((resultConversation) =>{
    this.conversation = resultConversation;
    console.log(this.conversation);
  });
}

 sendMessage(){
  //enviar el mensaje 
  this.ids = [this.friend.user_id, this.users.user_id].sort();
  const messageObjet = { 
    uid: this.ids.join('||'),
    timestamp: Date.now(),
    sender: this.users.user_id,
    receiver: this.friend.user_id,
    content: this.message.replace(/\n$/,' '),
    type: 'text'
  };
  console.log(messageObjet);
  this.conversationService.createConversation(messageObjet).then(()=>{
    console.log('Todo bien');
  });
  this.message = '';
 }

 getNickById(id){
  if (id=== this.users.user_id){
    return this.users.nick;
  }else{
    return this.friend.nick;
  }
 }

  ngOnInit() {
  }

}
