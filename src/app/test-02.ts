/**
 * Update the following components to meet the requirements : 
 * * Bind [field] of [textfield] component to its text input
 * * Pass value of [field] from [textfield] component to [title] property of component [ng-app]
 */
import { Component, Input, NgModule, ViewChild , AfterViewInit } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector : 'textfield',
    template : '<input type="text" value=""  [(ngModel)]="field" />'
})
export class TextField {
   @Input() field = "";
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:<h2><br/><textfield [field]="field">{{field}}</textfield>`
})
export class ChildComponent {
      field = "This is the solution to test two"
}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component implements AfterViewInit{

 @ViewChild(ChildComponent, {static: false}) childReference;
    title:string = "";


    ngAfterViewInit() {
            this.title = this.childReference.field;
    }

}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    declarations : [Test02Component,ChildComponent,TextField]
})
export class Test02Module {};