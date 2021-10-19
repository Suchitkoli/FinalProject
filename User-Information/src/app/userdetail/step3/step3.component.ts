import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: '[formGroup]app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {

  public appForm: FormGroup;
  //public imageURL: string;

  get formArray(): FormArray | null { return this.appForm.get('formArray') as FormArray }
  constructor(  private controlContainer: ControlContainer) { }

  ngOnInit() {
    this.appForm = this.controlContainer.control as FormGroup;
  }

  getValue(index: number, controlName: string) {
    return this.formArray.controls[index].get(controlName).value
  }
}
