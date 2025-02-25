import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users : any[] = [];
  selectedUser : any = null;

  constructor(private userService : UserService ){

  }

ngOnInit(): void {
  this.loadUsers();
}

loadUsers(){
  this.userService.getUsers().subscribe(data => {
    this.users = data;
  })
}

editUser(user : any){
  this.selectedUser = {...user};
}

deleteUser(id : any){
  console.log(id, 'd');
  this.userService.deleteUser(id).subscribe(() => {
    this.loadUsers();
  })
}



}
