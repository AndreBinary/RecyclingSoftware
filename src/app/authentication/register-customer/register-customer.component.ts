import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FirebaseService } from '../../shared/services/firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-customer',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule,ReactiveFormsModule,NgbModule,AngularFireModule,AngularFireAuthModule,AngularFireDatabaseModule,
    AngularFirestoreModule],
  providers: [FirebaseService],
  templateUrl: './register-customer.component.html',
  styleUrl: './register-customer.component.scss'
})
export class RegisterCustomerComponent implements OnInit {
nameRegex:RegExp = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
saMobileRegex:RegExp = /^(?:0|\+27)([6-8]\d{8})$/;
intlMobileRegex:RegExp = /^\+?\d{10,15}$/;
emailRegex:RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z]{2,})+$/;
registrationType: 'personal' | 'business' = 'personal';
currentStep = 1;
steps:any;
is_customer_valid=false;
is_step_over=false;
customer :any={
  firstname:null,
  is_firtname_valid:0,
  lastname:null,
  is_lastname_valid:0,
  mobile:null,
  is_mobile_valid:0,
  email:null,
  is_email_valid:0,
  is_business:false,
  business:{
    id:0,
    name:null,
    registration_number:null,
    vat_number:null,
    tax_number:null,
    email:null,

  }}
businessForm = this.fb.group({ businessName: ['', Validators.required], taxId: ['', Validators.required] });
addressForm = this.fb.group({ street: ['', Validators.required], city: ['', Validators.required], zip: ['', Validators.required] });
otpForm = this.fb.group({ otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]] });

ngOnInit(): void {
    this.configureSteps();
    this.customer={
  firstname:null,
  is_firstname_valid:0,
  lastname:null,
  is_lastname_valid:0,
  mobile:null,
  is_mobile_valid:0,
  email:null,
  is_email_valid:0,
  is_business:false,
  business:{
    id:0,
    name:null,
    registration_number:null,
    vat_number:null,
    tax_number:null,
    email:null,

  }}
}

constructor(private fb: FormBuilder, private router: Router) {}

validateFirstname() {
    const valid = this.nameRegex.test(this.customer.firstname.trim());
    this.customer.is_firstname_valid = valid ? 1 : 0;
    this.validate_customer();
  }

  validateLastname() {
    const valid = this.nameRegex.test(this.customer.lastname.trim());
    this.customer.is_lastname_valid = valid ? 1 : 0;
    this.validate_customer();
  }

  validateMobile(){
    const cleaned = this.customer.mobile.replace(/\s+/g, '');
    const valid = this.saMobileRegex.test(cleaned);
    this.customer.is_mobile_valid = valid ? 1 : 0;
    this.validate_customer();
  }

  validateEmail(){
    const valid = this.emailRegex.test(this.customer.email.trim());
    this.customer.is_email_valid = valid ? 1 : 0;
    this.validate_customer();
  }

  validate_customer(){
    if(this.customer.is_firstname_valid===1 && this.customer.is_lastname_valid===1 && this.customer.is_mobile_valid===1 && this.customer.is_email_valid===1){
      this.is_customer_valid = true;
    }else{
      this.is_customer_valid = false;
    }
  }

  customerFirstnameValidBorder(){return this.customer.is_firstname_valid === 1 ? 'border-success' : this.customer.is_firstname_valid === 0 ? 'border-danger' : '';}
  customerFirstnameValidLabel(){return this.customer.is_firstname_valid === 1 ? 'text-success' : this.customer.is_firstname_valid === 0 ? 'text-danger' : '';}
  customerLastnameValidBorder(){return this.customer.is_lastname_valid === 1 ? 'border-success' : this.customer.is_lastname_valid === 0 ? 'border-danger' : '';}
  customerLastnameValidLabel(){return this.customer.is_lastname_valid === 1 ? 'text-success' : this.customer.is_lastname_valid === 0 ? 'text-danger' : '';}
  customerMobileValidBorder(){return this.customer.is_mobile_valid === 1 ? 'border-success' : this.customer.is_mobile_valid === 0 ? 'border-danger' : '';}
  customerMobileValidLabel(){return this.customer.is_mobile_valid === 1 ? 'text-success' : this.customer.is_mobile_valid === 0 ? 'text-danger' : '';}
  customerEmailValidLabel(){return this.customer.is_email_valid === 1 ? 'text-success' : this.customer.is_email_valid === 0 ? 'text-danger' : '';}
  customerEmailValidBorder(){return this.customer.is_email_valid === 1 ? 'border-success' : this.customer.is_email_valid === 0 ? 'border-danger' : '';} 



goToStep(i: number) {
  if (i <= this.currentStep) this.currentStep = i;
}
configureSteps() {
    // switch‐case on registrationType
    switch (this.customer.is_business) {
      case true:
        this.customer.is_business = true;
        this.steps = [
          { label: 'Personal Details' },
          { label: 'Business Details' },
          { label: 'Address Details' },
          { label: 'OTP Verification' },
          { label: 'Complete' }
        ];
        break;

      default:
        this.customer.is_business = false;
        this.steps = [
          { label: 'Personal Details' },
          { label: 'Address Details' },
          { label: 'OTP Verification' },
          { label: 'Complete' }
        ];
    }
  }
next() { this.currentStep++;}

prev() { this.currentStep--; }

verifyOtp() {
  // call your OTP verification service…
  // on success:
  this.currentStep = 5;
  setTimeout(() => this.router.navigate(['/login']), 2000);
}

resendOtp() {
  // call your resend OTP service…
}

is_business_switch(){
  this.customer.is_business = !this.customer.is_business;
  this.configureSteps();
}

}
