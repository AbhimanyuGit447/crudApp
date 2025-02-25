import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnChanges {

  @Input() selectedUser : any | null = null;
  @Output() userSaved = new EventEmitter<void>();

  userForm! : FormGroup;
  isEditMode = false;

  constructor(private fb : FormBuilder, private userService : UserService){
    this.userForm = this.fb.group({
      id : [''],
      name: ['', Validators.required],
      email : ['', Validators.required]
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedUser'] && this.selectedUser){
      this.isEditMode = true;
      this.userForm.patchValue(this.selectedUser);
    }
  }

  SubmitForm() {
    const newUser = {
      id: (Math.floor(Math.random() * 100000)).toString(),  // Random unique ID
      name: this.userForm.value.name,
      email: this.userForm.value.email
    };

    if (this.isEditMode && this.selectedUser?.id) {
      console.log(newUser.id);

      this.userService.updateUser(this.selectedUser.id.toString(), newUser).subscribe(() => {
        this.userSaved.emit();
      });
    } else {
      this.userService.addUser(newUser).subscribe(() => {
        this.userSaved.emit();
      });
    }

    this.userForm.reset();
  }

  resetForm(){
    this.userForm.reset();
    this.isEditMode = false;
  }



}
