import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: '[formGroup] app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {

  constructor(private controlContainer:ControlContainer) { }

  public appForm!:FormGroup

  ngOnInit(): void {
    this.appForm = this.controlContainer.control as FormGroup;

  }

}
