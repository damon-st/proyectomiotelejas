import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserI } from '../../model/user.interface';
import { AuthService } from '../../services/auth.service';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crearcuenta',
  templateUrl: './crearcuenta.component.html',
  styleUrls: ['./crearcuenta.component.css']
})
export class CrearcuentaComponent implements OnInit {

  isSuccefuly = false;

  hide =  true;

  codeError: string;

  iniciarSesion = new FormGroup({email: new FormControl('', [Validators.email, Validators.required]),
  password: new FormControl('', [Validators.required, Validators.minLength(6)])});


  crearCuenta = new FormGroup({email: new FormControl('', [Validators.email, Validators.required]),
                // tslint:disable-next-line: max-line-length
                password: new FormControl('', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,30}'), Validators.minLength(6)]),
                displayName: new FormControl('', [Validators.required, Validators.minLength(5)])});
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<CrearcuentaComponent>,
  ) { }

  ngOnInit(): void {
  }


  getErrorMessage(): string {
    if (this.iniciarSesion.controls.email.hasError('required')) {
      return 'Debes escribir tu correo';
    }

    return this.iniciarSesion.controls.email.hasError('email') ? 'Ingresa un correo Valido' : '';
  }

  getErrorPassword(): string{
   return this.crearCuenta.controls.password.hasError('pattern') ? 'Contraseña debe tener almenos una Mayuscula y un numero' : '';
  }

  loginUser(user: UserI){
    this.isSuccefuly = true;
    this.authService.loginUser(user).then((user) => {
     // console.log(user);
      this.isSuccefuly = false;
      this.dialogRef.close();

    }).catch((err) => { 
      this.codeError = err.code; 
      // console.log(err.code);
      this.isSuccefuly = false;
    });
  }

  crearUsuario(user: UserI){
    this.isSuccefuly = true;
    this.authService.registerUser(user).then((user) => {
        // console.log(user);
        this.isSuccefuly = false;
        this.dialogRef.close();
    }).catch((err) => {
      this.codeError = err.code;
      // console.log(err);
      this.isSuccefuly = false;
    });
  }
}
