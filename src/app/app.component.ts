import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactive-forms-demo';
  registerForm: FormGroup = this.formBuilder.group({});

  submitted = false;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    // initialise the form and declare the form fields and validators
    this.registerForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        firstName: ['John', [Validators.required, Validators.pattern('[a-zA-Z*]')]],
        lastName: ['Doe', [Validators.required, Validators.pattern('[a-zA-Z*]')]],
        dob: ['', Validators.required],
        age: ['', Validators.min(10)],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, {
        validator: this.mustMatch('password', 'confirmPassword')
      }
    )

    setTimeout(() => {
      this.setDefaultValues();
    }, 500)
  }

  setDefaultValues() {
    this.registerForm.setValue(
      {
        title: 'Mr',
        firstName: 'Abhishek',
        lastName: 'Saini',
        dob: formatDate(new Date('1900-09-07'), 'yyyy-MM-dd', 'en'),
        email: 'abhishek_saini@live.com',
        password: '1234567',
        confirmPassword: '1234567',
        age: 18
      }
    )
  }

  pathTheValue() {
    this.registerForm.patchValue(
      {
        firstName: 'Amandeep',
        lastName: 'Singh',
        dob: formatDate(new Date('1900-09-07'), 'yyyy-MM-dd', 'en')
      }
    )
  }

  resetTheForm() {
    this.registerForm.reset();
  }

  setValidationOnAge() {
    this.registerForm.controls['age'].setValidators(Validators.requiredTrue);
  }

  removeValidationOnAge() {
    this.registerForm.controls['age'].clearValidators();
  }

  mustMatch(pwd1: string, pwd2: string) {
    return (formGroup: FormGroup) => {
      const pwd = formGroup.controls[pwd1];
      const cnfPwd = formGroup.controls[pwd2];
      if (pwd.value !== cnfPwd.value) {
        cnfPwd.setErrors({
          mustMatch: true
        });
      } else {
        cnfPwd.setErrors(null);
      }
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  onFormSubmit() {
    debugger
    this.submitted = true;
    const {
      confirmPassword,
      dob,
      email,
      firstName,
      lastName,
      password,
      title
    } = this.registerForm.value;

    // make an API call, save the data to the BE

  }
}
