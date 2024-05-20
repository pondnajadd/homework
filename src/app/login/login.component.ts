import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginForm } from '../models/login-form';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.authService
      .login(this.f['username'].value, this.f['password'].value)
      .subscribe({
        next: (response) => {
          if (response.isSuccess && response.statusCode == 200) {
            this.storageService.saveUser(response.data);
            console.log(response);
            this.router.navigateByUrl('/categories');
          }
        },

        error: (data) => {
          this.dialog.open(ErrorDialogComponent, {
            data: { message: 'User or Password is not correct' },
          });
        },
      });
  }

  getErrorMessage() {}

  hide = true;
}
