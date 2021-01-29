import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SignUpModel } from '../../models/sign-up-model';
import { ValidationPatterns } from '../../models/validation-patterns.enum';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

  public signUpForm: FormGroup;
  public hidePassword: boolean;

  get signUpFormFields() {
    return this.signUpForm.controls;
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['',
        [Validators.required,
        Validators.pattern(ValidationPatterns.Name)]],
      email: ['', [
        Validators.required,
        Validators.pattern(ValidationPatterns.Email)]],
      password: ['', [
        Validators.required,
        Validators.pattern(ValidationPatterns.Password)]],
      confirmPassword: ['', [
        Validators.required,
        Validators.pattern(ValidationPatterns.Password)]]
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') })

    this.hidePassword = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  performSignUp() {
    let signUpCredentials: SignUpModel = {
      name: this.signUpFormFields.name.value,
      email: this.signUpFormFields.email.value,
      password: this.signUpFormFields.password.value,
      confirmPassword: this.signUpFormFields.confirmPassword.value
    }

    this.authService.signUp(signUpCredentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => {
          this.router.navigateByUrl('/auth/login');
        }
      });
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  toggleHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  getNameRequirements() {
    return `Name must have only 1 upper case letter.`
  }

  getPasswordRequirements() {
    return `Password must contain at least: 
    8 characters,
    1 uppercase letter, 
    1 lowercase letter,
    1 number,
    1 special character`
  }
}
