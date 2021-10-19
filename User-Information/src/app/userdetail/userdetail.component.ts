import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css'],
  providers:[{
    provide:STEPPER_GLOBAL_OPTIONS,useValue:{
      displayDefauktIndicatorTyoe:false
    }
  }]
})
export class UserdetailComponent implements OnInit {

  constructor(private userservice:UserService,private formbulider: FormBuilder,private router:Router,private activatedroute:ActivatedRoute,private _snackBar: MatSnackBar) { }

  get formArray(): FormArray | null { return this.appForm.get('formArray') as FormArray }

  appForm!:FormGroup
  isLinear = false;
 
  dataSaved = false;
  userForm:any
  length!:User[]
  userInfo!:Observable<User[]>
  userIdUpdate :string|undefined|null
  message:string|undefined|null
  uid:any
  ngOnInit(): void {

    this.appForm=this.formbulider.group( {
    
      formArray : this.formbulider.array([
        
        this.formbulider.group({
          id:['2'],
          first_name:['',[Validators.required]],
          middle_name:['',[Validators.required]],
          last_name:['',[Validators.required]],
          date_of_birth:['',[Validators.required]],
          email:['',[Validators.required,  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
          phone_no:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
        }),
        this.formbulider.group({
          add_city:['',[Validators.required]],
          add_state:['',[Validators.required]],
          add_zip:['',[Validators.required,Validators.maxLength(6),Validators.minLength(6)]],
          createdon: new Date()

        }),
      ])
      } );
      this.activatedroute.paramMap.subscribe(param => {
        this.uid=param.get('id');
        console.log("uid",param)
        if(this.uid != -1){
          this.loadUserEdit(this.uid)
        }
      })
    
      this.loadAllUsers();
    
  }


  loadAllUsers(){

    this.userInfo=this.userservice.getAllUser()

  }
  public getValue(index: number, controlName: string) {
    if (this.formArray && this.formArray.controls[index]) {
      if (this.formArray.controls[index].get(controlName).value) {
       
          return this.formArray.controls[index].get(controlName).value
        }
      }
    }
  


users:Array<User>=new Array()
  onFormSubmit() {
    this.dataSaved = false;
    let userinfo:User =new User()
    userinfo.first_name=this.getValue(0,'first_name')
    userinfo.middle_name=this.getValue(0,'middle_name')
    userinfo.last_name=this.getValue(0,'last_name')
    userinfo.date_of_birth=this.getValue(0,'date_of_birth')
    userinfo.email=this.getValue(0,'email')
    userinfo.phone_no=this.getValue(0,'phone_no')
    userinfo.add_city=this.getValue(1,'add_city')
    userinfo.add_state=this.getValue(1,'add_state')
    userinfo.add_zip=this.getValue(1,'add_zip')
    userinfo.createdon=this.getValue(1,'createdon')
    this.CreateUser(userinfo);
  
}


  loadUserEdit(userid: string) {
    this.userservice.getUserById(this.uid).subscribe(user => {
      console.log("user",user)
      this.message = null;
      this.dataSaved = false;
      this.userIdUpdate = user.id;
      let userinfo:User=new User;
     this.formArray.controls[0].setValue(
     {
       id:(user.id),
       first_name:(user.first_name),
       middle_name:(user.middle_name),
       last_name:(user.last_name),
       date_of_birth:(user.date_of_birth),
       email:(user.email),
       phone_no:(user.phone_no)
     
     }
      )
      this.formArray.controls[1].setValue({
        add_city:(user.add_city),
        add_state:(user.add_state),
        add_zip:(user.add_zip),
        createdon:(user.createdon)
      })
    });

  }

  
  CreateUser(user:User) {
    if (this.userIdUpdate == null) {
      this.userservice.createUser(user).subscribe(
        () => {
          this.dataSaved = true;
          const msg ='Record saved Successfully'
          this.message =msg;
          this.loadAllUsers();
          this.userIdUpdate=null;
          this.appForm.reset();
        }
      );
    } else {
      user.id = this.userIdUpdate;
      this.userservice.updateUser(user).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Record Updated Successfully';
        this.loadAllUsers();
        this.userIdUpdate = null;
        this.appForm.reset();
      });
    }
  }
 

  displayedColumns: string[] = ['first_name', 'middle_name', 'last_name','date_of_birth','email','phone_no','add_city','add_state','add_zip','edit','delete','addUser'];
  dataSource =this.userInfo
  clickedRows = new Set<User>()
 

}
