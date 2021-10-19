import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: '[formGroup]app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  public appForm!:FormGroup

  constructor(private controlContainer:ControlContainer) { }

  ngOnInit(): void {
    this.appForm = this.controlContainer.control as FormGroup;

  }

}
