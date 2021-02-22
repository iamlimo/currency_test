/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';  
 import { FormsModule,  ReactiveFormsModule} from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `
                <form class="form" [formGroup]="loginForm"  (ngSubmit)="loginUser(loginForm.value)">

                                        <input mode="md" type="email" formControlName="email" placeholder="Email address" />


                                    <div class="validation-errors">
                                        <ng-container *ngFor="let validation of validation_messages.email">
                                        <div class="error-message" *ngIf="loginForm.get('email').hasError(validation.type) && (loginForm.get('email').dirty || loginForm.get('email').touched)">
                                            {{ validation.message }}
                                        </div>
                                        </ng-container>
                                    </div>

                        <input mode="md" type="password" class="password" formControlName="password" placeholder="Password" />


                    <div class="validation-errors">
                        <ng-container *ngFor="let validation of validation_messages.password">
                        <div class="error-message" *ngIf="loginForm.get('password').hasError(validation.type) && (loginForm.get('password').dirty || loginForm.get('password').touched)">
                            {{ validation.message }}
                        </div>
                        </ng-container>
                    </div>
                    <button  type="submit" [disabled]="!loginForm.valid">Submit</button>
                    <div *ngIf="logged_in">Logged In!</div>
                    </form>`,
                    styles: [
                        `
                          .validation-errors {
                            color: red
                          }
                        `
                      ],
})
export class Test03Component {
    loginForm: FormGroup = this.formBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])),
      });
      errorMessage: string;
      validation_messages = {
        'email': [
          { type: 'required', message: 'Email is required.' },
          { type: 'pattern', message: 'Please enter a valid email.' }
        ],
        'password': [
          { type: 'required', message: 'Password is required.' },
          { type: 'minlength', message: 'Password must be at least 5 characters long.' }
        ]
      };
      constructor(public formBuilder: FormBuilder) { }
    email:string = "";
    password:string = "";

    logged_in = false;
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};