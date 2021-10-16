import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  constructor(private userservice:UserService,private formbulider: FormBuilder,private router:Router) { }


  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!:FormGroup
  dataSaved = false;
  userForm:any
  length!:User[]
  userInfo!:Observable<User[]>
  userIdUpdate :string|undefined|null
  massage:string|undefined|null
  
  ngOnInit(): void {

    this.userForm=this.formbulider.group(
     {
        id:[''],
        first_name:['',[Validators.required]],
        middle_name:['',[Validators.required]],
        last_name:['',[Validators.required]],
        date_of_birth:['',[Validators.required]],
        email:['',[Validators.required]],
        phone_no:['',[Validators.required]],
        add_city:['',[Validators.required]],
        add_state:['',[Validators.required]],
        add_zip:['',[Validators.required]],
        add_createdon:['',[Validators.required]],
      } );

      this.firstFormGroup = this.formbulider.group({
        id:['2'],
        first_name:['',[Validators.required]],
        middle_name:['',[Validators.required]],
        last_name:['',[Validators.required]],
        date_of_birth:['',[Validators.required]],
        email:['',[Validators.required]],
        phone_no:['',[Validators.required]],
        add_city:['',[Validators.required]],
        add_state:['',[Validators.required]],
        add_zip:['',[Validators.required]],
      
      });
    
      this.secondFormGroup=this.formbulider.group({
        add_city:['',[Validators.required]],
        add_state:['',[Validators.required]],
        add_zip:['',[Validators.required]],

      })
      

      this.loadAllUsers();
    
  }


  loadAllUsers(){
    this.userInfo=this.userservice.getAllUser()

  }

  onFormSubmit() {
    this.dataSaved = false;
    const user = this.firstFormGroup.value;
    this.CreateUser(user);
    this.userForm.reset();
  }

  loadUserEdit(userid: string) {
    this.userservice.getUserById(userid).subscribe(user => {
      console.log("user",user)
      this.massage = null;
      this.dataSaved = false;
      this.userIdUpdate = user.id;
      this.firstFormGroup.controls['first_name'].setValue(user.first_name);
      this.firstFormGroup.controls['middle_name'].setValue(user.middle_name);
      this.firstFormGroup.controls['last_name'].setValue(user.last_name);
      this.firstFormGroup.controls['date_of_birth'].setValue(user.date_of_birth);
      this.firstFormGroup.controls['email'].setValue(user.email);
      this.firstFormGroup.controls['phone_no'].setValue(user.phone_no);
      this.firstFormGroup.controls['add_city'].setValue(user.add_city);
      this.firstFormGroup.controls['add_state'].setValue(user.add_state);
      this.firstFormGroup.controls['add_zip'].setValue(user.add_zip);
      
    });

  }

  
  CreateUser(user:User) {
    if (this.userIdUpdate == null) {
      this.userservice.createUser(user).subscribe(
        () => {
          this.dataSaved = true;
          const msg ='Record saved Successfully'
          this.massage =msg;
          this.loadAllUsers();
          this.userIdUpdate=null;
          this.userForm.reset();
        }
      );
    } else {
      user.id = this.userIdUpdate;
      this.userservice.updateUser(user).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        this.loadAllUsers();
        this.userIdUpdate = null;
        this.userForm.reset();
      });
    }
  }
  deleteUser(userid: string) {
    if (confirm("Are you sure you want to delete this ?")) {  
    this.userservice.deleteUserById(userid).subscribe(() => {
      this.dataSaved = true;
      this.massage = 'Record Deleted Succefully';
      this.loadAllUsers();
      this.userIdUpdate = null;
      this.firstFormGroup.reset();

    });
  }
}

  displayedColumns: string[] = ['first_name', 'middle_name', 'last_name','date_of_birth','email','phone_no','add_city','add_state','add_zip','edit','delete','addUser'];
  dataSource =this.userInfo
  clickedRows = new Set<User>()

}
