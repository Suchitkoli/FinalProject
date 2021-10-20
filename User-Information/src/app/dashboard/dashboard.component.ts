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


  
  
  dataSaved = false;
  userForm: any
  length!: User[]
  showSpinner=true
  userInfo!: Observable<User[]>
  userIdUpdate: string | undefined | null
  massage: string | undefined | null
  constructor(private userService: UserService, private router: Router, private formbulider: FormBuilder) { }

  ngOnInit(): void {
    this.loadAllUsers();
  }
  loadAllUsers() {
   
    this.userInfo = this.userService.getAllUser()
    setTimeout(()=>{
      this.showSpinner=false
    },3000);
 
  }
  loadUserEdit(userid: string) {
    this.router.navigate(['/userdetail', userid])

  }
  deleteUser(userid: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.userService.deleteUserById(userid).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Deleted Succefully';
        this.loadAllUsers();
        this.userIdUpdate = null;
       
      });
    }
  }

  uid!: User
  newUser(userid: User) {

    this.router.navigate(['userdetail', -1])
  }

  displayedColumns: string[] = ['first_name', 'middle_name', 'last_name', 'date_of_birth', 'email', 'phone_no', 'add_city', 'add_state', 'add_zip', 'delete', 'addUser'];
  dataSource = this.userInfo
  clickedRows = new Set<User>()


}
