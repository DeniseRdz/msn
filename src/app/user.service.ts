import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users=[
    {nick:'Mi Nick1', subNick: ' Mi Subnick', avatar: 'avatar.jpg', status:'online', email:'mi@email.com', userId: 1},
    {nick:'Mi Nick2', subNick: ' Mi Subnick', avatar: 'avatar.jpg', status:'online', email:'mi@email.com', userId: 2},
    {nick:'Mi Nick3', subNick: ' Mi Subnick', avatar: 'avatar.jpg', status:'online', email:'mi@email.com', userId: 3},
    {nick:'Mi Nick4', subNick: ' Mi Subnick', avatar: 'avatar.jpg', status:'online', email:'mi@email.com', userId: 4}
];

  constructor() { }

    getUsers(){
      return this.users;
    }
    getUserById(userId){
      let user = {};
      user= this.users.filter( (u)=>{
        return u.userId == userId;
      })[0];
      return user;
    }
  
}
