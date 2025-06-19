import { Component, ElementRef, Renderer2 } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FirebaseService } from '../../shared/services/firebase.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule,ReactiveFormsModule,NgbModule,AngularFireModule,AngularFireAuthModule,AngularFireDatabaseModule,
    AngularFirestoreModule],
  providers: [FirebaseService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 
 // public showPassword = false;
 disabled = '';
 active: any;
 showLoader:boolean | undefined;

 constructor(
  public authservice: AuthService,
  private elementRef: ElementRef,
   private router: Router,
   private formBuilder: FormBuilder,
   private renderer: Renderer2,
   private firebaseService: FirebaseService,
   private toastr: ToastrService 
 ) {

  document.body.classList.add('authentication-background');
  const htmlElement = this.elementRef.nativeElement.ownerDocument.documentElement;
    htmlElement.removeAttribute('style'); 
    const bodyElement = this.renderer.selectRootElement('body', true);
 }

 ngOnInit(): void {
   this.loginForm = this.formBuilder.group({
     username: ['spruko@admin.com', [Validators.required, Validators.email]],
     password: ['sprukoadmin', Validators.required],
   });

 }
  firestoreModule = this.firebaseService.getFirestore();
  databaseModule = this.firebaseService.getDatabase();
  authModule = this.firebaseService.getAuth();
 // firebase
 email = 'spruko@admin.com';
 password = 'sprukoadmin';
 errorMessage = ''; // validation _error handle
 _error: { name: string; message: string } = { name: '', message: '' }; // for firbase _error handle

 clearErrorMessage() {
   this.errorMessage = '';
   this._error = { name: '', message: '' };
 }

 login() {
   this.clearErrorMessage();
   if (this.validateForm(this.email, this.password)) {
     this.authservice
       .loginWithEmail(this.email, this.password)
       .then(() => {
         this.router.navigate(['/sales']);
         console.clear();
       })
       .catch((_error: any) => {
         this._error = _error;   
         this.router.navigate(['/']);
       });
       this.toastr.error('Invalid Details','Mamix', {
         timeOut: 3000,
         positionClass: 'toast-top-right',
       });
   }

 } 
 Submit() {
  if (
    this.loginForm.controls['username'].value === 'spruko@admin.com' &&
    this.loginForm.controls['password'].value === 'sprukoadmin'
  ) {
    this.router.navigate(['/sales']);
    this.toastr.success('login successful','Mamix', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });
  } else {
    this.toastr.error('Invalid details','Mamix', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });
  }

}

 validateForm(email: string, password: string) {
   if (email.length === 0) {
     this.errorMessage = 'please enter email id';
     return false;
   }

   if (password.length === 0) {
     this.errorMessage = 'please enter password';
     return false;
   }

   if (password.length < 6) {
     this.errorMessage = 'password should be at least 6 char';
     return false;
   }

   this.errorMessage = '';
   return true;
 }

 //angular
 public loginForm!: FormGroup;
 public error: any = '';

 get form() {
   return this.loginForm.controls;
 }

 ngOnDestroy(): void {
   const bodyElement = this.renderer.selectRootElement('body', true);
   this.renderer.removeAttribute(bodyElement, 'class');
 }
 showPassword = false;
 toggleClass = "ri-eye-off-line";
 toggleVisibility() {
   this.showPassword = !this.showPassword;
   if (this.toggleClass === "ri-eye-line") {
     this.toggleClass = "ri-eye-off-line";
   } else {
     this.toggleClass = "ri-eye-line";
   }
 }
}
