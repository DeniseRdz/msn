import { Component, OnInit, ViewEncapsulation } from '@angular/core';
//import { UserService } from '../user.service';
import { UserFirebaseService } from '../user-firebase.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users : any;
  closeResult: string;
  public isCollapsed = false;

  query : string;
  
  //modalService: any;

  constructor( public userFirebaseService: UserFirebaseService, private modalService: NgbModal , public authenticationService : AuthenticationService, public router: Router) { 
    //this.users = this.userService.getUsers();
    //console.log(this.users);
    
    const stream = this.userFirebaseService.getUsers();
    stream.valueChanges().subscribe( (result)=>{
      this.users = result;
      console.log(result);
    });
    
    console.log(this.users);

    authenticationService.getStatus().subscribe((status)=>{
      console.log('status',status);
      if(status == null){
        this.router.navigate(['login']);
      }else{
        
      }
    });
  }
    printUser(userId){
      const stream = this.userFirebaseService.getUserById(userId);
      stream.valueChanges().subscribe((result) =>{
      console.log(result);
      this.router.navigate(['/conversation/'+ userId]);
  
      });
    }
    removeUser(userId){
      const promise = this.userFirebaseService.removeUserById(userId);
      promise.then(()=>{
        alert('Usuario eliminado con exito');
      }).catch((error)=>{
        alert('Error');
        console.log(error);
      });
      //console.log(promise);
    }
  
    addUser(){
      const user={
        name:'Cesar',
        status:'online',
        nick:'bbe',
        user_id: Date.now()
      
      };
      const promise = this.userFirebaseService.createUser(user);
      promise.then(()=>{
        alert('Usuario agregado');
      }).catch((error)=>{
        alert('Error');
        console.log(error);
      });
    }
  
    editUser(){
      const user={
        name:'Jessica',
        status:'Ocupado',
        nick:'',
        user_id: '3'
      
      };
      const promise = this.userFirebaseService.editUser(user);
      promise.then(()=>{
        alert('Usuario editado');
      }).catch((error)=>{
        alert('Error');
        console.log(error);
      });
    }

    openBackDropCustomClass(content) {
      this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
    }
  
    openWindowCustomClass(content) {
      this.modalService.open(content, { windowClass: 'dark-modal' });
    }
  
    openSm(content) {
      this.modalService.open(content, { size: 'sm' });
    }
  
    openLg(content) {
      this.modalService.open(content, { size: 'lg' });
    }
  
    openVerticallyCentered(content) {
      this.modalService.open(content, { centered: true });
    }

    logOut(){
      this.authenticationService.logOut();
    }

  ngOnInit() {
  }

}
