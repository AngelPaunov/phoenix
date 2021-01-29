import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginModel } from '../../models/login-model';
import { ValidationPatterns } from '../../models/validation-patterns.enum';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

  public loginForm: FormGroup;
  public hidePassword: boolean;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(ValidationPatterns.Email)]],
      password: ['', [
        Validators.required,
        Validators.pattern(ValidationPatterns.Password)]]
    })

    this.hidePassword = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  get loginFormFields() {
    return this.loginForm.controls;
  }

  toggleHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  login(): void {
    const formValues = this.loginForm.value;
    let userCredentials: LoginModel = {
      email: formValues.email,
      password: formValues.password
    }

    this.authService.login(userCredentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: e => console.log(e),
        complete: () => {          
          this.router.navigateByUrl('/home');
        }
      });
  }
}
