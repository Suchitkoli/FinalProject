import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
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
  constructor(private userService:UserService,private router:Router,private formbulider:FormBuilder) { }

  ngOnInit(): void {
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
  
    this.loadAllUsers();
  }


  loadAllUsers(){
    this.userInfo=this.userService.getAllUser()
    var itemsLength = Object.keys(this.userInfo);
    console.log("Length",itemsLength)
  }
  loadUserEdit(userid: string) {
    this.userService.getUserById(userid).subscribe(user => {
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

    this.router.navigate(['/userdetail'])

  }
  CreateUser(user:User) {
    if (this.userIdUpdate == null) {
      this.userService.createUser(user).subscribe(
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
      this.userService.updateUser(user).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        this.loadAllUsers();
        this.userIdUpdate = null;
      });
    }
  }
  deleteUser(userid: string) {
    if (confirm("Are you sure you want to delete this ?")) {  
    this.userService.deleteUserById(userid).subscribe(() => {
      this.dataSaved = true;
      this.massage = 'Record Deleted Succefully';
      this.loadAllUsers();
      this.userIdUpdate = null;
      this.firstFormGroup.reset();
    });
  }
}
// name!:string
// newUser(name:string){
//   this.router.navigate('userdetail',name)
// }

  displayedColumns: string[] = ['first_name', 'middle_name', 'last_name','date_of_birth','email','phone_no','add_city','add_state','add_zip','edit','delete','addUser'];
  dataSource =this.userInfo
  clickedRows = new Set<User>()


}
